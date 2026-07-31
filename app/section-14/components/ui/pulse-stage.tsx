"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import WaveBg from "../originkit/pulse-line";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

/** Matches `--breakpoint-ipad` in globals.css */
const IPAD_MIN = 768;

/** Tighter + slower on mobile; iPad/desktop keep current values */
const GAP_MOBILE = 18;
const GAP_IPAD_UP = 34;
const SPEED_MOBILE = 28;
const SPEED_IPAD_UP = 14;

const usePulseConfig = () => {
  const [config, setConfig] = useState({
    gap: GAP_MOBILE,
    speed: SPEED_MOBILE,
  });

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < IPAD_MIN;
      setConfig(
        isMobile
          ? { gap: GAP_MOBILE, speed: SPEED_MOBILE }
          : { gap: GAP_IPAD_UP, speed: SPEED_IPAD_UP },
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
};

export const PulseStage = () => {
  const reduceMotion = useReducedMotion();
  const { gap, speed } = usePulseConfig();

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
        speed={speed}
        gap={gap}
        scale={2}
        backgroundColor="#0b0b0b"
        lineColor="#585858"
      />
    </motion.div>
  );
};
