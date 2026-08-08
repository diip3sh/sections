/**
 * The two measuring rails down the margins — Figma `Group 2147241546` /
 * `Group 2147241547` on the tablet frame (1459:1705 / 1459:1712) and
 * `Frame 2147238326` / `Frame 2147238327` on the desktop (1459:1722 / 1459:1730).
 *
 * Figma builds each one as a 1440px-long strip rotated 90 degrees, carrying a
 * tiled texture at 20% and four hairlines. Rotating a strip is how Figma draws a
 * vertical band; here it simply is one, so nothing rotates and the tile stays on
 * its own axis.
 *
 * Two of those four hairlines sit on the band's edges and two stray 7px outside
 * them, which at 1x reads as one slightly soft edge rather than as four lines.
 * The strays are dropped and the band keeps its own two, drawn as the engraved
 * rule this design uses everywhere else — the `#e5e2dc` line plus the 1px white
 * offset that Figma ships as a `feOffset dx=1 dy=1` drop shadow on every line
 * node in the file.
 *
 * The phone frame draws no rails at all, so the whole layer starts at `ipad:`.
 *
 * Figma insets the tablet's rails 33 left and 36 right; both are 33 here. The
 * asymmetry is 3px of hand-placement on a pair of lines that frame the page, and
 * the horizontal rules either side of them are symmetric.
 */

/** Every rule and rail edge in the design — Figma's `#E5E2DC` with its white bevel. */
export const ENGRAVED = "bg-[#e5e2dc] shadow-[1px_1px_0px_0px_#ffffff]";

/**
 * Figma tiles this at 11.2px inside the band and holds it at 20%. The file is a
 * 14x14 alpha PNG — photographic grain rather than a shape, which is the one
 * case the background rules take an image for.
 */
const TEXTURE =
  "bg-[url('/section-45/rail-texture.png')] bg-[length:11.2px_11.2px] bg-top-left opacity-20";

/** Band width, and the inset of its outer edge — Figma 17/33 tablet, 18/80 desktop. */
const BAND =
  "absolute inset-y-0 w-[17px] desktop-sm:w-[18px] border-x border-solid border-[#e5e2dc]";

export const EdgeRails = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-[1] hidden ipad:block"
  >
    <div className={`${BAND} left-[33px] desktop-sm:left-[80px]`}>
      <span className={`absolute inset-0 ${TEXTURE}`} />
    </div>
    <div className={`${BAND} right-[33px] desktop-sm:right-[80px]`}>
      <span className={`absolute inset-0 ${TEXTURE}`} />
    </div>
  </div>
);
