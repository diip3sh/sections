"use client";

import StarBurst from "../originkit/starburst";
import StarDust from "../originkit/star-dust";
import { HeroContent } from "./hero-content";
import { HeroVisual } from "./hero-visual";
import { Navbar } from "./navbar";

/** Clipped height for the sticky bottom glow (Figma dust frame ≈ 317px). */
const BOTTOM_GLOW_HEIGHT = 250;
/** StarDust sits shorter than the glow container, pinned to the bottom. */
const STAR_DUST_HEIGHT = 80;

export const Section19Hero = () => {
  const handleStartAutomating = () => {
    window.location.hash = "#start";
  };

  const handleBookDemo = () => {
    window.location.hash = "#demo";
  };

  return (
    <section
      aria-label="Neura intelligent service automation"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#04020b]"
    >
      {/* Falling starfield — z-10 from top of navbar so stars aren't cut off */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full w-full"
      >
        <StarBurst
          speed={7}
          starCount={140}
          color="#E8D4FF"
          centerX={50}
          centerY={0}
          starSize={9}
          opacity={28}
          flowerIntensity={2}
          twinkleSpeed={3}
        />
      </div>

      {/* Diagonal line texture — full section background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-11 bg-[url('/section-19/diagonal-line.png')] bg-repeat bg-size-[402px_874px] bg-top mix-blend-overlay"
      />

      {/* Sticky bottom glow + star dust — clipped height */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-15 flex justify-center overflow-hidden"
        style={{ height: BOTTOM_GLOW_HEIGHT }}
      >
        <div
          className="relative w-full max-w-210 overflow-hidden"
          style={{ height: BOTTOM_GLOW_HEIGHT }}
        >
          <img
            src="/section-19/bottom-glow.png"
            alt=""
            width={402}
            height={210}
            className="absolute inset-x-0 bottom-0 h-52.5 w-full object-cover object-bottom mix-blend-screen"
          />
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden opacity-50"
            style={{ height: STAR_DUST_HEIGHT }}
          >
            <StarDust
              angle={360}
              background="rgba(0,0,0,0)"
              particleColor="#FFFFFF"
              particleDensity={5}
              minSize={0.5}
              maxSize={1.5}
              speed={6}
              particleSpeed={2}
              movement={4}
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-100.5 flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center">
          <div className="mt-1 flex w-full flex-col items-center">
            <HeroVisual />
          </div>

          <div className="mt-auto flex w-full flex-col items-center pb-10">
            <HeroContent
              onStartAutomating={handleStartAutomating}
              onBookDemo={handleBookDemo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
