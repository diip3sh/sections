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
 * the rails and the grain reach the bottom of any screen. The design itself is
 * `--section-h` — Figma's 832 as a floor, the window past that, and a stop at
 * 1141 — and the copy and the stats stay where the design puts them, with the
 * surplus falling below as ruled sheet.
 *
 * That one number is also what lets the globe be cut in half. Figma's frame
 * closes exactly on the equator (crest y452 + a 380 radius = the 832 foot), so
 * the globe hangs off the foot of the section by half its diameter and shows its
 * top half at every width — see `sphere.tsx`. It needs the foot to be a real
 * edge, which is what the cap gives it: unbounded, `min-h-dvh` handed the
 * section whatever the window had and the horizon drifted with it.
 *
 * The globe is sized from the rail-to-rail band, the dimension the design
 * actually composed against, rather than from that height. Driven off height it
 * asked for 70% of the stage width on an 1100-tall screen where the frame draws
 * 59%, and stopped reading as a horizon.
 *
 * Width. Only the copy caps. The sheet, the grid, the grain and the rails are
 * the page itself and run edge to edge at every width — a ruled sheet that stops
 * short of the screen is a card, which is not what this design is — so the rails
 * sit 48 in from the viewport, wherever it ends. The headline, the button and
 * the stats cap at 1440 past an ultrawide, where the rails would otherwise pull
 * the three stats far enough apart to stop reading as a row.
 *
 * The globe goes with the rails rather than with the copy: it is tangent to
 * them, clipped by them, and its diameter is a share of the band they leave.
 *
 * Desktop is the only frame that sets the headline against the button; below
 * 1280 they stack, which is a `flex-col` that turns into a row rather than two
 * trees.
 */
/**
 * The stage every backdrop layer is measured from — full-bleed at every width.
 *
 * This design reads as a ruled sheet with no line breaks holding it to a width,
 * so the sheet is the screen and nothing about the pattern caps: a grid that
 * stops at 1440 with page colour either side turns the sheet into a card. The
 * cap belongs to the copy alone, which is where it sits.
 */
const STAGE_LAYER = "absolute inset-y-0 left-1/2 w-full -translate-x-1/2";

export const Section36Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-white [--section-h:clamp(832px,100dvh,1141px)]">
    {/* The backdrop answers to the viewport, not to the content cap — the sheet,
        the grid, the grain, the rails and the globe are one pattern and all five
        are measured off the same full-bleed stage.

        Three layers rather than one because Figma's paint order runs grid →
        copy → rails → globe, and each of those boundaries is load-bearing: the
        rails have to cross the stats band, and the glow has to wash over the
        rails. `-translate-x-1/2` makes every wrapper a stacking context, so a
        `z-*` on something inside one of them can never reach past the copy —
        the ordering has to happen out here. */}
    <div className={`${STAGE_LAYER} bg-[#edeff3]`}>
      <GridBackdrop />
    </div>

    {/* Desktop follows the window between Figma's 832 and 1141 rather than
        sitting on either bound. The frame height is a floor and this design
        wants a deeper sheet than the frame draws — the ruled page below the
        stats is the composition, not dead space — but the sheet cannot open
        without limit either: the globe is cut in half by the foot of the
        section, so the foot is a composed edge and every pixel it gains is a
        pixel of gap between the stats and the horizon. Mobile and tablet keep
        their own frame heights, which are already taller than the phones they
        are drawn for. */}
    <div className="relative z-10 mx-auto flex w-full flex-col min-h-[874px] ultrawide:max-w-[1440px] ipad:min-h-[1133px] desktop-sm:min-h-[var(--section-h)]">
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
      floor. Once the floor went past 832 that overhang stopped being the
      exception and the clamp saturated: every laptop got the full -77 as a
      constant, which is not a recovery, it is the crest driven into the stats.

      Nothing has to replace it. Every frame hangs the globe off the *bottom*
      edge of this layer — the layer is the horizon — so all the correcting there
      is to do is deciding what that edge is.

      Desktop takes the window whenever the window is the taller of the two. The
      horizon is the one line in this design that reads as the foot of the page,
      and a layer stopped at the 1141 cap put it 100-400px above the fold with
      ruled sheet showing underneath, which reads as the dome floating rather
      than rising out of the bottom edge. `--section-h` still floors it at 832,
      so a window shorter than the frame gets Figma's own horizon and cuts it
      off, rather than sliding the globe up into the copy.

      What this costs is the gap between the stats and the crest, which now grows
      with the window: about 550px of ruled sheet on a 1500-tall screen against
      Figma's 77. The sheet is what the surplus is meant to fall into, and the
      globe itself no longer grows past a 1020-tall window — see `sphere.tsx` —
      so the dome cannot swallow the copy on the way down.

      The two stacked frames keep their own fixed heights. There the layer must
      not follow the window: on `h-full` the dome rode the foot of a phone that
      is far taller than the frame, and the surplus opened as a hole between the
      stats and the horizon — 622px of it at 375x1496.
    */}
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto h-[874px] w-full ipad:h-[1133px] desktop-sm:h-[max(var(--section-h),100dvh)]">
      <Sphere />
    </div>
  </main>
);
