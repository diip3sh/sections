import { Backdrop, DotField } from "./backdrop";
import { LineField } from "./line-field";
import { Navbar } from "./navbar";

/**
 * Figma frames:
 * - Mobile  2410:6613 — 402 x 874
 * - iPad    2410:6684 — 744 x 1068  (`ipad:`)
 * - Desktop 2410:6747 — 1440 x 868  (`desktop-sm:`)
 *
 * One centred column — badge, headline, sub, two buttons — over a fan of amber
 * lines sweeping up from the bottom edge, with two shafts of light raking in
 * from the top corners.
 *
 * The fan is a backdrop layer rather than a block in the column, because Figma
 * runs it behind the copy at every frame — a 1440x920 plate over the whole
 * desktop frame, an 897x573 one hanging off both edges of the phone. It is
 * anchored to the bottom so a taller viewport opens sky above the copy instead
 * of pushing the crest off the fold.
 *
 * Height is two decisions, the same split sections 30-36 use. `<main>` takes
 * `min-h-dvh` so the rakes and the dot field reach the bottom of any screen. The
 * band under it does not follow: it carries the frame height less the nav above
 * it (60 / 64 / 80) as its own height — 814 / 1004 / 788 — and stops there. Let
 * it track the viewport and the composition stretches, and since the band
 * centres its contents that walks the copy down the page: 788 tall at the
 * desktop frame, 1320 at a 1400 screen, with the headline drifting away from the
 * crest it is composed against.
 *
 * The column is centred in what is left between the nav and the crest, which is
 * how Figma places it at each frame without any of its y values being written
 * down here.
 */

/** Both buttons share their box; only the fill and the trailing chip differ. */
const BUTTON =
  "inline-flex h-[48px] shrink-0 cursor-pointer touch-manipulation items-center justify-center font-manrope text-[14px] leading-[1.5] font-semibold tracking-[-0.03em] whitespace-nowrap text-white transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 hover:opacity-90";

export const Section37Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-[#020202]">
    {/* The fan hangs off both edges — Figma's plate is 2.2x the phone frame's
        width — so it is sized from the section rather than capped with it.

        Height comes from `inset-y-0`, not `h-full`. The section sets only a
        `min-height`, so its used height is `auto` as far as percentage
        resolution goes and `h-full` collapses the box to zero — which takes the
        canvas with it and leaves the fan invisible. */}
    <Backdrop />
    <DotField />

    <Navbar />

    {/* The fan and the copy are one band, because they are composed against each
        other — the headline sits just above the crest. Sized separately they
        come apart: on a 4K screen at 100% the column stops at its floor near the
        top while the fan, taking the whole viewport, drops its crest a thousand
        pixels below it.

        The band hangs off the bottom (`mt-auto`) rather than being centred. The
        fan is bottom-anchored art — a taller viewport is meant to open sky above
        the copy, not a strip of bare black beneath the crest — so the band ends
        where the screen does and the surplus goes above it, where the rakes and
        the dot field already are.

        Its height is Figma's rather than the screen's: the frame height less the
        nav, so 814 / 1004 / 788. Tracking `dvh` stretched the composition — the
        band grew, the copy centres in it, and the headline walked down away from
        the crest it is composed against, ending a couple of hundred pixels low
        on a tall monitor with a black gap under the nav where it used to be. A
        ceiling only moves where that starts; holding the design's height keeps
        the copy and the crest together at every viewport, and the surplus stays
        in the backdrop, which is the one layer that can take it.

        `min()` against the room under the nav is the other half. Figma's height
        is what the band wants, but a window shorter than the frame cannot give
        it: the band would overflow the fold and the copy would centre against a
        band taller than the screen, dropping the crest and the lower half of the
        copy below it. A wide but short window sits exactly there. So the band
        takes Figma's height wherever there is room for it and yields to the
        space available otherwise — and carries no `min-height`, which would only
        fight that.

        Height is stated in `dvh` minus the nav, not as a percentage. `<main>`
        carries only a `min-height`, so its used height counts as `auto` when a
        percentage resolves against it — `h-full` here silently became `auto` and
        left the band at its content height at every viewport. Same trap the fan
        hits with `h-full`, one level up.

        The fan carries `-z-10`. Its canvas is opaque and none of these layers
        set a z-index — they stacked by source order, with the fan first. Inside
        the band it now comes last and would paint over the rakes and dots it is
        supposed to sit under. Stating the layer beats relying on tag order. */}
    <div className="relative mt-auto h-[min(814px,calc(100dvh-60px))] w-full ipad:h-[min(1004px,calc(100dvh-64px))] desktop-sm:h-[min(788px,calc(100dvh-80px))]">
      <LineField className="-z-10 inset-x-[-60%] inset-y-0 ipad:inset-x-[-20%] desktop-sm:inset-x-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[24px] pb-[18%] ipad:px-[48px] desktop-sm:pb-[14%]">
        <p className="relative inline-flex shrink-0 items-center gap-[6px] rounded-[100px] border border-solid border-[#4d3819] bg-[rgba(133,93,32,0.1)] py-[6px] pr-[14px] pl-[8px] font-manrope text-[14px] leading-[1.5] text-white/80 capitalize shadow-[inset_0px_0px_4px_0px_rgba(59,43,19,0.4)] backdrop-blur-[10px]">
          <img
            src="/section-37/icon-ai.svg"
            alt=""
            aria-hidden
            className="block size-[18px] max-w-none"
          />
          AI Workflow Intelligence
        </p>

        {/*
        Tracking is Figma's -1.44 / -2.56px at 36 and 64px, which is -0.04em at
        both — one ratio rather than two numbers that only agree by accident.
        The break after "for" is the column width doing it at every frame.
      */}
        <h1 className="mt-[16px] max-w-[356px] text-center font-instrument-serif text-[36px] leading-[1.12] tracking-[-0.04em] text-white ipad:mt-[24px] ipad:max-w-[560px] ipad:text-[52px] desktop-sm:max-w-[671px] desktop-sm:text-[64px]">
          The Operating System for Autonomous Work.
        </h1>

        <p className="mt-[16px] max-w-[253px] text-center font-manrope text-[12px] leading-[1.5] text-white capitalize ipad:mt-[20px] ipad:max-w-[471px] ipad:text-[16px]">
          Connect your apps, orchestrate intelligent agents, and automate
          complex operations with enterprise-grade reliability
        </p>

        <div className="mt-[28px] flex items-center gap-[20px] ipad:mt-[36px]">
          <button
            type="button"
            className={`gap-[8px] rounded-[10px] bg-[#d78715] px-[18px] ${BUTTON}`}
          >
            Start Building
            {/*
            The trailing chip is a white plate with its own bevel — a top sheen
            and a dark bottom rim inside a three-layer drop shadow. The rim sits
            on an overlay span so it rides above the gradient, not under it.
          */}
            <span
              aria-hidden
              className="relative flex size-[28px] shrink-0 items-center justify-center rounded-[7px] bg-white shadow-[0px_5px_5px_0px_rgba(0,0,0,0.2),0px_3px_3px_0px_rgba(0,0,0,0.3),0px_1px_1px_0px_rgba(0,0,0,0.5)]"
            >
              <span className="absolute inset-0 rounded-[7px] bg-linear-to-b from-white/30 to-black/20" />
              <img
                src="/section-37/icon-arrow.svg"
                alt=""
                className="relative block size-6 max-w-none"
              />
              <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_3px_3px_0px_rgba(255,255,255,0.25),inset_0px_1px_1px_0px_rgba(255,255,255,0.5)]" />
            </span>
          </button>

          <button
            type="button"
            className={`rounded-[16px] bg-[#27231e] px-[24px] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] ${BUTTON}`}
          >
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  </main>
);
