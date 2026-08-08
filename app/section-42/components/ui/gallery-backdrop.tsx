"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import ImageGallery, { type KeepOutRect } from "../originkit/image-gallery";

/**
 * The photo field behind the hero — OriginKit "Image Gallery", configured.
 *
 * Figma paints this as a still, but the design is the live component: square
 * tiles surface all over the band, hold, then zoom out and fade. The band is
 * the middle 75% of the frame (`inset: 0 12.5%`), which is what keeps the
 * photos off the page edges without a mask.
 *
 * Two things this wrapper owns that the component cannot:
 *
 * **Keep-out.** The gallery runs *under* live copy, not behind a scrim, so a
 * tile crossing the headline is unreadable. The protected boxes are measured
 * here and handed down; the component hides any tile that touches one. Text is
 * measured as its own line boxes via a Range, not as the block — the headline
 * and the sub-copy are centred inside a full-width block, so their bounding
 * boxes would fence off the empty margins either side, which is exactly where
 * the design wants photos. Everything else (squiggle, form, social proof) is
 * measured as a plain box.
 *
 * The rects are cached in page space and only re-measured on layout, rather
 * than re-read per tile per frame as the source does: the copy does not move
 * while the gallery runs, so the per-frame cost is one rect read for the tile.
 *
 * **Reduced motion.** These tiles are ambient decoration with no resting state
 * — the only honest reduced-motion reading is an empty band, so the gallery
 * mounts paused rather than not mounting at all, which keeps the server and
 * client markup identical.
 */

const GALLERY_IMAGES = [
  "/section-42/gallery/01.jpg",
  "/section-42/gallery/02.jpg",
  "/section-42/gallery/03.jpg",
  "/section-42/gallery/04.jpg",
  "/section-42/gallery/05.jpg",
  "/section-42/gallery/06.jpg",
  "/section-42/gallery/07.jpg",
  "/section-42/gallery/08.jpg",
  "/section-42/gallery/09.jpg",
  "/section-42/gallery/10.jpg",
  "/section-42/gallery/11.jpg",
  "/section-42/gallery/12.jpg",
  "/section-42/gallery/13.jpg",
  "/section-42/gallery/14.jpg",
];

/**
 * Figma's tiles are all square. The component ships a mixed-aspect set, and a
 * 340x195 landscape reads as a different design language next to the 12px-round
 * squares the frames actually show.
 */
const TILE_SHAPES = [
  { w: 150, h: 150 },
  { w: 180, h: 180 },
  { w: 200, h: 200 },
  { w: 220, h: 220 },
  { w: 240, h: 240 },
  { w: 260, h: 260 },
  { w: 280, h: 280 },
];

/**
 * A photo appears over half a second, sits for two, then takes a full second to
 * zoom out and fade. At `crowdDensity: 10` that keeps ten tiles alive.
 */
const APPEAR = {
  style: "inToOut",
  ease: { duration: 0.5, delay: 2, ease: "easeOut" },
} as const;

const DISAPPEAR = {
  style: "inToOut",
  ease: { duration: 1, ease: "easeInOut" },
  fadeOut: 100,
} as const;

/**
 * The component's own entry throw is 80–140px, which is tuned for tiles that
 * enter from a ring around the centre. These enter *where they belong* (see
 * `spawn: "zone"`), so the entry is a settle rather than a flight — 8–20px is
 * the drift that reads as the photo landing rather than sliding in.
 */
const ENTRY_DISTANCE = [8, 20] as const;

/** Figma's card: 12px radius, hairline, and a white 3px keyline over two shadows. */
const TILE = {
  borderRadius: "12px",
  border: "1px solid #dbd6db",
  boxShadow:
    "0px 3px 7.1px 0px rgba(52,53,64,0.12), 0px 0px 0px 3px #ffffff, 0px 26px 40px 0px rgba(101,105,138,0.2)",
  background: "#f2f2f2",
};

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;

/**
 * Clearance between a tile and the copy it must not touch. This is a number the
 * gallery reads in JS, not a style, so it switches on a media query here rather
 * than a Tailwind variant. Re-pitched from the source's 560/1024 thresholds to
 * the project's own breakpoints — the values are per-tier clearances, not a
 * curve, so they move with the tier they belong to.
 */
const KEEP_OUT_PADDING = { mobile: 10, ipad: 14, desktop: 18 } as const;

export const GalleryBackdrop = () => {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const rectsRef = useRef<readonly KeepOutRect[]>([]);
  const [padding, setPadding] = useState<number>(KEEP_OUT_PADDING.desktop);

  useEffect(() => {
    const tablet = window.matchMedia(`(min-width: ${IPAD_MIN}px)`);
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_SM_MIN}px)`);
    const sync = () =>
      setPadding(
        desktop.matches
          ? KEEP_OUT_PADDING.desktop
          : tablet.matches
            ? KEEP_OUT_PADDING.ipad
            : KEEP_OUT_PADDING.mobile,
      );
    sync();
    tablet.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      tablet.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const root = hostRef.current?.closest("main");
    if (!root) return;

    let live = true;
    const measure = () => {
      if (!live) return;
      const { scrollX, scrollY } = window;
      const next: KeepOutRect[] = [];
      // A forced break contributes a zero-width line rect. Padded out it would
      // fence off a sliver of empty column between two lines that are already
      // protected, so degenerate rects are dropped rather than measured.
      const push = (rect: DOMRect) => {
        if (rect.width <= 0 || rect.height <= 0) return;
        next.push({
          left: rect.left + scrollX,
          top: rect.top + scrollY,
          right: rect.right + scrollX,
          bottom: rect.bottom + scrollY,
        });
      };

      root.querySelectorAll('[data-keep-out="lines"]').forEach((node) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        Array.from(range.getClientRects()).forEach(push);
      });
      root
        .querySelectorAll('[data-keep-out="box"]')
        .forEach((node) => push(node.getBoundingClientRect()));

      rectsRef.current = next;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    // The headline reflows when Instrument Serif lands; line boxes measured
    // before that belong to the fallback face and sit several px off.
    void document.fonts.ready.then(measure);

    return () => {
      live = false;
      observer.disconnect();
    };
  }, []);

  const keepOut = useCallback(() => rectsRef.current, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-[12.5%] left-[12.5%] z-0 overflow-hidden [contain:paint]"
    >
      <ImageGallery
        images={GALLERY_IMAGES}
        background="#f6f5f1"
        type="straight"
        direction="clockwise"
        spawn="zone"
        shapes={TILE_SHAPES}
        entryDistance={ENTRY_DISTANCE}
        appear={APPEAR}
        disappear={DISAPPEAR}
        blankArea={45}
        imageScale={2}
        crowdDensity={10}
        crowdDelay={0}
        fit="cover"
        fadeIn
        tile={TILE}
        keepOut={keepOut}
        keepOutPadding={padding}
        requireFullyVisible
        paused={reduceMotion === true}
      />
    </div>
  );
};
