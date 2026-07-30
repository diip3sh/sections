"use client";

import PixelCard from "../originkit/pixel-card";

const PIXEL_PROPS = {
  colors: ["#ffffff", "#FFFFFFCC", "#FFFFFF99", "#5AF5A3"],
  appearFrom: "top" as const,
  trigger: "enter" as const,
  position: "middle" as const,
  replay: false,
  gap: 8,
  pixelSize: 3,
  speed: 70,
  backgroundColor: "transparent",
  padding: 0,
  borderWidth: 0,
  borderColor: "transparent",
  radius: 0,
  showLabel: false,
  transition: { type: "tween" as const, duration: 1.2, ease: "easeOut" },
  style: {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
  },
};

/**
 * Twin pixel fields at left + right edges — 169px center gap.
 * Uses Tailwind `mask-radial-closest-corner` (origin must be inset —
 * at a corner the radius collapses to 0 and nothing renders).
 */
export const PixelBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex h-[42%] gap-[169px] overflow-hidden"
      aria-hidden="true"
    >
      <div className="h-full min-w-0 flex-1 mask-radial-farthest-side mask-radial-from-50% mask-radial-at-[35%_40%] motion-reduce:blur-none">
        <PixelCard {...PIXEL_PROPS} />
      </div>
      <div className="h-full min-w-0 flex-1 mask-radial-farthest-side mask-radial-from-10% mask-radial-at-[85%_40%] motion-reduce:blur-none">
        <PixelCard {...PIXEL_PROPS} />
      </div>
    </div>
  );
};
