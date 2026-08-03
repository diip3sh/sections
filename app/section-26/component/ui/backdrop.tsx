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
  <>
    <img
      aria-hidden
      src="/section-26/bg-shapes.png"
      alt=""
      className="pointer-events-none absolute top-0 left-0 z-0 block h-115 w-full max-w-none mix-blend-screen ipad:hidden"
    />
    {/* iPad export is frame-clipped too: 1488x1420 @2x = 744x710 CSS */}
    <img
      aria-hidden
      src="/section-26/bg-shapes-tablet.png"
      alt=""
      className="pointer-events-none absolute top-0 left-0 z-0 hidden h-[710px] w-full max-w-none mix-blend-screen ipad:block desktop-sm:hidden"
    />
    {/* Desktop: ceiling lamp, then arcs, then grain — three stacked exports */}
    <img
      aria-hidden
      src="/section-26/bg-shapes-desktop.png"
      alt=""
      className="pointer-events-none absolute top-0 left-0 z-0 hidden h-[731.5px] w-full max-w-none object-cover object-top mix-blend-screen desktop-sm:block"
    />
    <img
      aria-hidden
      src="/section-26/arcs-desktop.png"
      alt=""
      className="pointer-events-none absolute inset-0 z-0 hidden size-full max-w-none object-cover object-top mix-blend-screen desktop-sm:block"
    />
    {/* Grain + soft ellipse wash — Figma "texture" (2280:5870), over the arcs.
        Mobile and iPad carry this baked into their own exports. */}
    <img
      aria-hidden
      src="/section-26/texture-desktop.png"
      alt=""
      className="pointer-events-none absolute inset-0 z-0 hidden size-full max-w-none object-cover object-top mix-blend-screen desktop-sm:block"
    />
  </>
);
