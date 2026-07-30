"use client";

import { ConcentricRings } from "./concentric-rings";
import { Navbar } from "./navbar";
import { SpiralStage } from "./spiral-stage";

export const Section15Hero = () => {
  const handleExplorePeople = () => {
    window.location.hash = "#people";
  };

  const handleViewStories = () => {
    window.location.hash = "#stories";
  };

  return (
    <section
      aria-label="47 Studio spiral portraits hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#f8f5ee]"
    >
      <ConcentricRings />

      {/*
        Clip wrapper must be the containing block for SpiralStage.
        Absolute inset-0 against <section> skips this div’s overflow-hidden.
      */}
      <div className="absolute inset-0 z-[2] w-full wide-lg:left-1/2 wide-lg:right-auto wide-lg:max-w-[1440px] wide-lg:-translate-x-1/2 wide-lg:overflow-hidden wide-lg:mask-x-from-80% wide-lg:mask-x-to-90%">
        <SpiralStage
          onExplorePeople={handleExplorePeople}
          onViewStories={handleViewStories}
        />
      </div>

      <Navbar onViewStories={handleViewStories} />
    </section>
  );
};
