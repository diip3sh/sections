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
  },
  {
    id: "l2",
    x: -504,
    y: 143,
    rotate: -45.93,
    blur: 27,
    opacity: 40,
    stop: 88,
  },
  {
    id: "l3",
    x: -595,
    y: 222,
    rotate: -48.45,
    blur: 15.8,
    opacity: 15,
    stop: 0,
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
  },
  { id: "r2", x: 467, y: 195, rotate: 45.93, blur: 27, opacity: 40, stop: 88 },
  { id: "r3", x: 557, y: 274, rotate: 48.45, blur: 15.8, opacity: 15, stop: 0 },
];

/**
 * The soft blob behind each rake — Figma 2410:6749 / 6757, an 816x888 element at
 * half opacity sitting well outside the frame, which is what warms the corner
 * the rays come in over.
 */
const BLOBS = [
  { id: "bl", x: -1026, y: -396 },
  { id: "br", x: 989, y: -344 },
];

const BLOB_FILL =
  "radial-gradient(closest-side, rgba(215,135,21,0.55) 0%, rgba(215,135,21,0.18) 55%, rgba(215,135,21,0) 100%)";

/**
 * The dot field — Figma draws `Union` as six vertical strips of geometry. One
 * dot on a 12px pitch says it, and it feathers out before the rays reach it.
 */
const DOTS = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><circle cx="1" cy="1" r="1" fill="rgba(215,135,21,0.16)"/></svg>',
)}")`;

const DOT_MASK =
  "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)";

/**
 * The broad warmth over the whole top edge.
 *
 * This is not a shape Figma draws — it is the part of `image 3083583` that the
 * live line field does not carry. Figma lays that 1440x920 plate over the entire
 * frame on `mix-blend-screen`, so it contributes glow at the top as well as the
 * fan at the bottom; the component only draws the fan, on its own opaque canvas.
 * Sampling the frame at y110 gives `#442d0d` dead centre, where the rays and the
 * corner blobs together leave pure black — the rakes simply do not reach there.
 */
const CROWN =
  "radial-gradient(120% 62% at 50% -8%, rgba(215,135,21,0.32) 0%, rgba(215,135,21,0.12) 48%, rgba(215,135,21,0) 78%)";

export const Backdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    <div
      className="absolute inset-x-0 top-0 h-[560px] mix-blend-plus-lighter"
      style={{ backgroundImage: CROWN }}
    />

    <div
      className="absolute inset-x-0 top-0 h-[70%]"
      style={{
        backgroundImage: DOTS,
        maskImage: DOT_MASK,
        WebkitMaskImage: DOT_MASK,
      }}
    />

    {BLOBS.map(({ id, x, y }) => (
      <span
        key={id}
        className="absolute h-[1200px] w-[1300px] mix-blend-plus-lighter"
        style={{
          left: `calc(50% + ${x}px)`,
          top: y,
          transform: "translate(-50%, -50%)",
          backgroundImage: BLOB_FILL,
          opacity: 1,
        }}
      />
    ))}

    {RAYS.map(({ id, x, y, rotate, blur, opacity, stop }) => (
      <span
        key={id}
        className="absolute h-[1253px] w-[177px] border-solid border-[#d78715] mix-blend-plus-lighter"
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
  </div>
);
