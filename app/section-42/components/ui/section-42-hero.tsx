import { EmailCapture } from "./email-capture";
import { GalleryBackdrop } from "./gallery-backdrop";
import { SocialProof } from "./social-proof";

/**
 * Figma frames:
 * - Mobile  402 x 874
 * - iPad    744 x 1133  (`ipad:`)
 * - Desktop 1440 x 873  (`desktop-sm:`)
 *
 * A waitlist hero: one centred column of copy and a signup, floating over a
 * band of photo tiles that surface, hold and zoom away behind it.
 *
 * **Height is the viewport, not the frame.** All three frames are drawn at a
 * reference viewport height and centre the same column inside it — the tablet
 * and mobile frames say so outright (`top: 50%`), and desktop's `top: 263px`
 * lands within ~17px of its own frame's centre once the column's 380px is
 * measured. So none of 873 / 1133 / 874 is load-bearing: they are the heights
 * those screens happened to be. `min-h-dvh` with the column centred reproduces
 * every frame at its own height and stays right at 1200 or on a short laptop,
 * where a pinned frame height would leave bare page below.
 *
 * **The composition is re-derived, not scaled.** The source scales a fixed
 * 402/744/1440 frame by `viewport / base`, which is exact at those three widths
 * and wrong at every other one — type lands on fractional pixels, and a 1710px
 * screen renders 68px headline type at 80.75px. The measurements are all kept;
 * they are simply expressed as a capped, centred column with breakpoint
 * variants, so 1300px is a 1440 design with a narrower column rather than a
 * 90%-scale photograph of one.
 *
 * The stage runs the full viewport width. The source caps itself at 1710px, but
 * the photo band is the section's own backdrop rather than a panel inside it —
 * capping the stage would stop the band mid-screen and leave flat #f6f5f1
 * outside it on anything wider. Running full width keeps the band proportional
 * to the screen at every size. Only the copy column is capped, so the headline
 * still holds its Figma measure while the photos open up around it.
 */

/**
 * The squiggle underlines "Early Access" inside the first headline line, so it
 * is anchored to the *text* centre rather than to Figma's frame-relative left
 * edge: the headline is centred, so `left: 374px` at 1440 is only true at 1440.
 * Each offset is that left edge re-expressed as a distance from the block
 * centre — 374 + 255.166/2 - 1141/2 = -68.917 on desktop, the same arithmetic
 * at 744, and the mobile frame already states its own centre offset.
 *
 * The vertical offsets need no such treatment: 35 / 59 / 54 are measured from
 * the top of the headline, which is the block they sit in.
 */
const SQUIGGLE_BOX =
  "pointer-events-none absolute top-[35px] left-[calc(50%-31.21px)] flex h-[21.305px] w-[127.583px] -translate-x-1/2 items-center justify-center ipad:top-[59px] ipad:left-[calc(50%-63.417px)] ipad:h-[42.611px] ipad:w-[255.166px] desktop-sm:top-[54px] desktop-sm:left-[calc(50%-68.917px)]";

export const Section42Hero = () => (
  <main className="relative isolate w-full overflow-hidden bg-[#f6f5f1]">
    {/* The gutter drops to 16px below the mobile frame so the social-proof row,
        which Figma holds on one line, still clears a 320px screen. */}
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center px-[16px] py-[64px] android-sm:px-[26px] ipad:px-[50px]">
      <GalleryBackdrop />

      <div className="relative z-10 flex w-full max-w-[350px] flex-col items-center gap-[32px] ipad:max-w-[644px] ipad:gap-[40px] desktop-sm:max-w-[1141px]">
        <div className="relative flex w-full flex-col gap-[16px]">
          {/*
            No `text-balance` — the break after "Access" is drawn in all three
            frames, so it is a `<br />`, and balancing would move it. Tracking is
            one ratio rather than three numbers: Figma's -1.6px at 40px and
            -2.72px at 68px are both -0.04em, and only desktop tightens further.
          */}
          <h1
            data-keep-out="lines"
            className="w-full text-center font-instrument-serif text-[40px] leading-[1.1] tracking-[-0.04em] text-[#1a1a1a] ipad:text-[68px] desktop-sm:tracking-[-0.05em]"
          >
            Get Early Access
            <br />
            to Game Changing AI
          </h1>

          {/*
            The tablet and desktop frames hold this to two lines at a fixed
            break; the mobile frame lets the sentence wrap on its own. Figma
            gives the mobile text node 353px inside a 350px column — 3px it
            cannot have, and far too little to move a wrap — so the column
            width is what sets the break here.
          */}
          <p
            data-keep-out="lines"
            className="w-full text-center font-tight text-[16px] leading-[1.5] font-medium tracking-[-0.02em] text-[#595959] ipad:text-[17px]"
          >
            Join the exclusive group to experience Wait and create a buzz with
            our <br className="hidden ipad:block" />
            viral waitlist. Sign up now to get notified when we go live!
          </p>

          <span aria-hidden data-keep-out="box" className={SQUIGGLE_BOX}>
            {/* Figma flips and tilts one stroke rather than drawing a second
                path, and the phone reuses the desktop art at half width. */}
            <img
              src="/section-42/squiggle.svg"
              alt=""
              className="block h-auto w-full max-w-none [transform:rotate(3.7deg)_scaleY(-1)] ipad:h-[26.253px] ipad:w-[254px]"
            />
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-[16px] ipad:gap-[24px]">
          <EmailCapture />
          <SocialProof />
        </div>
      </div>
    </div>
  </main>
);
