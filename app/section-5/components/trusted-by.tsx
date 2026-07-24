"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type TrustedLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

type TrustedByProps = {
  logos: readonly TrustedLogo[];
};

const easeOutCubic = [0.215, 0.61, 0.355, 1] as const;

const TrustedBy = ({ logos }: TrustedByProps) => {
  const prefersReducedMotion = useReducedMotion();

  const itemTransition = (delay: number) => ({
    type: "tween" as const,
    duration: prefersReducedMotion ? 0.2 : 0.3,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easeOutCubic,
  });

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12 };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };

  return (
    <div className="flex w-full max-w-295.5 flex-col items-center gap-5 ipad:gap-6">
      <motion.div
        className="flex w-full max-w-150 items-center gap-3 ipad:gap-4"
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, amount: 0.4 }}
        transition={itemTransition(0)}
      >
        <span
          aria-hidden="true"
          className="h-px min-w-0 flex-1 bg-[#d0d0d0]"
        />
        <p className="shrink-0 text-center text-[0.8125rem] font-medium tracking-[-0.0125em] text-black/70 ipad:text-base">
          More than 100+ companies trusted us
        </p>
        <span
          aria-hidden="true"
          className="h-px min-w-0 flex-1 bg-[#d0d0d0]"
        />
      </motion.div>

      <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 ipad:gap-x-10 laptop:gap-x-14">
        {logos.map((logo, index) => (
          <motion.li
            key={logo.src}
            className="opacity-80"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.3 }}
            transition={itemTransition(0.1 + index * 0.1)}
          >
            <Image
              alt={logo.alt}
              src={logo.src}
              width={logo.width}
              height={logo.height}
              className={logo.className}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TrustedBy;
