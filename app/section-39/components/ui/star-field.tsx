"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import StarBurst from "../originkit/starburst";
import { NAV_BOTTOM, RAIL_INSET } from "./stage";

/**
 * Drifting light streaks (Figma "Star 22" 2428:7757 / 7706 / 7701).
 *
 * Figma bakes this as a 9.4MB PNG, so it is rebuilt with the live component.
 *
 * The burst originates at the top-right corner of the content area — where the
 * right rail's inner edge meets the nav rule — and fans down and left across the
 * section. `centerX`/`centerY` are percentages of this host and the component
 * clamps them to 0-100, so rather than compute a centre, the host *is* the
 * content area: rails on either side, nav rule on top, stage bottom below. Its
 * top-right corner is then the origin, which is what 100/0 means, and the box
 * needs no numbers of its own. Spoke length is the host's diagonal, so the rays
 * die exactly as they reach the far corner at any viewport size.
 *
 * Taking Figma's rotation off the burst costs nothing — the spokes are radially
 * symmetric with seeded random phases.
 *
 * Blending is `plus-lighter` as in Figma, which also makes the component's
 * opaque black background a no-op instead of something to work around.
 *
 * Figma's burst is two things at once and only one of them is streaks: under the
 * spokes there is a smooth wash that thousands of overlapping rays average into,
 * which no reasonable spoke count reproduces. That is split out into the radial
 * gradient below, leaving the component doing the part it is good at. The wash
 * stays under reduced motion; only the moving pulses drop.
 */
const HOST = `pointer-events-none absolute bottom-0 z-[1] mix-blend-plus-lighter ${RAIL_INSET} ${NAV_BOTTOM}`;

/**
 * The broad falloff around the origin. `farthest-corner at 100% 0%` pins it to
 * the same corner as the burst and lets it scale with the content area instead
 * of carrying a per-breakpoint radius.
 */
const AMBIENCE =
  "radial-gradient(circle farthest-corner at 100% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0.01) 70%, rgba(255,255,255,0) 100%)";

export const StarField = () => {
  const reduceMotion = useReducedMotion();
  /*
   * The burst mounts after hydration, never during it. `useReducedMotion` reads
   * the media query on the client's first render but has nothing to read on the
   * server, so gating the component on it directly makes the two renders
   * disagree and React throws away the tree. Waiting a tick costs nothing here —
   * the canvas measures itself on mount either way.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div aria-hidden className={HOST}>
      {mounted && !reduceMotion && (
        <StarBurst
          speed={10}
          starCount={66}
          color="#FFFFFF"
          centerX={100}
          centerY={0}
          starSize={2}
          opacity={50}
          /*
           * The bloom sits on the origin, which is now on screen, so it reads as
           * the point the rays are thrown from rather than something bleeding in
           * off the corner. The component sizes it off the shorter side of the
           * content area.
           */
          flowerIntensity={10}
          twinkleSpeed={4}
        />
      )}

      <div
        className="absolute inset-0 mix-blend-plus-lighter"
        style={{ backgroundImage: AMBIENCE }}
      />
    </div>
  );
};
