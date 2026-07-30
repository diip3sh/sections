"use client";

import BackgroundBoxes from "../originkit/prism-grid";

/**
 * Perspective prism grid for the lower hero.
 * Oversized width on mobile/tablet hides left/right plane edges.
 */
export const PrismStage = () => {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[1] h-[60%] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-90 [mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)]">
        {/* Wider than viewport below desktop so L/R edges stay off-screen */}
        <div className="absolute inset-y-0 left-1/2 w-[240%] -translate-x-1/2 ipad:w-[200%] desktop-sm:inset-0 desktop-sm:w-full desktop-sm:translate-x-0">
          <BackgroundBoxes
            backgroundColor="transparent"
            boxSize={80}
            borderWidth={1}
            borderColor="rgba(90,245,163,0.18)"
            rotate={{ x: 0, y: 50 }}
            planeTop={62}
            colors={{
              paletteCount: 6,
              color1: "#6d7d73",
              color2: "#2e4c27",
              color3: "#336e49",
              color4: "#3fac62",
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};
