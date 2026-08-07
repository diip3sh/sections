import { AccretionDisk } from "./accretion-disk";
import { Backdrop } from "./backdrop";
import { Corners } from "./corners";
import { LogoStrip } from "./logo-strip";
import { Navbar } from "./navbar";

/**
 * Figma frames:
 * - Mobile  2405:6315 — 402 x 848
 * - iPad    2405:6397 — 744 x 1063  (`ipad:`)
 * - Desktop 2405:6487 — 1280 x 832  (`desktop-sm:`)
 *
 * A black hero with the copy at the top, the partner strip at the foot and an
 * accretion disk turning between them. Desktop sets the two stat boxes against
 * the copy on one row; below 1280 they drop underneath the buttons, which is a
 * `flex-col` that becomes a row rather than two trees.
 *
 * The disk is a backdrop layer, not a block in the column — Figma overlaps it
 * with both the copy above and the strip below, which is the whole look. It is
 * anchored to the bottom for the same reason the strip is: its foot lands on the
 * strip at every frame, so growth has to open between the copy and the disk, not
 * push the disk through the strip.
 *
 * Height is two decisions. `<main>` takes `min-h-dvh` so the hatch, the rails and
 * the plume reach the bottom of any screen; the content column takes the frame
 * height as its own floor, less the nav above it (57 / 57 / 59), so the section
 * lands on Figma's 848 / 1063 / 832 and stops there. A taller viewport adds
 * backdrop below the strip rather than opening the gaps the design fixes.
 *
 * Everything is measured from the rails at 16 / 48, which the stage caps with at
 * 1440 — the split `section-30` uses.
 */

/** Content sits 8px inside the rails at every frame — Figma's 24 / 56. */
const GUTTER = "px-[24px] ipad:px-[56px]";

/** Both CTAs share everything but their fill — Figma 2405:6535/6537. */
const CTA =
  "inline-flex items-center justify-center px-[6px] py-[8px] font-geist-mono text-[16px] leading-[normal] tracking-[-0.06em] whitespace-nowrap cursor-pointer touch-manipulation transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90";

const STATS = [
  { value: "90%", label: "Retrieval accuracy" },
  { value: "35M+", label: "Documents indexed" },
];

export const Section33Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-black">
    {/* Hatch, rails and plume are pattern — they run the full height of the
        section, however tall the screen is. */}
    <div className="absolute inset-y-0 left-1/2 w-full max-w-[1440px] -translate-x-1/2">
      <Backdrop />
    </div>

    {/*
      The disk is not pattern, and it cannot hang off the screen the way the
      backdrop does. Figma's box is 370x297 / 647x520 / 673x540 with its foot
      128 / 144 / 114 above the frame edge — where the logo strip starts — so it
      is anchored to the bottom of a box that *is* the frame height. Measured off
      the viewport instead, the disk slid down with every extra pixel of screen
      and left the strip behind.
    */}
    <div className="pointer-events-none absolute top-0 left-1/2 h-[848px] w-full max-w-[1440px] -translate-x-1/2 ipad:h-[1063px] desktop-sm:h-[832px]">
      <AccretionDisk className="bottom-[128px] h-[297px] w-[370px] ipad:bottom-[144px] ipad:h-[520px] ipad:w-[647px] desktop-sm:bottom-[114px] desktop-sm:h-[540px] desktop-sm:w-[673px]" />
    </div>

    <Navbar />

    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col min-h-[791px] ipad:min-h-[1006px] desktop-sm:min-h-[773px]">
      <div
        className={`flex flex-col items-start gap-[24px] ${GUTTER} mt-[43px] ipad:mt-[63px] desktop-sm:mt-[64px] desktop-sm:flex-row desktop-sm:items-center desktop-sm:justify-between desktop-sm:gap-[16px]`}
      >
        <div className="flex flex-col items-start gap-[24px] desktop-sm:max-w-[682px] desktop-sm:gap-[32px]">
          <div className="flex flex-col items-start gap-[8px] desktop-sm:gap-[16px]">
            <div className="flex flex-col items-start gap-[4px] font-geist-mono desktop-sm:gap-[8px]">
              {/*
                Tracking is Figma's -0.24 / -1.92px on the eyebrow and headline,
                which is -0.02em and -0.06em at every size the two take. Stating
                the ratio keeps both right between the breakpoints, where a px
                value tuned for one size is not.
              */}
              <p className="text-[12px] leading-[1.1] tracking-[-0.02em] text-[#f40] ipad:text-[16px]">
                Connect Slack, Notion, GitHub, and more.
              </p>
              <h1 className="text-[32px] leading-[1.2] tracking-[-0.06em] text-white ipad:text-[40px] desktop-sm:text-[44px] lg:max-w-[659px]">
                The Intelligence Layer Powering Every AI Decision
              </h1>
            </div>
            <p className="max-w-[584px] font-tight text-[14px] leading-[1.5] text-white opacity-60 ipad:text-[16px]">
              Transform scattered company knowledge into a single source of
              truth, enabling AI agents to understand your business before
              taking action.
            </p>
          </div>

          <div className="flex items-center gap-[8px]">
            <button type="button" className={`bg-[#f40] text-white ${CTA}`}>
              Book a Demo
            </button>
            <button type="button" className={`bg-white text-black ${CTA}`}>
              Get Started
            </button>
          </div>
        </div>

        {/* The boxes stretch to share the row on the phone and sit to their own
            width from `ipad:` up, which is what Figma draws. */}
        <dl className="flex w-full items-stretch gap-[16px] desktop-sm:w-auto desktop-sm:shrink-0">
          {STATS.map(({ value, label }) => (
            <div
              key={value}
              className="relative flex min-w-0 flex-1 flex-col items-start gap-[4px] border border-solid border-white/10 bg-black/25 px-[16px] py-[8px] ipad:flex-none ipad:px-[20px] ipad:py-[12px]"
            >
              <dt className="w-full font-geist-mono text-[20px] leading-[1.2] tracking-[-0.03em] text-white opacity-80 ipad:text-[24px]">
                {value}
              </dt>
              <dd className="w-full font-tight text-[14px] leading-[1.5] text-white opacity-60 ipad:text-[16px]">
                {label}
              </dd>
              <Corners size="size-3" inset="-1px" />
            </div>
          ))}
        </dl>
      </div>

      {/* The disk lives in this gap. */}
      <div aria-hidden className="flex-1" />

      <div className="mx-[16px] ipad:mx-[48px]">
        <LogoStrip />
      </div>

      {/* Figma leaves the strip clear of the frame's bottom edge. */}
      <div
        aria-hidden
        className="h-[48px] shrink-0 ipad:h-[72px] desktop-sm:h-[48px]"
      />
    </div>
  </main>
);
