"use client";

import { useEffect, useRef, useState } from "react";

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
 * Phone and tablet anchor both the globe and the glow to the *bottom* of the
 * section, which is the relationship those frames draw: the globe rises out of
 * the bottom edge and is cut by it, and both frames are about as tall as the
 * phone they are drawn for, so the foot is a fixed distance from the copy.
 *
 * Desktop anchors from the top instead — the globe by its crest, the glow by the
 * globe's equator. There the foot is not a fixed distance from anything: the
 * section floors at 1280 and grows with the window past that, so a bottom offset
 * would walk the dome down the page and off the fold. The crest is the edge the
 * composition can actually see, so it is the edge that gets pinned. Hanging it off
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
 * The globe diameter — Figma `image 3083635` — as one number both the glow and
 * the sphere are spent from.
 *
 * The component draws its sphere to the full width of its box: scale 10 puts the
 * 1.25-unit radius almost exactly on the frustum at the camera distance it
 * picks, so the box is the diameter, unmodified.
 *
 * Desktop is a *share* of the rail-to-rail band — 760 across the 1184 the 1280
 * frame leaves between its rails, which is 0.6419 — and reading it off the band
 * rather than off the section height is the load-bearing choice here. Height is
 * the one dimension of this page the design does not set: `min-h-dvh` hands the
 * section whatever the window has. A diameter derived from it (twice the drop
 * from a pinned crest to the foot) asks for 1322 on an 1100-tall screen against
 * Figma's 760 — 70% of the stage where the frame draws 59% — and the globe stops
 * reading as a horizon and becomes the page. Width is the dimension Figma
 * actually composed against, so the globe answers to that and takes the surplus
 * height by hanging further below the fold instead of by growing.
 *
 * Stated in `vw`, not a percentage, because the two consumers sit in different
 * boxes — the glow spans the stage, the globe sits inside the rails — and one
 * driver has to mean the same thing in both. It caps where the sheet caps: past
 * an ultrawide the stage stops at 1440, so the band stops at 1344.
 */
const GLOBE_WIDTH =
  "desktop-sm:[--globe:calc((100vw-96px)*0.6419)] ultrawide:[--globe:calc(1344px*0.6419)]";

/**
 * The clip around the sphere is the globe's box plus a tenth of the diameter of
 * headroom above it (see the block over the markup), so its aspect is 1/1.1
 * rather than square and the sphere's own box is the square bottom-aligned
 * inside it.
 *
 * Phone and tablet are tangent to the rails and sized from width: 370 across on
 * a 402 frame whose rails are 16 in, 650 on a 744 frame whose rails are 48 in.
 * Both are the rail-to-rail width exactly, so `100%` and the cap say the same
 * thing there. `min(…, 100%)` is the floor under them — anything narrower than
 * 402 would push the globe out through both rails, 41px each side at 320.
 */
const CLIP =
  "aspect-[1/1.1] w-[min(370px,100%)] ipad:w-[min(650px,100%)] desktop-sm:w-[var(--globe)]";

/*
 * Painted above the rails, which is the order Figma uses — its rails group
 * (2402:6300) comes before the globe and the glow (6303, 6304). It matters at
 * the foot of the section: the rules carry a hard white bevel, and against the
 * page that reads as the engraving it is meant to be, but against the saturated
 * blue of the glow an unwashed white line lights up like a seam. Figma's frame
 * has no such line — the rail there measures `#92b5d9` against `#9abde2`, eight
 * levels of difference, because the glow is laid over the top of it.
 */
/**
 * Figma's cursor radius, and the size it was tuned at.
 *
 * `cursorRadiusUI` is not a ratio — the component clamps it to 0-600 and spends
 * it as raw canvas pixels, on a backing store it builds 2.5x its container. At
 * Figma's 760 globe that is 75 against 1900, and it reads. The globe is no
 * longer 760: it is derived from the section height now and runs past 1900 on a
 * tall screen, so a fixed 75 kept shrinking as a share of the sphere until the
 * repulsion was there in the numbers and invisible on screen. Scaling it off the
 * measured box is the rule for props tuned at a native size.
 */
const NATIVE_GLOBE = 760;
const NATIVE_CURSOR_RADIUS = 75;

export const Sphere = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [globeWidth, setGlobeWidth] = useState(0);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    setGlobeWidth(Math.round(globe.getBoundingClientRect().width));
    const observer = new ResizeObserver(([entry]) =>
      setGlobeWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(globe);
    return () => observer.disconnect();
  }, []);

  /* Clamped to the component's own ceiling so a 2560 screen cannot ask for more
     than the engine will spend. */
  const cursorRadius = Math.min(
    600,
    Math.round(
      (NATIVE_CURSOR_RADIUS * Math.max(globeWidth, NATIVE_GLOBE)) /
        NATIVE_GLOBE,
    ),
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-30 ${GLOBE_WIDTH}`}
    >
      {/*
      Glow. Figma's box is 526x281 / 886x474 / 1278x684, sitting 133 / 51 / 342
      below the frame edge. The blurs bleed well past those bounds, which is why
      nothing here is clipped.
    */}
      {/* The glow is seated on the globe, so it is spent from the same driver.
        Figma's wash is 1278 across a 760 globe — 1.6816 times the diameter — at
        a 1278/684 aspect. Left as fixed pixels it stayed the size of the 832
        frame while the globe grew past it, and the dome came up out of a wash
        too small to seat it.

        Desktop centres it on the globe's *equator* — `440 + diameter / 2` —
        rather than on the foot of the section, which is what Figma's frame draws
        because there the two are the same edge. They stopped being the same edge
        when the desktop floor went to 1280: the foot is now hundreds of pixels
        below the widest point of the globe, and a wash pinned to it would light
        empty sheet while the dome sat dark. Off the equator it lands within 12px
        of Figma at the frame — the crest nudge, nothing else — and stays under
        the globe at any section height. */}
      <div className="absolute bottom-[-133px] left-1/2 h-[281px] w-[526px] -translate-x-1/2 ipad:bottom-[-51px] ipad:h-[474px] ipad:w-[886px] desktop-sm:top-[calc(440px+var(--globe)/2)] desktop-sm:bottom-auto desktop-sm:aspect-[1278/684] desktop-sm:h-auto desktop-sm:w-[calc(var(--globe)*1.6816)] desktop-sm:-translate-y-1/2">
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
      Globe, in two boxes inside a rail-to-rail clip: the clip that decides where
      the art stops, and the sphere's own square bottom-aligned inside it.

      The rail clip is doing real work, not belt and braces. The component draws
      each particle as a small sphere *centred* on the surface, and the additive
      rim piles them up at the silhouette, so the lit edge runs about eight
      pixels wider than the box it is given. Figma's baked PNG has no such margin
      — its globe is a circle drawn to fit — so at the phone frame, where the
      diameter and the rail-to-rail width are both 370, the live rim crosses both
      rails. Clipping on the rails is also exactly what the design draws: the
      globe is tangent to them.

      Only the globe is clipped. The glow underneath has to keep bleeding into
      the margins past the rails, which is where Figma throws its two lobes.

      The globe takes pointer events so drag and the cursor repulsion still work.
      That is the second thing the clip settles: the component builds a canvas
      2.5x its container and lets it overflow, and since this layer paints above
      the copy, an unclipped canvas reaches right up over the header button and
      swallows it. So the canvas has to be clipped — but *not* at the sphere's
      own edge, which is what it was doing. The cursor throws particles well past
      the surface, and a clip on the silhouette sheared that plume off along a
      dead-flat line across the crest, which is the one place the eye is already
      looking.

      Hence the headroom: the clip is the sphere's box plus a tenth of the
      diameter on top. A tenth is the gap the design itself leaves between the
      stats and the crest — 76 of the 77px it holds open on Figma's 760 globe —
      so at the desktop frame the cut lands on the underside of the stats band,
      which is where the art should stop anyway, and the hit area reaches no copy
      at all. A share of the diameter rather than that flat 77 because the plume
      scales with the globe: `cursorRadiusUI` below is derived from the same
      width, so a bigger globe throws further. Sustained hovering carries it
      about 0.07 of the diameter above the crest, hammered clicking a little
      more. The canvas already renders that band and always did — only the clip
      was hiding it, so the headroom costs nothing.
    */}
      {/*
      Desktop hangs the globe off its *crest*, not off the foot of the section.
      Figma pins the crest at y452 on the 832 frame; 440 here, which lifts the
      dome 12px for a touch more presence and still leaves 65 of Figma's 77px
      clear of the stats band (it closes at y375).

      The crest is the anchor because it is the only edge of the globe the
      composition can see: it is what the 77px gap is measured to, and it is what
      the eye reads as the horizon line. The foot is off the page at every frame,
      so pinning it instead means the one visible relationship drifts with the
      window height.

      `top` lands the *clip*, and the clip carries a tenth of the diameter of
      headroom above the sphere, so it has to be pulled back up by that tenth.
      The clip is 1.1 diameters tall, so a tenth of the diameter is an eleventh
      of the clip — `100% / 11` — a self-relative figure that needs no second
      copy of the diameter.

      What gives is where the globe stops — the window fold, or the section's own
      foot at 1280, whichever comes first. Figma's frame cuts on the equator, and
      at the 1280 frame height that is still what happens, 12px shy. Deeper than
      that the cut falls below the equator and the silhouette turns back in
      slightly before it goes. That is the trade for a globe that stays the size
      the design draws instead of growing with the sheet.

      Phone and tablet keep Figma's own bottom offsets, which are not halves:
      the tablet shows about seven tenths of its globe.
    */}
      <div className="absolute inset-y-0 right-[16px] left-[16px] overflow-hidden ipad:right-[48px] ipad:left-[48px]">
        <div
          className={`pointer-events-auto absolute bottom-[-184px] left-1/2 -translate-x-1/2 overflow-hidden ipad:bottom-[-181px] desktop-sm:top-[440px] desktop-sm:bottom-auto desktop-sm:translate-y-[calc(-100%/11)] ${CLIP}`}
        >
          <div
            ref={globeRef}
            className="absolute inset-x-0 bottom-0 aspect-square"
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
              cursorRadiusUI={cursorRadius}
              cursorStrengthUI={10}
              clickForce={5}
              sphereColor="#167bde"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
