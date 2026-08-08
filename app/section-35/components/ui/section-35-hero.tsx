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
 * Height is two decisions, and here they land on the same box from opposite
 * sides. The rails are this section's pattern — they are the `border-x` of the
 * frame, not a separate layer — so the frame has to run the full height of the
 * screen, and it grows with `<main>`. What must not grow is the content inside
 * it: the bands carry Figma's own heights (605 / 746 / 453 for the portrait
 * band), and each frame height is kept as a floor so a short viewport still
 * gets the design. Surplus therefore collects as framed space under the steps,
 * with the rails running past it to the bottom edge.
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
        <Navbar />

        {/*
          The band takes Figma's height rather than the leftover space. The
          rails are the `border-x` of the frame around it, and a rail is pattern
          — it has to reach the bottom of the screen — so the frame is the piece
          that grows. If the band grew with it the portrait stretched with the
          viewport; fixing the band sends the surplus to framed space under the
          steps instead, which is where the design leaves it.
        */}
        <div
          className={`flex h-[605px] shrink-0 flex-col border-b ${RULE} ipad:h-[746px] desktop-sm:h-[453px] desktop-sm:flex-row`}
        >
          {/* The portrait hangs off the left rail with no gutter — Figma starts
              it at x80 on the desktop frame, flush with the rail, where every
              other block is inset 41. It is centred in its band below 1280. */}
          <div
            className={`flex flex-1 justify-center overflow-hidden border-b ${RULE} desktop-sm:w-[510px] desktop-sm:flex-none desktop-sm:border-b-0`}
          >
            {/*
              `contain` fits the whole 1024x1536 source, which means the live
              canvas draws the figure all the way down to the chest while Figma
              crops it — its shoulders run off the bottom of the band and only
              the head really reads. The offset pushes the same amount back out
              of frame, and it is a percentage of the band rather than a pixel
              count so the crop holds as the band re-pitches and as it grows on
              a tall viewport. The band clips it; the top of the canvas is
              transparent there, so nothing opens up above.
            */}
            {/*
              The canvas box is deliberately bigger than the cell that clips it
              — `ZOOM` above the cell in both axes — which is what enlarges the
              figure. It is a box change rather than a `scale`, because the glyph
              count is fixed at 93: a wider box spends those 93 columns over more
              pixels and redraws the art larger and still crisp, where a
              transform would resample the canvas and soften every glyph.
            */}
            <div className="relative h-[128%] w-[128%] shrink-0 ipad:w-[573px] desktop-sm:w-[653px]">
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
  </main>
);
