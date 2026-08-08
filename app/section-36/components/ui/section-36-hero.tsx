import { GridBackdrop, Rails } from "./grid-backdrop";
import { Sphere } from "./sphere";
import { Stats } from "./stats";

/**
 * Figma frames:
 * - Mobile  2402:5113 — 402 x 874
 * - iPad    2402:5508 — 744 x 1133  (`ipad:`)
 * - Desktop 2402:5993 — 1280 x 832  (`desktop-sm:`)
 *
 * A ruled page with a particle globe rising out of its bottom edge. Three things
 * stack down the middle — headline, button, stats — and everything else is
 * backdrop: the engraved grid rail to rail, grain down both margins, and the
 * glow under the globe.
 *
 * The globe is anchored to the bottom of the section rather than laid out in
 * flow, so it sits on the horizon Figma draws it on at every frame.
 *
 * Height. `<main>` takes `min-h-dvh` and everything answers to that: the grid,
 * the rails and the grain reach the bottom of any screen. The content keeps the
 * frame height as a floor and does not stretch, so the copy and the stats stay
 * where the design puts them and the surplus falls below them as ruled sheet.
 *
 * The globe is the one thing that could have taken that surplus and does not —
 * see `sphere.tsx`. It is sized from the rail-to-rail band, the dimension the
 * design actually composed against, and pinned by its crest at y440 on desktop
 * (Figma's 452, lifted 12 for a touch more presence). A tall window therefore
 * gets the same globe in the same place and simply hides more of it below the
 * fold, rather than a bigger one: driven off the section height instead, the
 * dome reached 70% of the stage width on an 1100-tall screen where the frame
 * draws 59%, and stopped reading as a horizon.
 *
 * Width. The sheet is the screen up to an ultrawide, then it caps at 1440 — the
 * rails sit 48 in from whatever edge applies. `<main>` is the one thing that
 * never caps, and it is white rather than the sheet colour: past the cap it is
 * all that shows, and the page's own `#181818` behind it read as a black band
 * either side of the design. So the sheet colour rides on the stage layer, which
 * caps with everything else, and `<main>` is the margin.
 *
 * Desktop is the only frame that sets the headline against the button; below
 * 1280 they stack, which is a `flex-col` that turns into a row rather than two
 * trees.
 */
/**
 * The stage every backdrop layer is measured from — full-bleed, until 2560.
 *
 * This design reads as a ruled sheet with no line breaks holding it to a width,
 * so the sheet is the screen; past an ultrawide the rails end up far enough
 * apart that the stats stop reading as a row, so it caps at 1440 and `<main>`
 * carries the margins. The sheet colour rides here rather than on `<main>` for
 * exactly that reason: past the cap `<main>` is all that shows, and it has to be
 * white — left on the page's own `#181818` it read as a black band either side.
 */
const STAGE_LAYER =
  "absolute inset-y-0 left-1/2 w-full -translate-x-1/2 ultrawide:max-w-[1440px]";

export const Section36Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-white">
    {/* The backdrop caps with the content rather than with the viewport. The
        rails, the grid and the globe are all measured off the same 1440 stage,
        so past the cap they stop together and the page colour is what fills the
        margins — the split `section-30` uses.

        Three layers rather than one because Figma's paint order runs grid →
        copy → rails → globe, and each of those boundaries is load-bearing: the
        rails have to cross the stats band, and the glow has to wash over the
        rails. `-translate-x-1/2` makes every wrapper a stacking context, so a
        `z-*` on something inside one of them can never reach past the copy —
        the ordering has to happen out here. */}
    <div className={`${STAGE_LAYER} bg-[#edeff3]`}>
      <GridBackdrop />
    </div>

    {/* Desktop floor is 1280, not Figma's 832. The frame height is a floor and
        this design wants a deeper sheet than the frame draws — the ruled page
        below the stats is the composition, not dead space, and 832 ran out of it
        on anything wider than the frame. Mobile and tablet keep their own frame
        heights, which are already taller than the phones they are drawn for. */}
    <div className="relative z-10 mx-auto flex w-full flex-col min-h-[874px] ultrawide:max-w-[1440px] ipad:min-h-[1133px] desktop-sm:min-h-[1280px]">
      {/* Rail to rail. The copy sits four pixels inside on the phone and eight
          above it, which is Figma's 20/56 against rails at 16/48. */}
      <div className="mx-[16px] flex flex-1 flex-col ipad:mx-[48px]">
        <header className="flex flex-col items-start gap-[24px] px-[4px] pt-[48px] ipad:px-[8px] ipad:pt-[72px] desktop-sm:flex-row desktop-sm:items-end desktop-sm:justify-between desktop-sm:gap-0 desktop-sm:pt-[100px]">
          {/*
            Tracking is Figma's -1.4 / -1.92px, which is -0.04em at both 35 and
            48 — one ratio rather than two numbers that only agree by accident.
            The break after "commerce" is the width doing it, at every frame.
          */}
          <h2 className="max-w-[292px] font-tight text-[35px] leading-[1.1] tracking-[-0.04em] text-black ipad:max-w-[431px] ipad:text-[48px]">
            Powering commerce at every scale
          </h2>

          {/*
            The button is a near-black plate with a white top sheen, a five-layer
            drop shadow and an inset rim — the rim is on an overlay span so it
            rides above the gradient rather than under it.
          */}
          <button
            type="button"
            className="relative inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-[12px] p-[12px] font-sans text-[16px] leading-[normal] font-medium tracking-[-0.02em] whitespace-nowrap text-white drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)] transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.97] motion-reduce:active:scale-100 ipad:px-[24px] ipad:py-[16px] hover:opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(38,38,38,0) 100%), linear-gradient(90deg, rgb(38,38,38) 0%, rgb(38,38,38) 100%)",
            }}
          >
            Book a Demo
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.3),inset_0px_-1.5px_0px_0px_#000000]"
            />
          </button>
        </header>

        <Stats className="mt-[25px] ipad:mt-[48px] desktop-sm:mt-[56px]" />
      </div>
    </div>

    <div className={`${STAGE_LAYER} pointer-events-none z-20`}>
      <Rails />
    </div>

    {/*
      The layer takes the section's height flat, with nothing correcting for the
      window. It used to slide up by however much the section overhung the fold,
      clamped at 77 — Figma's whole gap between the stats band (closes y375) and
      the crest (y452) — to recover the horizon on a window shorter than the 832
      floor. At a 1280 floor that overhang is no longer the exception, so the
      clamp saturated: every laptop got the full -77 as a constant, which is not
      a recovery, it is the crest moved to y363 and driven into the stats.

      Nothing has to replace it. The globe is hung off its crest and the glow off
      the globe's equator, so both sit at a fixed offset from the top of the
      section and are on screen at any window height. Only the foot of the sheet
      is below the fold now, and the foot is meant to be scrolled to.

      The layer is the frame height, not `h-full`, and that is the one cap in the
      section. `<main>` keeps `min-h-dvh` so the sheet and the grid reach the foot
      of any window — without it a window taller than the frame shows the page's
      own `#181818` as a band under the design. But the globe must not follow the
      window down. Phone and tablet anchor it to the *bottom* of this layer, so
      on `h-full` the dome rode the window foot and the surplus opened as a hole
      between the stats and the horizon: 622px of it at 375x1496. Capped, the
      horizon lands where each frame draws it and the surplus falls below it as
      ruled sheet, which is what the sheet is for.
    */}
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto h-[874px] w-full ultrawide:max-w-[1440px] ipad:h-[1133px] desktop-sm:h-[1280px]">
      <Sphere />
    </div>
  </main>
);
