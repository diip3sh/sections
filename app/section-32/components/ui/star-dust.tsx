"use client";

import { useReducedMotion } from "motion/react";

import Sparkles from "../originkit/star-dust";

/**
 * The sparkle field around the orb — Figma `Group 2147241511`
 * (mobile 2371:1758, iPad 2371:2509, desktop 2371:3276).
 *
 * Figma holds it as 672 individually placed vectors, each about 1 to 2px, in a
 * box that starts at the top of the frame and stops just below the orb. That is
 * a still of a drifting field, not a drawing — so it runs live off OriginKit's
 * Stardust, which wraps its particles at the edges: with `angle` at 180 they
 * fall continuously from the top of the box and reappear there, which is the
 * motion the frame is a frozen moment of.
 *
 * The box is Figma's own — 471 x 444 stacked, 972 x 466 on desktop — centred on
 * the orb, which is what puts its top edge at the top of the screen and its
 * bottom 80px under the orb at every frame.
 *
 * Density and falloff come off the desktop render, measured against distance
 * from the orb centre: about 30 specks per 10,000px in the ring just outside
 * the rim, a third of that one ring further out, and nothing past roughly
 * 300px. Stardust seeds evenly, so the falloff is the mask below rather than a
 * prop — and because the orb is 280px at every frame, that mask needs no
 * per-breakpoint tuning.
 */

/** Opaque to ~170px out, half gone by ~245, nothing past 420. */
const DUST_MASK =
  "radial-gradient(circle 420px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%," +
  " rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.18) 76%, transparent 100%)";

/** Figma's dots measure 0.9 to 1.8px across, i.e. these radii. */
const MIN_SIZE = 0.45;
const MAX_SIZE = 0.9;

export const StarDust = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 h-[444px] w-[471px] -translate-x-1/2 -translate-y-1/2 desktop-sm:h-[466px] desktop-sm:w-[972px] ${className}`}
      style={{ maskImage: DUST_MASK, WebkitMaskImage: DUST_MASK }}
    >
      <Sparkles
        background="rgba(0,0,0,0)"
        particleColor="#ffffff"
        particleDensity={3}
        minSize={MIN_SIZE}
        maxSize={MAX_SIZE}
        angle={180}
        movement={reduceMotion ? 0 : 2}
        particleSpeed={reduceMotion ? 0 : 1}
        speed={reduceMotion ? 1 : 3}
      />
    </div>
  );
};
