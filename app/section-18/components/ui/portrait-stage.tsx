"use client";

import { motion, useReducedMotion } from "motion/react";
import LiquidHover from "../originkit/liquid-distortion";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const HERO_SRC = "/section-18/portraits/hero.png";

const PORTRAIT_FRAME =
  "absolute top-0 left-1/2 z-[5] aspect-square h-full min-w-full -translate-x-1/2 pointer-events-auto desktop-sm:top-[58%] desktop-sm:h-[100svh] desktop-sm:min-w-0 desktop-sm:w-[100svh] desktop-sm:-translate-y-1/2";

/**
 * Liquid only (no static portrait).
 * Preview stack — no middle cutout mask yet:
 *   base gradient     z-0
 *   liquid            z-5
 *   gradient-2        z-10
 *   nav / copy        z-20
 */
export const PortraitStage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={PORTRAIT_FRAME}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
      aria-hidden="true"
    >
      <div className="relative size-full overflow-hidden">
        <LiquidHover
          imageSrc={HERO_SRC}
          resolution={10}
          cursorSize={25}
          intensity={12}
          style={{ width: "100%", height: "100%", cursor: "crosshair" }}
        />
      </div>
    </motion.div>
  );
};
