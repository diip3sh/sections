"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

type HeroContentProps = {
  onGetStarted: () => void;
  onLaunchDemo: () => void;
};

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
    <div className="pointer-events-none relative z-20 flex w-full flex-col items-center gap-6 ipad:max-w-[478px] desktop-sm:max-w-[635px]">
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
            className="pointer-events-auto w-full font-clash text-[40px] ipad:text-[56px] desktop-sm:text-[64px] leading-[1.1] tracking-[-1.6px] text-white text-pretty"
          >
            AI That Moves at the Speed of Thought.
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="pointer-events-auto w-full max-w-[306px] desktop-sm:max-w-[533px] font-clash text-[16px] ipad:text-[18px] ipad:max-w-none leading-[1.4] tracking-[-0.32px] text-[rgba(255,255,255,0.75)] text-pretty"
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
          icon={
            <span
              className="relative size-5 shrink-0 overflow-hidden"
              aria-hidden="true"
            >
              <span className="absolute top-0 left-0 size-5 transition-transform duration-200 ease will-change-transform motion-reduce:transition-none motion-reduce:will-change-auto [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-4">
                <ArrowIcon className="absolute top-0 left-0 size-5" />
                <ArrowIcon className="absolute top-5 -left-4 size-5" />
              </span>
            </span>
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
