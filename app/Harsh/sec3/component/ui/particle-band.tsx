"use client";

import { useEffect, useState } from "react";

import ParticleImage from "./svgparticle";

/** Hover assembly and cursor repulsion are a pointer affordance. Touch has no
 *  hover to give, so on a phone or tablet the field would idle scattered and
 *  never resolve. Below 1024 — and on any width without a real pointer, which
 *  is what keeps a tap from standing in for a hover — the interaction is off
 *  and the skyline renders assembled and static. */
const INTERACTIVE = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

/** The dotted skyline: buildings.svg rasterised into particles that scatter
 *  away from the cursor. */
export const ParticleBand = () => {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(INTERACTIVE);
    const sync = () => setInteractive(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ParticleImage
      imageConfig={{
        // buildings.svg tiled three times across the band; the sheet is
        // bottom-aligned and padded to the band aspect so nothing stretches
        image: "/Harsh/sec3/buildings-tiled.png",
        mode: "stretch",
        sizeUnit: "%",
        widthPct: 100,
        heightPct: 100,
        scale: 10,
      }}
      backgroundColor="#0b0b0c"
      particleShape="circle"
      particleColor="single"
      singleColor="#c8c8cc"
      // particleCount sets the sampling step (150 / count): 25 -> every 6px
      particleCount={25}
      // the rasteriser draws each dot at ceil(size / 4) device px, so a value of
      // 5 was a 2px block; 20 gives a 5px dot that actually reads as a circle
      particleSize={20}
      // at rest each dot drifts within roamRadius px of where it sits in the
      // skyline, so the band reads as a loosened version of the artwork rather
      // than a cloud; it snaps back into the image while the cursor is over the
      // black part of the hero (the white nav / trust bar are excluded)
      hoverEnabled={interactive}
      hoverTargetSelector="[data-hero]"
      hoverExcludeSelector="[data-hero-exclude]"
      hoverConfig={{
        hoverType: "roam",
        transition: { duration: 1.1, ease: "easeInOut" },
        roamRadius: 18,
        roamShape: "rectangle",
        roamOpacity: 0.55,
      }}
      repulsionEnabled={interactive}
      // section-24's values exactly. "random" nudges each dot in its own
      // direction by its own amount, so the field deforms; "outside" pushed
      // every dot in the radius out to the rim, which is what stamped a clean
      // circular hole under the cursor.
      repulsionConfig={{
        repulsionMode: "random",
        repulsionForce: 10,
        repulsionRadius: 60,
      }}
      // with the interaction off there is nothing to hover, click or drag, so
      // the canvas stops swallowing taps and scroll gestures
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? undefined : "none",
      }}
    />
  );
};
