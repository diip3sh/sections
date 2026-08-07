"use client";

import ParticleSphere from "../originkit/particle-sphere";

/**
 * The particle globe and the light under it — Figma `image 3083635` and
 * `Group 2147241531` (2402:5503/5504, 2402:5975/5976, 2402:6303/6304).
 *
 * Figma bakes the globe as a PNG in a circular clip; this is the live component
 * it was baked from, driven with the settings the Figma panel shows: 10,000
 * particles at size 5, speed 20, scale 10, smoothing 7, drag on at speed 5,
 * cursor on at radius 75 and strength 10, click force 5, and rotation left to
 * right. Only the colour is read off the frame rather than the panel — the
 * densest particles in the render measure `#167bde`.
 *
 * Both the globe and the glow are anchored to the *bottom* of the section rather
 * than to a top offset, because that is the relationship the design draws: the
 * globe rises out of the bottom edge and is cut by it, so what has to stay
 * constant as the viewport grows is how much of the cap shows. Hanging it off
 * the top instead would push more of the sphere into frame on a tall screen and
 * the section would stop reading as a horizon.
 *
 * The glow is three blurred ellipses, transcribed from Figma's SVG. The first
 * carries a horizontal gradient that is blue at both ends and clear through the
 * middle, which is what throws light into the left and right margins rather than
 * behind the globe. Its stops are stated in the blue at zero alpha rather than
 * `transparent`: browsers interpolate gradients through premultiplied sRGB, and
 * `transparent` is transparent *black*, which greys the ramp on the way out.
 */

const CLEAR = "rgba(29,115,201,0)";

/** Figma `Ellipse 48477` — opacity 0.7, sigma 100, gradient across the box. */
const WASH_WIDE = `linear-gradient(to right, #1d73c9 16.8%, ${CLEAR} 36.9%, ${CLEAR} 63.3%, #1d73c9 83.2%)`;
/** `Ellipse 48478` — sigma 75. */
const WASH_MID = `linear-gradient(to bottom, ${CLEAR} 0%, #1d73c9 44.5%)`;
/** `Ellipse 48479` — sigma 50. */
const WASH_CORE = `linear-gradient(to bottom, ${CLEAR} 0%, #1d73c9 63.6%)`;

/**
 * The component draws its sphere to the full width of its box — scale 10 puts
 * the 1.25-unit radius almost exactly on the frustum at the camera distance it
 * picks — so the box is Figma's diameter, unmodified. Squares, because the
 * sphere is one, and with the offsets below that lands the top edge on Figma's
 * y452 / y664 / y688 without either number being written down.
 *
 * `min(…, 100%)` against the rail-to-rail wrapper is the floor under it. Figma's
 * phone frame sizes the globe at exactly the rail-to-rail width, so anything
 * narrower than 402 would push it out through both rails — 41px each side at
 * 320. Above 402 the clamp is inert.
 */
/**
 * Diameter, per frame — Figma `image 3083635`.
 *
 * Phone and tablet are tangent to the rails, and are sized from width: 370
 * across on a 402 frame whose rails are 16 in, 650 on a 744 frame whose rails
 * are 48 in. Both are the rail-to-rail width exactly, so `100%` and the cap say
 * the same thing there, and both frames are about as tall as the phone they are
 * drawn for — there is no surplus height for the globe to answer to.
 *
 * Desktop is sized from *height* instead, and from one number: 452, the y Figma
 * puts the top of the dome at. What the design fixes is not a width but a
 * relationship — exactly half the globe shows, and its crest sits just under the
 * stats — so the horizon is pinned there and the diameter is whatever reaches
 * the bottom edge from it: twice the distance from 452 to the foot of the
 * section. `aspect-square` hands back the width.
 *
 * Both simpler readings fail on a tall screen. A fixed 760 leaves the dome where
 * it was and opens an empty band under the stats, which is what made the globe
 * read small on a wide monitor; a fixed *share* of the height shrinks that band
 * without closing it. Pinning the crest closes it at every height, and at 832 it
 * resolves to Figma's 760 exactly.
 */
const BOX =
  "aspect-square w-[min(370px,100%)] ipad:w-[min(650px,100%)] desktop-sm:h-[calc((100%-452px)*2)] desktop-sm:w-auto";

/*
 * Painted above the rails, which is the order Figma uses — its rails group
 * (2402:6300) comes before the globe and the glow (6303, 6304). It matters at
 * the foot of the section: the rules carry a hard white bevel, and against the
 * page that reads as the engraving it is meant to be, but against the saturated
 * blue of the glow an unwashed white line lights up like a seam. Figma's frame
 * has no such line — the rail there measures `#92b5d9` against `#9abde2`, eight
 * levels of difference, because the glow is laid over the top of it.
 */
export const Sphere = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
    {/*
      Glow. Figma's box is 526x281 / 886x474 / 1278x684, sitting 133 / 51 / 342
      below the frame edge. The blurs bleed well past those bounds, which is why
      nothing here is clipped.
    */}
    {/* The glow is seated on the globe, so it is driven off the same distance.
        Figma's wash is 684 tall where the visible dome is 380 — 1.8 times it —
        at a 1278/684 aspect, centred on the bottom edge. Left as fixed pixels it
        stayed the size of the 832 frame while the globe grew past it, and the
        dome came up out of a wash too small to seat it. */}
    <div className="absolute bottom-[-133px] left-1/2 h-[281px] w-[526px] -translate-x-1/2 ipad:bottom-[-51px] ipad:h-[474px] ipad:w-[886px] desktop-sm:bottom-0 desktop-sm:aspect-[1278/684] desktop-sm:h-[calc((100%-452px)*1.8)] desktop-sm:w-auto desktop-sm:translate-y-1/2">
      <span
        className="absolute inset-0 rounded-[50%] opacity-70 blur-[100px]"
        style={{ backgroundImage: WASH_WIDE }}
      />
      <span
        className="absolute top-[calc(50%+25px)] left-1/2 h-[308px] w-[726px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[75px]"
        style={{ backgroundImage: WASH_MID }}
      />
      <span
        className="absolute top-1/2 left-1/2 h-[169px] w-[314px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[50px]"
        style={{ backgroundImage: WASH_CORE }}
      />
    </div>

    {/*
      Globe, inside a rail-to-rail clip.

      The clip is doing real work, not belt and braces. The component draws each
      particle as a small sphere *centred* on the surface, and the additive rim
      piles them up at the silhouette, so the lit edge runs about eight pixels
      wider than the box it is given. Figma's baked PNG has no such margin — its
      globe is a circle drawn to fit — so at the phone frame, where the diameter
      and the rail-to-rail width are both 370, the live rim crosses both rails.
      Clipping on the rails is also exactly what the design draws: the globe is
      tangent to them.

      Only the globe is clipped. The glow underneath has to keep bleeding into
      the margins past the rails, which is where Figma throws its two lobes.

      The globe takes pointer events so drag and the cursor repulsion still
      work, but only inside its own box. The component builds a canvas 2.5x its
      container and lets it overflow — and since this layer paints above the
      copy, an unclipped hit area reaches right up over the header buttons.
      `overflow-hidden` on the box confines it; the sphere is drawn to fill that
      box anyway, so only the cursor-scattered particles lose their overspill.
    */}
    {/*
      Desktop hangs exactly half the globe below the frame edge. That half is a
      self-relative translate rather than a pixel offset, because the diameter is
      now the rail-to-rail width and that is fluid between the 1280 frame and the
      1440 cap — a fixed -380 showed a shallower and shallower slice the wider
      the stage got. Phone and tablet keep Figma's own offsets, which are not
      halves: the tablet shows about seven tenths of its globe.
    */}
    <div className="absolute inset-y-0 right-[16px] left-[16px] overflow-hidden ipad:right-[48px] ipad:left-[48px]">
      <div
        className={`pointer-events-auto absolute bottom-[-184px] left-1/2 -translate-x-1/2 overflow-hidden ipad:bottom-[-181px] desktop-sm:bottom-0 desktop-sm:translate-y-1/2 ${BOX}`}
      >
        <ParticleSphere
          particlesCount={10000}
          particleScale={5}
          rotationDirection="clockwise"
          speed={20}
          scale={10}
          drag
          smoothing={7}
          dragSpeed={5}
          stopOnHover={false}
          cursorOn
          cursorRadiusUI={75}
          cursorStrengthUI={10}
          clickForce={5}
          sphereColor="#167bde"
        />
      </div>
    </div>
  </div>
);
