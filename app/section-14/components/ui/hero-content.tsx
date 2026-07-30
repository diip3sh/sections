"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRightIcon,
  type ArrowUpRightIconHandle,
} from "../originkit/arrow-up-right-icon";
import { Button } from "./button";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type HeroContentProps = {
  onGetStarted: () => void;
  onLaunchDemo: () => void;
};

export const HeroContent = ({
  onGetStarted,
  onLaunchDemo,
}: HeroContentProps) => {
  const reduceMotion = useReducedMotion();
  const arrowRef = useRef<ArrowUpRightIconHandle>(null);

  const handleGetStartedEnter = () => {
    arrowRef.current?.startAnimation();
  };

  const handleGetStartedLeave = () => {
    arrowRef.current?.stopAnimation();
  };

  const reveal = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            type: "tween" as const,
            duration: 0.45,
            ease: EASE_OUT,
            delay,
          },
        };

  return (
    <div className="pointer-events-none relative z-20 flex w-full flex-col items-center gap-6 ipad:max-w-[488px] desktop-sm:max-w-[635px]">
      {/* Badge + headline + sub — Figma gap 16 between badge and copy, 8 between title/sub */}
      <div className="flex w-full flex-col items-center gap-4">
        <motion.div
          {...reveal(0)}
          className="pointer-events-auto relative inline-flex h-8 w-[261px] items-center justify-center gap-2.5 overflow-hidden rounded-[32px] bg-[rgba(255,255,255,0.07)] py-1.5 pr-[23px] pl-[15px] shadow-[inset_0_0_4px_0_rgba(255,255,255,0.1)] backdrop-blur-[0.5px]"
        >
          <img
            src="/section-14/badge-sparkle.svg"
            alt=""
            width={24}
            height={24}
            className="size-3.5 shrink-0"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap font-outfit text-[16px] leading-5 font-normal text-[rgba(217,217,217,0.6)]">
            Next gen AI Agentic Platform
          </span>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <motion.h1
            {...reveal(0.08)}
            className="pointer-events-auto w-full text-[40px] ipad:text-[56px] desktop-sm:text-[64px] leading-[1.1] tracking-[-1.6px] text-white text-balance font-aeonik"
          >
            AI That Moves at the Speed of Thought.
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="pointer-events-auto w-full max-w-[306px] desktop-sm:max-w-[533px] font-aeonik text-[16px] ipad:text-[18px] ipad:max-w-none leading-[1.4] tracking-[-0.32px] text-[rgba(255,255,255,0.75)] text-pretty"
          >
            Build, automate, and deploy intelligent workflows with real-time
            performance powered by modern AI infrastructure.
          </motion.p>
        </div>
      </div>

      <motion.div
        {...reveal(0.24)}
        className="pointer-events-auto flex w-full flex-col gap-3 ipad:max-w-87.5 ipad:pt-8 desktop-sm:pt-7 mx-auto ipad:flex-row"
      >
        <Button
          variant="primary"
          aria-label="Get started"
          onClick={onGetStarted}
          onMouseEnter={handleGetStartedEnter}
          onMouseLeave={handleGetStartedLeave}
          icon={
            <ArrowUpRightIcon
              ref={arrowRef}
              size={20}
              className="size-5 shrink-0"
              aria-hidden="true"
            />
          }
        >
          Get started
        </Button>
        <Button
          variant="secondary"
          aria-label="Launch demo"
          onClick={onLaunchDemo}
        >
          Launch demo
        </Button>
      </motion.div>
    </div>
  );
};
