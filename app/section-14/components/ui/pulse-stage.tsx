"use client";

import { motion, useReducedMotion } from "motion/react";

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
      className="relative h-[260px] w-full overflow-hidden rounded-[8px] border border-solid border-[#585858] bg-[#0b0b0b]"
    >
      <img
        src="/section-14/data-viz.png"
        alt=""
        width={565}
        height={315}
        className="pointer-events-none absolute bottom-[-1px] left-1/2 h-[315px] w-[565px] max-w-none -translate-x-1/2 object-cover mix-blend-screen"
        aria-hidden="true"
      />
    </motion.div>
  );
};
