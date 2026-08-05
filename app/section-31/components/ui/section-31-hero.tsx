import { BlackHoleVisual } from "./black-hole-visual";
import { GridFrame } from "./grid-frame";
import { HeroContent } from "./hero-content";
import { LogoMarquee } from "./logo-marquee";
import { Navbar } from "./navbar";
import { StatsRow } from "./stats-row";

/**
 * Figma frames:
 * - Mobile  2356:481  — 402 x 1233
 * - iPad    2356:751  — 744 x 1330  (`ipad:`)
 * - Desktop 2356:1021 — 1440 x 811  (`desktop-sm:`)
 *
 * The frame heights are load-bearing. Every rule, band and block in this design
 * is placed against a ruled grid at a fixed frame y, and the two stacked frames
 * are more than half again as tall as the desktop one because they run copy,
 * visual, stats and brands down a single column where desktop sets copy against
 * visual either side of a middle rail. So the stage carries all three heights
 * and each block is positioned into it, rather than flowed.
 *
 * The one thing that is not fixed is the visual: `BlackHoleVisual` takes its
 * width as a share of the stage, so the disc keeps its place relative to the
 * rails through the fluid stretch between 1280 and 1440 instead of hanging off
 * a number only true at 1440.
 */
export const Section31Hero = () => (
  <main className="relative isolate w-full overflow-hidden bg-[#0a0a0a]">
    <div className="relative h-[1233px] w-full ipad:h-[1330px] desktop-sm:h-[811px]">
      <GridFrame />

      <div className="relative z-10 mx-auto h-full w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1440px]">
        <Navbar />
        <HeroContent />
        <BlackHoleVisual />
        <StatsRow />
        <LogoMarquee />
      </div>
    </div>
  </main>
);
