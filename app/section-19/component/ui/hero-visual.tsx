"use client";

import { useEffect, useState } from "react";
import ThunderStrike from "../originkit/thunder-strike";

/**
 * Hero visual layers (Figma element 2146:692).
 * Layer order: thunder-mask (z-0) → ThunderStrike (z-5) → circle/mask (z-10).
 */

/** Matches `--breakpoint-ipad` in globals.css */
const IPAD_MIN = 768;

const CIRCLE_SIZE_MOBILE = 317;
const CIRCLE_SIZE_IPAD = 542;
const MASK_SIZE_MOBILE = 400;
const MASK_SIZE_IPAD = 700;

/** Native asset aspect 299×637 — height is derived from width. */
const THUNDER_ASPECT = 637 / 299;
const THUNDER_MASK_W_MOBILE = 292;
const THUNDER_MASK_W_IPAD = 336;
const THUNDER_MASK_H_MOBILE = Math.round(
  THUNDER_MASK_W_MOBILE * THUNDER_ASPECT,
);
const THUNDER_MASK_H_IPAD = Math.round(THUNDER_MASK_W_IPAD * THUNDER_ASPECT);

/** How far the beam dips into the circle so they visually join. */
const THUNDER_OVERLAP_MOBILE = 96;
const THUNDER_OVERLAP_IPAD = 164;

/**
 * Vertical shift of the visual within its stage.
 * Positive moves it down; negative pulls it up (may paint over the navbar).
 * Content clearance in section-19-hero tracks this automatically.
 */
export const HERO_VISUAL_OFFSET_Y = -500;

/** Minimum gap between the visual stage bottom and HeroContent. */
export const HERO_CONTENT_GAP = 24;

/** Mobile defaults — prefer `useHeroVisualLayout` for live sizes. */
export const HERO_VISUAL_HEIGHT =
  THUNDER_MASK_H_MOBILE - THUNDER_OVERLAP_MOBILE + CIRCLE_SIZE_MOBILE;
export const HERO_VISUAL_STAGE_HEIGHT = Math.max(
  0,
  HERO_VISUAL_HEIGHT + HERO_VISUAL_OFFSET_Y,
);

/** Narrow corridor for the live bolt so it reads over the glow. */
const STRIKE_W = 72;
/** -top-1 = 4px — extend strike height so it still meets circle top. */
const STRIKE_TOP_OFFSET = 4;

type HeroVisualLayout = {
  circleSize: number;
  maskSize: number;
  thunderMaskW: number;
  thunderMaskH: number;
  circleTop: number;
  visualHeight: number;
  stageHeight: number;
};

const getLayout = (isIpad: boolean): HeroVisualLayout => {
  const circleSize = isIpad ? CIRCLE_SIZE_IPAD : CIRCLE_SIZE_MOBILE;
  const maskSize = isIpad ? MASK_SIZE_IPAD : MASK_SIZE_MOBILE;
  const thunderMaskW = isIpad ? THUNDER_MASK_W_IPAD : THUNDER_MASK_W_MOBILE;
  const thunderMaskH = isIpad ? THUNDER_MASK_H_IPAD : THUNDER_MASK_H_MOBILE;
  const thunderOverlap = isIpad ? THUNDER_OVERLAP_IPAD : THUNDER_OVERLAP_MOBILE;
  const circleTop = thunderMaskH - thunderOverlap;
  const visualHeight = circleTop + circleSize;

  return {
    circleSize,
    maskSize,
    thunderMaskW,
    thunderMaskH,
    circleTop,
    visualHeight,
    stageHeight: Math.max(0, visualHeight + HERO_VISUAL_OFFSET_Y),
  };
};

/** Responsive thunder/circle/mask sizes + stage metrics (mobile → ipad+). */
export const useHeroVisualLayout = (): HeroVisualLayout => {
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${IPAD_MIN}px)`);
    const handleChange = () => {
      setIsIpad(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return getLayout(isIpad);
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
        className="absolute top-0 left-1/2 z-0 -translate-x-1/2 overflow-visible ipad:-translate-y-[9%]"
        style={{ width: thunderMaskW, height: thunderMaskH }}
      >
        <img
          src="/section-19/thunder-mask.png"
          alt=""
          width={thunderMaskW}
          height={thunderMaskH}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain mix-blend-screen"
        />
      </div>

      {/* ThunderStrike — from -top-1 down to circle top; above mask, below circle */}
      {/* <div
        className="pointer-events-none absolute -top-1 left-1/2 z-[5] -translate-x-1/2"
        style={{
          width: STRIKE_W,
          height: circleTop + STRIKE_TOP_OFFSET,
        }}
      >
        <ThunderStrike
          backgroundColor="#fb4ceb"
          lightningColor="#F370FF"
          xOffset={0}
          speed={12}
          intensity={20}
          size={20}
          angle={180}
        />
      </div> */}

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
