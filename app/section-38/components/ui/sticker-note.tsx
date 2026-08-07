"use client";

import { useEffect, useRef, useState } from "react";

import StickerDrag from "../originkit/draggable-sticker";

/**
 * One of the four notes pinned around the board — Figma `sticker 1`–`sticker 4`
 * (desktop 2410:7276 / 7297 / 7287 / 7264), rendered as a peelable, draggable
 * sticker rather than a flat crop.
 *
 * Each note is shipped as a single PNG. That is the last row of the background
 * table and it is the right one here twice over: the art is a paper texture, a
 * folded corner and a line of Figma Hand under a baked shadow, none of which
 * CSS reproduces — and StickerDrag wants one image anyway, because it uploads
 * it as a WebGL texture and deforms it on a 32 x 32 mesh. The clip or pin is
 * flattened into the same file so it peels with the note instead of hanging in
 * the air above it.
 *
 * Figma's own resting shadow is inside that export, so `staticShadow` is
 * transparent here and only the drag shadow is left to grow — the two stacked
 * would read as a double drop.
 *
 * StickerDrag needs its box in pixels while the layout is a set of breakpoint
 * classes, so the host reserves the note at its Figma ratio, measures itself,
 * and mounts only then. Both numbers are rounded before they cross into the
 * component: it sizes its backing store from them, and a fractional width lands
 * that on an odd pixel count.
 */

/** Figma's resting shadow is baked into the export; this is only the lift. */
const DRAG_SHADOW = "0px 18px 22px rgba(42, 39, 34, 0.28)";
const REST_SHADOW = "0px 0px 0px rgba(0, 0, 0, 0)";

type StickerNoteProps = {
  src: string;
  /**
   * The note's tablet/desktop box. The phone draws all four at exactly 0.75 of
   * it, so one ratio reserves the host at every frame and only the width class
   * changes.
   */
  width: number;
  height: number;
  /** What the note says — the handwriting is inside the texture. */
  label: string;
  /** Placement and per-breakpoint width. No `z-*`: see `section-38-hero`. */
  className?: string;
};

export const StickerNote = ({
  src,
  width,
  height,
  label,
  className = "",
}: StickerNoteProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = (w: number, h: number) =>
      setBox({ width: Math.round(w), height: Math.round(h) });

    const rect = host.getBoundingClientRect();
    measure(rect.width, rect.height);

    const observer = new ResizeObserver(([entry]) =>
      measure(entry.contentRect.width, entry.contentRect.height),
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={`Sticky note: ${label}`}
      className={`absolute ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {box.width > 0 && (
        <StickerDrag
          image={src}
          imageWidth={box.width}
          imageHeight={box.height}
          tilt={28}
          elevation={6}
          /* Paper, not vinyl — the design carries no sheen across the notes. */
          lighting={false}
          staticShadow={REST_SHADOW}
          dynamicShadow={DRAG_SHADOW}
        />
      )}
    </div>
  );
};
