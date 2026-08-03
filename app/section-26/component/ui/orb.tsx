import ParticleSphere from "../originkit/particle-sphere";
import { MaskGroup } from "./mask-group";

/**
 * Dotted orb resting above the hand — Figma "Group 2147241484" (2282:6148),
 * iPad 2280:5842.
 *
 * The group is placed against the frame (mobile 61.33, 499 — 228.39 x 269.82;
 * iPad 185.49, 607 — 324.3 x 383.12), but everything *inside* it is centred
 * with layout rather than coordinates: the sphere box is centred horizontally
 * with flex, and the glow, disc and sphere share one grid cell with
 * `place-items-center`, so they stay concentric at any size.
 *
 * Layers, bottom to top:
 *   z-0  MaskGroup — halo + wash, unmasked, bleeding out around the sphere
 *   z-20 dark disc, between the glow and the sphere
 *   z-30 the particle sphere
 */

/** Projected diameter of the particle sphere, in px. */
const SPHERE_DIAMETER = 190;
/** iPad scales the whole group by 1.42 (324.3 / 228.39). */
const TABLET_SCALE = 1.42;
const SPHERE_DIAMETER_TABLET = SPHERE_DIAMETER * TABLET_SCALE;
/**
 * Desktop — the sphere box is 396 x 362, and the engine projects the sphere at
 * 2.5 / 6.994 of the canvas height (box x 2.5): 0.3574 * 905 = 323px, matched
 * to the same 1.078 visual bump the mobile value carries.
 */
const DESKTOP_SCALE = 275 / SPHERE_DIAMETER;
const SPHERE_DIAMETER_DESKTOP = SPHERE_DIAMETER * DESKTOP_SCALE;

export const Orb = () => (
  <div
    aria-hidden
    className="absolute top-[499px] left-1/2 flex h-[269.816px] w-[228.39px] -translate-x-1/2 justify-center ipad:top-151.75 ipad:h-[383.119px] ipad:w-[324.3px] desktop-sm:top-[178px] desktop-sm:h-[311px] desktop-sm:w-[340px] desktop-sm:translate-y-10"
  >
    {/* Sphere box — every layer below sits in the same grid cell, centred */}
    <div className="relative grid h-[197.32px] w-[215.853px] shrink-0 place-items-center ipad:h-[280.18px] ipad:w-[306.495px] desktop-sm:h-[311px] desktop-sm:w-[340px]">
      {/* Glow behind the sphere — MaskGroup anchors to a zero-size point */}
      <div className="relative z-0 col-start-1 row-start-1 size-0 blur-md ipad:hidden">
        <MaskGroup size={SPHERE_DIAMETER} />
      </div>
      <div className="relative z-0 col-start-1 row-start-1 hidden size-0 blur-md ipad:block desktop-sm:hidden">
        <MaskGroup size={SPHERE_DIAMETER_TABLET} />
      </div>
      <div className="relative z-0 col-start-1 row-start-1 hidden size-0 -translate-y-8 blur-md desktop-sm:block">
        <MaskGroup size={SPHERE_DIAMETER_DESKTOP} />
      </div>

      {/* Dark disc between the glow and the sphere */}
      <div className="absolute top-1/2 left-1/2 z-20 size-47.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 ipad:size-67.5 desktop-sm:size-[310px]" />

      {/* Live particle sphere, in place of Figma's flat "image 3083449" */}
      <div className="pointer-events-auto z-30 col-start-1 row-start-1 size-full">
        <ParticleSphere
          particlesCount={10000}
          particleScale={7}
          rotationDirection="clockwise"
          speed={20}
          scale={10}
          drag
          smoothing={7}
          dragSpeed={5}
          stopOnHover={false}
          cursorOn
          cursorRadiusUI={75}
          cursorStrengthUI={10}
          clickForce={5}
          sphereColor="#FF3B00"
        />
      </div>
    </div>
  </div>
);
