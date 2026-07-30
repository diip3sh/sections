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
      className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#f5f5f5] desktop-sm:overflow-hidden"
    >
      {/* Full-bleed grid + atmosphere — no max-width */}
      <GridBackground />

      {/*
        Content shell: unconstrained below wide-lg;
        at wide-lg+ cap to 1440 (matches Figma artboard).
        Mobile locks near Figma 402×779 so sticker % positions stay true;
        desktop locks to 1440×892.
      */}
      <div className="relative z-10 mx-auto w-full max-w-none wide-lg:max-w-[1440px]">
        <div className="relative mx-auto flex aspect-[402/779] w-full max-w-[402px] flex-col ipad:aspect-auto ipad:min-h-screen ipad:max-w-none desktop-sm:min-h-0 desktop-sm:aspect-[1440/892]">
          <StickerStage />

          <Navbar onViewStories={handleViewStories} />

          {/*
            Mobile Figma: copy block top ~290 / 779 after nav (~96).
            Leave bottom clear for the 3 stickers.
          */}
          <div className="relative z-20 flex flex-1 flex-col items-center justify-start px-[17.5px] pt-[16%] pb-[32%] ipad-landscape:justify-end ipad-landscape:pt-6 ipad-landscape:pb-4 ipad:justify-center ipad:px-4 ipad:pt-8 ipad:pb-12 desktop-sm:justify-start desktop-sm:pb-[7%] desktop-sm:pt-0 wide-lg:pt-[12%]">
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
