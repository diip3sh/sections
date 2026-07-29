"use client";

import { motion, useReducedMotion } from "motion/react";
import CircleImage from "../originkit/ring-gallery";
import { VinylDisc } from "./vinyl-disc";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const RING_IMAGES = [
  {
    image: {
      src: "/section-13/portraits/artist-01.png",
      alt: "Artist portrait",
    },
    focusY: 30,
  },
  {
    image: {
      src: "/section-13/portraits/artist-02.png",
      alt: "Artist portrait",
    },
    focusY: 25,
  },
  {
    image: {
      src: "/section-13/portraits/artist-03.png",
      alt: "Artist portrait",
    },
    focusY: 35,
  },
  {
    image: {
      src: "/section-13/portraits/artist-04.png",
      alt: "Artist portrait",
    },
    focusY: 20,
  },
  {
    image: {
      src: "/section-13/portraits/artist-05.png",
      alt: "Artist portrait",
    },
    focusY: 40,
  },
  {
    image: {
      src: "/section-13/portraits/artist-06.png",
      alt: "Artist portrait",
    },
    focusY: 30,
  },
  {
    image: {
      src: "/section-13/portraits/artist-07.png",
      alt: "Artist portrait",
    },
    focusY: 25,
  },
  {
    image: {
      src: "/section-13/portraits/artist-08.png",
      alt: "Artist portrait",
    },
    focusY: 35,
  },
  {
    image: {
      src: "/section-13/portraits/artist-09.png",
      alt: "Artist portrait",
    },
    focusY: 30,
  },
] as const;

type RingLayerProps = {
  cardWidth: number;
  cardHeight: number;
  ringRadius: number;
  discSize: number;
};

const RingLayer = ({
  cardWidth,
  cardHeight,
  ringRadius,
  discSize,
}: RingLayerProps) => (
  <>
    <VinylDisc size={discSize} />

    <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CircleImage
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        rounded={14}
        ring={{ radiusX: ringRadius, radiusY: ringRadius, tilt: true, repeat: 3 }}
        direction="anticlockwise"
        drag={true}
        transition={{ type: "tween", ease: "linear", duration: 28 }}
        images={[...RING_IMAGES]}
      />
    </div>
  </>
);

export const RingStage = () => {
  const reduceMotion = useReducedMotion();

  const motionProps = {
    initial: reduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: reduceMotion
      ? { duration: 0 }
      : { type: "tween" as const, duration: 0.5, ease: EASE_OUT },
  };

  return (
    <>
      {/* Mobile — flows below CTAs; section overflow crops bottom */}
      <div
        className="pointer-events-none relative mx-auto w-[370px] shrink-0 ipad:hidden"
        aria-hidden="true"
      >
        <motion.div {...motionProps} className="relative size-[370px]">
          <RingLayer
            cardWidth={51}
            cardHeight={56}
            ringRadius={143}
            discSize={370}
          />
        </motion.div>
      </div>

      {/* Tablet — in-flow flex child; centered; page can grow so nothing clips */}
      <div
        className="pointer-events-none relative mx-auto hidden w-[612px] shrink-0 justify-center ipad:flex desktop-sm:hidden"
        aria-hidden="true"
      >
        <motion.div {...motionProps} className="relative size-[612px]">
          <RingLayer
            cardWidth={85}
            cardHeight={92}
            ringRadius={237}
            discSize={612}
          />
        </motion.div>
      </div>

      {/* Desktop — absolute center */}
      <div
        className="pointer-events-none absolute left-1/2 top-[calc(50%-16px)] z-10 hidden -translate-x-1/2 -translate-y-1/2 desktop-sm:block"
        aria-hidden="true"
      >
        <motion.div {...motionProps} className="relative size-[770px]">
          <RingLayer
            cardWidth={107}
            cardHeight={116}
            ringRadius={298}
            discSize={770}
          />
        </motion.div>
      </div>
    </>
  );
};
