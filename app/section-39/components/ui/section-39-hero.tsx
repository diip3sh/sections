import { AsciiFlameBand } from "./ascii-flame-band";
import { AsciiRocket } from "./ascii-rocket";
import { Button } from "./button";
import { CornerGlow } from "./corner-glow";
import { EdgeRails } from "./edge-rails";
import { Navbar } from "./navbar";
import { StarField } from "./star-field";
import {
  HERO_GUTTER,
  NAV_BOTTOM,
  NAV_HEIGHT,
  RAIL_INSET,
  TRACK_DISPLAY,
  TRACK_UI,
} from "./stage";

/**
 * Figma frames:
 * - Mobile  2428:7656 — 402 x 874
 * - iPad    2428:7702 — 744 x 1133  (`ipad:`)
 * - Desktop 2428:7750 — 1440 x 802  (`desktop-sm:`)
 *
 * A space-intelligence hero built from three live ASCII/canvas fields: a shuttle
 * rendered as ASCII, a wall of ASCII fire along the bottom edge, and a burst of
 * light streaks thrown from a point far off the top-right corner. Figma ships
 * all three as flattened exports — 9.4MB for the star field alone — so each one
 * is re-derived from the numbers the frames imply rather than re-exported. The
 * reasoning for each lives in its own file.
 *
 * Two lines hold the whole layout together, and both are re-pitched per frame
 * rather than scaled (see `stage.ts`): the inner edge of the ruled rails, and
 * the bottom of the nav band.
 *
 * The stage runs the full viewport width rather than capping at Figma's 402 /
 * 744 / 1440. The rails are the frame edge in the design, so capping the stage
 * would strand them mid-screen with dead background outside; running full width
 * keeps them on the viewport edge at every size. Everything inside is anchored
 * to those rails or to the gutter, both of which are relative, so the frames
 * still reproduce at their own widths.
 *
 * Height is decided, not inherited. Every frame height is a floor — the stage
 * takes `max(frame, 100dvh)` so the rails, the star field and the fire band
 * reach the bottom of any screen and never leave bare page under the section.
 *
 * What must not follow the screen is the composition. The nav holds the top and
 * the fire band holds the bottom, both by their own anchors; the hero row is
 * measured from the bottom too — 401px up, which is where Figma's own
 * `top: calc(50% + 0.5px)` puts it on an 802 frame. Centred in the stage instead
 * it stretched with it: on a 1600 screen the row sat 400px lower, pulled clear
 * of the fire it is composed over and leaving a dead band under the nav. Hung
 * off the bottom it reproduces the frame exactly at 802 and simply opens sky
 * above, which is where the star field already is.
 *
 * Paint order follows Figma with one deliberate exception. Figma stacks the fire
 * band *above* the hero copy; at 802 that is harmless because the field's upper
 * tail is sparse, but the band is bottom-anchored and the copy is centred, so
 * every pixel of extra viewport height slides more of the dense base up behind
 * the headline. It sits under the content here instead.
 */

/** Nav rule — Figma's "Line 1222" is a plain 1px #333333 stroke, rail to rail. */
const NAV_RULE = `pointer-events-none absolute z-[3] h-px bg-[#333333] ${NAV_BOTTOM} ${RAIL_INSET}`;

/**
 * The phone lifts its nav band to #101010; the tablet and desktop bands are
 * #0a0a0a, which is the page, so only the phone needs painting. It sits at z-0
 * because Figma throws the star field over the band and under the nav's text.
 */
const NAV_BAND_FILL = `pointer-events-none absolute top-0 z-0 bg-[#101010] ipad:hidden ${NAV_HEIGHT} ${RAIL_INSET}`;

export const Section39Hero = () => (
  <main className="animate-hero-reveal relative isolate w-full overflow-hidden bg-[#0a0a0a]">
    {/* The stage caps at 1920 and centres. Past that the rails would keep
          walking outward and the hero row's two blocks drift apart with them;
          1920 is where the design stops reading as one composition. */}
    <div className="relative mx-auto min-h-[max(874px,100dvh)] w-full ipad:min-h-[max(1133px,100dvh)] desktop-sm:min-h-[max(802px,100dvh)] desktop-sm:max-w-[1920px]">
      <CornerGlow />
      <div aria-hidden className={NAV_BAND_FILL} />
      <StarField />
      <AsciiFlameBand />
      <div aria-hidden className={NAV_RULE} />

      <Navbar />

      {/*
        Hero. One tree for all three frames: the phone and tablet stack it as a
        centred column with the shuttle below the CTAs, desktop turns the same
        column into a row and sends the shuttle to the right.

        Desktop takes it out of flow and hangs it 401px off the bottom edge — the
        frame's own centre, measured from the end the composition is anchored to
        rather than from the middle it only happens to sit at. The centring
        translate flips with the offset: `translate-y-1/2` against a `bottom`,
        or the row lands a full height off.
      */}
      <div
        className={`relative z-20 mt-[61px] flex w-full flex-col items-center gap-[58px] ${HERO_GUTTER} ipad:mt-[44px] ipad:gap-[66px] desktop-sm:absolute desktop-sm:inset-x-0 desktop-sm:bottom-[401px] desktop-sm:mt-0 desktop-sm:translate-y-1/2 desktop-sm:flex-row desktop-sm:items-center desktop-sm:justify-between desktop-sm:gap-0`}
      >
        <div className="flex w-full flex-col items-center gap-[32px] desktop-sm:w-[586px] desktop-sm:items-start">
          <div className="flex flex-col items-center gap-[12px] desktop-sm:items-start">
            <div className="flex items-center gap-[6px]">
              <img
                src="/section-39/planet.svg"
                alt=""
                aria-hidden
                className="block size-[18px] max-w-none ipad:size-[24px]"
              />
              <span
                className={`font-orbit text-[14px] leading-[normal] ${TRACK_UI} whitespace-nowrap text-white ipad:text-[18px]`}
              >
                Space Intelligence Platform
              </span>
            </div>

            {/*
              No `text-balance`: the column width is what sets the break, and it
              breaks differently on purpose — after "Next" on the phone and
              tablet, after "Space" on desktop. Balancing collapses both to the
              same silhouette.
            */}
            <h1
              className={`max-w-[284px] text-center font-instrument-serif text-[42px] leading-[1.2] ${TRACK_DISPLAY} text-white ipad:max-w-[502px] ipad:text-[66px] desktop-sm:max-w-[586px] desktop-sm:text-left`}
            >
              Powering the Next Space Mission
            </h1>

            {/*
              No `text-pretty` either: it pulls a word down to avoid a short last
              line, which moves Figma's break from after "satellite" to after
              "AI-powered" at every frame. The measured width already breaks it
              where Figma does.
            */}
            <p
              className={`max-w-[274px] text-center font-tight text-[16px] leading-[27px] ${TRACK_UI} text-white opacity-70 ipad:max-w-[453px] ipad:text-[18px] desktop-sm:text-left`}
            >
              Accelerate space innovation with AI-powered satellite
              intelligence.
            </p>
          </div>

          {/*
            `flex-wrap` is not in Figma — the pair measures 278px against 318px
            of phone content, which stops clearing below about 360px wide.
          */}
          <div className="flex flex-wrap items-start justify-center gap-[20px] desktop-sm:justify-start">
            <Button>Launch Platform</Button>
            <Button variant="ghost">Explore Missions</Button>
          </div>
        </div>

        <AsciiRocket />
      </div>

      <EdgeRails />
    </div>
  </main>
);
