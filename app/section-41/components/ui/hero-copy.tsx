import { ArrowIcon, CtaLink } from "./cta-link";

const TITLE = "Every Purchase Starts With a Conversation.";
const DESCRIPTION =
  "Meet Procura AI, the intelligent procurement assistant that captures purchase requests, without losing control.";

/**
 * The headline column. Two things re-pitch across the frames rather than scale:
 * the type steps 35/-1.4 to 48/-1.92 in one move at the tablet, and the whole
 * column swings from centred to left-aligned only at the desktop, where the
 * globe finally sits beside it instead of under it.
 *
 * The phone and tablet pin this block absolutely at y45 inside the canvas
 * because the globe panel below it is pinned too, and the gap between them is a
 * measured 318px / 419px rather than the sum of two auto-heights. From the
 * desktop up the column is back in flow with Figma's 140px top margin — there is
 * nothing under it to collide with.
 */
export const HeroCopy = () => (
  <div className="absolute top-[45px] left-0 flex w-full flex-col items-center gap-[24px] text-center ipad:left-1/2 ipad:w-[497px] ipad:-translate-x-1/2 ipad:gap-[32px] desktop-sm:relative desktop-sm:top-auto desktop-sm:left-auto desktop-sm:mt-[140px] desktop-sm:translate-x-0 desktop-sm:items-start desktop-sm:text-left">
    <div className="flex w-full flex-col items-center gap-[8px] ipad:gap-[16px] desktop-sm:items-start">
      <h1 className="w-full text-[35px] leading-[normal] font-normal tracking-[-1.4px] text-balance text-white ipad:text-[48px] ipad:tracking-[-1.92px]">
        {TITLE}
      </h1>
      {/*
        Figma holds this paragraph to a narrower measure than the column at every
        frame — 354 inside 370, 453 inside 497 — and only lets it fill on the
        desktop. The phone value is a percentage because the canvas is the one
        box in this section that goes fluid below its frame width.
      */}
      <p className="w-[95.68%] text-[16px] leading-[1.5] font-normal text-pretty text-[#a7a7a7] ipad:w-[453px] desktop-sm:w-full">
        {DESCRIPTION}
      </p>
    </div>

    <div className="flex w-full flex-col items-stretch gap-[8px] ipad:flex-row ipad:flex-wrap ipad:items-center ipad:justify-center ipad:gap-[18px] desktop-sm:w-auto desktop-sm:justify-start">
      <CtaLink href="#get-started" className="w-full ipad:w-auto">
        <span>Get Started</span>
        <ArrowIcon />
      </CtaLink>
      <CtaLink
        href="#book-a-call"
        variant="secondary"
        className="w-full ipad:w-auto"
      >
        Book a Call
      </CtaLink>
    </div>
  </div>
);
