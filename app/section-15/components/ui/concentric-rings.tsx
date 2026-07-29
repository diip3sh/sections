"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { PixelBackground } from "./pixel-background";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

/** Matches ring-outer.svg */
const OUTER_SIZE = "clamp(680px, 92.9vw, 1404px)";

/** Matches ring-inner.svg */
const INNER_SIZE = "clamp(250px, 34.1vw, 516px)";

const OUTER_RING = {
  src: "/section-15/rings/ring-outer.svg",
  size: OUTER_SIZE,
  opacity: "opacity-10",
  direction: "normal" as const,
  duration: "32s",
};

const INNER_RING = {
  src: "/section-15/rings/ring-inner.svg",
  size: INNER_SIZE,
  opacity: "opacity-10",
  direction: "normal" as const,
  duration: "24s",
};

const SOFT_RINGS = [
  {
    src: "/section-15/rings/ring-outer-soft.png",
    size: "clamp(720px, 97.8vw, 1479px)",
    opacity: "opacity-[0.1]",
    direction: "reverse" as const,
    duration: "40s",
  },
  {
    src: "/section-15/rings/ring-inner-soft.png",
    size: "clamp(260px, 35.3vw, 534px)",
    opacity: "opacity-[0.12]",
    direction: "reverse" as const,
    duration: "28s",
  },
] as const;

const RingLayer = ({
  src,
  size,
  opacity,
  direction,
  duration,
  reduceMotion,
}: {
  src: string;
  size: string;
  opacity: string;
  direction: "normal" | "reverse";
  duration: string;
  reduceMotion: boolean | null;
}) => (
  <div
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${opacity}`}
    style={{ width: size, height: size } as CSSProperties}
  >
    <div
      className={`size-full motion-safe:animate-ring-rotate ${
        direction === "reverse"
          ? "motion-safe:[animation-direction:reverse]"
          : ""
      } ${reduceMotion ? "motion-reduce:animate-none" : ""}`}
      style={{ animationDuration: duration } as CSSProperties}
    >
      <img
        src={src}
        alt=""
        className="size-full object-contain"
        draggable={false}
      />
    </div>
  </div>
);

/**
 * Pixel field sits strictly between the hard rings (inset from both strokes)
 * so the cream PixelCard fill cannot paint over the tick marks.
 */
const PIXEL_INNER_EDGE = "clamp(132px, 17.6vw, 266px)";
const PIXEL_OUTER_EDGE = "clamp(328px, 44.8vw, 686px)";

const PIXEL_ANNULUS_MASK: CSSProperties = {
  WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${PIXEL_INNER_EDGE}, #000 ${PIXEL_INNER_EDGE}, #000 ${PIXEL_OUTER_EDGE}, transparent ${PIXEL_OUTER_EDGE})`,
  maskImage: `radial-gradient(circle at 50% 50%, transparent ${PIXEL_INNER_EDGE}, #000 ${PIXEL_INNER_EDGE}, #000 ${PIXEL_OUTER_EDGE}, transparent ${PIXEL_OUTER_EDGE})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

export const ConcentricRings = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        className="relative size-full"
        initial={
          reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "tween", duration: 0.5, ease: EASE_OUT }
        }
      >
        {/* Pixels behind both rings — cream fill was covering the outer ticks */}
        <div className="absolute inset-0 z-0" style={PIXEL_ANNULUS_MASK}>
          <PixelBackground />
        </div>

        {/* Rings above pixels so outer + inner ticks stay visible */}
        <div className="absolute inset-0 z-10">
          <RingLayer {...SOFT_RINGS[0]} reduceMotion={reduceMotion} />
          <RingLayer {...OUTER_RING} reduceMotion={reduceMotion} />
          <RingLayer {...SOFT_RINGS[1]} reduceMotion={reduceMotion} />
          <RingLayer {...INNER_RING} reduceMotion={reduceMotion} />
        </div>
      </motion.div>
    </div>
  );
};
