"use client";

import { motion, useReducedMotion } from "motion/react";
import LiquidHover from "../originkit/liquid-distortion";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const HERO_SRC = "/section-18/portraits/hero.png";

/**
 * Mobile mask — Tailwind composable gradients, tuned for the bust:
 * radial centered on the face, taller ellipse, bottom fade for copy.
 * Desktop clears the mobile mask.
 */
const MOBILE_MASK =
  "mask-b-from-45% mask-b-to-95% mask-radial-[55%_82%] mask-radial-from-72% mask-radial-at-[50%_34%] desktop-sm:[mask-image:none] desktop-sm:[-webkit-mask-image:none]";

/**
 * Portrait fills the stage on mobile; desktop keeps the large centered bust.
 */
export const PortraitStage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-1/2 z-10 aspect-square h-full min-w-full -translate-x-1/2 pointer-events-auto desktop-sm:top-[58%] desktop-sm:h-[100svh] desktop-sm:min-w-0 desktop-sm:w-[100svh] desktop-sm:-translate-y-1/2"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
      >
        <div className={`relative size-full ${MOBILE_MASK}`}>
          {reduceMotion ? (
            <img
              src={HERO_SRC}
              alt=""
              width={1254}
              height={1254}
              className="size-full object-cover object-[50%_18%] desktop-sm:object-contain"
              draggable={false}
            />
          ) : (
            <LiquidHover
              imageSrc={HERO_SRC}
              resolution={10}
              cursorSize={56}
              intensity={12}
              style={{ width: "100%", height: "100%", cursor: "crosshair" }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
