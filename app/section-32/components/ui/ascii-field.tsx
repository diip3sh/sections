"use client";

import { useEffect, useState } from "react";

import AsciiFire from "../originkit/ascii-fire";

/**
 * The burning character field — Figma `image 3083587`
 * (mobile 2371:1702, iPad 2371:2450, desktop 2371:3199).
 *
 * Figma ships it as a flat PNG, but that PNG is a still of this very OriginKit
 * component: same dense charset, same flame propagating up from a seeded bottom
 * row.
 *
 * What it is not is 1:1. Figma renders the field once at 948 x 474 and then
 * stretches that one still to fit each frame — 1049 wide on the phone, 1455 on
 * iPad, 1498 on desktop. Measured off the frames, the character row pitch comes
 * out at 11.5 / 16 / 16.5px against the component's native 10.5, which is those
 * same ratios. So the cell is re-pitched rather than the image scaled: font
 * size 10 x (frame width / 948).
 *
 * That number drives the component's own column and row count, so it cannot be
 * a CSS transform — a scaled ancestor makes `getBoundingClientRect` report the
 * scaled box, the component lays out for the full width and then overflows by
 * the scale factor, and the bright bottom of the flame ends up clipped off. It
 * is a numeric prop read in JS, which is why it switches on a media query here
 * rather than a Tailwind variant.
 *
 * `decay` and `thickness` are raised off their defaults to match the vertical
 * falloff Figma shows — a long dim middle that climbs steeply over the last
 * ~150px. Measured band by band the live field still runs about a third darker
 * than the frame down there, and that gap is not chasable: Figma's still is a
 * bitmap stretched 1.58x, which thickens every glyph stroke. A live render at
 * the same cell is simply sharper.
 *
 * Only the palette is re-derived beyond that. The component ships a fire ramp;
 * sampling the Figma still by luminance gives the green one below, topping out
 * at the #cbe36d of its brightest glyphs. Figma's flame carries no red sparks
 * (0.08% of lit pixels are red-dominant, i.e. none), so the spark colour joins
 * the ramp rather than fighting it.
 *
 * The layer bleeds the full viewport rather than sitting inside the capped
 * stage — Figma's own field is wider than every frame it appears in, because a
 * fixed cell means a wider box is simply more columns. `mix-blend-screen` is
 * Figma's, and it is what lets the glyphs sit over the page green without a
 * box edge.
 */

/** Sampled from the Figma still at seven luminance quantiles, dark to bright. */
const GREEN_SHADES = [
  "#161b03",
  "#283009",
  "#3f4c0b",
  "#5c692d",
  "#89a432",
  "#a0bd3b",
  "#cbe36d",
];

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;

type Tier = "mobile" | "ipad" | "desktop";

/** 10px native cell x (Figma's field width / the 948 it was rendered at). */
const FONT_SIZE = {
  mobile: 11.07,
  ipad: 15.35,
  desktop: 15.8,
} as const satisfies Record<Tier, number>;

export const AsciiField = () => {
  const [tier, setTier] = useState<Tier>("mobile");

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

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[361px] bottom-0 z-0 mix-blend-screen ipad:top-[341px] desktop-sm:top-[138px]"
    >
      <AsciiFire
        palette="custom"
        shades={GREEN_SHADES}
        sparkColor="#cbe36d"
        charset="dense"
        decay={22}
        thickness={12}
        fontSize={FONT_SIZE[tier]}
        backgroundColor="transparent"
        style={{ width: "100%", height: "100%", minHeight: 0 }}
      />
    </div>
  );
};
