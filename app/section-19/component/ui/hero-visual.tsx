"use client";

/**
 * Figma `element` (2146:692) — full composite export.
 * Artboard is 670×945 at 1:1; on the phone frame the element sits at y≈-376
 * so the orb lands under the nav. Layer PNGs in /section-19/hero/ are kept
 * for later OriginKit swaps (circle-1, electric-line, thunder-bloom, etc.).
 */
const ARTBOARD_W = 670;
/** Export is 1340×1997 @2x → 670×998.5 at 1x (bleed beyond 945 frame). */
const EXPORT_H = 1997 / 2;
const EXPORT_TOP_BLEED = (EXPORT_H - 945) / 2;
/** Figma element.y (−376) − nav (65) − top export bleed. */
const ARTBOARD_TOP = -376 - 65 - EXPORT_TOP_BLEED;

/**
 * Hero visual: thunder + glow + orb + pixels as one Figma-accurate image.
 */
export const HeroVisual = () => {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 w-full overflow-visible"
      style={{ height: 420 }}
    >
      <img
        src="/section-19/hero/element-ref.png"
        alt=""
        width={ARTBOARD_W}
        height={EXPORT_H}
        className="pointer-events-none absolute left-1/2 max-w-none -translate-x-[5%]"
        style={{
          width: ARTBOARD_W,
          height: EXPORT_H,
          top: ARTBOARD_TOP,
        }}
      />
    </div>
  );
};
