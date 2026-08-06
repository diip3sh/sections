"use client";

import { useEffect, useState } from "react";

import AsciiImage from "../originkit/ascii-reveal";

/**
 * The hero portrait — Figma `image 3083602`, live rather than exported.
 *
 * Figma ships a flattened bitmap of this same component and then has to blend it
 * `color-dodge` to knock its black background out. The live canvas draws on
 * transparency, so the blend goes with the export.
 *
 * `columns` is the only number the design really fixes, and it is not obvious
 * from the file: it is a count, and Figma's three exports are one render scaled
 * to three boxes. Autocorrelating the glyph lattice in each frame gives a pitch
 * of 5.5px across the 510px desktop box and 4.3px across the 402px phone one —
 * about 93 columns in both, and a 1.7 row-to-column ratio that matches the
 * component's own `fontPx = cellW * 1.7`. So the count is constant and the
 * glyphs scale, which is also what keeps the portrait recognisable on a phone.
 *
 * `fit` is `contain`, not the component's `cover` default, and that is the one
 * prop the framing hangs on. The source is a 1024x1536 portrait in a landscape
 * box: `cover` scales it to the width and crops the figure at the chest, while
 * `contain` scales it to the height at 0.295 and centres it. Solving Figma's
 * frame for the scale gives 0.284 — the head sits between y20 and y250 of the
 * 453px box against 60 to 870 in the source — which is `contain` and not
 * anything `cover` and a `focusY` can reach. `focusY` is inert under `contain`.
 *
 * `contrast` is 21 against a default of 100. The source is very dark — half of
 * the visible crop sits under luminance 0.055 — and the component's punch of
 * `0.5 + contrast/50` blanks every cell below `0.5 - 0.444/punch`, so the
 * default renders only the visor and drops the whole face. 21 is where the head
 * comes back without the image's grey backdrop starting to speckle, which it
 * does by 18.
 */

/** Measured off all three frames; see above. */
const COLUMNS = 93;

const PORTRAIT = {
  src: "/section-35/hero.png",
  alt: "ASCII rendering of a figure in a mirrored visor helmet, facing forward.",
};

export const AsciiPortrait = () => {
  /*
   * The pointer reveal paints a photo under the cursor, and its loop runs for as
   * long as it is enabled — so it is worth not enabling it where there is no
   * cursor to follow. `reveal` is also a dependency of the component's setup
   * effect, so resolving the query before the first mount avoids decoding the
   * image and rebuilding the whole glyph field a second time.
   */
  const [reveal, setReveal] = useState<boolean | null>(null);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setReveal(pointer.matches);
    sync();
    pointer.addEventListener("change", sync);
    return () => pointer.removeEventListener("change", sync);
  }, []);

  if (reveal === null) return null;

  return (
    <AsciiImage
      image={PORTRAIT}
      fit="contain"
      columns={COLUMNS}
      contrast={21}
      inkColor="#ffffff"
      reveal={reveal}
      /*
       * The canvas is sized `100% x 100%` by the component, and a percentage
       * height only resolves against a parent with a definite one — which the
       * band does not have, since its height comes from `flex-1` under a
       * `min-height` chain. Left alone it falls back to the canvas element's
       * intrinsic 2:1, which is why the portrait came out half the height of its
       * band below 1280. Taking it out of flow against the `relative` box in
       * `section-35-hero.tsx` gives the percentages something to resolve to.
       */
      style={{ position: "absolute", inset: 0 }}
    />
  );
};
