"use client";

import { GlowBackground } from "./glow-background";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { PixelBackground } from "./pixel-background";
import { PrismStage } from "./prism-stage";

export const Section16Hero = () => {
  const handleExploreAi = () => {
    window.location.hash = "#explore";
  };

  const handleContactSales = () => {
    window.location.hash = "#contact";
  };

  return (
    <section
      aria-label="Digup AI hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#091009]"
    >
      {/* Soft green atmosphere — matches Figma better than a hard linear gradient */}
      <GlowBackground />
      <PixelBackground />
      <PrismStage />

      {/* pointer-events-none so PrismStage (z-0) can receive hover; re-enable on UI */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen w-full flex-col items-center">
        <div className="pointer-events-auto w-full">
          <Navbar />
        </div>

        {/* Figma: copy block top ~263px under 63px nav ≈ ~200px content offset */}
        <div className="mt-33 flex w-full flex-1 flex-col items-center pb-12 max-w-[402px] ipad:max-w-[520px]">
          <HeroContent
            onExploreAi={handleExploreAi}
            onContactSales={handleContactSales}
          />
        </div>
      </div>
    </section>
  );
};
