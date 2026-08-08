"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import HoverImageReveal from "../originkit/hover-image-reveal";

/**
 * The four capability rows and the image that rides the cursor over them —
 * Figma `Group 2147241545` (phone 1459:1776, tablet 1459:1692, desktop
 * 1459:1739) with `image 3083671` inside it.
 *
 * Figma draws the group in its hovered state: three rows at `#eee` and the one
 * under the pointer in black, with the preview parked beside it. That is exactly
 * what `HoverImageReveal` does, so the frame is the component at rest under a
 * cursor rather than four static rows plus a picture, and everything below is
 * the frame's numbers spent as props.
 *
 * **The pitch is the line box, not a gap.** Figma stacks the rows 86px apart on
 * the desktop while each text node is 96 tall — they overlap by 10, which no
 * `gap` can express. The same relationship holds at every frame: 60.547 on 68,
 * 39.154 on 44. Dividing through, the pitch is 1.34375 of the type size at all
 * three, so the rows are pitched by `lineHeight` with `rowGap` at zero and one
 * ratio covers the widths between the breakpoints as well.
 *
 * That leaves the column 4 pitches tall — 344 against Figma's 354 on the desktop
 * — because Figma's last row carries a full line box and this one stops at the
 * baseline. The component centres its column, and the host box below is Figma's
 * own group height, so the 5px falls evenly top and bottom and every glyph lands
 * where the frame puts it.
 *
 * **Tracking is a ratio for the same reason.** Figma states -2.56 / -1.8023 /
 * -1.1654px, which is -0.04em at 64 / 45.058 / 29.136. One number, three frames.
 */

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;

type Tier = "mobile" | "ipad" | "desktop";

type TierConfig = {
  /** Figma 29.136 / 45.058 / 64. */
  fontSize: number;
  /** `image 3083671` — 170.576x96 / 214.321x120.619 / 305x171, rounded. */
  imageWidth: number;
  imageHeight: number;
  /**
   * How far right of the pointer the preview rides. Figma parks it beside a
   * cursor it cannot draw, so the number is not in the file; it is held at
   * 0.656 of the preview's own width — the component's own 200 against the
   * desktop's 305 — so the image keeps the same relationship to the pointer as
   * it re-pitches rather than sitting under it on the phone.
   */
  offsetX: number;
};

const CONFIG = {
  mobile: { fontSize: 29.136, imageWidth: 171, imageHeight: 96, offsetX: 112 },
  ipad: { fontSize: 45.058, imageWidth: 214, imageHeight: 121, offsetX: 140 },
  desktop: { fontSize: 64, imageWidth: 305, imageHeight: 171, offsetX: 200 },
} as const satisfies Record<Tier, TierConfig>;

/** Pitch over type size, identical at all three frames — see the block above. */
const LINE_HEIGHT = 1.34375;

/**
 * Figma ships one preview export for the whole group, since the frame can only
 * show the row that is hovered. Every row points at it until there is real art
 * per capability.
 */
const PREVIEW = "/section-45/preview-field.png";

const ROWS = [
  "Customer Support",
  "Sales Automation",
  "Content Creation",
  "Data & Reports",
] as const;

/**
 * The component reads its rows from a numbered record rather than an array, so
 * the list is built here and passed through its own shape — extending it is a
 * prop, not an edit to the vendored file.
 */
const ITEMS = {
  itemCount: ROWS.length,
  ...Object.fromEntries(
    ROWS.map((text, index) => [
      `item${index + 1}`,
      { text, image: { src: PREVIEW, alt: "" } },
    ]),
  ),
};

export const HoverList = () => {
  const [tier, setTier] = useState<Tier>("mobile");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const tablet = window.matchMedia(`(min-width: ${IPAD_MIN}px)`);
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_SM_MIN}px)`);
    const sync = () =>
      setTier(desktop.matches ? "desktop" : tablet.matches ? "ipad" : "mobile");

    sync();
    tablet.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      tablet.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  const { fontSize, imageWidth, imageHeight, offsetX } = CONFIG[tier];

  return (
    <HoverImageReveal
      items={ITEMS}
      align="center"
      /* Figma's hovered row is black and its siblings `#eee`; with nothing
         hovered the component paints every row in `textColor`. */
      textColor="#000000"
      dimColor="#eeeeee"
      /* The section's own sheet and the texture at its foot both show through —
         the rows overlap the texture from `Data & Reports` down. */
      backgroundColor="transparent"
      rowGap={0}
      rounded={0}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      offsetX={offsetX}
      font={{
        fontFamily: "var(--font-poppins-family)",
        fontWeight: 500,
        fontSize,
        lineHeight: `${LINE_HEIGHT}em`,
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
      }}
      /* The component's rest position is a spring; reduced motion takes the same
         states with no travel rather than a different set of states. */
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 400, damping: 40, mass: 1 }
      }
      /* Its own 24px padding would inset the rows from the box Figma measures
         them in, and the box is the group's own height. */
      style={{ padding: 0 }}
    />
  );
};
