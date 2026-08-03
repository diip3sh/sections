/**
 * Ceiling light rig — Figma "Background shapes container" (2280:5404 / 2282:6139).
 *
 * The group is two mirrored conic-gradient panels, three blurred plates and a
 * screen-blended ellipse. Figma expresses the gradients as HTML inside an SVG
 * `foreignObject`, which browsers refuse to rasterise when the SVG is used as a
 * `background-image` — so the group ships as its flat export instead. The PNG is
 * baked against the black artboard, hence `mix-blend-screen`: black drops out and
 * only the light survives.
 *
 * Export is frame-clipped: 804x920 @2x = 402x460 CSS, anchored to the frame origin.
 */
export const Backdrop = () => (
  <img
    aria-hidden
    src="/section-26/bg-shapes.png"
    alt=""
    className="pointer-events-none absolute top-0 left-0 z-0 block h-115 w-full max-w-none mix-blend-screen"
  />
);
