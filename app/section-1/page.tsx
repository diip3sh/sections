import type { Metadata } from "next";
import { FloatingCards } from "./components/floating-cards";
import { HeroBackground } from "./components/hero-background";
import { Navbar } from "./components/navbar";
import { HeroContainer } from "./components/container";
import { SubContainer } from "./components/sub-container";

export const metadata: Metadata = {
  title: "Suprema — Plan and navigate from idea to launch",
  description:
    "Create a clear roadmap, track progress, and smoothly guide your project from idea to successful launch.",
};

const Section1 = () => {
  return (
    <section
      aria-label="Suprema product showcase"
      className="relative w-full overflow-hidden bg-[#090a0b]"
    >
      <HeroBackground />

      <div className="relative mx-auto flex min-h-[min(856px,100svh)] w-full max-w-[1440px] flex-col">
        <Navbar />

        <div className="relative flex-1">
          <div className="absolute inset-0">
            <FloatingCards />
          </div>

          <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 pt-[120px]">
            <HeroContainer />
          </div>
        </div>

        <div className="relative z-20 px-6 pb-[56px] pt-[40px]">
          <SubContainer />
        </div>
      </div>
    </section>
  );
};

export default Section1;
