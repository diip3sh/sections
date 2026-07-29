"use client";

import { motion, useReducedMotion } from "motion/react";
import SpiralImages from "../originkit/spiral-image";
import { HeroContent } from "./hero-content";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const PORTRAIT_IMAGES = [
  ...Array.from({ length: 13 }, (_, index) => ({
    src: `/section-15/portraits/portrait-${String(index + 1).padStart(2, "0")}.png`,
  })),
  { src: "/section-15/portraits/portrait-01.png" },
];

const CLUSTER_POSITION =
  "absolute inset-x-0 top-[96px] flex justify-center ipad:top-[191px] desktop-sm:top-[30.7%] desktop-sm:-translate-y-[130px]";

/**
 * Figma mobile Group 2147240540 on iPhone 16/17 Pro (402×874):
 *   x: -384 · y: -116 · w: 858 · h: 881
 * Tablet+ stays full-bleed / free (canvas-centered).
 */
const SPIRAL_FRAME =
  "absolute z-20 left-[-384px] top-[-116px] h-[881px] w-[858px] ipad:inset-0 ipad:h-auto ipad:w-auto";

/** Figma lens: mobile 150 · tablet 201 · desktop fluid */
const LENS_BOX =
  "size-[150px] w-[150px] h-[150px] shrink-0 ipad:size-[201px] ipad:w-[201px] ipad:h-[201px] desktop-sm:size-[clamp(140px,13.3vw,201px)] desktop-sm:w-[clamp(140px,13.3vw,201px)] desktop-sm:h-[clamp(140px,13.3vw,201px)]";

type SpiralStageProps = {
  onExplorePeople: () => void;
  onViewStories: () => void;
};

export const SpiralStage = ({
  onExplorePeople,
  onViewStories,
}: SpiralStageProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {/*
        Layer order (back → front):
        1. Spiral images (z-20) — Figma frame on mobile, free on ipad+
        2. Lens + glow pedestal (z-25)
        3. Hero copy (z-30)
      */}

      {/* Spiral — mobile uses Figma absolute frame; ipad+ full-bleed */}
      <motion.div
        className={SPIRAL_FRAME}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "tween", duration: 0.55, ease: EASE_OUT, delay: 0.12 }
        }
      >
        <SpiralImages images={PORTRAIT_IMAGES} />
      </motion.div>

      {/* Lens — Figma 1:456: glow inset behind transparent lens PNG */}
      <div className={`${CLUSTER_POSITION} z-[25]`}>
        <motion.div
          className="relative flex w-full max-w-[1512px] flex-col items-center px-4"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "tween", duration: 0.45, ease: EASE_OUT, delay: 0.2 }
          }
        >
          <motion.div
            className={`relative overflow-visible ${LENS_BOX}`}
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "tween", duration: 0.45, ease: EASE_OUT, delay: 0.24 }
            }
          >
            {/* Ellipse 48438 — left 8 top 5 size 182 in 201 frame, bleed -16.48% */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-0"
              style={{
                left: `${(8 / 201) * 100}%`,
                top: `${(5 / 201) * 100}%`,
                width: `${(182 / 201) * 100}%`,
                height: `${(182 / 201) * 100}%`,
              }}
            >
              <div className="absolute inset-[-16.48%]">
                <img
                  src="/section-15/lens/lens-glow.svg"
                  alt=""
                  className="block size-full max-w-none"
                  draggable={false}
                />
              </div>
            </div>

            <img
              src="/section-15/lens/camera-lens.png"
              alt=""
              width={201}
              height={201}
              className="absolute inset-0 z-[1] size-full object-cover"
              aria-hidden="true"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Copy — above spiral; spacer = lens + 14px gap (Figma) */}
      <div className={`${CLUSTER_POSITION} z-30`}>
        <div className="relative flex w-full max-w-[1512px] flex-col items-center px-4">
          <div
            className={`mb-[14px] desktop-sm:mb-1 ${LENS_BOX}`}
            aria-hidden="true"
          />
          <HeroContent
            onExplorePeople={onExplorePeople}
            onViewStories={onViewStories}
          />
        </div>
      </div>
    </div>
  );
};
