"use client";

import CurvedLoop from "../originkit/curved-marquee";

/**
 * Figma "Marque" (1:1331) — "2 Months Free - Annually" running along an arc
 * that crests just above the headline.
 *
 * Figma bakes the arc into per-glyph rotations; those give away the geometry.
 * Across the middle repeat the glyphs swing from -12.29deg at x127.5 to
 * +12.33deg at x256.6, which is a circle of radius ~305 cresting at (192, 255).
 *
 * CurvedLoop draws its baseline as `M-100,400 Q720,400+curveAmount 1540,400`
 * inside a 1440x800 viewBox, so its radius is 1640^2 / (4 * |curveAmount|) in
 * viewBox units. The svg scales by width/1440, so at the 402 frame:
 *   curveAmount -615  ->  R 1093 * 0.2792 = 305   (Figma's 305)
 *   fontSize    32    ->  32 * 0.2792 = 8.93      (Figma's 8.944)
 * Both stay proportional as the frame widens, which is what keeps the crest
 * sitting on the headline at any phone width.
 *
 * The band box is the horizontal clip: on phone it is the whole stage, on
 * tablet 53-687, on desktop 386-1078, which is what stops the ring throwing
 * whole words past where the discs reach.
 *
 * The ends fade rather than being cut. `overflow-hidden` alone gave a hard
 * edge, which slices whichever glyph happens to be crossing it and leaves half
 * a letter sitting on the boundary — most obvious on tablet, where the band
 * edge is nowhere near a disc. `fade` masks the svg with a linear gradient
 * running to zero at both ends, so glyphs dissolve on approach instead. At 8
 * percent that ramp is about 50px on tablet and 32px on phone, three or four
 * glyphs either side. The overflow clip stays as the backstop.
 *
 * The crest lands 92.5 viewBox units below the svg top (400 + curveAmount/2),
 * so the band is parked at y229 to put it at y255.
 *
 * Tablet (1:863) is the phone ring scaled 1.588 — the per-glyph rotations are
 * identical (-12.29deg to +12.33deg), only the span changes, 127.15 -> 201.29,
 * and the type goes 8.944 -> 14.2. Since radius and type both key off the svg
 * width, one width change does all of it: 85.7% of a 744 frame gives R 484
 * (Figma 483) and 14.17px type (Figma 14.2). Top moves to 362 to land the
 * crest on the tablet headline. The band is set to the plate width, 53 to 687,
 * so its hard edge lands exactly on the outer column rules.
 *
 * Desktop (1:2281) needs R 528 and 15.608px type, which is the same trick a
 * third time: 692 wide gives R 525 (Figma 528) and 15.4px type (Figma 15.608).
 * So curveAmount, fontSize and letterSpacing are shared by all three
 * breakpoints and only the band box moves. Its hard edges at 386 and 1078 are
 * also the horizontal clip Figma gets from the Marque frame bounds, pulled in
 * from Figma's 378 and 1079.5. Both discs have already tapered by the time they
 * reach Figma's edges, and a running ring slid glyphs through the gap either
 * side around y405; these are the widths where the discs still cover.
 *
 * letterSpacing is not decoration: Figma's repeat measures 135.9px across 24
 * glyphs, where Helvetica Neue Medium sets the same string in ~100px. The
 * missing 36px is 0.175em of tracking, which is ~4.5 units at fontSize 32.
 */

export const MarqueeBand = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
  >
    <div className="absolute top-[229px] left-0 aspect-[1440/800] w-full overflow-hidden ipad:top-[362px] ipad:left-[53px] ipad:w-[634px] desktop-sm:top-[255px] desktop-sm:left-[26.81%] desktop-sm:w-[48.06%]">
      <CurvedLoop
        text="2 Months Free - Annually"
        font={{
          fontFamily:
            "var(--font-helvetica-neue-family), 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: "4.5px",
        }}
        color="#010101"
        direction="right"
        baseVelocity={8}
        curveAmount={-615}
        gap={2}
        draggable={false}
        fade
        fadePercent={8}
        style={{ minHeight: 0, position: "relative" }}
      />
    </div>

    {/* Figma "Ellipse 46838" (1:1407) and "Ellipse 46839" (1:1408) — solid
        #f5f5f5 discs that chop the ring off at the frame edges, which is why
        the reference shows "…nually" and "2 Mo" cut mid-word. They also blank
        the outer column rules across their span; that gap is part of the
        design — Figma blanks x16 and x385 from about y297 to y377, and the
        discs are kept at their exact size so the rules reappear on the same
        rows. Widths are proportional so the clip holds as the frame widens;
        heights are fixed with the rest of the vertical rhythm.

        Tablet is 1:939 / 1:940, which are these scaled by the same 1.588 the
        ring is: 248.6 x 224.7 and 221.1 x 224.7, positioned off the crest.

        Desktop (1:2357 / 1:2358) moves them off the frame edges entirely and
        parks them under the crest, at 379.5 and 836.5. There they cut the
        ring's two descending tails instead of its ends, which is what leaves
        just the crested run visible across the headline. */}
    <span className="absolute top-[264.98px] left-[0.22%] h-[141.54px] w-[38.92%] rounded-[50%] bg-[#f5f5f5] ipad:top-[418.28px] ipad:left-[9.27%] ipad:h-[224.71px] ipad:w-[33.4%] desktop-sm:top-[317px] desktop-sm:left-[26.36%] desktop-sm:h-[247px] desktop-sm:w-[18.96%]" />
    <span className="absolute top-[253.53px] right-0 h-[141.54px] w-[34.64%] rounded-[50%] bg-[#f5f5f5] ipad:top-[400.08px] ipad:right-[5.11%] ipad:h-[224.71px] ipad:w-[29.71%] desktop-sm:top-[297px] desktop-sm:right-[25.03%] desktop-sm:h-[247px] desktop-sm:w-[16.88%]" />

    {/* Gutter caps. An ellipse is thinnest exactly where the arc leaves the
        frame, so a running ring keeps sliding glyphs out through that taper —
        Figma never sees it because it renders one frozen frame. These cover the
        16px gutter outside the outer column rules, which is where the leak
        shows, and stop short of the rules themselves so those stay readable.

        Only 50px tall, not the full disc height: the arc crosses the gutter at
        y316-339, so that band is the entire leak. Running them the disc's full
        height also blanked the row rule at y388, which Figma keeps.

        Phone only. On tablet the arc is flatter and crosses its gutter around
        y522-566, straight through the row rule at y549 — a cap there would
        blank a rule Figma keeps lit. Figma's own tablet frame leaks a glyph
        past the disc at (50, 526), so leaving it uncapped is the design. */}
    <span className="absolute top-[300px] left-0 h-[50px] w-4 bg-[#f5f5f5] ipad:hidden" />
    <span className="absolute top-[300px] right-0 h-[50px] w-4 bg-[#f5f5f5] ipad:hidden" />
  </div>
);
