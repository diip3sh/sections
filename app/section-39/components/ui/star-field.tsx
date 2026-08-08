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
 * The origin belongs on the corner precisely because nothing is drawn there —
 * see `flowerIntensity`. With no bloom there is no source to keep on screen, so
 * the streaks read as arriving from off-frame, which is what the design shows.
 *
 * Taking Figma's rotation off the burst costs nothing — the spokes are radially
 * symmetric with seeded random phases.
 *
 * Blending is `plus-lighter` as in Figma, which also makes the component's
 * opaque black background a no-op instead of something to work around.
 *
 * No ambience wash under the spokes. An earlier radial falloff at the origin
 * read as a soft white glow in the top-right corner that the frames do not
 * carry — the burst is streaks alone.
 */
const HOST = `pointer-events-none absolute bottom-0 z-[1] mix-blend-plus-lighter ${RAIL_INSET} ${NAV_BOTTOM}`;

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
           * No bloom. The component throws a radial flare at the origin by
           * default, and Figma has none — its burst is streaks and nothing else,
           * with no lit source for them to come out of. Anything above 0 puts a
           * glow at the corner that the design does not have, and moving it off
           * the corner to stop it being clipped only walks it onto the copy,
           * since the phone and tablet centre their column.
           */
          flowerIntensity={0}
          twinkleSpeed={4}
        />
      )}
    </div>
  );
};
