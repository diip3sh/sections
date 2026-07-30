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

      <div className="absolute inset-0 z-[2]">
        <SpiralStage
          onExplorePeople={handleExplorePeople}
          onViewStories={handleViewStories}
        />
      </div>

      <Navbar onViewStories={handleViewStories} />
    </section>
  );
};
