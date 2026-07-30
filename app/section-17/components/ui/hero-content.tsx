"use client";

import { Button } from "./button";
import { TextArc } from "./text-arc";

type HeroContentProps = {
  onExploreCreators: () => void;
  onViewPortfolio: () => void;
};

export const HeroContent = ({
  onExploreCreators,
  onViewPortfolio,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[640px] flex-col items-center px-4 text-center">
      <TextArc />

      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="w-full font-instrument-serif text-[40px] leading-[1.1] tracking-[-1.2px] text-[#121212] text-pretty ipad:text-[56px] ipad:tracking-[-1.68px] desktop-sm:text-[74px] desktop-sm:leading-[81px] desktop-sm:tracking-[-2.22px]">
          Where Creative Talent Comes Together.
        </h1>

        <div className="flex w-full flex-col items-center gap-8">
          <p className="w-full max-w-[501px] font-tight text-[15px] leading-[22.5px] tracking-[-0.3px] text-[#121212]/60 text-pretty desktop-sm:text-[17px] desktop-sm:leading-[25.5px] desktop-sm:tracking-[-0.34px]">
            Find exceptional creators, explore inspiring work, and collaborate
            on ideas that shape the future.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 desktop-sm:gap-6">
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
        </div>
      </div>
    </div>
  );
};
