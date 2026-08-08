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
 * Every frame anchors both the globe and the glow to the *bottom* of the
 * section, which is the relationship all three draw: the globe rises out of the
 * bottom edge and is cut by it.
 *
 * Desktop is cut on the equator exactly. Figma's frame closes there — crest y452
 * plus a 380 radius is the 832 foot — so the offset is half the diameter rather
 * than one of Figma's raw pixel numbers, and the top half shows at every width
 * even though the diameter itself tracks the rail-to-rail band. The two stacked
 * frames keep Figma's own offsets, which are not halves: the tablet shows about
 * seven tenths of its globe.
 *
 * A bottom anchor needs the foot to be a composed edge, and it is one now that
 * `--section-h` stops at 1141. While the section merely floored and then grew
 * with the window, the foot was wherever the screen ended and the globe had to
 * hang off its crest instead — the only edge the composition could see.
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
 * driver has to mean the same thing in both. The rails no longer cap, so the
 * share does not either; what caps is the crest.
 *
 * Because the globe is cut on its equator by the foot of the section, its crest
 * sits at `--section-h - diameter / 2`, and a diameter free to track the band
 * therefore walks the crest *up* the page as the screen widens: at 2560 the
 * share asks for 1582, which puts the crest at y350 — through the stats, which
 * close at y375 — and by an ultrawide the dome has swallowed the headline.
 *
 * So the second term holds the crest at Figma's own y452: `(--section-h - 452) *
 * 2` is the largest globe whose top half fits between that line and the foot. It
 * binds only where the screen is wide relative to its height, which is exactly
 * the case that broke, and at Figma's 1280x832 frame the two terms agree at 760.
 *
 * The height that feeds it stops at 1020, which is what keeps the globe from
 * growing with the window. While it binds, that term is the one setting the
 * diameter, so a taller screen means a bigger sphere — 760 at the 832 floor
 * against 1136 by 1020 — and past that point it is no longer the design getting
 * more room, it is the globe eating the page. Frozen at 1020, the last 121px the
 * section can gain go to the gap under the stats instead, and the crest settles
 * a little below Figma's line rather than climbing above it.
 */
const GLOBE_WIDTH =
  "desktop-sm:[--globe:min(calc((100vw-96px)*0.6419),calc((min(var(--section-h),1020px)-452px)*2))]";

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
 * Figma's 760 globe that is 75 against 1900, and it reads. The globe is only 760
 * at the 1280 frame — it tracks the rail-to-rail band, so it passes 1100 on a
 * full-HD screen — and a fixed 75 kept shrinking as a share of the sphere until
 * the repulsion was there in the numbers and invisible on screen. Scaling it off
 * the measured box is the rule for props tuned at a native size.
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

        Desktop centres it on the globe's equator, which on that frame is the
        foot of the section itself — the same edge Figma centres it on, and the
        edge the globe is cut by. Stated as `bottom-0` plus half the box rather
        than as an offset from the top, so it cannot drift away from the cut when
        the section height moves between its floor and the 1141 cap. */}
      <div className="absolute bottom-[-133px] left-1/2 h-[281px] w-[526px] -translate-x-1/2 ipad:bottom-[-51px] ipad:h-[474px] ipad:w-[886px] desktop-sm:bottom-0 desktop-sm:aspect-[1278/684] desktop-sm:h-auto desktop-sm:w-[calc(var(--globe)*1.6816)] desktop-sm:translate-y-1/2">
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
      Desktop drops the globe half a diameter below the foot of the section, so
      the cut lands on the equator and exactly the top half shows. That is what
      Figma draws — its crest sits at y452 on the 832 frame and the radius is
      380, which closes on the frame edge — but it is written as the half rather
      than as y452, because the diameter follows the rail-to-rail band while the
      section height follows the window: only one of those two numbers keeps the
      cut on the equator at both 1280 and 1920.

      The offset lands the sphere's own box, not the clip. The clip carries a
      tenth of the diameter of headroom above the sphere for the cursor plume,
      and that headroom is above the crest, where nothing is measured from — so
      the bottom offset needs no correction for it, where the old crest anchor
      had to pull itself back up by an eleventh of the clip.

      What this costs is the gap between the stats and the horizon, which is
      Figma's 77px at the 832 floor and opens as the section grows — 335px by the
      1141 cap. That gap is ruled sheet, which is what the sheet is for, and it
      is the trade for a globe that stays the size the design draws instead of
      growing with the window.

      Phone and tablet keep Figma's own bottom offsets, which are not halves:
      the tablet shows about seven tenths of its globe.
    */}
      <div className="absolute inset-y-0 right-[16px] left-[16px] overflow-hidden ipad:right-[48px] ipad:left-[48px]">
        <div
          className={`pointer-events-auto absolute bottom-[-184px] left-1/2 -translate-x-1/2 overflow-hidden ipad:bottom-[-181px] desktop-sm:bottom-[calc(var(--globe)/-2)] ${CLIP}`}
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
