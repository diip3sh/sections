import { CanvasWash, PageGlow, PageGrain, PatternField } from "./backdrop";
import { CornerMark } from "./corner-mark";
import { EdgeRail } from "./edge-rail";
import { GlobePanel } from "./globe-panel";
import { HeroCopy } from "./hero-copy";
import { Navbar } from "./navbar";
import { TrustedBand } from "./trusted-band";

/**
 * Figma frames:
 * - Mobile  384:2560 — 402 x 874   (65 nav + 809 body, 16px rails, 370 canvas)
 * - Tablet  384:3232 — 744 x 1133  (65 nav + 1068 body, 48px rails, 648 canvas)
 * - Desktop 384:2415 — 1280 x 832  (76 nav + 756 body, 120px rails, 1040 canvas)
 *
 * A procurement hero built as a drafting sheet: a hatched margin down each side,
 * a canvas between them carrying an arc field, the headline, a rotating word
 * globe, and a trusted-by band, with crosshairs on every panel join.
 *
 * Every frame is `rail + canvas + rail`, and the two numbers add up exactly at
 * all three widths. That is the whole layout, so it is written as the whole
 * layout — three flex items, no absolute positioning at this level. The rails
 * are the frame edge in this design, so capping the section instead would
 * strand them mid-screen with bare page outside.
 *
 * Above the desktop frame the *canvas* takes the surplus, not the rails. The
 * absurd `grow-[999]` is the point: flex hands the canvas effectively all the
 * free width until `max-w` clamps it at 1440, freezes it there, and only then
 * redistributes what is left to the two rails. So the rails hold Figma's 120px
 * until 1680 and the drawing fills the screen, rather than the composition
 * sitting in a 1040 column with 440px of hatch either side of it at 1920.
 * Past 1680 the rails widen again, which is the intended ceiling.
 *
 * Everything inside the canvas is therefore measured from a canvas edge, never
 * from 1040 (see `trusted-band.tsx` for the one place that is load-bearing).
 *
 * Below the 402 frame the split runs the other way. Flex shrink is left on the
 * canvas so it gives ground before the rails collapse, which is why the phone's
 * globe box and paragraph measure are carried as percentages of the canvas —
 * they are the only two things wide enough for the difference to show. The
 * tablet and desktop canvases never leave 648 and 1040 inside their breakpoint
 * ranges, so everything there stays in Figma's pixels.
 *
 * Height is a floor, not a height. All three frame heights are handed to `h-*`
 * with `min-h-dvh` under them, so the rails and the lit ground reach the bottom
 * of any screen rather than stopping at Figma's frame and showing bare page.
 *
 * The composition itself does not stretch with them. It is a single drawing —
 * the globe panel's top edge is the nav's bottom rule, its bottom edge is the
 * trusted-by band's top rule, and its left border runs on down as the divider
 * between the two strips — so every block stays anchored to the top of the
 * canvas at Figma's own offsets. Any block hung off the bottom instead pulls
 * away from the one above it and leaves a rule ending in mid-air. The surplus
 * therefore collects below the band, which is the one place nothing is drawn
 * across and the rails can simply carry it.
 *
 * Paint order is Figma's: grain and page glow over the whole section, the arc
 * field and canvas wash under the canvas, content above both, nav above all.
 * `isolate` keeps the grain's `screen` blend from reaching past the section.
 */
export const Section41Hero = () => (
  <main className="relative isolate flex h-[874px] min-h-dvh w-full flex-col overflow-hidden bg-[#080808] font-helvetica text-white ipad:h-[1133px] desktop-sm:h-[832px]">
    <PageGlow />
    <PageGrain />

    <Navbar />

    <div className="relative z-10 flex w-full flex-1">
      <EdgeRail side="left" />

      <div className="relative flex w-[370px] min-w-0 flex-col ipad:w-[648px] desktop-sm:w-[1040px] desktop-sm:max-w-[1440px] desktop-sm:grow-[999]">
        {/*
          Figma anchors this one to the frame's top-left canvas corner and only
          draws it on the desktop. Hung off the canvas rather than off the frame
          it stays on that corner once the rails start growing.
        */}
        <CornerMark className="top-0 left-0 z-[3] hidden -translate-x-1/2 -translate-y-1/2 desktop-sm:block" />

        <CanvasWash />
        <PatternField />

        {/*
          The copy and the globe are one band. Below the desktop they stack, and
          Figma pins both against the canvas rather than letting them flow — the
          318px / 419px between them is measured, not the sum of two auto
          heights — so the band takes the canvas height and its two children are
          absolute. At `desktop-sm:` they sit side by side in Figma's 574px row
          and the copy returns to flow.
        */}
        <div className="relative z-[1] h-[809px] ipad:h-[1068px] desktop-sm:flex desktop-sm:h-[574px] desktop-sm:px-[16px]">
          <HeroCopy />
          <GlobePanel />
        </div>

        <TrustedBand />
      </div>

      <EdgeRail side="right" />
    </div>
  </main>
);
