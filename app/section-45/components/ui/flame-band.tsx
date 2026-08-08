"use client";

import { useReducedMotion } from "motion/react";

import AsciiFire from "../originkit/ascii-flame";

/**
 * The band along the foot of the sheet — Figma `image 3083676` (phone
 * 1459:1783, tablet 1459:1691, desktop 1459:1721), live rather than the flat
 * export it bakes.
 *
 * Figma places one PNG at 1108.856 / 1472 / 1472 wide, always centred on the
 * bottom edge, under `mix-blend-exclusion`. That blend is the tell: the export
 * is a white-on-black ASCII fire, and exclusion against a near-white sheet
 * leaves black alone and inverts the glyphs to dark. So the construction here is
 * Figma's own — the component draws its `mono` ramp on black, the wrapper
 * excludes, and the ramp lands at exactly the tone the frames measure without a
 * single colour being guessed at.
 *
 * **Blocks, not the default ramp.** The band reads as a skyline of flat-topped
 * bars, which is `" ░▒▓█"` filling whole cells — the 65-glyph `dense` default
 * puts a letter in every warm cell and reads as text. Embers and sparks are off
 * for the same reason: the frames carry no loose specks above the front.
 *
 * **Width is the viewport, height is Figma's.** Glyph pitch is not a prop — the
 * component draws at a fixed 10px monospace — so a wider band is more columns
 * rather than bigger glyphs, and the export's own width stops meaning anything
 * once the field is live. The height does still mean something, since it is how
 * far the fire has to climb, so it stays at the frames' 406 / 539.
 *
 * `intensity` and `decay` are read off the frames the way `section-39` reads
 * them: `decay` sets how far the front reaches — heat lost per row, so the ink
 * dies about `intensity / decay` rows up — and `intensity` sets which glyph the
 * base lands on. The frames ink roughly the lower half of the band with spikes
 * past it, which across this box's ~51 rows is a front around 26 rows up.
 *
 * Under reduced motion the export takes over. The band is ambient, always-on
 * motion with no resting state to fall back to, and dropping it would take a
 * third of the composition with it — so the still that Figma itself ships is the
 * static path.
 */

/** Figma: bottom edge at every frame, hanging 41px below it on the desktop. */
const BAND =
  "pointer-events-none absolute bottom-0 left-1/2 z-0 h-[406px] w-full -translate-x-1/2 mix-blend-exclusion ipad:h-[539px] desktop-sm:bottom-[-41px]";

export const FlameBand = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className={BAND}>
      {reduceMotion ? (
        <img
          src="/section-45/bottom-texture.png"
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover object-bottom"
        />
      ) : (
        <AsciiFire
          intensity={80}
          decay={14}
          turbulence={30}
          windDirection="right"
          windForce={10}
          embers={false}
          sparks={false}
          pulse={false}
          palette="mono"
          charset="blocks"
          /* Black is exclusion's identity, so the plate drops out and only the
             ramp inverts — the same trick Figma's export relies on. */
          backgroundColor="#000000"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};
