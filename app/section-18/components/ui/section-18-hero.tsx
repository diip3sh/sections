"use client";

import { FeatureRail } from "./feature-rail";
import {
  GlowBackground,
  GradientOverlay,
} from "./glow-background";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { PortraitStage } from "./portrait-stage";

export const Section18Hero = () => {
  const handleGetStarted = () => {
    window.location.hash = "#get-started";
  };

  const handleBookNow = () => {
    window.location.hash = "";
  };

  return (
    <section
      aria-label="Visionary liquid distortion hero"
      className="relative isolate min-h-svh w-full overflow-hidden bg-black"
    >
      {/*
        Preview stack (no middle mask yet):
          base gradient  z-0
          liquid         z-5
          gradient-2     z-10
          nav / copy     z-20
      */}
      <GlowBackground />
      <PortraitStage />
      <GradientOverlay />

      <div className="relative mx-auto w-full max-w-none desktop-sm:max-w-[1440px]">
        <div className="relative mx-auto flex min-h-svh w-full max-w-[402px] flex-col ipad:max-w-none desktop-sm:max-w-none">
          <div className="pointer-events-none relative z-20 flex w-full flex-col">
            <div className="pointer-events-auto w-full">
              <Navbar onBookNow={handleBookNow} />
            </div>
          </div>

          <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-end px-[18px] pb-[72px] desktop-sm:grid desktop-sm:grid-cols-[366px_1fr_129px] desktop-sm:items-end desktop-sm:justify-items-stretch desktop-sm:gap-0 desktop-sm:px-[100px] desktop-sm:pb-[114px]">
            <div className="pointer-events-auto desktop-sm:col-start-1 desktop-sm:justify-self-start">
              <HeroContent onGetStarted={handleGetStarted} />
            </div>

            <div className="pointer-events-auto hidden desktop-sm:col-start-3 desktop-sm:block desktop-sm:justify-self-end">
              <FeatureRail />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
