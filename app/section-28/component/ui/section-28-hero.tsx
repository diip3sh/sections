import { DotHalo } from "./dot-halo";
import { GridColumns, GridRows } from "./grid-pattern";
import { MarqueeBand } from "./marquee-band";
import { StickerTile } from "./sticker-tile";

/**
 * Figma "Frame 2147262014" (1:1306) — Creatora mobile hero, 402 x 779.
 *
 * The whole screen is pinned to the background grid: the nav plate, the copy
 * plate and the creator tiles all start on a column rule, and the vertical
 * rhythm is the 73px row pitch. So the flow below is a single column laid out
 * with the grid's own numbers — nav 25 -> 96, dot band 97 -> 170, copy
 * 290 -> 514, tiles 546 -> 618 and 671 -> 743, then the 36px tail that closes
 * the frame at 779.
 *
 * Content padding is 18/17 rather than a flat 16 because Figma's plates span
 * 18 -> 385: they stop just inside the outer column rules so those two rules
 * stay visible through the nav and the headline block, which is what reads as
 * the frame's left and right edge.
 *
 * Only the decoration Figma itself places absolutely stays absolute — the grid,
 * the two #f5f5f5 washes, the dot halo, and the markers that sit *on* rule
 * intersections rather than in the flow.
 */

/** The upper tile pair straddles the band, one in grid column 1, one in 5. */
const TILE_ROW_TOP = [
  { id: "creator-1", src: "/section-28/creator-1.png", cell: "col-start-1" },
  {
    id: "creator-2",
    src: "/section-28/creator-2.png",
    cell: "col-start-5 ipad:justify-self-end",
  },
];

/** Nav-box corners — 8px diamonds centred on the four rule intersections. */
const NAV_CORNERS = [
  { id: "tl", className: "top-[19.5px] left-[12.5px]" },
  { id: "tr", className: "top-[19.5px] right-[12.5px]" },
  { id: "bl", className: "top-[92.5px] left-[12.5px]" },
  { id: "br", className: "top-[92.5px] right-[12.5px]" },
];

export const Section28Hero = () => (
  <main className="flex min-h-dvh w-full flex-col bg-[#f5f5f5]">
    {/* The row rules bleed the full viewport, matching Figma's 1440-wide row
        frame, so they always reach both screen edges. Everything else lives in
        the phone stage — capped at 430 (the widest phone), or 744 from `ipad`
        up, which is the tablet frame. Capping is what keeps the headline and
        sub on Figma's line breaks instead of unwrapping on a wide window. */}
    <section className="relative w-full overflow-hidden bg-[#f5f5f5]">
      <GridRows />

      <div className="relative mx-auto w-full max-w-[430px] overflow-hidden pb-9 ipad:max-w-[744px]">
        <GridColumns />

        {/* Figma "Ellipse 46834" (1:1329) — a blurred #f5f5f5 disc that dissolves
          the grid under the tile row so the dot halo has a clean field. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-[448px] left-1/2 z-[1] h-[494px] w-[190.8%] -translate-x-1/2 rounded-[50%] bg-[#f5f5f5] blur-[25px] ipad:top-[810px] ipad:h-[914px]"
        />

        {/* Figma "Rectangle 1430106931" (1:1330) — the plate that blanks the grid
          behind the headline: rows 169 -> 534 on mobile, 295 -> 821 on tablet.
          Both stop just inside the outer column rules so those stay readable
          through it. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-[171px] right-[17px] left-[18px] z-[2] h-[363px] bg-[#f5f5f5] ipad:top-[298px] ipad:right-[58px] ipad:left-[53px] ipad:h-[523px]"
        />

        <MarqueeBand />

        <DotHalo />

        <div className="relative z-10 flex flex-col pt-[25px] pr-[17px] pl-[18px] ipad:pt-[43px] ipad:pr-[57px] ipad:pl-[53px]">
          {/* Figma "Nav" (1:1423) — opaque plate, so the inner column rules stop
            at its edges while the outer two run straight through. */}
          <nav className="flex h-[71px] w-full items-center justify-between bg-[#f5f5f5] p-4 ipad:h-[125px] ipad:p-[30px]">
            <div className="flex items-center gap-2">
              <img
                src="/section-28/logo.svg"
                alt=""
                aria-hidden
                className="block h-[24.32px] w-[20.85px] max-w-none"
              />
              <span className="text-[20px] leading-[1.1] font-semibold tracking-[-0.6px] text-[#121212]">
                Creatora
              </span>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              className="block size-6 cursor-pointer transition-opacity duration-200 ease-out ipad:size-8 [@media(hover:hover)]:hover:opacity-70"
            >
              <img
                src="/section-28/menu.svg"
                alt=""
                className="block size-full max-w-none"
              />
            </button>
          </nav>

          {/* Figma "dots" (1:1441) — one 6px marker per grid cell, filling the
            row band directly under the nav. */}
          <div
            aria-hidden
            className="mt-px grid h-[73px] w-full grid-cols-5 ipad:mt-0 ipad:h-[127px]"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={`dot-${i}`}
                className="flex items-center justify-center"
              >
                <span className="block size-1.5 rounded-full bg-[#d9d9d9] ipad:size-2" />
              </span>
            ))}
          </div>

          {/* Figma "copy" (1:1414 mobile / 1:948 tablet) — 367 wide on mobile,
            498 on tablet, which are the widths that break the headline after
            "Talent" / "Comes" and the sub after "work," / "on".

            Flattened to one column with margins because Figma nests the two
            breakpoints differently — mobile groups headline+sub (gap 8) then
            the buttons (gap 24); tablet groups sub+buttons (gap 40.65) under
            the headline (gap 20.32). Margins express both without a wrapper
            that only exists at one size. */}
          <div className="mt-[120px] flex w-full flex-col items-center text-center text-[#121212] ipad:mt-[182.59px] ipad:w-[498px] ipad:self-center">
            <h1 className="w-full font-instrument-serif text-[48px] leading-[1.1] tracking-[-1.44px] ipad:w-[446px] ipad:text-[65px] ipad:leading-[81.9px] ipad:tracking-[-1.95px]">
              Where Creative Talent Comes Together.
            </h1>
            <p className="mt-2 w-full text-[16px] leading-[1.4] tracking-[-0.32px] opacity-60 ipad:mt-[20.32px] ipad:font-tight ipad:text-[18px] ipad:leading-[32.39px] ipad:tracking-[-0.36px]">
              Find exceptional creators, explore inspiring work, and collaborate
              on ideas that shape the future.
            </p>

            {/* Figma "Frame 8395" (1:1418) / "Frame 8396" (1:952) — identical
              at both sizes: 159x42 and 141x42, gap 24. */}
            <div className="mt-6 flex items-start justify-center gap-6 ipad:mt-[40.65px]">
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-[36px] border border-solid border-[#f74406] bg-linear-to-b from-[#ff9874] to-[#f74000] px-[23px] py-[11px] shadow-[inset_0px_4px_5px_0px_#f9a587,0px_7px_16px_0px_rgba(0,0,0,0.18),0px_28px_30px_0px_rgba(0,0,0,0.15),0px_64px_44px_0px_rgba(0,0,0,0.08),0px_104px_56px_0px_rgba(0,0,0,0.03)] transition-opacity duration-200 ease-out [@media(hover:hover)]:hover:opacity-90"
              >
                <span className="text-[15px] leading-[18px] font-medium tracking-[-0.6px] whitespace-nowrap text-white">
                  Explore Creators
                </span>
              </button>

              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-[36px] border border-solid border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.02)] px-[23px] py-[11px] transition-colors duration-200 ease-out [@media(hover:hover)]:hover:bg-[rgba(0,0,0,0.05)]"
              >
                <span className="text-[15px] leading-[18px] font-medium tracking-[-0.6px] whitespace-nowrap text-[rgba(0,0,0,0.7)]">
                  View Portfolio
                </span>
              </button>
            </div>
          </div>

          {/* Creator tiles — Figma 1:1452 / 1:1453 / 1:1454, one grid cell each
            in columns 1, 5 and 3. Peelable stickers rather than flat crops, so
            nothing clips here — the curl and its shadow ride outside the cell. */}
          <div className="mt-8 grid w-full grid-cols-5 ipad:mt-[41.44px]">
            {TILE_ROW_TOP.map(({ id, src, cell }) => (
              <StickerTile key={id} src={src} className={cell} />
            ))}
          </div>

          <div className="mt-[53px] grid w-full grid-cols-5 ipad:mt-[62px]">
            <StickerTile
              src="/section-28/creator-3.png"
              className="col-start-3 ipad:justify-self-center"
            />
          </div>
        </div>

        {/* Rule-intersection markers — Figma "corners" (1:1429) and
          "Polygon 28-31" (1:1437-1440). They mark points on the grid rather
          than occupying flow, so they stay absolute like Figma has them.

          Tablet (1:979 / 1:960) keeps only the badges, at 42px on the third
          row rule; it drops the four nav-corner diamonds entirely. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          {NAV_CORNERS.map(({ id, className }) => (
            <img
              key={id}
              src="/section-28/diamond.svg"
              alt=""
              className={`absolute block size-2 max-w-none ipad:hidden ${className}`}
            />
          ))}

          <img
            src="/section-28/corner-badge.svg"
            alt=""
            className="absolute top-[153.5px] left-[0.5px] block size-8 max-w-none ipad:top-[276px] ipad:left-[32px] ipad:size-[42px]"
          />
          <img
            src="/section-28/corner-badge.svg"
            alt=""
            className="absolute top-[153.5px] right-[0.5px] block size-8 max-w-none ipad:top-[276px] ipad:right-[35px] ipad:size-[42px]"
          />
        </div>
      </div>
    </section>
  </main>
);
