"use client";

import { Button } from "./button";

type HeroContentProps = {
  onStartAutomating: () => void;
  onBookDemo: () => void;
};

export const HeroContent = ({
  onStartAutomating,
  onBookDemo,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[370px] flex-col items-center gap-6 px-4">
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <p className="font-sans text-[16px] font-normal leading-normal tracking-[-0.48px] text-[#c98bff] whitespace-nowrap">
          Future Conversation solution
        </p>

        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="w-full font-instrument-serif text-[48px] leading-[1.1] tracking-[-1.44px] text-white text-balance">
            Intelligent Service Automation
          </h1>

          <p className="w-full max-w-[332px] font-sans text-[14px] font-normal leading-[1.4] tracking-[-0.28px] text-white/80 text-pretty">
            Automate your customer service with conversational AI that can
            answer, understand, and adept to each user in real time improving
            efficiency, satisfaction,and support quality effortlessly.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 pb-[58px]">
        <Button
          variant="primary"
          aria-label="Start Automating"
          onClick={onStartAutomating}
        >
          Start Automating
        </Button>
        <Button
          variant="secondary"
          aria-label="Book a Demo"
          onClick={onBookDemo}
        >
          Book a Demo
        </Button>
      </div>
    </div>
  );
};
