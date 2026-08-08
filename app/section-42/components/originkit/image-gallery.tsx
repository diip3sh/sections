"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/**
 * OriginKit — Image Gallery
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 1080
 * @framerIntrinsicHeight 480
 *
 * Spawns photo tiles around a container and animates each one out along its own
 * bearing, newest on top, until it fades and is removed. `straight` mode throws
 * tiles radially; `spiral` mode runs them along one of twenty pre-rolled spiral
 * paths.
 *
 * Vendored from the Framer source with four deliberate changes, all of which
 * default to the original behaviour:
 *
 * 1. **GSAP is imported, not injected.** The source appends a `<script>` to
 *    cdnjs at runtime and polls `window.gsap`. In a Next app that is a blocking
 *    third-party request on every mount, so `gsap` is a real dependency here.
 * 2. **Only this instance's timelines are touched.** The source calls
 *    `gsap.globalTimeline.pause()` / `.clear()`, which reaches every GSAP
 *    animation on the page. The instance keeps its own set instead.
 * 3. **Tiles pause off-screen.** The source only watches `visibilitychange`;
 *    an IntersectionObserver is added so a hero scrolled past stops spawning.
 * 4. **New optional props** — `spawn`, `shapes`, `entryDistance`, `fit`,
 *    `fadeIn`, `tile`, `keepOut`, `keepOutPadding`, `requireFullyVisible`,
 *    `paused`. Every default reproduces the original exactly; see each one.
 *
 * `images` is a plain list of URLs rather than Framer's `{ src }` union, and the
 * source's fourteen hard-coded CDN fallbacks are gone — in this repo the photos
 * are served from `public/`, so a silent external fetch is never the right
 * default.
 *
 * **Every object-valued prop must be referentially stable.** The effect lists
 * them all as dependencies (as the source does), so an inline literal restarts
 * the gallery on every render. Hoist them to module scope in the wrapper.
 */

type Zone = { cx: number; cy: number };
type Shape = { w: number; h: number };
type Cubic = readonly [number, number, number, number];

type NamedEase =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | "bounceIn"
  | "bounceOut";

type Ease = NamedEase | Cubic;

type Phase = {
  /** `inToOut` grows the tile outward; `outToIn` shrinks it toward the centre. */
  style?: "inToOut" | "outToIn";
  /** `duration` is the phase length; `delay` on `appear` is the hold after it. */
  ease?: { duration?: number; delay?: number; ease?: Ease };
  /** Percentage of the exit spent fading. Read from `disappear` only. */
  fadeOut?: number;
};

/**
 * A rectangle in **page** coordinates — viewport rect plus `window.scrollX/Y`.
 * Page space so the caller can measure once and cache: the numbers stay valid
 * while the page scrolls, and only a layout change invalidates them.
 */
export type KeepOutRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type ImageGalleryProps = {
  /** Photo URLs. Referentially stable — hoist to module scope. */
  images: readonly string[];
  background?: string;
  /** 1–20, remapped to a 0.125x–5x tile multiplier. */
  imageScale?: number;
  /** Percentage of the half-diagonal kept clear at the centre. */
  blankArea?: number;
  crowdDensity?: number;
  crowdDelay?: number;
  type?: "straight" | "spiral";
  direction?: "clockwise" | "anticlockwise" | "both";
  appear?: Phase;
  disappear?: Phase;

  /**
   * How a zone is read. `radial` (the original) treats it as a bearing only and
   * puts the tile on the `blankArea` ring. `zone` treats `cx`/`cy` as an actual
   * position in the box, so tiles appear across the whole perimeter rather than
   * on one ring, and each is clamped so its settled box lands fully inside.
   */
  spawn?: "radial" | "zone";
  /** Tile shapes to draw from. Defaults to the original mixed-aspect set. */
  shapes?: readonly Shape[];
  /** Distance travelled during the entry tween, `[min, max]`. */
  entryDistance?: readonly [number, number];
  fit?: "cover" | "contain";
  /** Fade the tile in during `inToOut` entry. The original snaps to opaque. */
  fadeIn?: boolean;
  /** Tile chrome. The original draws a bare square. */
  tile?: {
    borderRadius?: string;
    border?: string;
    boxShadow?: string;
    background?: string;
  };
  /**
   * Rectangles a tile may not overlap, in page space. A tile touching one is
   * hidden for as long as it does — the gallery runs under live copy here, and
   * a photo crossing the headline is worse than a gap in the field. Returning
   * a cached array is expected; this is called once per tile per frame.
   */
  keepOut?: () => readonly KeepOutRect[];
  /** Clearance around each keep-out rect, in px. */
  keepOutPadding?: number;
  /** Hide tiles that are not wholly inside the box, instead of clipping them. */
  requireFullyVisible?: boolean;
  /** Mount without spawning — the wrapper's `prefers-reduced-motion` path. */
  paused?: boolean;
};

/** Angular/positional slots, walked in order so spawns never clump. */
const ZONES: readonly Zone[] = [
  { cx: 18, cy: 18 },
  { cx: 82, cy: 18 },
  { cx: 18, cy: 82 },
  { cx: 82, cy: 82 },
  { cx: 32, cy: 14 },
  { cx: 50, cy: 12 },
  { cx: 68, cy: 14 },
  { cx: 32, cy: 86 },
  { cx: 50, cy: 88 },
  { cx: 68, cy: 86 },
  { cx: 14, cy: 35 },
  { cx: 14, cy: 55 },
  { cx: 14, cy: 72 },
  { cx: 86, cy: 35 },
  { cx: 86, cy: 55 },
  { cx: 86, cy: 72 },
  { cx: 28, cy: 28 },
  { cx: 72, cy: 28 },
  { cx: 28, cy: 72 },
  { cx: 72, cy: 72 },
  { cx: 42, cy: 16 },
  { cx: 58, cy: 16 },
  { cx: 42, cy: 84 },
  { cx: 58, cy: 84 },
  { cx: 16, cy: 45 },
  { cx: 84, cy: 45 },
];

const ASPECT_RATIOS: readonly Shape[] = [
  { w: 200, h: 200 },
  { w: 240, h: 240 },
  { w: 280, h: 280 },
  { w: 160, h: 250 },
  { w: 180, h: 280 },
  { w: 280, h: 165 },
  { w: 340, h: 195 },
  { w: 220, h: 150 },
];

/** Twenty spiral templates, rolled once so tiles share a small set of paths. */
const SPIRAL_PATHS = Array.from({ length: 20 }, () => ({
  startAngle: Math.random() * Math.PI * 2,
  spinDir: Math.random() < 0.5 ? 1 : -1,
  turns: 1.2 + Math.random() * 0.8,
}));

const GSAP_EASE: Record<Exclude<NamedEase, "linear">, string> = {
  easeIn: "power2.in",
  easeOut: "power2.out",
  easeInOut: "power2.inOut",
  circIn: "circ.in",
  circOut: "circ.out",
  circInOut: "circ.inOut",
  backIn: "back.in",
  backOut: "back.out",
  backInOut: "back.inOut",
  anticipate: "back.inOut(1.7)",
  bounceIn: "bounce.in",
  bounceOut: "bounce.out",
};

const DEFAULT_APPEAR: Phase = {
  style: "inToOut",
  ease: { duration: 0.5, ease: "easeOut" },
};
const DEFAULT_DISAPPEAR: Phase = {
  style: "inToOut",
  ease: { duration: 0.67, ease: "easeIn" },
};
const DEFAULT_ENTRY_DISTANCE: readonly [number, number] = [80, 140];
const DEFAULT_TILE: NonNullable<ImageGalleryProps["tile"]> = {};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/** Maps Framer's transition ease values to GSAP equivalents. */
const framerEaseToGsap = (ease: Ease | undefined): string => {
  if (!ease) return "none";
  if (typeof ease !== "string") {
    return `cubic-bezier(${ease[0]},${ease[1]},${ease[2]},${ease[3]})`;
  }
  return ease === "linear" ? "none" : GSAP_EASE[ease];
};

export default function ImageGallery({
  images,
  background = "#000000",
  imageScale = 5,
  blankArea = 1,
  crowdDensity = 10,
  crowdDelay = 0,
  type = "straight",
  direction = "both",
  appear = DEFAULT_APPEAR,
  disappear = DEFAULT_DISAPPEAR,
  spawn = "radial",
  shapes = ASPECT_RATIOS,
  entryDistance = DEFAULT_ENTRY_DISTANCE,
  fit = "contain",
  fadeIn = false,
  tile = DEFAULT_TILE,
  keepOut,
  keepOutPadding = 0,
  requireFullyVisible = false,
  paused: pausedByCaller = false,
}: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || pausedByCaller) return;

    const pool = images.filter((src) => src.length > 0);
    if (pool.length === 0) return;

    pool.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });

    const isSpiral = type === "spiral";
    const appearDir = appear.style ?? "inToOut";
    const disappearDir = disappear.style ?? "inToOut";
    const entryDur = appear.ease?.duration ?? 0.5;
    const holdDur = appear.ease?.delay ?? 0;
    const zoopDur = disappear.ease?.duration ?? 0.67;
    const entryEase = framerEaseToGsap(appear.ease?.ease ?? "easeOut");
    const exitEase = framerEaseToGsap(disappear.ease?.ease ?? "easeIn");
    const fadeDur = zoopDur * ((disappear.fadeOut ?? 100) / 100);
    const exitSign = disappearDir === "inToOut" ? 1 : -1;

    let zoneIdx = 0;
    let zIndex = 1;
    let recent: string[] = [];
    const timelines = new Set<ReturnType<typeof gsap.timeline>>();

    /**
     * The container's own box, cached in page space. `requireFullyVisible`
     * needs it once per tile per frame, and re-measuring it there is what makes
     * the original's safety check expensive.
     */
    let box: KeepOutRect = { left: 0, top: 0, right: 0, bottom: 0 };
    const measureBox = () => {
      const rect = container.getBoundingClientRect();
      box = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
      };
    };
    measureBox();

    const clearTiles = () => {
      container.querySelectorAll("[data-tile]").forEach((el) => el.remove());
    };

    let paused = false;
    let hidden = false;
    let offscreen = false;
    const syncPaused = () => {
      const next = hidden || offscreen;
      if (next === paused) return;
      paused = next;
      if (paused) clearTiles();
    };

    const handleVisibility = () => {
      hidden = document.hidden;
      // A hidden tab freezes the timelines outright; off-screen only stops new
      // spawns, so scrolling past never leaves a half-played tile frozen mid-air.
      timelines.forEach((tl) => (hidden ? tl.pause() : tl.resume()));
      syncPaused();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const intersection = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      syncPaused();
    });
    intersection.observe(container);

    const resize = new ResizeObserver(measureBox);
    resize.observe(container);

    const nextImage = () => {
      let available = pool.filter((src) => !recent.includes(src));
      if (available.length === 0) {
        recent = [];
        available = pool;
      }
      const selected = pick(available);
      recent.push(selected);
      if (recent.length > Math.max(3, pool.length - 1)) recent.shift();
      return selected;
    };

    const spawnTile = () => {
      if (paused) return;

      const imgSrc = nextImage();
      const zone = ZONES[zoneIdx++ % ZONES.length];
      const shape = pick(shapes);
      const containerW = container.offsetWidth || 800;
      const containerH = container.offsetHeight || 600;

      // Slider 1 → 0.125x, slider 20 → 5x, then capped so no tile is born
      // larger than the box that has to hold it.
      const userScale = 0.125 + ((imageScale - 1) / 19) * 4.875;
      const effectiveScale = Math.min(
        userScale,
        containerW / shape.w,
        containerH / shape.h,
      );
      const tileW = Math.round(shape.w * effectiveScale);
      const tileH = Math.round(shape.h * effectiveScale);

      const s0 = rand(0.1, 0.4);
      const s2 = rand(0.7, 1.1);
      const s3 = rand(3.0, 4.5);

      const centerX = containerW / 2;
      const centerY = containerH / 2;

      let spawnX: number;
      let spawnY: number;
      let angle: number;

      if (spawn === "zone" && !isSpiral) {
        spawnX =
          (zone.cx / 100) * containerW + rand(-0.025, 0.025) * containerW;
        spawnY = (zone.cy / 100) * containerH + rand(-0.03, 0.03) * containerH;
        // Clamp against the *settled* size (`s2`), not the drawn size: the tile
        // is still growing when it reaches this position, so clamping the
        // birth box would let a fully-grown tile hang over the edge.
        const halfW = (tileW * s2) / 2;
        const halfH = (tileH * s2) / 2;
        spawnX = Math.max(halfW, Math.min(containerW - halfW, spawnX));
        spawnY = Math.max(halfH, Math.min(containerH - halfH, spawnY));
        angle =
          Math.atan2(spawnY - centerY, spawnX - centerX) + rand(-0.12, 0.12);
      } else {
        angle =
          Math.atan2(zone.cy - 50, zone.cx - 50) +
          rand(-0.25, 0.25) +
          rand(-0.3, 0.3);
        // Spiral mode bases every tile at the centre; blankArea drives the path.
        const radius = isSpiral
          ? 0
          : (blankArea / 100) * Math.hypot(containerW / 2, containerH / 2);
        spawnX = centerX + Math.cos(angle) * radius;
        spawnY = centerY + Math.sin(angle) * radius;
      }

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const el = document.createElement("div");
      el.dataset.tile = "1";
      Object.assign(el.style, {
        position: "absolute",
        width: `${tileW}px`,
        height: `${tileH}px`,
        left: `${spawnX}px`,
        top: `${spawnY}px`,
        transformOrigin: "center center",
        borderRadius: tile.borderRadius ?? "0",
        border: tile.border ?? "none",
        overflow: "hidden",
        boxShadow: tile.boxShadow ?? "none",
        zIndex: String(zIndex++),
        pointerEvents: "none",
        willChange: "transform, opacity",
        translate: "-50% -50%",
        background: tile.background ?? background,
        opacity: "0",
        // Start hidden when a keep-out is in play: the first check runs on the
        // timeline's first frame, and without this a tile born over the
        // headline paints there for one frame before it is taken away.
        visibility: keepOut ? "hidden" : "visible",
      });

      const imgEl = document.createElement("img");
      imgEl.alt = "";
      imgEl.loading = "eager";
      imgEl.decoding = "async";
      imgEl.referrerPolicy = "no-referrer";
      Object.assign(imgEl.style, {
        width: "100%",
        height: "100%",
        objectFit: fit,
        display: "block",
      });

      el.appendChild(imgEl);
      container.appendChild(el);

      const applyKeepOut = () => {
        if (!keepOut || !el.isConnected) return;
        const rect = el.getBoundingClientRect();
        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;
        const right = rect.right + window.scrollX;
        const bottom = rect.bottom + window.scrollY;

        const blocked = keepOut().some(
          (area) =>
            right > area.left - keepOutPadding &&
            left < area.right + keepOutPadding &&
            bottom > area.top - keepOutPadding &&
            top < area.bottom + keepOutPadding,
        );
        // The 1px inset keeps a tile that lands exactly on the edge from
        // flickering between states as sub-pixel rounding moves it.
        const clipped =
          requireFullyVisible &&
          (left < box.left + 1 ||
            right > box.right - 1 ||
            top < box.top + 1 ||
            bottom > box.bottom - 1);

        el.style.visibility = blocked || clipped ? "hidden" : "visible";
      };

      const startAnimation = () => {
        if (paused) {
          el.remove();
          return;
        }

        const onDone = () => {
          el.remove();
          timelines.delete(tl);
        };

        const tl = gsap.timeline({
          onComplete: onDone,
          onUpdate: applyKeepOut,
        });
        timelines.add(tl);

        if (isSpiral) {
          const path = pick(SPIRAL_PATHS);
          const radius = Math.hypot(containerW / 2, containerH / 2) * 1.1;
          const spinDir =
            direction === "clockwise"
              ? 1
              : direction === "anticlockwise"
                ? -1
                : path.spinDir;
          // Appear owns the first half of the path, disappear the second; the
          // tile rests at the blankArea radius in between.
          const startR = appearDir === "inToOut" ? 0 : radius;
          const endR = disappearDir === "inToOut" ? radius : 0;
          const midR = radius * (blankArea / 100);
          const mid = pick([0.45, 0.5, 0.55]);

          const pathPos = (u: number): readonly [number, number] => {
            const r =
              u <= mid
                ? startR + (midR - startR) * (u / mid)
                : midR + (endR - midR) * ((u - mid) / (1 - mid));
            const a = path.startAngle + spinDir * u * path.turns * Math.PI * 2;
            return [Math.cos(a) * r, Math.sin(a) * r];
          };
          const scaleAt = (u: number) =>
            appearDir === "inToOut" ? s2 * u : s2 * (1 - u);

          const [startX, startY] = pathPos(0);
          tl.set(el, {
            scale: scaleAt(0),
            opacity: 0,
            x: startX,
            y: startY,
            rotation: 0,
          });

          // One continuous tween across appear + drift + disappear. Position
          // runs fast-slow-fast so the tile decelerates into its rest point and
          // accelerates back out; opacity ramps over each phase's own real time.
          const totalDur = entryDur + holdDur + zoopDur;
          const driftEnd = entryDur + holdDur;
          const clock = { t: 0 };
          tl.to(clock, {
            t: 1,
            duration: totalDur,
            ease: "none",
            onUpdate: () => {
              const realT = clock.t * totalDur;
              const u = Math.max(
                0,
                Math.min(1, clock.t + Math.sin(clock.t * Math.PI * 2) * 0.12),
              );
              let opacity: number;
              if (realT < entryDur) {
                opacity = entryDur > 0 ? realT / entryDur : 1;
              } else if (realT < driftEnd) {
                opacity = 1;
              } else {
                opacity =
                  fadeDur > 0
                    ? Math.max(0, 1 - (realT - driftEnd) / fadeDur)
                    : 0;
              }
              const [x, y] = pathPos(u);
              gsap.set(el, { x, y, opacity, scale: scaleAt(u) });
            },
          });
          return;
        }

        const entryD = rand(entryDistance[0], entryDistance[1]);
        const exitD = rand(160, 260);
        const exitScale = disappearDir === "inToOut" ? s3 : 0.08;
        // Drift point: 15% of the way along the exit vector.
        const driftF = 0.15;

        if (appearDir === "inToOut") {
          const x1 = cosA * entryD;
          const y1 = sinA * entryD;
          const x2 = x1 + exitSign * cosA * exitD;
          const y2 = y1 + exitSign * sinA * exitD;

          tl.set(el, {
            scale: s0,
            opacity: fadeIn ? 0 : 1,
            x: 0,
            y: 0,
            rotation: 0,
          }).to(el, {
            scale: s2,
            opacity: 1,
            x: x1,
            y: y1,
            duration: entryDur,
            ease: entryEase,
          });

          if (holdDur > 0) {
            tl.to(el, {
              scale: s2 + (exitScale - s2) * driftF,
              x: x1 + (x2 - x1) * driftF,
              y: y1 + (y2 - y1) * driftF,
              duration: holdDur,
              ease: "none",
            });
          }
          tl.to(el, {
            scale: exitScale,
            x: x2,
            y: y2,
            duration: zoopDur,
            ease: exitEase,
          }).to(el, { opacity: 0, duration: fadeDur, ease: exitEase }, "<");
          return;
        }

        const exitX = exitSign * cosA * exitD;
        const exitY = exitSign * sinA * exitD;

        tl.set(el, {
          scale: s3,
          opacity: 0,
          x: cosA * entryD * 2.5,
          y: sinA * entryD * 2.5,
          rotation: 0,
        }).to(el, {
          scale: s2,
          opacity: 1,
          x: 0,
          y: 0,
          duration: entryDur,
          ease: entryEase,
        });

        if (holdDur > 0) {
          tl.to(el, {
            scale: s2 + (exitScale - s2) * driftF,
            x: exitX * driftF,
            y: exitY * driftF,
            duration: holdDur,
            ease: "none",
          });
        }
        tl.to(el, {
          scale: exitScale,
          x: exitX,
          y: exitY,
          duration: zoopDur,
          ease: exitEase,
        }).to(el, { opacity: 0, duration: fadeDur, ease: exitEase }, "<");
      };

      imgEl.onerror = () => el.remove();
      imgEl.src = imgSrc;
      if (typeof imgEl.decode === "function") {
        imgEl.decode().then(startAnimation, () => el.remove());
      } else if (imgEl.complete && imgEl.naturalWidth > 0) {
        startAnimation();
      } else {
        imgEl.onload = startAnimation;
      }
    };

    let lastSpawn = 0;
    let batchCount = 0;
    let nextBatchAt = 0;
    const lifetimeMs = (entryDur + holdDur + zoopDur) * 1000;

    const timer = setInterval(() => {
      if (paused) return;
      const target = Math.max(1, Math.round(crowdDensity));
      const delaySec = Math.max(0, crowdDelay);
      const now = performance.now();

      // Continuous flow: one spawn per lifetime/target, so `target` tiles are
      // alive at any moment rather than `target` being a spawn rate.
      if (delaySec === 0) {
        if (now - lastSpawn >= Math.max(20, lifetimeMs / target)) {
          spawnTile();
          lastSpawn = now;
        }
        return;
      }

      // Batched flow: spawn `target` tiles, wait `delaySec`, repeat.
      if (now < nextBatchAt) return;
      if (batchCount < target && now - lastSpawn >= 50) {
        spawnTile();
        batchCount++;
        lastSpawn = now;
        if (batchCount >= target) {
          nextBatchAt = now + delaySec * 1000;
          batchCount = 0;
        }
      }
    }, 20);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      intersection.disconnect();
      resize.disconnect();
      timelines.forEach((tl) => tl.kill());
      timelines.clear();
      clearTiles();
    };
  }, [
    images,
    background,
    imageScale,
    blankArea,
    crowdDensity,
    crowdDelay,
    type,
    direction,
    appear,
    disappear,
    spawn,
    shapes,
    entryDistance,
    fit,
    fadeIn,
    tile,
    keepOut,
    keepOutPadding,
    requireFullyVisible,
    pausedByCaller,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ background }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]"
      />
    </div>
  );
}
