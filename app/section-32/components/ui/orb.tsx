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
 *  - the halo: a 280px radial gradient under a 74px blur, blended `exclusion`.
 *    Against a near-black page exclusion passes the source through, so what it
 *    really does is throw a green ring of light well past its own box — which
 *    is where the whole hero's glow comes from, not from any separate wash.
 *  - the ring: a #252525 disc with a lime inner rim. Figma draws that rim as an
 *    SVG inner shadow (sigma 1.577, rgb 160/200/62); CSS says the same thing in
 *    one `inset` shadow, so no export.
 *  - the nebula: the one genuine image here — a photographic swirl, screened so
 *    its black drops out.
 *
 * The dashed hairlines run in from both frame edges and stop at the orb, always
 * 32px either side of its centre. They are drawn rather than exported: Figma's
 * SVG is two 0.49px lime strokes on a 3.92 dash.
 *
 * The streaks are Figma's `Group 2147241519` / `2147241520` — soft horizontal
 * light bars. Figma leaves them asymmetric (and on iPad stacks both groups on
 * the same side, 12px apart, which is plainly a duplicate that never got
 * moved); they are mirrored either side of the orb here so the composition
 * reads at every width.
 */

/** Figma's halo gradient (2371:3273) — its stop list, verbatim. */
const HALO_FILL =
  "radial-gradient(closest-side, rgb(20,74,17) 0%, rgb(37,89,23) 8.4%, rgb(54,104,28) 16.8%," +
  " rgb(88,135,39) 33.61%, rgb(122,165,50) 50.41%, rgb(155,195,60) 67.21%, rgb(120,152,48) 74.87%," +
  " rgb(84,109,36) 82.53%, rgb(48,66,23) 90.19%, rgb(30,45,17) 94.02%, rgb(12,23,11) 97.84%," +
  " rgb(12,23,11) 100%)";

/** Figma's streak (2371:3960) — transparent, #3f4d3e at 55.335%, transparent. */
const STREAK_FILL =
  "linear-gradient(to right, rgba(63,77,62,0) 0%, #3f4d3e 55.335%, rgba(89,109,88,0) 100%)";

const HAIRLINE =
  "repeating-linear-gradient(to right, rgba(199,248,40,0.6) 0 1.96px, transparent 1.96px 3.92px)";

/** Both hairlines of a pair, 32px either side of the orb centre (140px in). */
const RULE_Y = ["top-[108px]", "top-[172px]"] as const;

/**
 * Streaks, as Figma places them against the orb box at each frame — two groups
 * of two. Figma offsets the lower bar of each group 9px left of the upper one;
 * that is jitter below the threshold of a 26px soft gradient, so both bars of a
 * group share an x here.
 */
const STREAK_X = [
  "-left-[37px] ipad:left-[191px] desktop-sm:-left-[145px]",
  "left-[347px] ipad:left-[203px] desktop-sm:left-[506px]",
] as const;

/**
 * Figma's streak fill is opaque #3f4d3e at its midpoint, but the frames render
 * the upper bar at about half that and the lower one at a third — measured
 * against the page green out where the halo does not reach. The opacity is not
 * in the exported styles, so it is carried here.
 */
const STREAK_Y = [
  "opacity-50 top-[8px] ipad:top-[3px] desktop-sm:top-[-25px]",
  "opacity-30 top-[74px] ipad:top-[69px] desktop-sm:top-[41px]",
] as const;

const Streak = ({ className }: { className: string }) => (
  <span
    className={`absolute h-[26px] w-[469px] ipad:w-[552px] ${className}`}
    style={{ backgroundImage: STREAK_FILL }}
  />
);

export const Orb = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute left-1/2 size-[280px] -translate-x-1/2 ${className}`}
  >
    {/* Streaks — two soft bars per group, both groups passing behind the orb */}
    {STREAK_X.map((x) => (
      <span key={x} className="contents">
        {STREAK_Y.map((y) => (
          <Streak key={y} className={`${x} ${y}`} />
        ))}
      </span>
    ))}

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
      className="absolute inset-0 blur-[74.15px] mix-blend-exclusion"
      style={{ backgroundImage: HALO_FILL }}
    />

    {/* Ring — #252525 disc with Figma's lime inner rim */}
    <span className="absolute inset-[14.93%] rounded-full bg-[#252525] shadow-[inset_0px_0px_3.15px_0px_#a0c83e]" />

    {/* Nebula — the one real image; screened so its black drops out */}
    <img
      src="/section-32/orb-nebula.png"
      alt=""
      className="absolute top-[12.39%] left-[8.73%] h-[76.34%] w-[83.94%] max-w-none mix-blend-screen"
    />
  </div>
);
