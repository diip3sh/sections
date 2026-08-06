"use client";

import { useReducedMotion } from "motion/react";

import Orb from "../originkit/cosmic-orb";

/**
 * The nebula inside the orb ring — Figma `image 3083588`, live rather than
 * photographic.
 *
 * Figma ships it as a 628 x 541 PNG, which is a still of exactly this: a galaxy
 * banded across a sphere, turning. Sampling that PNG gives a near-black `#060b05`
 * void under greens running `#314f20` → `#4e692a` → `#68914a` → `#889554`, which
 * is the palette Cosmic Orb already carries baked into its default export, so the
 * only props here are the two the swap actually needs.
 *
 * The component paints an opaque disc, so it also retires the `mix-blend-screen`
 * the PNG needed to drop its black background — a blend that never worked in
 * place anyway, because the halo below it carries a filter and a blend of its own
 * and the browser hands the screen no backdrop to composite against.
 *
 * `speed` and `spin` are the reduced-motion path, and they are enough on their
 * own: `speed` scales the clock the whole shader reads, so at 0 the time uniform
 * never leaves zero and the field freezes rather than merely slowing. That keeps
 * this a props-only integration — the same shape `star-dust.tsx` uses next door.
 */

/**
 * The sphere does not fill the disc, and the gap is the design.
 *
 * Figma's PNG is 628px wide with the sphere occupying a 432px circle inside it,
 * and `orb.tsx` draws that PNG at 125.6% of the disc — so the sphere covers
 * 432/628 x 1.256 = 86.4% of the disc, and the `#252525` ring shows as a band
 * around it. Screening the PNG never touched that band, because the PNG is pure
 * black outside the sphere and screen leaves the backdrop alone there. Sizing the
 * canvas to the disc instead of the sphere paints straight over it.
 *
 * So the size is stated once, here, and the ring is whatever is left: the box
 * below centres a sphere-sized orb in a disc-sized span. Rounded because it is
 * canvas geometry, not a layout value.
 */
const DISC_PX = 280 * (1 - 2 * 0.1493);
const SPHERE_PX = Math.round(DISC_PX * ((432 / 628) * 1.256));

export const CosmicOrb = () => {
  const reduceMotion = useReducedMotion();

  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <Orb
        size={SPHERE_PX}
        speed={reduceMotion ? 0 : 50}
        spin={reduceMotion ? 0 : 50}
      />
    </span>
  );
};
