"use client";

import { motion, useReducedMotion } from "motion/react";

type SpotlightRevealProps = {
  text: string;
  id?: string;
  className?: string;
  blur?: number;
  delay?: number;
};

const SpotlightReveal = ({
  text,
  id,
  className,
  blur = 6,
  delay = 0.1,
}: SpotlightRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 id={id} aria-label={text} className={className}>
      {words.map((word, index) => {
        const wordDelay = prefersReducedMotion ? 0 : delay + index * 0.06;

        return (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            aria-hidden="true"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 12,
                    filter: `blur(${blur}px)`,
                  }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            transition={{
              type: "tween",
              duration: prefersReducedMotion ? 0.2 : 0.4,
              delay: wordDelay,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        );
      })}
    </h1>
  );
};

export default SpotlightReveal;
