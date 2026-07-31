"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type HeroContentProps = {
  onGetStarted: () => void;
  onLaunchDemo: () => void;
};

const ArrowIcon = () => (
  <span
    aria-hidden="true"
    className="inline-flex size-5 shrink-0 -rotate-45 transition-transform duration-200 ease motion-reduce:transition-none motion-reduce:rotate-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:rotate-0"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
    >
      <path
        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

export const HeroContent = ({
  onGetStarted,
  onLaunchDemo,
}: HeroContentProps) => {
  const reduceMotion = useReducedMotion();

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
          icon={<ArrowIcon />}
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
