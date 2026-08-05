"use client";

import { motion, useReducedMotion } from "motion/react";

import { Button } from "./button";

/**
 * Badge, headline, sub and the CTA pair — Figma `Frame 18`
 * (mobile 2371:1704, iPad 2371:2463, desktop 2371:3225).
 *
 * Figma draws the block 555px wide and centres it at every frame — which on the
 * 402 phone means it hangs 76px off both edges, with the copy held to a 283px
 * column inside. Only that column is real, so it is what gets built: a centred
 * stack whose measure re-pitches 283 -> 435 and whose type re-pitches with it.
 * iPad and desktop share both numbers exactly.
 *
 * The badge, at 231 x 21, sits above the copy at every width and never changes.
 */

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const HeroContent = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  // The reduced-motion branch names y and filter rather than dropping them:
  // useReducedMotion resolves after the first render, so the animated values
  // are already applied and motion would leave the element parked at y14.
  const reveal = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 1, y: 0, filter: "blur(0px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        }
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
    <div
      className={`pointer-events-auto absolute left-1/2 z-20 flex w-full -translate-x-1/2 flex-col items-center ${className}`}
    >
      {/* Badge (2371:1706) */}
      <motion.div
        {...reveal(0)}
        className="flex items-center gap-[7px] font-dm-mono text-[14px] leading-[1.5] text-[#f2fce2] uppercase"
      >
        <span
          aria-hidden
          className="h-[9px] w-[14px] shrink-0 rounded-[3px] bg-[#bbfb50]"
        />
        ai work flow intillegence
      </motion.div>

      <div className="mt-[16px] flex w-[283px] max-w-[calc(100%-32px)] flex-col items-center gap-[16px] text-center text-white ipad:mt-[19px] ipad:w-[435px] ipad:gap-[18px]">
        <motion.h1
          {...reveal(0.08)}
          className="font-instrument-serif text-[40px] leading-[1.1] tracking-[-1.6px] text-balance ipad:text-[64px] ipad:tracking-[-2.56px]"
        >
          The AI Workforce for Modern Businesses
        </motion.h1>
        <motion.p
          {...reveal(0.16)}
          className="font-aeonik text-[12px] leading-[20px] tracking-[-0.24px] text-pretty ipad:text-[20px] ipad:leading-[28px] ipad:tracking-[-0.4px]"
        >
          Replace repetitive work with AI agents that think, act, and
          collaborate across your entire business.
        </motion.p>
      </div>

      <motion.div
        {...reveal(0.24)}
        className="mt-[28px] flex flex-wrap items-center justify-center gap-[15px] ipad:mt-[40px]"
      >
        <Button>
          Get Started Today
          <img
            src="/section-32/arrow-right.svg"
            alt=""
            aria-hidden
            className="block size-[18px] max-w-none"
          />
        </Button>
        <Button variant="secondary">Watch Demo</Button>
      </motion.div>
    </div>
  );
};
