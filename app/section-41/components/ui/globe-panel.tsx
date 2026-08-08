import TextSphere from "../originkit/text-sphere";

import { CornerMark } from "./corner-mark";

const TESTIMONIALS = [
  {
    name: "Emily Carter",
    role: "Design Manager",
    avatar: "/section-41/avatar-emily.png",
    /** Figma: phone 236/24 of 370 · tablet 294/83 · desktop 322/31. */
    position:
      "top-[236px] left-[6.4865%] ipad:top-[294px] ipad:left-[83px] desktop-sm:top-[322px] desktop-sm:left-[31px]",
  },
  {
    name: "David Kim",
    role: "NovaTech",
    avatar: "/section-41/avatar-david.png",
    /** Figma: phone 47/202 of 370 · tablet 70/385 · desktop 89/285. */
    position:
      "top-[47px] left-[54.5946%] ipad:top-[70px] ipad:left-[385px] desktop-sm:top-[89px] desktop-sm:left-[285px]",
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
 * Only the globe's box is a percentage. Everything else is either intrinsically
 * sized (the testimonial cards) or lives at a fixed frame width — the tablet and
 * desktop canvases never move off 648 and 1040. Below the 402 frame the canvas
 * is the one thing that goes fluid, and the globe is the one thing wide enough
 * to notice, so 17/370 and 336/370 are carried as percentages of the panel.
 */
export const GlobePanel = () => (
  <div className="absolute top-[363px] right-0 left-0 h-[323px] border-x-0 border-y border-white/10 ipad:top-[464px] ipad:h-[448px] ipad:border-t-0 desktop-sm:top-0 desktop-sm:right-0 desktop-sm:left-auto desktop-sm:h-[574px] desktop-sm:w-[500px] desktop-sm:border-y-0 desktop-sm:border-l">
    <CornerMark className="top-[-7.5px] left-[-7.5px] ipad:hidden desktop-sm:block" />
    <CornerMark className="top-[-7.5px] right-[-7.5px] ipad:hidden desktop-sm:block" />
    <CornerMark className="bottom-[-7px] left-[-7px]" />
    <CornerMark className="right-[-7px] bottom-[-7px]" />

    <div className="absolute top-[-1px] left-[4.5946%] z-[1] h-[323px] w-[90.8108%] overflow-hidden ipad:top-[24px] ipad:left-[116px] ipad:h-[400px] ipad:w-[416px] desktop-sm:top-[87px] desktop-sm:left-[42px]">
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
