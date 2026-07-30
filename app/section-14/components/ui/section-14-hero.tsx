"use client";

import { GlowBackground } from "./glow-background";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { PulseStage } from "./pulse-stage";

export const Section14Hero = () => {
  const handleGetStarted = () => {
    window.location.hash = "";
  };

  const handleLaunchDemo = () => {
    window.location.hash = "";
  };

  return (
    <section
      aria-label="Agentic AI platform hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#161616]"
    >
      <GlowBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full  flex-col items-center">
        <Navbar />

        {/* Figma: copy block top ~100px (= ~26px under 74px nav) */}
        <div className="flex w-full flex-col items-center gap-8 px-4 pt-6.5 desktop-sm:pt-[88px]">
          <HeroContent
            onGetStarted={handleGetStarted}
            onLaunchDemo={handleLaunchDemo}
          />

          <div className="my-[31px] w-full ">
            <PulseStage />
          </div>
        </div>
      </div>
    </section>
  );
};
