/**
 * Everything behind the copy — Figma `gradient` (2405:6332 / 6398 / 6490),
 * `side bars` (2405:6342 / 6424 / 6594) and the two rails (2405:6525/6526).
 *
 * The light is not a glow, it is a set of rays. Figma builds it from five
 * blurred shapes fanning down from above the top edge — two long thin ellipses
 * crossed at plus and minus 35 degrees (`Group 2147241520`) under three
 * trapezoid beams (`Mask group`, 2405:6494) — and the whole beam group is then
 * faded out downward by one alpha mask. A radial wash gets the warmth in
 * roughly the right place and none of the direction, which is the difference.
 *
 * All five are frame-centred at a fixed size: Figma gives the phone frame the
 * same 1009.5px beam it gives the desktop one, so the phone simply sees the
 * middle of the rig. Nothing here re-pitches; the section clips it.
 *
 * The rest is the hatch in the margin outside each rail and the rails
 * themselves, both of which are gradients rather than the exports Figma offers.
 */

/**
 * The beams are trapezoids, narrow above and flaring below, each under its own
 * Gaussian. The clip has to sit on a child and the blur on its parent: CSS
 * filters run before `clip-path`, so blurring the clipped box the other way
 * round gives a hard-edged wedge instead of a shaft of light.
 *
 * Percentages are Figma's path in its own box — e.g. `M538 100 H691 L1109.5 757
 * H100 Z` inside a 1209.5x857 export whose blur bleed is 100px on every side,
 * which is a 1009.5x657 box with its top edge between 43.4% and 58.5%.
 */
const BEAMS = [
  {
    id: "back",
    width: 1009.5,
    height: 657,
    /** Figma centres each beam a few px left of the frame centre. */
    offset: -10.25,
    top: "43.39% 0, 58.54% 0",
    blur: "blur-[50px]",
    fill: "#8f391d",
    blend: "",
    opacity: 55,
  },
  {
    id: "mid",
    width: 620,
    height: 675,
    offset: -11.5,
    top: "43.95% 0, 59.92% 0",
    blur: "blur-[25px]",
    fill: "#f65b22",
    blend: "",
    opacity: 35,
  },
  {
    id: "core",
    width: 228.785,
    height: 675,
    offset: -20.39,
    top: "44.05% 0, 73.34% 0",
    blur: "blur-[10px]",
    fill: "#f66a22",
    /** Figma screens the brightest beam over the two behind it. */
    blend: "mix-blend-screen",
    /*
     * Figma gives every beam 55%, but the screened one measures far hotter here
     * than in the frame — a browser screens against the two beams already
     * composited, where Figma screens inside its own mask group. Matching the
     * frame at the core costs the difference: sampling the plume across the top
     * lands it at 20.
     */
    opacity: 20,
  },
];

/**
 * The two crossed ellipses under the beams. Figma rotates a 75x577 and a 75x502
 * ellipse by plus and minus 35 degrees and fills each along its own long axis,
 * solid `#f65822` for the first 28% and running to near-black by the far end —
 * the stops resolve to that once the gradient's axis is mapped onto the shape.
 *
 * Its `feTurbulence` grain is not reproduced: at half-alpha white on a 38% duty
 * cycle, over a shape that is already blurred 45px and sitting at 27% opacity,
 * it costs a tiled PNG to deliver nothing the eye can find.
 */
const EMBER =
  "linear-gradient(to bottom, #f65822 0%, #f65822 28.3%, #2c1006 100%)";

const ELLIPSES = [
  { id: "left", width: 75, height: 577, x: 326, y: 86, rotate: 35 },
  { id: "right", width: 75, height: 502, x: 980, y: 95, rotate: -35 },
];

/**
 * Figma's mask: a 1280x611 rect at the top of the frame carrying a vertical
 * alpha ramp whose axis runs from y-82.5 to y626, i.e. -13.5% to 102.4% of the
 * rect. Outside the rect the mask is empty, which is what cuts the beams off at
 * the top edge — they start 64px above it.
 */
const BEAM_MASK = "linear-gradient(to bottom, #000 -13.5%, transparent 102.4%)";

/** 45-degree hatch, ~5px pitch — measured off the margin in the frame. */
const HATCH =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 5px)";

const CHANNEL = "pointer-events-none absolute inset-y-0 w-[16px] ipad:w-[48px]";

export const Backdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    {/* Ellipses first — Figma stacks them under the beams, so the beams' own
        near-black tails never darken them. */}
    <div className="absolute inset-x-0 top-0 h-[611px] opacity-55">
      {ELLIPSES.map(({ id, width, height, x, y, rotate }) => (
        <span
          key={id}
          className="absolute rounded-[50%] opacity-50 blur-[45px]"
          style={{
            width,
            height,
            left: `calc(50% + ${x - 640}px)`,
            top: y,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            backgroundImage: EMBER,
          }}
        />
      ))}
    </div>

    <div
      className="absolute inset-x-0 top-0 h-[611px]"
      style={{ maskImage: BEAM_MASK, WebkitMaskImage: BEAM_MASK }}
    >
      {BEAMS.map(
        ({ id, width, height, offset, top, blur, fill, blend, opacity }) => (
          <div
            key={id}
            className={`absolute top-[-64px] -translate-x-1/2 ${blur} ${blend}`}
            style={{
              left: `calc(50% + ${offset}px)`,
              width,
              height,
              opacity: opacity / 100,
            }}
          >
            <div
              className="size-full"
              style={{
                background: fill,
                clipPath: `polygon(${top}, 100% 100%, 0 100%)`,
              }}
            />
          </div>
        ),
      )}
    </div>

    {/* Hatched margins, outside the rails. */}
    <div className={`${CHANNEL} left-0`} style={{ backgroundImage: HATCH }} />
    <div className={`${CHANNEL} right-0`} style={{ backgroundImage: HATCH }} />

    {/* Rails. Figma runs them past the frame at both ends, so they are simply
        full height here. */}
    <span className="absolute inset-y-0 left-[16px] w-px bg-white/12 ipad:left-[48px]" />
    <span className="absolute inset-y-0 right-[16px] w-px bg-white/12 ipad:right-[48px]" />
  </div>
);
