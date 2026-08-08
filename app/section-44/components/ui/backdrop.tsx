/**
 * Desktop backdrop (Figma 1457:1041) — a band of soft vertical stripes with
 * three blurred washes behind it. Absent from the phone and tablet frames, which
 * are the flat page colour.
 *
 * The stripes are Figma's "Effect": 27 instances of one blurred bar, each
 * 53.333 wide, tiling the 1440 frame exactly (1440/27). Twenty-seven nodes for
 * one repeat is a pattern, so it rebuilds as a single `repeating-linear-gradient`
 * at that pitch — which also means it keeps the pitch on a stage wider than 1440
 * rather than stretching 27 fixed bars.
 *
 * Their fill could not be read: they are component instances, and the instance
 * carries the paint. Sampling the frame's own render across the band gives a
 * smooth oscillation between 236 and 246 against the #f5f5f2 page — so ±5
 * levels, which is the 0.035 alpha below. The soft ramp is the blur on each bar.
 *
 * The washes are three ellipses under a 162.204 blur — #D3D4DF across the lower
 * middle and two #DDDDDD either side of the headline. They are CSS rather than
 * the export because that is all they are: an ellipse, a colour and a blur.
 * Their coordinates are the Background frame's, which Figma hangs at y-10 of the
 * section, so each y here is Figma's less that.
 */
const STRIPES =
  "repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0) 26.667px, rgba(0,0,0,0.035) 53.333px)";

/** cx / cy / w / h, in the 1440x935 desktop frame. */
const WASHES = [
  { color: "#D3D4DF", x: 721.85, y: 618.43, w: 902.41, h: 253.59 },
  { color: "#DDDDDD", x: 259.9, y: 233.2, w: 147.56, h: 190.57 },
  { color: "#DDDDDD", x: 1214.2, y: 233.2, w: 147.56, h: 190.57 },
] as const;

export const Backdrop = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden desktop-sm:block"
  >
    {WASHES.map((wash) => (
      <div
        key={`${wash.x}-${wash.color}`}
        className="absolute rounded-[50%] blur-[162.204px]"
        style={{
          backgroundColor: wash.color,
          width: wash.w,
          height: wash.h,
          left: wash.x - wash.w / 2,
          top: wash.y - wash.h / 2,
        }}
      />
    ))}

    {/*
      The band stops at 650 — Figma's 659.938 bar less the frame's own -10 — and
      is feathered at the foot so it does not end on a line. `inset-x-0` rather
      than a width, so the pitch carries past the 1440 cap on a wider screen.
    */}
    <div
      className="absolute inset-x-0 top-0 h-[650px]"
      style={{
        backgroundImage: STRIPES,
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
      }}
    />
  </div>
);
