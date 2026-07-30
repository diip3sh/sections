"use client";

import { motion, useReducedMotion } from "motion/react";
import WaveBg from "../originkit/pulse-line";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const PulseStage = () => {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 14, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: {
          type: "tween" as const,
          duration: 0.45,
          ease: EASE_OUT,
          delay: 0.4,
        },
      };

  return (
    <motion.div
      {...reveal}
      className="flex h-65 mx-auto w-full items-end justify-center overflow-hidden rounded-lg border border-solid border-[#585858] bg-[#0b0b0b] ipad:h-93.5 ipad:max-w-162 desktop-sm:h-118.5 desktop-sm:max-w-7xl desktop-sm:items-start"
    >
      <WaveBg
        shape="line"
        type="vertical"
        speed={34}
        gap={22}
        scale={2}
        backgroundColor="#0b0b0b"
        lineColor="#585858"
      />
    </motion.div>
  );
};
