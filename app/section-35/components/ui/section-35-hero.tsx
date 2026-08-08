import { AsciiPortrait } from "./ascii-portrait";
import { Navbar } from "./navbar";
import { Steps } from "./steps";

/**
 * Figma frames:
 * - Mobile  2394:4946 — 402 x 874
 * - iPad    2394:5000 — 744 x 1068  (`ipad:`)
 * - Desktop 2394:5054 — 1440 x 831  (`desktop-sm:`)
 *
 * The design is a ruled frame: two vertical rails inset from the page and a set
 * of horizontal rules cutting it into bands. Figma draws those as loose lines —
 * five of them, and on the phone as one flattened SVG — but they are the edges
 * of the bands, so here each band simply carries its own border and the rails
 * are the `border-x` of the box that holds the stack. That is also what makes
 * one tree cover three layouts: below 1280 the portrait and the copy are two
 * stacked bands with a rule between them, and at 1280 they become two columns of
 * a single band, which is the same markup with `desktop-sm:flex-row` and the
 * middle rule switched off.
 *
 * Height is two decisions, and here they land on two different boxes. The rails
 * are this section's pattern — they are the `border-x` of the frame, not a
 * separate layer — so the frame runs the full height of the screen and grows
 * with `<main>`. The band stack inside it is the design, and it follows the
 * viewport only as far as 1142: past that the bands are further apart than any
 * of the three frames draws them and the section reads as three strips rather
 * than one screen. Each frame height stays a floor, so a short viewport still
 * gets the design at Figma's own numbers.
 *
 * The surplus in between goes to the portrait band, which is the one band that
 * is mostly air — the nav and the steps are their content plus padding, and
 * spreading them was what made the earlier full-height version read wrong. The
 * portrait itself does not take the surplus: its canvas box keeps the height
 * Figma gives it and centres in the taller band, so the figure stays the size
 * the design draws while the framed space around it opens up. Above 1142 the
 * remainder collects as framed space under the steps, with the rails running
 * past it to the bottom edge.
 *
 * Past 1440 the stage caps and the rails come with it, the way `section-30`
 * splits — there is nothing here that wants to keep growing, and the page
 * colour is the only thing outside the rails to begin with.
 */

/**
 * Figma fills the frame `#1d1d1d`, but the frame renders `#232323` with a ±2
 * dither — a grain layer the export folds away. The mean is what every other
 * value in the design was judged against (the rules measure white at 0.16 over
 * *this*, not over #1d1d1d), so the mean is what is used; the texture itself is
 * under a percent of a level and not worth a tiled PNG.
 */
const PAGE = "bg-[#232323]";

/** Every rule and rail: Figma strokes white at 0.16, and the frame measures it. */
const RULE = "border-solid border-white/16";

export const Section35Hero = () => (
  <main
    className={`animate-hero-reveal relative flex min-h-dvh w-full flex-col ${PAGE}`}
  >
    <div className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col min-h-[874px] ipad:min-h-[1068px] desktop-sm:min-h-[831px]">
      <div
        className={`mx-[11px] flex flex-1 flex-col border-x ${RULE} ipad:mx-[62px] desktop-sm:mx-[80px]`}
      >
        {/*
          The cap belongs to the bands, not to the frame — the frame carries the
          rails and has to reach the bottom of the screen. `contents` dissolves
          this box below 1280, where the stacked frames are already taller than
          the viewports they run on and there is no surplus to place.
        */}
        <div className="contents desktop-sm:flex desktop-sm:max-h-[1142px] desktop-sm:flex-1 desktop-sm:flex-col">
          <Navbar />

          {/*
            The band carries Figma's height at every frame, and from 1280 up it
            is also the band that takes the surplus: `grow` against a `h-[453px]`
            basis opens it from 453 to whatever the capped stack leaves, while
            the nav and the steps keep the heights their content and padding
            give them. Below 1280 the band is fixed and the surplus stays under
            the steps, since those frames are taller than their viewports.
          */}
          <div
            className={`flex h-[605px] shrink-0 flex-col border-b ${RULE} ipad:h-[746px] desktop-sm:h-[453px] desktop-sm:grow desktop-sm:flex-row`}
          >
            {/* The portrait hangs off the left rail with no gutter — Figma starts
                it at x80 on the desktop frame, flush with the rail, where every
                other block is inset 41. It is centred in its band below 1280. */}
            <div
              className={`flex flex-1 justify-center overflow-hidden border-b ${RULE} desktop-sm:w-[510px] desktop-sm:flex-none desktop-sm:border-b-0`}
            >
              {/*
                `contain` fits the whole 1024x1536 source, which means the live
                canvas draws the figure all the way down to the chest while
                Figma crops it — its shoulders run off the bottom of the band
                and only the head really reads. The offset pushes the same
                amount back out of frame, and it is a percentage of the band
                rather than a pixel count so the crop holds as the band
                re-pitches and as the band grows. The band clips it; the top of
                the canvas is transparent there, so nothing opens up above.

                The canvas box is deliberately bigger than the cell that clips
                it — in both axes — which is what enlarges the figure. It is a
                box change rather than a `scale`, because the glyph count is
                fixed at 93: a wider box spends those 93 columns over more
                pixels and redraws the art larger and still crisp, where a
                transform would resample the canvas and soften every glyph.

                Desktop zooms further than the stacked frames, which is a
                deliberate departure from the Figma render — that one fits the
                whole source, so the figure reads small against a 68px headline.
                The box takes the source's own 1024x1536 there, so the art fills
                it edge to edge and one number moves both axes; Figma's 653x580
                box was mostly empty margin either side of a `contain` fit, and
                widening that margin does nothing at all.

                155% is that number. It puts the art at 1.55 band-heights tall
                and 1.03 wide, so it overhangs the 510px cell slightly and the
                head reads across nearly the full column. Top-anchored, the
                source's y60-870 head then sits between 6% and 88% of the band
                and the shoulders enter in the last eighth — the frame the
                design wants, with the chest clipped away below. Both figures
                are ratios of the band, so the crop holds at 453 and at the 743
                the band reaches under the 1142 cap: the figure scales, the
                framing does not move.
              */}
              <div className="relative h-[128%] w-[128%] shrink-0 ipad:w-[573px] desktop-sm:aspect-[1024/1536] desktop-sm:h-[155%] desktop-sm:w-auto">
                <AsciiPortrait />
              </div>
            </div>

            {/*
              Desktop hangs this off the band's middle rather than its top: `pt`
              plus `justify-center` puts the block 20.5px below centre, which is
              exactly Figma's y208 at the frame height and keeps it there as the
              band grows. The stacked frames have a fixed band, so they stay
              top-anchored on Figma's own offset.
            */}
            <div className="flex min-h-[263px] shrink-0 flex-col justify-start px-[25px] pt-[21px] ipad:min-h-[340px] ipad:px-[48px] ipad:pt-[38px] desktop-sm:min-h-0 desktop-sm:flex-1 desktop-sm:justify-center desktop-sm:pt-[41px] desktop-sm:pr-[16px] desktop-sm:pl-[49px]">
              {/* Figma draws the badge's four corner ticks as a pair of 4x39 SVG
                exports. They are two strokes meeting at a corner, which borders
                say for nothing, and they sit a pixel outside the chip. */}
              <p className="relative flex h-[36px] w-[216px] shrink-0 items-center justify-center bg-white/10 font-geist text-[16px] leading-[24px] tracking-[0.02em] text-[#fffbf9] capitalize">
                AI Infrastructure Platform
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-px -left-px size-[4px] border-t border-l border-solid border-white/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-px -right-px size-[4px] border-t border-r border-solid border-white/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-px -left-px size-[4px] border-b border-l border-solid border-white/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-px -bottom-px size-[4px] border-r border-b border-solid border-white/50"
                />
              </p>

              {/*
              Tracking is Figma's -0.76 / -1.36px, which is -0.02em at both 38
              and 68 — stated once as the ratio so it stays right between the
              breakpoints. The line breaks after "Scale" at every width on the
              column width alone, so nothing holds it.
            */}
              <h1 className="mt-[17px] font-gemunu text-[38px] leading-[43.3px] font-medium tracking-[-0.02em] text-white ipad:mt-[13px] ipad:text-[68px] ipad:leading-[72px] max-w-[705px]">
                Build, Deploy &amp; Scale Intelligent Systems
              </h1>

              {/* The pair is 286px wide and fixed, which the 402 frame clears by
                44. It wraps rather than spilling past the rail on the narrower
                phones the design does not draw. */}
              <div className="mt-[20px] flex flex-wrap items-center gap-[16px] ipad:mt-[28px] desktop-sm:mt-[23px]">
                <button
                  type="button"
                  className="inline-flex h-[48px] w-[125px] shrink-0 cursor-pointer items-center justify-center border border-solid border-[#dbdbdb] font-geist text-[15px] leading-[21px] font-medium text-white capitalize transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                >
                  Get started
                </button>
                <button
                  type="button"
                  className="relative inline-flex h-[48px] w-[145px] shrink-0 cursor-pointer items-center justify-center bg-[#d9d9d9] font-geist text-[15px] leading-[21px] font-medium text-[#252525] capitalize shadow-[inset_0px_0px_5px_0px_rgba(249,109,9,0.1)] transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
                >
                  Launch demo
                </button>
              </div>
            </div>
          </div>

          <Steps />
        </div>
      </div>
    </div>
  </main>
);
