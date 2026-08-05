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
 * Left / right pair.
 *
 * Desktop mirrors the left band rather than taking Figma's x435 for it. At 435
 * the fill's 55.335% midpoint lands on x740, which on a 1440 stage reads as the
 * middle of the screen, not as light reaching in from the edge — the same
 * authoring drift as the iPad duplicate. Flipped and pushed to -198 it peaks
 * 49px from the left edge, exactly where the right band peaks from the right.
 *
 * The stacked frames keep Figma's own offsets: the second band is off-screen on
 * the phone, and iPad pins both to the right, so there is no pair to balance.
 */
const BAND_X = [
  "left-[24px] ipad:left-[423px] desktop-sm:left-[-198px] desktop-sm:-scale-x-100",
  "left-[408px] ipad:left-[435px] desktop-sm:left-[1086px]",
] as const;

/**
 * Upper / lower bar. Desktop measures off the middle band's centre so the pair
 * travels with the orb when the viewport is taller than Figma's 885 frame.
 */
const BAND_Y = [
  "top-[82px] ipad:top-[110px] desktop-sm:top-[calc(50%-372.5px)]",
  "top-[148px] ipad:top-[176px] desktop-sm:top-[calc(50%-306.5px)]",
] as const;

export const LightBands = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
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
