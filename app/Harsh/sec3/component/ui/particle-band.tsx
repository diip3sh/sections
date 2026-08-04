"use client";

import ParticleImage from "./svgparticle";

/** The dotted skyline: buildings.svg rasterised into particles that scatter
 *  away from the cursor. */
export const ParticleBand = () => (
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
    hoverEnabled
    hoverTargetSelector="[data-hero]"
    hoverExcludeSelector="[data-hero-exclude]"
    hoverConfig={{
      hoverType: "roam",
      transition: { duration: 1.1, ease: "easeInOut" },
      roamRadius: 18,
      roamShape: "rectangle",
      roamOpacity: 0.55,
    }}
    repulsionEnabled
    repulsionConfig={{
      repulsionMode: "outside",
      repulsionForce: 10,
      repulsionRadius: 60,
    }}
    style={{ width: "100%", height: "100%" }}
  />
);
