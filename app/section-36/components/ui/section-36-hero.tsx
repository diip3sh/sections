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
 * The globe is the reason the height model is upside down from most sections
 * here. It is anchored to the bottom, not laid out in flow, so a viewport taller
 * than the frame opens space *between* the stats and the horizon rather than
 * pushing the horizon down. The copy stays where Figma puts it, measured from
 * the top, and the frame heights are floors — `min-h-[max(100dvh, <frame>)]`,
 * one property so the two cannot fight.
 *
 * Desktop is the only frame that sets the headline against the button; below
 * 1280 they stack, which is a `flex-col` that turns into a row rather than two
 * trees. Everything spans the rails, so the stage caps at 1440 and the rails cap
 * with it — the same split `section-30` uses.
 */
/** The capped, centred stage every backdrop layer is measured from. */
const STAGE_LAYER =
  "absolute inset-y-0 left-1/2 w-full max-w-[1440px] -translate-x-1/2";

export const Section36Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-[max(100dvh,874px)] w-full flex-col overflow-hidden bg-[#edeff3] ipad:min-h-[max(100dvh,1133px)] desktop-sm:min-h-[max(100dvh,832px)]">
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
    <div className={STAGE_LAYER}>
      <GridBackdrop />
    </div>

    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
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
            className="relative inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-[12px] p-[12px] font-sans text-[16px] leading-[normal] font-medium tracking-[-0.02em] whitespace-nowrap text-white drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)] transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.97] motion-reduce:active:scale-100 ipad:px-[24px] ipad:py-[16px] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
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

    <div className={`${STAGE_LAYER} z-20`}>
      <Rails />
    </div>

    <div className={`${STAGE_LAYER} z-30`}>
      <Sphere />
    </div>
  </main>
);
