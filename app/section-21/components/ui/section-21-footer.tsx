"use client";

import { Footer } from "./footer";

export const Section21Footer = () => {
  return (
    <section
      aria-label="Notrix site footer"
      className="relative isolate flex min-h-svh w-full items-end justify-center overflow-hidden bg-[#f6f3ea] px-4 py-12 ipad:px-10 ipad:py-16 desktop-sm:px-12 desktop-sm:py-24"
    >
      {/* Soft multi-color wash behind the footer card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[55%] min-h-[280px] w-full justify-center overflow-hidden ipad:h-[60%] desktop-sm:h-[70%] desktop-sm:min-h-[320px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 35%, transparent 100%)",
        }}
      >
        <img
          src="/section-21/bg/gradient-shapes.svg"
          alt=""
          width={2238}
          height={545}
          className="absolute top-[-30%] left-1/2 h-auto w-[280%] max-w-none -translate-x-1/2 scale-110 opacity-90 blur-[40px] ipad:top-[-40%] ipad:w-[220%] ipad:blur-[60px] desktop-sm:top-[-55%] desktop-sm:w-[160%] desktop-sm:blur-[80px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-[95dvw] wide-lg:max-w-[1440px] mx-auto ">
        <Footer />
      </div>
    </section>
  );
};
