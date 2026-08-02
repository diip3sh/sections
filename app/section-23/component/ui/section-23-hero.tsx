"use client";

import { motion, useReducedMotion } from "motion/react";
import Globe from "../originkit/globe";
import { FlagPill } from "./flag-pill";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const GLOBE_DOTS = {
  color: "#357de9",
  size: 5,
  density: 7,
  allDots: false,
} as const;

const FLAG_ROWS = [
  [
    { src: "/section-23/flags/brazil.svg", alt: "Brazil" },
    { src: "/section-23/flags/canada.svg", alt: "Canada" },
    { src: "/section-23/flags/israel.svg", alt: "Israel" },
    { src: "/section-23/flags/india.svg", alt: "India" },
    { src: "/section-23/flags/brunei.svg", alt: "Brunei" },
  ],
  [
    { src: "/section-23/flags/nauru.svg", alt: "Nauru" },
    { src: "/section-23/flags/wales.svg", alt: "Wales" },
    { src: "/section-23/flags/haiti.svg", alt: "Haiti" },
    { src: "/section-23/flags/taiwan.svg", alt: "Taiwan" },
    { src: "/section-23/flags/jordan.svg", alt: "Jordan" },
    { src: "/section-23/flags/uganda.svg", alt: "Uganda" },
  ],
  [
    { src: "/section-23/flags/india.svg", alt: "India" },
    { src: "/section-23/flags/canada.svg", alt: "Canada" },
    { src: "/section-23/flags/india.svg", alt: "India" },
    { src: "/section-23/flags/brunei.svg", alt: "Brunei" },
    { src: "/section-23/flags/brazil.svg", alt: "Brazil" },
  ],
  [
    { src: "/section-23/flags/wales.svg", alt: "Wales" },
    { src: "/section-23/flags/haiti.svg", alt: "Haiti" },
    { src: "/section-23/flags/nauru.svg", alt: "Nauru" },
    { src: "/section-23/flags/jordan.svg", alt: "Jordan" },
    { src: "/section-23/flags/uganda.svg", alt: "Uganda" },
    { src: "/section-23/flags/taiwan.svg", alt: "Taiwan" },
  ],
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const getFlagVisibility = (rowIndex: number, flagIndex: number) => {
  // Mobile: denser cloud — show most pills
  // Tablet+: show fuller rows; desktop trims outer pills on row 0/1
  if (rowIndex === 0) {
    if (flagIndex === 0 || flagIndex === 4) {
      return "hidden ipad:block";
    }
  }
  if (rowIndex === 1) {
    if (flagIndex === 0 || flagIndex === 5) {
      return "hidden ipad:block";
    }
  }
  // Extra mobile/tablet depth row — hide on desktop
  if (rowIndex >= 3) {
    return "block desktop-sm:hidden";
  }
  return undefined;
};

export const Section23Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const handleGetStarted = () => {
    window.location.hash = "#start";
  };

  return (
    <section
      aria-label="Your content deserves a global audience"
      className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#171717] px-4 py-8 ipad:px-8 ipad:py-12 desktop-sm:px-11 desktop-sm:py-16"
    >
      {/* Ambient blue / purple field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f] to-[#171717]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(129,187,255,0.55) 0%, rgba(101,75,255,0.28) 42%, transparent 72%)",
          }}
        />
        <img
          src="/section-23/gradient.svg"
          alt=""
          className="absolute top-[-40%] left-1/2 h-[120%] w-[160%] max-w-none -translate-x-1/2 opacity-80"
        />
        <div
          className="absolute inset-x-0 top-0 h-[55%] opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url(/section-23/dust.png)",
            backgroundSize: "1024px 1024px",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Outer frame — mobile full-bleed feel, tablet/desktop 90dvw */}
      <motion.div
        className="relative z-10 w-full max-w-[90dvw] full-hd:max-w-[65dvw] overflow-hidden rounded-[16px] ipad:rounded-[20px]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#222226] to-[#1d1d20]"
        />

        <img
          src="/section-23/ellipse-glow.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-[-40%] left-1/2 size-[280px] max-w-none -translate-x-1/2 opacity-80 ipad:size-[364px]"
        />

        {/* Inner card */}
        <div className="card-orbit-border relative m-2 rounded-[12px] ipad:m-4 ipad:rounded-[16px]">
          <div className="card-orbit-border__inner overflow-hidden rounded-[10.5px] bg-[#16131c] ipad:rounded-[14.5px]">
            <img
              src="/section-23/glow.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-[-30%] left-1/2 h-[70%] w-[90%] max-w-none -translate-x-1/2 opacity-90"
            />

            {/* Visual stage: flags + globe */}
            <div className="relative mx-auto flex w-full max-w-[1084px] flex-col items-center pt-10 ipad:pt-12 desktop-sm:min-h-[380px] desktop-sm:pt-12">
              <div className="relative flex w-full items-center justify-center pb-4 ipad:pb-6 desktop-sm:pb-0">
                {/* Flag pills — behind globe */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col gap-5 px-1 ipad:gap-8 ipad:px-0"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%)",
                  }}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.06,
                        delayChildren: prefersReducedMotion ? 0 : 0.2,
                      },
                    },
                  }}
                >
                  {FLAG_ROWS.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`flex w-full items-center justify-center gap-5 ipad:gap-8 ${
                        rowIndex % 2 === 0 ? "px-2 ipad:px-10" : "px-0"
                      }`}
                    >
                      {row.map((flag, flagIndex) => (
                        <motion.div
                          key={`${flag.alt}-${rowIndex}-${flagIndex}`}
                          variants={fadeUp}
                          className={getFlagVisibility(rowIndex, flagIndex)}
                          style={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  animation: `section-18-glow ${3.5 + (flagIndex % 3) * 0.4}s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate`,
                                  animationDelay: `${flagIndex * 0.15}s`,
                                }
                          }
                        >
                          <FlagPill flagSrc={flag.src} flagAlt="" />
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>

                {/* Globe */}
                <motion.div
                  className="relative z-20 size-[280px] translate-y-26 overflow-hidden rounded-full ipad:size-[520px] ipad:translate-y-30 desktop-sm:size-[420px] desktop-sm:translate-y-16"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 52%, transparent 92%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 52%, transparent 92%)",
                  }}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
                >
                  <Globe
                    direction="right"
                    speed={prefersReducedMotion ? 0 : 2}
                    smoothing={8}
                    stopOnHover={true}
                    dragSpeed={0}
                    fill="dots"
                    dots={GLOBE_DOTS}
                    oceanColor="#0a112a"
                    outlineColor="#357de9"
                    graticuleColor="#4B6AAA"
                    showOutline={true}
                    showGrid={true}
                    outlineWidth={1}
                    scale={10}
                    detail={6}
                    initialLatitude={23}
                    initialLongitude={-23}
                  />
                </motion.div>
              </div>
            </div>

            {/* Copy — stacked/centered on mobile+tablet, split on desktop */}
            <motion.div
              className="relative z-30 mx-auto flex w-full max-w-[449px] ipad:max-w-[550px] flex-col items-center gap-6 px-5 pb-10 pt-22 text-center ipad:gap-8 ipad:px-10 ipad:pb-12 desktop-sm:max-w-none desktop-sm:flex-row desktop-sm:items-end desktop-sm:justify-between desktop-sm:gap-10 desktop-sm:px-[58px] desktop-sm:pb-12 desktop-sm:pt-2 desktop-sm:text-left"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.12,
                    delayChildren: prefersReducedMotion ? 0 : 0.35,
                  },
                },
              }}
            >
              <motion.div
                variants={fadeUp}
                className="flex w-full flex-col items-center gap-2 ipad:gap-4 desktop-sm:max-w-97 desktop-sm:items-start"
              >
                <h1 className="w-full font-instrument-serif text-[44px] leading-[1.1] tracking-[-1.76px] text-white ipad:text-[56px] ipad:tracking-[-2.24px] desktop-sm:text-[56px]">
                  Your Content Deserves a Global Audience.
                </h1>
                <p className="max-w-[256px] font-sans text-[14px] leading-[1.4] tracking-[-0.28px] text-[#c2c0c9] ipad:max-w-[387px] desktop-sm:hidden">
                  Translate speech into 150+ languages with AI voices that sound
                  natural, and are ready in minutes
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex w-full max-w-[280px] flex-col items-center gap-4 desktop-sm:items-start"
              >
                <p className="hidden font-sans text-[14px] leading-[1.4] tracking-[-0.28px] text-[#c2c0c9] desktop-sm:block">
                  Translate speech into 150+ languages with AI voices that sound
                  natural, and are ready in minutes
                </p>
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="relative inline-flex min-h-11 items-center justify-center rounded-full px-4 py-3 font-sans text-base font-medium tracking-[-0.32px] text-[#060e08] shadow-[0_2px_2.5px_rgba(0,0,0,0.1),0_9px_4.5px_rgba(0,0,0,0.09),0_19px_6px_rgba(0,0,0,0.05),inset_0_1px_1px_0_white,inset_0_-1.5px_0_0_rgba(0,0,0,0.1)] touch-manipulation transition-transform duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.02] cursor-pointer"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.33) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, #f0f0f0 0%, #f0f0f0 100%)",
                  }}
                >
                  Get started for free
                </button>
              </motion.div>
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_7px_0px_rgba(0,0,0,0.92)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
