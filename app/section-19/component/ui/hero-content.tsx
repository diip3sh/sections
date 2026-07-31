"use client";

import { Button } from "./button";

type HeroContentProps = {
  onStartAutomating: () => void;
  onBookDemo: () => void;
};

const SIDE_CALLOUTS = [
  {
    lines: ["Built with AI for", "Maximum efficiency"],
  },
  {
    lines: ["Smart Responses for", "Every Scenario"],
  },
] as const;

export const HeroContent = ({
  onStartAutomating,
  onBookDemo,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[370px] flex-col items-center gap-6 px-4 desktop-sm:mx-0 desktop-sm:max-w-none desktop-sm:items-stretch desktop-sm:gap-0 desktop-sm:px-0">
      {/* Eyebrow + headline */}
      <div className="flex w-full flex-col items-center gap-3 text-center desktop-sm:max-w-[923px] desktop-sm:items-start desktop-sm:gap-6 desktop-sm:text-left">
        <p className="font-sans text-[16px] font-normal leading-normal tracking-[-0.48px] text-[#c98bff] whitespace-nowrap desktop-sm:font-tight desktop-sm:text-[18px] desktop-sm:font-medium desktop-sm:tracking-[-0.54px]">
          Future Conversation solution
        </p>

        <div className="flex w-full flex-col items-center gap-2 desktop-sm:items-start desktop-sm:gap-0">
          <h1 className="w-full font-instrument-serif text-[48px] leading-[1.1] tracking-[-1.44px] text-white text-balance desktop-sm:text-[104px] desktop-sm:leading-[104px] desktop-sm:tracking-[-3.12px]">
            Intelligent Service Automation
          </h1>

          {/* Mobile / tablet description stays under the headline */}
          <p className="w-full max-w-[332px] font-sans text-[14px] font-normal leading-[1.4] tracking-[-0.28px] text-white/80 text-pretty desktop-sm:hidden">
            Automate your customer service with conversational AI that can
            answer, understand, and adept to each user in real time improving
            efficiency, satisfaction,and support quality effortlessly.
          </p>
        </div>
      </div>

      {/* CTAs — stacked on mobile, row on desktop */}
      <div className="flex w-full flex-col items-center gap-3 pb-[58px] desktop-sm:mt-10 desktop-sm:w-auto desktop-sm:flex-row desktop-sm:items-center desktop-sm:gap-3 desktop-sm:pb-0">
        <Button
          variant="primary"
          aria-label="Start Automating"
          onClick={onStartAutomating}
          className="w-full desktop-sm:w-fit"
        >
          Start Automating
        </Button>
        <Button
          variant="secondary"
          aria-label="Book a Demo"
          onClick={onBookDemo}
          className="w-full desktop-sm:w-fit"
        >
          Book a Demo
        </Button>
      </div>

      {/* Desktop description — lower left (Figma 1:1858) */}
      <p className="mt-auto hidden max-w-[420px] font-tight text-[18px] leading-[25.5px] tracking-[-0.36px] text-white/80 desktop-sm:mt-[148px] desktop-sm:block">
        Automate your customer service with conversational AI that can answer,
        understand, and adept to each user in real time - improving efficiency,
        satisfaction, and support quality effortlessly.
      </p>

      {/* Desktop side callouts — right column (Figma 1:1836 / 1:1832) */}
      <aside
        aria-label="Product highlights"
        className="pointer-events-none absolute top-[442px] right-0 hidden flex-col items-end gap-[66px] text-right desktop-sm:flex"
      >
        {SIDE_CALLOUTS.map((callout) => (
          <p
            key={callout.lines[0]}
            className="font-tight text-[18px] leading-normal font-medium tracking-[-0.54px] text-[#c98bff] whitespace-nowrap"
          >
            {callout.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        ))}
      </aside>
    </div>
  );
};
