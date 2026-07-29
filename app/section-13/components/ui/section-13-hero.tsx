"use client";

import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { RingStage } from "./ring-stage";
import { TexturedBackground } from "./textured-background";

export const Section13Hero = () => {
  const handleExploreArtists = () => {
    window.location.hash = "#artists";
  };

  const handleListenNow = () => {
    window.location.hash = "#listen";
  };

  const handleStartListening = () => {
    window.location.hash = "#start";
  };

  return (
    <section
      aria-label="Lyrista artist ring gallery"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#901214] ipad:h-auto ipad:overflow-visible desktop-sm:h-screen desktop-sm:overflow-hidden"
    >
      {/* Full-bleed — red + gravity cover the whole viewport, including wide-lg */}
      <TexturedBackground />

      {/* Content only — capped at Figma artboard width */}
      {/* <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-none wide-lg:max-w-[1440px] flex-col desktop-sm:h-full desktop-sm:min-h-0"> */}
      <Navbar onStartListening={handleStartListening} />

      <div className="relative flex min-h-0 flex-1 flex-col items-center gap-8 overflow-hidden px-4 pb-8 ipad:gap-12 ipad:overflow-visible ipad:px-0 ipad:pb-12 desktop-sm:absolute desktop-sm:inset-0 desktop-sm:gap-0 desktop-sm:overflow-visible desktop-sm:px-0 desktop-sm:pb-0">
        <HeroContent
          onExploreArtists={handleExploreArtists}
          onListenNow={handleListenNow}
        />

        <RingStage />
      </div>
      {/* </div> */}
    </section>
  );
};
