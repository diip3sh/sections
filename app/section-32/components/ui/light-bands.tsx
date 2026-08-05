/**
 * The two soft light bands at each end of the hero — Figma `Group 2147241519`
 * (2371:3959) and `Group 2147241520` (2371:3962), a pair of 552 x 26 bars each.
 *
 * Figma exports them as flat `linear-gradient` rects, and taken at face value
 * that is wrong twice over. Rendered, they are neither hard-edged nor flat:
 *
 *  - Measured down the right-hand pair, away from the orb halo, the band ramps
 *    in from ~30px above its top edge, peaks on its centre line, only falls to
 *    two thirds between the two bars, and does not reach the page until ~30px
 *    below the lower one. That is a 26px bar under a sigma-20 blur. Rather than
 *    filter a rect, the profile is the mask: `alpha = Phi((13 + d) / 20) -
 *    Phi((d - 13) / 20)` sampled every 10px, normalised to 1 at the centre, so
 *    the fill can stay a plain gradient and the grain can stay sharp.
 *  - The band is dithered, not smooth. Figma renders gradients with per-pixel
 *    noise, and at this size that reads as texture rather than as an artefact:
 *    the frame measures a standard deviation of 8.8 across a flat patch of the
 *    band against 2.3 for a clean gradient. `feTurbulence` supplies it, as a
 *    second mask layer — see below for why that and not a blend.
 *
 * Both bars measure the same peak once the blur is accounted for, which is why
 * they share one opacity here — the earlier reading that the lower one was
 * dimmer was single-pixel grain, not a real difference.
 *
 * Figma stacks both groups on the right on iPad, 12px apart, which is a
 * duplicate that never got moved; the literal offsets are kept, since at this
 * blur and opacity the pair reads as one slightly stronger band either way.
 */

/** Figma's fill (2371:3960) — transparent, #3f4d3e at 55.335%, transparent. */
const BAND_FILL =
  "linear-gradient(to right, rgba(63,77,62,0) 0%, #3f4d3e 55.335%, rgba(89,109,88,0) 100%)";

/**
 * Per-pixel dither, tiled at 160px so the pattern never reads as a repeat.
 *
 * It is a second **mask** layer rather than a background blended into the fill,
 * and that is the whole trick: masks multiply, so the grain comes out
 * proportional to the band underneath it — strong on the bright centre line,
 * gone in the tails — which is how a dithered gradient behaves. Blending it
 * into the fill instead inverts that, because `overlay` compresses exactly
 * where the fill is brightest.
 *
 * One turbulence channel becomes alpha, stretched about a 0.6 mean by GRAIN_K
 * and clamped by the filter. `sRGB` interpolation is load-bearing — the default
 * linearRGB flattens the noise to about a third of this contrast.
 *
 * Figma dithers before it blurs, so its grain stays even down the whole
 * profile; masking dithers after, so ours is a little stronger on the centre
 * line and weaker in the tails. Across a flat patch it measures the same.
 */
const GRAIN_K = 2.7;

const BAND_GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">' +
    '<filter id="n" color-interpolation-filters="sRGB">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" stitchTiles="stitch"/>' +
    `<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${GRAIN_K} 0 0 0 ${0.6 - GRAIN_K * 0.5}"/>` +
    "</filter>" +
    '<rect width="160" height="160" filter="url(#n)"/></svg>',
)}")`;

/**
 * The blur profile, as a mask down the 160px box. Positions are d/80 either
 * side of the centre line; the box has to run to d=80 because that is where
 * Phi finally closes.
 */
const BAND_MASK = `linear-gradient(to bottom, ${[
  "transparent 0%",
  "rgba(0,0,0,0.013) 10.6%",
  "rgba(0,0,0,0.065) 18.75%",
  "rgba(0,0,0,0.174) 25%",
  "rgba(0,0,0,0.376) 31.25%",
  "rgba(0,0,0,0.648) 37.5%",
  "rgba(0,0,0,0.897) 43.75%",
  "rgb(0,0,0) 50%",
  "rgba(0,0,0,0.897) 56.25%",
  "rgba(0,0,0,0.648) 62.5%",
  "rgba(0,0,0,0.376) 68.75%",
  "rgba(0,0,0,0.174) 75%",
  "rgba(0,0,0,0.065) 81.25%",
  "rgba(0,0,0,0.013) 89.4%",
  "transparent 100%",
].join(", ")})`;

/**
 * Left / right pair, each anchored to a viewport edge rather than to Figma's x.
 *
 * Figma's own x values do not survive contact with a real screen. On the 1440
 * frame the left band's 55.335% midpoint lands on x740 — the middle of the
 * screen, not light reaching in from the edge. On the phone the second band is
 * pushed off-frame entirely, and iPad stacks both on the right 12px apart,
 * which is a duplicate that never got moved. Three frames, three different
 * accidents, and none of them is the composition: a band leaning in from either
 * side of the hero.
 *
 * So the pair is anchored to the edges and the left one is mirrored, which puts
 * both midpoints the same distance in. At 1440 that reproduces the desktop
 * frame exactly — peaks at x49 and x1391 — and it keeps holding on a phone and
 * on an ultrawide, where stage-relative offsets would have stranded both bands
 * in the middle 1440px.
 *
 * The inset is the fill's own midpoint less 49px, so it changes with the band
 * width: 209.5 - 49 on the phone's 469, 305.4 - 49 from iPad up on 552.
 */
const BAND_X = [
  "-left-[160px] -scale-x-100 ipad:-left-[198px]",
  "-right-[160px] ipad:-right-[198px]",
] as const;

/**
 * Upper / lower bar. Desktop measures off the middle band's centre so the pair
 * travels with the orb when the viewport is taller than Figma's 885 frame.
 */
const BAND_Y = [
  "top-[82px] ipad:top-[110px] desktop-sm:top-[calc(50%-372.5px)]",
  "top-[148px] ipad:top-[176px] desktop-sm:top-[calc(50%-306.5px)]",
] as const;

/**
 * The bands are backdrop, so they bleed the viewport rather than stopping at
 * the capped stage — otherwise past 1440 both of them end up marooned in the
 * middle 1440px with bare page either side. Vertically it stays inside the
 * middle band, which is what keeps the pair travelling with the orb when the
 * viewport is taller than Figma's 885 frame.
 */
export const LightBands = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] w-screen"
  >
    {BAND_X.map((x) => (
      <span key={x} className="contents">
        {BAND_Y.map((y) => (
          <span
            key={y}
            className={`absolute h-[160px] w-[469px] -translate-y-1/2 opacity-[0.78] ipad:w-[552px] ${x} ${y}`}
            style={{
              backgroundImage: BAND_FILL,
              maskImage: `${BAND_GRAIN}, ${BAND_MASK}`,
              maskSize: "160px 160px, 100% 100%",
              maskComposite: "intersect",
              WebkitMaskImage: `${BAND_GRAIN}, ${BAND_MASK}`,
              WebkitMaskSize: "160px 160px, 100% 100%",
              WebkitMaskComposite: "source-in",
            }}
          />
        ))}
      </span>
    ))}
  </div>
);
