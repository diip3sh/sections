"use client";

import PixelCard from "../originkit/pixel-card";
import { Button } from "./button";
import { CtaStickers, CtaStickerSpacer, IPAD_PIXEL_WASH } from "./cta-stickers";
import { TextArc } from "./text-arc";

type HeroContentProps = {
  onExploreCreators: () => void;
  onViewPortfolio: () => void;
};

/** Soft wash under CTAs — mid-gray pixels so they read on #f5f5f5 */
const PIXEL_PROPS = {
  colors: ["#c8c8c8", "#b8b8b8", "#d4d4d4", "#a8a8a8"],
  appearFrom: "middle" as const,
  trigger: "auto" as const,
  position: "middle" as const,
  replay: false,
  gap: 14,
  pixelSize: 3,
  speed: 80,
  backgroundColor: "transparent",
  padding: 0,
  borderWidth: 0,
  borderColor: "transparent",
  radius: 0,
  showLabel: false,
  transition: { type: "tween" as const, duration: 0.9, ease: "easeOut" },
  style: {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
  },
};

export const HeroContent = ({
  onExploreCreators,
  onViewPortfolio,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[367px] flex-col items-center text-center ipad:max-w-[640px]">
      {/* Copy stays above decorative boxes */}
      <div className="relative z-10 flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-2">
          <TextArc />

          <h1 className="w-full font-instrument-serif text-[48px] leading-[1.1] tracking-[-1.44px] text-[#121212] text-pretty ipad:text-[56px] ipad:tracking-[-1.68px] desktop-sm:text-[74px] desktop-sm:leading-[81px] desktop-sm:tracking-[-2.22px] desktop-sm:-mt-14">
            Where Creative Talent Comes Together.
          </h1>

          <p className="w-full max-w-[501px] font-tight text-[16px] leading-[1.4] tracking-[-0.32px] text-[#121212]/60 text-pretty desktop-sm:text-[17px] desktop-sm:leading-[25.5px] desktop-sm:tracking-[-0.34px]">
            Find exceptional creators, explore inspiring work, and collaborate
            on ideas that shape the future.
          </p>
        </div>

        {/* Full-width anchor: stickers absolute to CTA row; spacer grows section for scroll */}
        <div className="w-full">
          <div className="relative w-full">
            <div className="flex flex-nowrap items-center justify-center gap-6">
              <Button
                variant="primary"
                aria-label="Explore Creators"
                onClick={onExploreCreators}
              >
                Explore Creators
              </Button>
              <Button
                variant="secondary"
                aria-label="View Portfolio"
                onClick={onViewPortfolio}
              >
                View Portfolio
              </Button>
            </div>
            <CtaStickers />
          </div>
          <CtaStickerSpacer />
        </div>
      </div>

      {/* Mobile pixel wash — below content in the sticker/padding band (visible on < ipad) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(100%+24px)] left-1/2 z-1 h-[500px] w-[140%] max-w-[520px] -translate-x-1/2 opacity-70 ipad:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
        }}
      >
        <PixelCard {...PIXEL_PROPS} />
      </div>

      {/* iPad pixel wash — pinned to bottom; height tracks sticker footprint */}
      {IPAD_PIXEL_WASH.map((band) => (
        <div
          key={`pixel-${band.visibility}`}
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-1/2 z-1 w-[140%] max-w-[520px] -translate-x-1/2 opacity-70 desktop-sm:hidden ${band.visibility}`}
          style={{
            height: band.height,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
          }}
        >
          <PixelCard {...PIXEL_PROPS} />
        </div>
      ))}

      {/* Desktop soft pixel washes — inverted edge mask: empty center, pixels on edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] left-1/2 z-[1] hidden desktop-sm:w-[800px] desktop-sm:max-w-[1000px] -translate-x-1/2 justify-between desktop-sm:flex"
      >
        {/* Left — mirror: pixels on left + bottom edges */}
        <div
          className="desktop-sm:h-[305px] desktop-sm:w-[291px] shrink-0 opacity-70"
          style={{
            maskImage: [
              "linear-gradient(to left, transparent 55%, black 100%)",
              "linear-gradient(to bottom, transparent 55%, black 100%)",
              "radial-gradient(ellipse 90% 90% at 20% 80%, black 0%, transparent 70%)",
            ].join(", "),
            WebkitMaskImage: [
              "linear-gradient(to left, transparent 55%, black 100%)",
              "linear-gradient(to bottom, transparent 55%, black 100%)",
              "radial-gradient(ellipse 90% 90% at 20% 80%, black 0%, transparent 70%)",
            ].join(", "),
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        >
          <PixelCard {...PIXEL_PROPS} />
        </div>

        {/* Right — 2nd example inverted: pixels on right + bottom edges */}
        <div
          className="desktop-sm:h-[305px] desktop-sm:w-[291px] shrink-0 opacity-70"
          style={{
            maskImage: [
              "linear-gradient(to right, transparent 55%, black 100%)",
              "linear-gradient(to bottom, transparent 55%, black 100%)",
              "radial-gradient(ellipse 90% 90% at 80% 80%, black 0%, transparent 70%)",
            ].join(", "),
            WebkitMaskImage: [
              "linear-gradient(to right, transparent 55%, black 100%)",
              "linear-gradient(to bottom, transparent 55%, black 100%)",
              "radial-gradient(ellipse 90% 90% at 80% 80%, black 0%, transparent 70%)",
            ].join(", "),
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        >
          <PixelCard {...PIXEL_PROPS} />
        </div>
      </div>
    </div>
  );
};
