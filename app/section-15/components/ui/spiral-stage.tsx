"use client";

import { useDialKit } from "dialkit";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import SpiralImages from "../originkit/spiral-image";
import { HeroContent } from "./hero-content";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const PORTRAIT_IMAGES = [
  ...Array.from({ length: 13 }, (_, index) => ({
    src: `/section-15/portraits/portrait-${String(index + 1).padStart(2, "0")}.png`,
  })),
  { src: "/section-15/portraits/portrait-01.png" },
];

const CLUSTER_POSITION =
  "absolute inset-x-0 top-[30.7%] flex -translate-y-[100px] justify-center android-sm:-translate-y-[110px] ipad:-translate-y-[120px] desktop-sm:-translate-y-[130px]";

type SpiralStageProps = {
  onExplorePeople: () => void;
  onViewStories: () => void;
};

export const SpiralStage = ({
  onExplorePeople,
  onViewStories,
}: SpiralStageProps) => {
  const reduceMotion = useReducedMotion();
  const lensRef = useRef<HTMLDivElement>(null);

  const dial = useDialKit(
    "Spiral Images",
    {
      turns: [1.2, 0.1, 5, 0.1],
      speed: [-1, -5, 5, 0.1],
      spacing: [10, 1, 30, 0.5],
      spread: [7, 1, 15, 0.1],
      curve: [0.5, 0.15, 2, 0.05],
      imageSize: [261, 40, 400, 1],
      sizeFalloff: [3, 0, 8, 0.1],
      fadeIn: [0, 0, 50, 1],
      fadeOut: [6, 0, 50, 1],
      radius: [6, 0, 20, 0.5],
      clockwise: true,
      rotationMode: {
        type: "select",
        options: [
          { value: "outward", label: "Outward (Figma)" },
          { value: "tangent", label: "Tangent" },
        ],
        default: "outward",
      },
      rotationOffset: [0, -360, 180, 1],
      startAngle: [0, -1000, 180, 1],
      position: {
        followLens: true,
        x: [50, 0, 100, 0.1],
        y: [30.7, 0, 100, 0.1],
        offsetX: [0, -400, 400, 1],
        offsetY: [0, -400, 400, 1],
      },
    },
    { id: "section-15-spiral", persist: true },
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {/*
        Layer order (back → front):
        1. Lens (z-10) — spiral origin
        2. Spiral images (z-20) — appear to emerge from the lens
        3. Hero copy (z-30) — stays readable above the spiral
      */}

      {/* Lens — under spiral */}
      <div className={`${CLUSTER_POSITION} z-10`}>
        <motion.div
          className="relative flex w-full max-w-[1512px] flex-col items-center px-4"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "tween", duration: 0.45, ease: EASE_OUT, delay: 0.2 }
          }
        >
          <motion.div
            ref={lensRef}
            className="relative flex shrink-0 items-center justify-center"
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "tween", duration: 0.45, ease: EASE_OUT, delay: 0.24 }
            }
          >
            <img
              src="/section-15/lens/lens-glow.svg"
              alt=""
              className="pointer-events-none absolute size-[clamp(160px,13.3vw,242px)] object-contain opacity-90"
              aria-hidden="true"
              draggable={false}
            />
            <img
              src="/section-15/lens/camera-lens.png"
              alt=""
              width={201}
              height={201}
              className="relative size-[clamp(140px,13.3vw,201px)] object-contain"
              aria-hidden="true"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Spiral — above lens; params live via DialKit */}
      <motion.div
        className="absolute inset-0 z-20"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "tween", duration: 0.55, ease: EASE_OUT, delay: 0.12 }
        }
      >
        <SpiralImages
          images={PORTRAIT_IMAGES}
          turns={dial.turns}
          speed={dial.speed}
          spacing={dial.spacing}
          spread={dial.spread}
          curve={dial.curve}
          imageSize={dial.imageSize}
          sizeAttenuation={dial.sizeFalloff}
          fadeIn={dial.fadeIn}
          fadeOut={dial.fadeOut}
          cornerRadius={dial.radius}
          clockwise={dial.clockwise}
          rotationMode={dial.rotationMode as "outward" | "tangent"}
          rotationOffset={dial.rotationOffset}
          startAngle={dial.startAngle}
          centerX={dial.position.x / 100}
          centerY={dial.position.y / 100}
          originRef={dial.position.followLens ? lensRef : undefined}
          originOffsetX={dial.position.offsetX}
          originOffsetY={dial.position.offsetY}
        />
      </motion.div>

      {/* Copy — above spiral */}
      <div className={`${CLUSTER_POSITION} z-30`}>
        <div className="relative flex w-full max-w-[1512px] flex-col items-center px-4">
          <div
            className="size-[clamp(140px,13.3vw,201px)] shrink-0"
            aria-hidden="true"
          />
          <div className="relative mt-1">
            <HeroContent
              onExplorePeople={onExplorePeople}
              onViewStories={onViewStories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
