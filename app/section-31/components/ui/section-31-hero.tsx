import { BlackHoleVisual } from "./black-hole-visual";
import { GridFrame, GridRails } from "./grid-frame";
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
 *
 * Height is two decisions, not one. `<main>` takes `min-h-dvh` so the page runs
 * to the bottom of any screen. The stage inside it keeps each frame's own height
 * and does not grow with the viewport: 811 is
 * shorter than most laptops, but the answer is background below the design, not
 * a design stretched to fill the gap — stretching pulled the nav, stats and
 * brand bands off the spacing Figma draws between them. The middle band is
 * transparent to the pointer so it cannot swallow nav clicks.
 */
export const Section31Hero = () => (
  <main className="animate-hero-reveal relative isolate min-h-dvh w-full overflow-hidden bg-[#0a0a0a]">
    {/*
      Rails first, grid second — the order is load-bearing. Every crossing marker
      lives in `GridFrame` and draws its own bright vertical bar over the rail it
      sits on; that bar is what makes a marker read as a plus rather than a dash.
      With the rails painting last they covered it, and the half-plusses at the
      rails lost their stem entirely.
    */}
    <GridRails />

    <div className="relative h-[1233px] w-full ipad:h-[1330px] desktop-sm:h-[811px]">
      {/*
        The horizontal grid belongs to the stage, not to the screen. Every rule
        in it is placed against a frame y and two of them are measured from the
        bottom — they are the rules the stats row and the brand marquee sit on.
        Running the grid the full height of `<main>` pushed that closing pair
        down to the bottom of the viewport, away from the bands they rule.

        The vertical rails are the opposite case and hang off `<main>` instead;
        see `GridRails`.
      */}
      <GridFrame />

      <div className="relative z-10 mx-auto h-full w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1440px]">
        <Navbar />

        <div className="pointer-events-none absolute inset-0 desktop-sm:top-[173px] desktop-sm:bottom-[168px]">
          <HeroContent />
          <BlackHoleVisual />
        </div>

        <StatsRow />
        <LogoMarquee />
      </div>
    </div>
  </main>
);
