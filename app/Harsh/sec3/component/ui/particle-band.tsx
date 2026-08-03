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
    // hover "roam" would idle the particles as a random cloud and only
    // assemble the image on hover — the design shows it assembled at rest
    hoverEnabled={false}
    repulsionEnabled
    repulsionConfig={{
      repulsionMode: "outside",
      repulsionForce: 10,
      repulsionRadius: 60,
    }}
    style={{ width: "100%", height: "100%" }}
  />
);
