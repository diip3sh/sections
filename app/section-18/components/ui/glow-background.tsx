"use client";

import type { CSSProperties } from "react";

/**
 * Base atmosphere — behind portrait (z-0).
 * Opaque RGB gradient; section supplies bg-black.
 */
export const GlowBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <img
        src="/section-18/bg/gradient.png"
        alt=""
        width={1440}
        height={840}
        className="absolute inset-0 size-full object-cover object-[center_top]"
      />
    </div>
  );
};

/**
 * Soft elliptical window over the goggles / face:
 * transparent center → liquid shows; opaque edges → gradient-2 covers.
 * Origin sits slightly above mid so it lines up with the bust.
 */
const CENTER_CUTOUT: CSSProperties = {
  maskImage:
    "radial-gradient(ellipse 42% 48% at 50% 72%, transparent 0%, transparent 32%, #000 68%, #000 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 42% 48% at 50% 72%, transparent 0%, transparent 32%, #000 68%, #000 100%)",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskMode: "alpha",
};

/**
 * Gradient-2 overlay (z-10) — above liquid (z-5).
 * Center cutout reveals the animated bust; amber wash covers the rest.
 */
export const GradientOverlay = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      style={CENTER_CUTOUT}
      aria-hidden="true"
    >
      <img
        src="/section-18/bg/gradient-2.png"
        alt=""
        width={1440}
        height={840}
        className="absolute inset-0 size-full object-cover object-[center_top] brightness-100 saturate-100 contrast-700"
      />
      <img
        src="/section-18/bg/gradient-2.png"
        alt=""
        width={1440}
        height={840}
        className="absolute inset-0 size-full object-cover object-[center_top] mix-blend-screen brightness-150 saturate-175"
      />
    </div>
  );
};
