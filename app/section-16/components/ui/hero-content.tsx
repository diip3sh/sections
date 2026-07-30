"use client";

import { Button } from "./button";
import { TextArc } from "./text-arc";

type HeroContentProps = {
  onExploreAi: () => void;
  onContactSales: () => void;
};

export const HeroContent = ({
  onExploreAi,
  onContactSales,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full flex-col items-center desktop-sm:mt-12">
      <TextArc />

      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-col items-center gap-6 ipad:gap-8">
          <div className="flex w-full flex-col items-center gap-2 ipad:gap-4 text-center">
            <h1 className="w-full font-instrument-serif text-[44px] ipad:text-[72px] leading-none tracking-[-0.88px] text-white text-pretty">
              Powering Tomorrow&apos;s Intelligent Ecosystem
            </h1>

            <p className="w-full max-w-[340px] ipad:max-w-none font-sans text-[14px] ipad:text-[16px] leading-[1.4] tracking-[-0.28px] text-white/70 text-pretty">
              Create smarter products with scalable AI infrastructure, real-time
              insights, and enterprise-grade security—all in one unified
              platform.
            </p>
          </div>
        </div>
        <div className="pointer-events-auto mx-auto flex max-w-[310px] items-center gap-4">
          <Button
            variant="primary"
            aria-label="Explore AI"
            onClick={onExploreAi}
          >
            Explore AI
          </Button>
          <Button
            variant="secondary"
            aria-label="Contact Sales"
            onClick={onContactSales}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
