/**
 * The light overhead and the dotted field — Figma `Elements Wrapper`
 * (2410:6748 left, 2410:6756 right) and `Union` (2410:6764).
 *
 * Each wrapper is a rake of light coming in over the top corner, and Figma
 * builds it from the same seven pieces on both sides: one big soft blob, three
 * long narrow bars, and three hairline flares. The bars are the rays and they
 * are not washes — each is a 177 x 1253 rectangle with a 1.325px `#d78715`
 * border and a fill that runs from the same amber to nothing about four fifths
 * of the way down, then blurred. The border is what gives the ray its lit edge;
 * a plain gradient bar reads as fog instead.
 *
 * The two sides are mirrored but not symmetric — Figma rotates the left set
 * -43.6/-45.9/-48.5 degrees and the right +43.6/+45.9/+48.5, each bar sitting
 * a little further out and lower than the one before, which is what fans them.
 * Their centres are stated against the frame centre rather than its left edge,
 * so the rake holds its place when the section is wider than 1440.
 *
 * The third bar in each set carries no fill at all in Figma, only the border and
 * a blur — it is the faint outer edge of the rake, and filling it closes the gap
 * that separates it from the two behind.
 */

/** Figma's amber. */
const AMBER = "#d78715";

/** Ray fills — the stop where the bar fades out is the only thing that varies. */
const fill = (stop: number) =>
  `linear-gradient(to bottom, ${AMBER} 0%, rgba(215,135,21,0) ${stop}%)`;

/**
 * Centres are offsets from the frame centre, taken from each bar's flex-centred
 * box in Figma: box left plus half its width, less 720.
 */
const RAYS = [
  // Left rake.
  {
    id: "l1",
    x: -424,
    y: 62,
    rotate: -43.56,
    blur: 15.3,
    opacity: 15,
    stop: 80,
    lit: true,
  },
  {
    id: "l2",
    x: -504,
    y: 143,
    rotate: -45.93,
    blur: 27,
    opacity: 40,
    stop: 88,
    lit: true,
  },
  {
    id: "l3",
    x: -595,
    y: 222,
    rotate: -48.45,
    blur: 15.8,
    opacity: 15,
    stop: 0,
    lit: false,
  },
  // Right rake.
  {
    id: "r1",
    x: 386,
    y: 114,
    rotate: 43.56,
    blur: 15.3,
    opacity: 15,
    stop: 80,
    lit: true,
  },
  {
    id: "r2",
    x: 467,
    y: 195,
    rotate: 45.93,
    blur: 27,
    opacity: 40,
    stop: 88,
    lit: true,
  },
  {
    id: "r3",
    x: 557,
    y: 274,
    rotate: 48.45,
    blur: 15.8,
    opacity: 15,
    stop: 0,
    lit: false,
  },
];

/**
 * The hairline flares — Figma 2410:6753/6754/6755 and their right-hand twins.
 *
 * Each is a single stroked line under a blur, not a bar: `#d78715` fading out at
 * 79.6% of its length, `stdDeviation` 12.9, drawn at 0.8 inside a wrapper set to
 * 0.5, so 0.4 all told, additive. Two are 5.3px wide and 844.4 long, the third
 * 1.32px and 632.15 — the thin one is the glint that sits between the rakes.
 *
 * They were missing entirely, and they are most of the difference in brightness:
 * without them the rakes measured about half Figma's value along the crest.
 * `x` is an offset from the frame centre, as with the rays; the right-hand set
 * carries the same -38 / +52 shift off a pure mirror that the rays do.
 */
const FLARES = [
  { id: "fl1", x: -691, y: 68, width: 5.3, length: 844.4 },
  { id: "fl2", x: -488, y: -76, width: 5.3, length: 844.4 },
  { id: "fl3", x: -552, y: 36, width: 1.32, length: 632.15 },
  { id: "fr1", x: 653, y: 120, width: 5.3, length: 844.4 },
  { id: "fr2", x: 450, y: -24, width: 5.3, length: 844.4 },
  { id: "fr3", x: 514, y: 88, width: 1.32, length: 632.15 },
];

/** Both the flares and the rays fade out at the same point along their length. */
const FLARE_FILL =
  "linear-gradient(to bottom, #d78715 0%, rgba(215,135,21,0) 79.62%)";

/**
 * The soft blob behind each rake — Figma 2410:6749 / 6757.
 *
 * A flat `#d78715` ellipse, 816.45 x 887.58, under a 132.5 sigma blur at half
 * opacity, turned -45 degrees with the rake. It is stated as the shape Figma
 * draws rather than as a radial-gradient standing in for it: a gradient fitted
 * by eye put too much of its mass in the core and left the tail short, and this
 * blob is what warms the whole corner the rays come in over, so the tail is the
 * part that matters. It blends normally — only the rays and flares are additive.
 */
const BLOBS = [
  { id: "bl", x: -1026, y: -396 },
  { id: "br", x: 989, y: -344 },
];

/**
 * The dot field and the light inside it — Figma's `texture` mask group
 * (2410:6771 desktop, 2410:6638 phone and tablet).
 *
 * Figma masks `Ellipse 21848` — a 1907x910 plate of #E7B773 at 52%, so much
 * larger than any frame that it is perfectly flat across one — with `twins`, a
 * 2084px PNG of a plain square lattice: 12px dots on a 52px pitch. The ellipse
 * never appears as a wash. Sampling the render proves it: between the dots the
 * page stays #020202, and every lit dot reads rgb(121,96,61), which is #E7B773
 * at 52% over black, source-over, dead constant from the top edge all the way
 * down to the mask's own bottom. So the glow in the middle of the section is
 * not a gradient at all — it is this field, and it was missing because the
 * field shipped at a sixth of its brightness.
 *
 * `Union` (2410:6764) draws the same lattice again as six strips of geometry,
 * but it contributes nothing measurable on top of the texture, so one layer
 * says both.
 *
 * The tile is written at source scale — a 52-unit box holding a 12-unit dot —
 * and pitched with `background-size`, because the pitch is the only thing that
 * moves between frames: Figma sizes the mask 753px wide on phone and tablet and
 * 1476px on desktop, which lands the same lattice at 5.68px and 11.13px.
 *
 * The alpha is 0.72 and Figma's is 0.52 — a deliberate departure, asked for. In
 * Figma the field sits on flat art; here it sits under a live fan that now paints
 * over it, so every dot the fan crosses is lost rather than merely washed out and
 * the field reads thinner than the same number would give a static plate. 0.72
 * takes a lit dot from rgb(121,96,61) to rgb(168,134,85) on the open ground,
 * which is where the field does its work.
 */
const DOTS = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52"><circle cx="6" cy="6" r="6" fill="rgba(231,183,115,0.72)"/></svg>',
)}")`;

/**
 * Figma holds the field at full strength for its whole height and then cuts it
 * off square at the bottom of the mask box, where its flattened fan hides the
 * seam. Ours is a live canvas whose crest moves with the viewport, so a hard
 * edge would land somewhere different at every height.
 *
 * So the fade runs through the field rather than sitting at its foot: full
 * strength over the top third, then a long ramp that is half gone by three
 * quarters and clear at the bottom. That trough is what lets the raised alpha
 * read as a field up top without piling dots into the fan lower down, where the
 * lines are dense and the two patterns beat against each other.
 */
const DOT_MASK =
  "linear-gradient(to bottom, #000 0%, #000 34%, rgba(0,0,0,0.62) 58%, rgba(0,0,0,0.28) 78%, transparent 100%)";

export const Backdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    {BLOBS.map(({ id, x, y }) => (
      <span
        key={id}
        className="absolute h-[887.58px] w-[816.45px] rounded-[50%] bg-[#d78715] opacity-50 blur-[132.5px]"
        style={{
          left: `calc(50% + ${x}px)`,
          top: y,
          transform: "translate(-50%, -50%) rotate(-45deg)",
        }}
      />
    ))}

    {FLARES.map(({ id, x, y, width, length }) => (
      <span
        key={id}
        className="absolute mix-blend-plus-lighter"
        style={{
          left: `calc(50% + ${x}px)`,
          top: y,
          width,
          height: length,
          transform: "translate(-50%, -50%) rotate(-45deg)",
          backgroundImage: FLARE_FILL,
          filter: "blur(12.9px)",
          opacity: 0.4,
        }}
      />
    ))}

    {RAYS.map(({ id, x, y, rotate, blur, opacity, stop, lit }) => (
      <span
        key={id}
        className={`absolute h-[1253px] w-[177px] border-solid border-[#d78715] ${lit ? "mix-blend-plus-lighter" : ""}`}
        style={{
          left: `calc(50% + ${x}px)`,
          top: y,
          borderWidth: "1.325px",
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          filter: `blur(${blur}px)`,
          opacity: opacity / 100,
          /* The outer bar of each rake is border-only in Figma. */
          backgroundImage: stop ? fill(stop) : undefined,
        }}
      />
    ))}

    {/*
      The tint band — Figma `Union` (2410:6764), and not what its name suggests.
      It is one 1440x553 rectangle, not the six strips of dots the node tree
      makes it look like: `#da9028` solid along its top edge fading to nothing at
      its foot, at 0.62 on `mix-blend-mode: color`.

      `color` takes hue and saturation from this layer and luminosity from what
      is under it, so the band changes no brightness at all — it pulls the rakes,
      the flares and the page under them to one amber, which is why the top of
      the frame reads warm even where no ray reaches. Nothing else here does
      that, and without it the upper band stayed the raw colour of each source.

      It sits above both rakes and below the dot field, which is Figma's own
      order. Its 553 is measured from the frame top like the rakes are, so it
      stays put as the section grows.
    */}
    <span
      className="absolute inset-x-0 h-[553px] mix-blend-color"
      style={{
        top: -168,
        opacity: 0.62,
        backgroundImage:
          "linear-gradient(to bottom, #da9028 0%, rgba(218,144,40,0) 100%)",
      }}
    />
  </div>
);

/**
 * The dot field, painted after the fan rather than inside the backdrop.
 *
 * Figma composites the texture source-over above everything, but Figma's fan is
 * a flat plate; ours is a live canvas, and a dot sitting on a lit line is a
 * clash the static art never has — the two ambers beat against each other and
 * the field reads as speckle over the fan.
 *
 * The fix is order, not blending. No blend mode helps here: the dot cream
 * `#e7b773` is brighter than the gold line in all three channels, so `lighten`
 * resolves to the line's own colour and measured a six-level change at most,
 * while `darken` would erase the field against the near-black ground. What the
 * dots actually do to a line is desaturate it — 0.52 of cream over gold lands
 * near rgb(225,164,79) — and the only way to stop that is to keep them out from
 * under it.
 *
 * So the field paints *before* the fan and the fan draws on transparency over
 * it. Dots survive in the gaps between lines, where the page is what shows, and
 * disappear beneath every lit line. That is also Figma's own reading: its plate
 * is opaque art and its texture stops at 628, just above where the fan gets
 * bright, so the two barely meet there either.
 */
export const DotField = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 h-[97.9%] [background-size:5.68px_5.68px] ipad:h-[80.1%] desktop-sm:h-[72.4%] desktop-sm:[background-size:11.13px_11.13px] opacity-54"
    style={{
      backgroundImage: DOTS,
      maskImage: DOT_MASK,
      WebkitMaskImage: DOT_MASK,
    }}
  />
);
