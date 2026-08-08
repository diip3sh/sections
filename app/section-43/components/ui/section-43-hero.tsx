import { CardCluster } from "./card-cluster";
import { DashedBand } from "./dashed-band";
import { EdgeRulers } from "./edge-rulers";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";

/**
 * Figma frames:
 * - Mobile  499:1896 — 402 x 874
 * - iPad    499:1474 — 744 x 1133  (`ipad:`)
 * - Desktop 499:1905 — 1440 x 778  (`desktop-sm:`)
 *
 * A card-issuing hero laid out like a drafting sheet: two ticked rails down the
 * margins, a dashed cell band under the nav and another along the bottom edge,
 * and the copy and the card fan in the clear space between them.
 *
 * **The page is a column, not a stack of coordinates.** Figma places all of it
 * absolutely, but read down any of the three frames and it is one flow — nav,
 * the trusted-by line, hairline, dashed band, clear space, dashed band. Every
 * y in the file falls out of that order, so it is written as a flex column and
 * the only heights stated are the ones the design actually fixes: the nav band,
 * the two dashed bands at two rows apiece (46px rows on the phone, 56 above
 * it), and the gap the trusted-by line sits in.
 *
 * **The clear band takes the surplus.** Figma's 778px desktop frame ends
 * mid-screen on a real laptop, so the column is `min-h-dvh` and the clear band
 * is the one part that grows: the two dashed bands keep their two rows, the
 * lower one stays welded to the bottom edge, and the copy and cards stay
 * centred in whatever is left. At exactly 778 that reproduces the frame; at
 * 1200 it reads as the same composition on a taller sheet rather than a hero
 * stranded above a field of grey. The band's `min-h` is Figma's own clear space
 * at each frame — 585 / 783 / 412 — so a short viewport cannot crush it either.
 *
 * **Rails and bands bleed, the composition does not.** The rails and the dashed
 * grid are the sheet and run to the screen edges at any width; the copy and the
 * fan cap and centre inside it. The dashed band's columns are a percentage, so
 * it divides into whole cells whatever width it gets.
 *
 * The desktop row is proportional rather than pixel-set: Figma's 120 / 198.6
 * margins plus a 387px column plus a 584px fan come to 1290, which does not fit
 * at 1280. Stating the margins as their share of the frame — 8.333% and 13.792%
 * — reproduces Figma exactly at its own 1440 and closes the gap evenly below it,
 * which a fixed pixel and a breakpoint jump would not.
 *
 * The cap is 1920 rather than Figma's 1440, so the row runs 480 past the frame
 * it was drawn at. Everything in it is a share except the copy column, which
 * stays at Figma's 387 because both its line breaks are hard `<br />`s — a wider
 * column would only add trailing space. So the margins and the fan scale, the
 * column does not, and the gap between column and fan takes the difference: 150
 * at 1440, 329 at 1920. That is the one proportion the extra width costs.
 */
export const Section43Hero = () => (
  <main className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-[#f5f5f2]">
    <EdgeRulers />

    <Navbar />

    {/*
      Figma holds this line on one row with a `nowrap` and a 321px box. The box
      is dropped and the band's height made a floor instead: at 12px the line
      measures ~275px and clears the phone's 280px box, but a 320px screen has
      only 240px between the rails, and a hero that overflows sideways is worse
      than one whose second line pushes the hairline down 18px.
    */}
    <p className="relative z-10 flex min-h-[48px] w-full shrink-0 items-center justify-center px-[40px] text-center font-tight text-[12px] leading-[1.5] font-medium tracking-[-0.12px] text-[#121212] opacity-60 ipad:min-h-[55px] ipad:text-[14px] ipad:tracking-[-0.14px] desktop-sm:min-h-[50px]">
      Trusted payment infrastructure for global businesses.
    </p>

    {/*
      The header hairline. Figma runs it rail-to-rail on desktop and edge-to-edge
      on the two smaller frames, which is the one thing that differs between
      them, so it is a margin and not a separate element per breakpoint. It is
      also the top edge of the band below it — that band closes each of its rows
      rather than opening them, so this line is the row-zero rule and no dashed
      rule is drawn over it.
    */}
    <span
      aria-hidden
      className="relative z-0 block h-px shrink-0 bg-[#dcdcda] desktop-sm:mx-[72px]"
    />

    <DashedBand
      edge="top"
      className="mx-[32px] h-[92px] ipad:mx-[52px] ipad:h-[112px] desktop-sm:mx-[72px]"
    />

    {/*
      Figma's clear space is 585 / 783 / 412, less the 2px the hairline and the
      band's first row take back from it — the frames overlap the grid's top
      edge onto the hairline and this column does not, so the floor is stated
      net of that and the three frames come out at exactly 874 / 1133 / 778.
    */}
    <div className="relative z-10 flex min-h-[583px] flex-1 justify-center ipad:min-h-[781px] desktop-sm:min-h-[410px]">
      {/*
        The cap lives on its own element so the row's percentage margins have
        something bounded to resolve against — percentage padding resolves
        against the containing block, not the padded element, so writing both on
        one div would measure them off the full viewport.
      */}
      <div className="flex w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-none">
        <div className="relative flex w-full flex-col items-center justify-between px-[30px] pt-[29px] pb-[36px] ipad:px-[52px] ipad:pt-[38px] ipad:pb-[53px] desktop-sm:flex-row desktop-sm:items-center desktop-sm:px-0 desktop-sm:pt-0 desktop-sm:pb-0 desktop-sm:pl-[6.333%] desktop-sm:pr-[13.792%]">
          {/*
            Figma hangs this rule off the right edge of the copy column and runs
            it the full height of the clear band — it is the column's own trailing
            rule, not a grid line, which is why it is measured from the copy and
            travels with it rather than landing on a cell boundary. Desktop only;
            neither smaller frame draws it.
          */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 hidden w-px bg-[#dcdcda] desktop-sm:block"
            style={{ left: "calc(8.333% + 387px)" }}
          />

          <HeroContent />
          <CardCluster />
        </div>
      </div>
    </div>

    <DashedBand
      edge="bottom"
      className="mx-[32px] h-[92px] ipad:mx-[52px] ipad:h-[112px] desktop-sm:h-[113px] desktop-sm:mx-[72px]"
    />
  </main>
);
