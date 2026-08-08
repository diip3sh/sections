import TextSphere from "../originkit/text-sphere";

import { CornerMark } from "./corner-mark";

const TESTIMONIALS = [
  {
    name: "Emily Carter",
    role: "Design Manager",
    avatar: "/section-41/avatar-emily.png",
    /** Figma: phone 236/24 of 370 · tablet 294/83 · desktop 322/31 of 574x500. */
    position:
      "top-[236px] left-[6.4865%] ipad:top-[294px] ipad:left-[83px] desktop-sm:top-[calc(50%+35px)] desktop-sm:left-[calc(50%-219px)]",
  },
  {
    name: "David Kim",
    role: "NovaTech",
    avatar: "/section-41/avatar-david.png",
    /** Figma: phone 47/202 of 370 · tablet 70/385 · desktop 89/285 of 574x500. */
    position:
      "top-[47px] left-[54.5946%] ipad:top-[70px] ipad:left-[385px] desktop-sm:top-[calc(50%-198px)] desktop-sm:left-[calc(50%+35px)]",
  },
] as const;

/**
 * The word-globe panel — Figma nodes 384:2560 (phone), 384:3232 (tablet),
 * 384:2415 (desktop).
 *
 * Figma frames this panel with a hairline on the sides that face the rest of the
 * layout, and only those: top and bottom on the phone where it is a full-width
 * band cut into the column, bottom only on the tablet where it closes the frame,
 * and the left edge on the desktop where it divides the globe from the copy. All
 * three are the same rule seen from a different side, so the borders switch per
 * breakpoint rather than the panel gaining a wrapper.
 *
 * The crosshairs follow that: the tablet drops the top pair because the panel's
 * top edge is not drawn there, so a mark on it would float on nothing.
 *
 * The desktop panel is a *share* of the canvas — Figma's 500 of 1040, 48.0769%
 * — not the 500 itself. The canvas grows to 1920 above the frame (see
 * `section-41-hero.tsx`) and a constant 500 spent every one of those pixels on
 * the gap between the copy and the globe: Figma holds 213px between the CTAs and
 * this panel's border, a fixed panel opens 858 at a 1600 canvas. Nothing else in
 * the row can take that width — the type is Figma's and the cards are
 * intrinsically sized — so the panel is what has to keep its proportion.
 *
 * Vertically the panel is a stretched flex item rather than Figma's 574: the row
 * grows with the window up to the 1040 cap, and this border is what continues
 * down into the trusted band's seam, so it has to reach it.
 *
 * The globe box inside stays 416x400 and centres on both axes. It cannot scale:
 * the component sizes its sphere off `min(width, height)`, so a box that grew on
 * one axis would only pad the other. Figma centres it on both anyway — 42 + 416 +
 * 42 is exactly 500, 87 + 400 + 87 exactly 574 — so the two 50%s reproduce the
 * frame and keep the globe on the panel's axes as it grows.
 *
 * The testimonial cards are measured from those axes rather than from the panel
 * edges, which is the same reason: they overlap the globe, not the border.
 * Figma's 31/322 and 285/89 inside a 500x574 panel are 219 left and 35 below
 * centre, and 35 right and 198 above it.
 *
 * Below the 402 frame the canvas is the one thing that goes fluid, and the globe
 * is the one thing wide enough to notice, so 17/370 and 336/370 are carried as
 * percentages of the panel.
 */
export const GlobePanel = () => (
  <div className="absolute top-[363px] right-0 left-0 h-[323px] border-x-0 border-y border-white/10 ipad:top-[464px] ipad:h-[448px] ipad:border-t-0 desktop-sm:relative desktop-sm:top-auto desktop-sm:right-auto desktop-sm:left-auto desktop-sm:h-auto desktop-sm:w-[48.0769%] desktop-sm:flex-none desktop-sm:self-stretch desktop-sm:border-y-0 desktop-sm:border-l">
    <CornerMark className="top-[-7.5px] left-[-7.5px] ipad:hidden desktop-sm:block" />
    <CornerMark className="top-[-7.5px] right-[-7.5px] ipad:hidden desktop-sm:block" />
    <CornerMark className="bottom-[-7px] left-[-7px]" />
    <CornerMark className="right-[-7px] bottom-[-7px]" />

    <div className="absolute top-[-1px] left-[4.5946%] z-[1] h-[323px] w-[90.8108%] overflow-hidden ipad:top-[24px] ipad:left-[116px] ipad:h-[400px] ipad:w-[416px] desktop-sm:top-1/2 desktop-sm:left-1/2 desktop-sm:-translate-x-1/2 desktop-sm:-translate-y-1/2">
      <TextSphere word="procura" speed={6} twist={50} letterSpacing={800} />
    </div>

    {TESTIMONIALS.map((person) => (
      <figure
        key={person.name}
        className={`absolute z-[2] flex items-center gap-[8px] border border-white/10 bg-[#222] p-[6px] ipad:p-[12px] ${person.position}`}
      >
        <img
          src={person.avatar}
          alt=""
          aria-hidden
          className="size-[32px] flex-none rounded-full object-cover"
        />
        <figcaption>
          <p className="text-[14px] leading-[normal] text-white">
            {person.name}
          </p>
          <p className="text-[12px] leading-[normal] text-white opacity-70">
            {person.role}
          </p>
        </figcaption>
      </figure>
    ))}
  </div>
);
