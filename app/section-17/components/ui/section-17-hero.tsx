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
      className="relative isolate min-h-dvh w-full overflow-hidden bg-[#f5f5f5] ipad:min-h-screen"
    >
      {/* Full-bleed grid + atmosphere — no max-width */}
      <GridBackground />

      {/*
        Content shell: unconstrained below wide-lg;
        at wide-lg+ cap to 1440 (matches Figma artboard).
        Mobile fills the viewport (min-h-dvh) and centres the copy + sticker
        cluster — a fixed 402×779 box left dead space on taller phones.
        Desktop still locks to the 1440×892 artboard.
      */}
      <div className="relative z-10 mx-auto w-full max-w-none wide-lg:max-w-[1440px]">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-[402px] flex-col ipad:min-h-screen ipad:max-w-none desktop-sm:min-h-0 desktop-sm:aspect-[1440/892]">
          <StickerStage />

          <Navbar onViewStories={handleViewStories} />

          {/* Copy + CTA + sticker cluster; CtaStickerSpacer reserves the sticker footprint in flow. */}
          {/* Mobile anchors the cluster to the bottom (Figma leaves 36px under
              the centre sticker); surplus height on tall phones lands above the
              headline instead of as a hole under the stickers. */}
          <div className="relative z-20 flex flex-1 flex-col items-center justify-end px-[17.5px] pt-6 pb-9 ipad-landscape:justify-end ipad-landscape:pt-6 ipad-landscape:pb-4 ipad:justify-end ipad:px-4 ipad:pt-8 ipad:pb-9 desktop-sm:justify-start desktop-sm:pb-[7%] desktop-sm:pt-0 wide-lg:pt-[12%]">
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
