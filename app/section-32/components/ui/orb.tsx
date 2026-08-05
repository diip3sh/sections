/**
 * The orb and everything pinned to it — Figma `Group 2147241501` inside
 * `Group 2147241512` (mobile 2371:1691, iPad 2371:2452, desktop 2371:3271).
 *
 * The orb itself is 280 x 280 at every frame; only where it hangs on the page
 * changes, and it is horizontally centred at all three. So this is one fixed
 * box with the ring, nebula, halo, hairlines and streaks all expressed as a
 * share of it — nothing inside re-pitches.
 *
 * Three stacked pieces, bottom to top:
 *
 *  - the halo: a radial gradient under a blur, blended `exclusion`. Against a
 *    near-black page exclusion passes the source through, so what it really
 *    does is throw a green ring of light well past its own box — which is where
 *    the whole hero's glow comes from, not from any separate wash. Two of its
 *    numbers are not the ones Figma's export hands over; see HALO_FILL.
 *  - the ring: a #252525 disc with a lime inner rim. Figma draws that rim as an
 *    SVG inner shadow (sigma 1.577, rgb 160/200/62); CSS says the same thing in
 *    one `inset` shadow, so no export.
 *  - the nebula: the one genuine image here — a photographic swirl, screened so
 *    its black drops out.
 *
 * The dashed hairlines run in from both frame edges and stop at the orb, always
 * 32px either side of its centre. They are drawn rather than exported: Figma's
 * SVG is two sub-pixel lime strokes on a 3.92 dash.
 *
 * The soft light bands that cross this area are their own backdrop layer — see
 * `light-bands.tsx`.
 */

/**
 * Figma's halo gradient (2371:3273) — its stop list verbatim, but not its
 * radius or its blur, both of which the export gets wrong for CSS.
 *
 * The radius is in the SVG's gradient transform, not in the box: `r=10` under a
 * 15.15 scale is 151.5, against the 140 that `closest-side` would give on a
 * 280px square. Eight percent sounds like nothing and is not — it puts every
 * stop closer in, and the glow measured a tenth dark right where it is
 * brightest, from r100 out to r160.
 *
 * The blur is Figma's own layer-blur figure of 74.15, which is not a CSS sigma.
 * Fitted against the frame, 66 is: mean error across the radial profile drops
 * from 4.1 to 1.0. Blur alone cannot fix the radius — sweeping it only trades
 * the near field against the far one, since a tighter blur brightens the core
 * and starves the tail at the same time.
 */
const HALO_FILL =
  "radial-gradient(54.11% 54.11% at 50% 50%, rgb(20,74,17) 0%, rgb(37,89,23) 8.4%, rgb(54,104,28) 16.8%," +
  " rgb(88,135,39) 33.61%, rgb(122,165,50) 50.41%, rgb(155,195,60) 67.21%, rgb(120,152,48) 74.87%," +
  " rgb(84,109,36) 82.53%, rgb(48,66,23) 90.19%, rgb(30,45,17) 94.02%, rgb(12,23,11) 97.84%," +
  " rgb(12,23,11) 100%)";

/**
 * Figma's rule (2371:3968) is a #c7f828 stroke at 0.6 opacity, 0.489516 wide,
 * on a `3.92 3.92` dash — 3.92 on, 3.92 off, a 7.84 period.
 *
 * The period is transcribed; the width is resolved rather than transcribed. A
 * 0.49px-tall box lands wherever the pixel grid puts it, so two rules that
 * should match come out at wildly different weights — measured peaks of 30 and
 * 136 on lines that are meant to be identical. Figma's own renderer spreads
 * that sub-pixel stroke across two rows at about 0.18 alpha each, so the rule
 * is one pixel row at 0.18 here, which is what the frame actually measures: a
 * lit pixel 40 levels over the page, and 18 averaged across the dash.
 */
const HAIRLINE =
  "repeating-linear-gradient(to right, rgba(199,248,40,0.18) 0 3.92px, transparent 3.92px 7.84px)";

/** Both hairlines of a pair, 32px either side of the orb centre (140px in). */
const RULE_Y = ["top-[108px]", "top-[172px]"] as const;

export const Orb = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute left-1/2 size-[280px] -translate-x-1/2 ${className}`}
  >
    {/* Dashed rules — run in from the frame edges, stop under the orb rim */}
    {RULE_Y.map((y) => (
      <span key={y} className="contents">
        <span
          className={`absolute right-[232px] h-px w-screen ${y}`}
          style={{ backgroundImage: HAIRLINE }}
        />
        <span
          className={`absolute left-[233px] h-px w-screen ${y}`}
          style={{ backgroundImage: HAIRLINE }}
        />
      </span>
    ))}

    {/* Halo — the hero's entire green cast comes from this one layer */}
    <span
      className="absolute inset-0 blur-[66px] mix-blend-exclusion"
      style={{ backgroundImage: HALO_FILL }}
    />

    {/*
      Ring and nebula. The nebula is the one real image here, and it is clipped
      to the disc rather than left as the loose rectangle Figma positions it as.
      Its PNG is opaque black outside the swirl, and `mix-blend-screen` does not
      save it: the halo below carries both a filter and a blend of its own, so
      the browser composites it as a separate layer and the screen finds no
      backdrop to drop the black into — the image's bounding box paints as a
      visible dark square over the glow. Clipping is also what the orb actually
      is, so the rectangle never needed to exist.

      The lime rim goes on its own overlay above the nebula, since an inset
      shadow on the ring itself would sit under the image.

      The image is sized off Figma's inner crop, not off the frame it sits in.
      Figma gives `image 3083588` a 235.042 x 213.746 box and then oversizes the
      picture inside it to 105.37% x 99.82% — 247.66 x 213.36, which is the
      PNG's own 1.161 aspect. Fitting it to the box instead squashes it 6%
      horizontally, which slides every swirl inward off its mark.
    */}
    <span className="absolute inset-[14.93%] overflow-hidden rounded-full bg-[#252525]">
      <img
        src="/section-32/orb-nebula.png"
        alt=""
        className="absolute top-[-3.6%] left-[-9.6%] h-[108.2%] w-[125.6%] max-w-none mix-blend-screen"
      />
    </span>
    <span className="absolute inset-[14.93%] rounded-full shadow-[inset_0px_0px_3.15px_0px_#a0c83e]" />
  </div>
);
