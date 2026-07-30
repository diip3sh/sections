"use client";

import { GridBackground } from "./grid-background";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { StickerStage } from "./sticker-stage";

export const Section17Hero = () => {
  const handleExploreCreators = () => {
    window.location.hash = "#creators";
  };

  const handleViewPortfolio = () => {
    window.location.hash = "#portfolio";
  };

  const handleViewStories = () => {
    window.location.hash = "#stories";
  };

  return (
    <section
      aria-label="Creatora sticker peel hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#f5f5f5]"
    >
      {/* Full-bleed grid + atmosphere — no max-width */}
      <GridBackground />

      {/*
        Content shell: unconstrained below wide-lg;
        at wide-lg+ cap to 1440 (matches Figma artboard).
        Inner stage locks to Figma 1440×892 so sticker % positions stay true.
      */}
      <div className="relative z-10 mx-auto w-full max-w-none wide-lg:max-w-[1440px]">
        <div className="relative flex min-h-screen w-full flex-col desktop-sm:min-h-0 desktop-sm:aspect-[1440/892]">
          <StickerStage />

          <Navbar onViewStories={handleViewStories} />

          <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-4 desktop-sm:pb-[7%] desktop-sm:pt-[8%]">
            <HeroContent
              onExploreCreators={handleExploreCreators}
              onViewPortfolio={handleViewPortfolio}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
