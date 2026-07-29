"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type HeroContentProps = {
  onExplorePeople: () => void;
  onViewStories: () => void;
};

export const HeroContent = ({
  onExplorePeople,
  onViewStories,
}: HeroContentProps) => {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            type: "tween" as const,
            duration: 0.45,
            ease: EASE_OUT,
            delay,
          },
        };

  return (
    <div className="pointer-events-none relative z-20 flex w-full max-w-[423px] flex-col items-center gap-6 px-4">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <motion.h1
          {...reveal(0.28)}
          className="pointer-events-auto w-full font-sans max-w-[423px] desktop-sm:text-[40px] font-medium leading-[1.15] tracking-[-1.6px] text-balance"
        >
          <span className="text-black/40">Meet the People Behind </span>
          <span className="text-black">Every Great Idea.</span>
        </motion.h1>

        <motion.p
          {...reveal(0.36)}
          className="pointer-events-auto max-w-[360px] font-sans text-[15px] leading-[1.45] tracking-[-0.6px] text-black/40 text-pretty"
        >
          Connect with creators, professionals, and communities shaping the
          future together.
        </motion.p>
      </div>

      <motion.div
        {...reveal(0.48)}
        className="pointer-events-auto flex w-full flex-col items-center justify-center gap-6 android-sm:flex-row ipad:gap-6"
      >
        <Button
          variant="primary"
          aria-label="Explore People"
          onClick={onExplorePeople}
          className="w-full min-w-[160px] px-6 android-sm:w-auto"
        >
          Explore People
        </Button>
        <Button
          variant="secondary"
          aria-label="View Stories"
          onClick={onViewStories}
          className="w-full min-w-[160px] px-6 android-sm:w-auto"
        >
          View Stories
        </Button>
      </motion.div>
    </div>
  );
};
