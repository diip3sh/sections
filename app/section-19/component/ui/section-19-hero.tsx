"use client";

import StarBurst from "../originkit/starburst";
import StarDust from "../originkit/star-dust";
import { HeroContent } from "./hero-content";
import {
  HeroVisual,
  HERO_CONTENT_GAP,
  useHeroVisualLayout,
} from "./hero-visual";
import { Navbar } from "./navbar";

/** StarDust sits shorter than the glow container, pinned to the bottom. */
const STAR_DUST_HEIGHT = 80;

export const Section19Hero = () => {
  const {
    breakpoint,
    circleSize,
    maskSize,
    thunderMaskW,
    thunderMaskH,
    circleTop,
    offsetY,
    visualHeight,
    stageHeight,
  } = useHeroVisualLayout();

  const isDesktop = breakpoint === "desktop";

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

      {/* Sticky bottom glow + star dust — soft top fade; shorter on ipad / desktop */}
      {/* Sticky bottom glow + star dust — radial mask softens edges from bottom center */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-15 flex h-[250px] items-end justify-center overflow-hidden ipad:h-[150px] desktop-sm:h-[170px]"
      >
        <img
          src="/section-19/bottom-glow.png"
          alt=""
          width={1440}
          height={210}
          className="absolute inset-x-0 bottom-0 mx-auto h-[210px] w-full object-cover object-bottom mix-blend-screen mask-radial-[90%_100%] mask-radial-from-20% mask-radial-to-75% mask-radial-at-bottom mask-no-repeat desktop-sm:h-[150px]"
        />
        <div
          className="absolute inset-x-0 bottom-0 w-full overflow-hidden opacity-50 mask-radial-[90%_100%] mask-radial-from-40% mask-radial-to-95% mask-radial-at-bottom mask-no-repeat ipad:opacity-40 desktop-sm:opacity-45"
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

      <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-100.5 flex-col ipad:max-w-none desktop-sm:max-w-[1440px]">
        <Navbar />

        <div className="relative flex flex-1 flex-col items-center desktop-sm:block">
          {/*
            Mobile/tablet: in-flow stage reserves space under the visual.
            Desktop: absolute so content can sit left while the orb stays center-right.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative w-full shrink-0 overflow-visible desktop-sm:absolute desktop-sm:inset-x-0 desktop-sm:top-0 desktop-sm:h-full"
            style={{ height: isDesktop ? undefined : stageHeight }}
          >
            <div
              className="absolute inset-x-0 overflow-visible desktop-sm:left-1/2 desktop-sm:w-full desktop-sm:max-w-[720px] desktop-sm:-translate-x-[12%] desktop-sm:translate-y-[-10%]"
              style={{
                top: offsetY,
                height: visualHeight,
              }}
            >
              <HeroVisual
                circleSize={circleSize}
                maskSize={maskSize}
                thunderMaskW={thunderMaskW}
                thunderMaskH={thunderMaskH}
                circleTop={circleTop}
              />
            </div>
          </div>

          <div
            className="mt-auto flex w-full flex-col items-center pb-10 desktop-sm:relative desktop-sm:mt-0 desktop-sm:h-full desktop-sm:min-h-[calc(100svh-88px)] desktop-sm:items-stretch desktop-sm:px-[134px] desktop-sm:pt-[79px] desktop-sm:pb-[72px]"
            style={{ paddingTop: isDesktop ? undefined : HERO_CONTENT_GAP }}
          >
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
