"use client";

import { useEffect, useState } from "react";

/**
 * Hero visual layers (Figma element 2146:692 / desktop 1:1670).
 * Layer order: thunder-mask (z-0) → ThunderStrike (z-5) → circle/mask (z-10).
 */

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_MIN = 1280;

type Breakpoint = "mobile" | "ipad" | "desktop";

const CIRCLE_SIZE = {
  mobile: 317,
  ipad: 542,
  desktop: 550,
} as const;

const MASK_SIZE = {
  mobile: 400,
  ipad: 700,
  desktop: 700,
} as const;

/** Native asset aspect 299×637 — height is derived from width. */
const THUNDER_ASPECT = 637 / 299;
const THUNDER_MASK_W = {
  mobile: 292,
  ipad: 336,
  desktop: 319,
} as const;

const THUNDER_MASK_H = {
  mobile: Math.round(THUNDER_MASK_W.mobile * THUNDER_ASPECT),
  ipad: Math.round(THUNDER_MASK_W.ipad * THUNDER_ASPECT),
  desktop: Math.round(THUNDER_MASK_W.desktop * THUNDER_ASPECT),
} as const;

/** How far the beam dips into the circle so they visually join. */
const THUNDER_OVERLAP = {
  mobile: 96,
  ipad: 164,
  desktop: 167,
} as const;

/**
 * Vertical shift of the visual within its stage.
 * Positive moves it down; negative pulls it up (may paint over the navbar).
 */
const HERO_VISUAL_OFFSET_Y = {
  mobile: -500,
  ipad: -500,
  desktop: -340,
} as const;

/** Minimum gap between the visual stage bottom and HeroContent (stacked layouts). */
export const HERO_CONTENT_GAP = 24;

/** Mobile defaults — prefer `useHeroVisualLayout` for live sizes. */
export const HERO_VISUAL_HEIGHT =
  THUNDER_MASK_H.mobile - THUNDER_OVERLAP.mobile + CIRCLE_SIZE.mobile;
export const HERO_VISUAL_STAGE_HEIGHT = Math.max(
  0,
  HERO_VISUAL_HEIGHT + HERO_VISUAL_OFFSET_Y.mobile,
);

type HeroVisualLayout = {
  breakpoint: Breakpoint;
  circleSize: number;
  maskSize: number;
  thunderMaskW: number;
  thunderMaskH: number;
  circleTop: number;
  offsetY: number;
  visualHeight: number;
  /** In-flow stage height; 0 on desktop where the visual is absolutely positioned. */
  stageHeight: number;
};

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= DESKTOP_MIN) return "desktop";
  if (width >= IPAD_MIN) return "ipad";
  return "mobile";
};

const getLayout = (breakpoint: Breakpoint): HeroVisualLayout => {
  const circleSize = CIRCLE_SIZE[breakpoint];
  const maskSize = MASK_SIZE[breakpoint];
  const thunderMaskW = THUNDER_MASK_W[breakpoint];
  const thunderMaskH = THUNDER_MASK_H[breakpoint];
  const circleTop = thunderMaskH - THUNDER_OVERLAP[breakpoint];
  const offsetY = HERO_VISUAL_OFFSET_Y[breakpoint];
  const visualHeight = circleTop + circleSize;
  const isDesktop = breakpoint === "desktop";

  return {
    breakpoint,
    circleSize,
    maskSize,
    thunderMaskW,
    thunderMaskH,
    circleTop,
    offsetY,
    visualHeight,
    stageHeight: isDesktop ? 0 : Math.max(0, visualHeight + offsetY),
  };
};

/** Responsive thunder/circle/mask sizes + stage metrics. */
export const useHeroVisualLayout = (): HeroVisualLayout => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const update = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return getLayout(breakpoint);
};

type HeroVisualProps = {
  circleSize: number;
  maskSize: number;
  thunderMaskW: number;
  thunderMaskH: number;
  circleTop: number;
};

export const HeroVisual = ({
  circleSize,
  maskSize,
  thunderMaskW,
  thunderMaskH,
  circleTop,
}: HeroVisualProps) => {
  return (
    <div aria-hidden="true" className="relative size-full overflow-visible">
      {/* Soft thunder glow — lowest */}
      <div
        className="absolute top-0 left-1/2 z-0 -translate-x-1/2 overflow-visible ipad:-translate-y-[9%] desktop-sm:translate-y-[-11%]"
        style={{ width: thunderMaskW, height: thunderMaskH }}
      >
        <img
          src="/section-19/thunder-mask.png"
          alt=""
          width={thunderMaskW}
          height={thunderMaskH}
          className="block ipad:hidden pointer-events-none absolute inset-0 size-full max-w-none object-contain mix-blend-screen"
        />
        <img
          src="/section-19/ipad-mask.png"
          alt=""
          width={thunderMaskW}
          height={thunderMaskH}
          className="hidden ipad:block pointer-events-none absolute inset-0 size-full max-w-none object-contain mix-blend-screen"
        />
      </div>

      {/* Circle + mask — above thunder strike */}
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2 overflow-visible"
        style={{
          top: circleTop,
          width: circleSize,
          height: circleSize,
        }}
      >
        <img
          src="/section-19/mask.png"
          alt=""
          width={maskSize}
          height={maskSize}
          className="pointer-events-none absolute z-0 max-w-none object-contain mix-blend-screen"
          style={{
            width: maskSize,
            height: maskSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          src="/section-19/circle.png"
          alt=""
          width={circleSize}
          height={circleSize}
          className="pointer-events-none absolute inset-0 z-10 size-full max-w-none object-contain"
        />
      </div>
    </div>
  );
};
