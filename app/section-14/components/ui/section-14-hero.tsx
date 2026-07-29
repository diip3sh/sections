"use client";

import WaveBg from "../originkit/pulse-line";
import { GlowBackground } from "./glow-background";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { PulseStage } from "./pulse-stage";

const WAVE_PROPS = {
  speed: 34,
  gap: 22,
  scale: 2,
  type: "vertical" as const,
  shape: "line" as const,
  backgroundColor: "#161616",
  lineColor: "#222222",
};

export const Section14Hero = () => {
  const handleGetStarted = () => {
    window.location.hash = "#get-started";
  };

  const handleLaunchDemo = () => {
    window.location.hash = "#demo";
  };

  return (
    <section
      aria-label="Agentic AI platform hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#161616]"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <WaveBg {...WAVE_PROPS} />
      </div>

      <GlowBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[402px] flex-col items-center android-sm:max-w-none ipad:max-w-none desktop-sm:max-w-none wide-lg:max-w-none">
        <Navbar />

        {/* Figma: copy block top ~100px (= ~26px under 74px nav) */}
        <div className="flex w-full flex-1 flex-col items-center gap-8 px-4 pt-[26px] pb-12">
          <HeroContent
            onGetStarted={handleGetStarted}
            onLaunchDemo={handleLaunchDemo}
          />

          <div className="mt-auto w-full max-w-[370px]">
            <PulseStage />
          </div>
        </div>
      </div>
    </section>
  );
};
