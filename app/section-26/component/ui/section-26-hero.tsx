import { Backdrop } from "./backdrop";
import { Orb } from "./orb";

export const Section26Hero = () => (
  <main className="relative min-h-dvh w-full overflow-hidden bg-black">
    {/* 402x874 stage — every layer is positioned against these coordinates */}
    <div className="relative h-[874px] overflow-hidden">
      <Backdrop />

      {/* Nav */}
      <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between p-4">
        <a href="/" className="flex items-center gap-2">
          <span
            className="block size-[22px] shrink-0 overflow-hidden"
            style={{
              maskImage: "url('/section-26/logo-mask.svg')",
              WebkitMaskImage: "url('/section-26/logo-mask.svg')",
              maskSize: "22px 22px",
              WebkitMaskSize: "22px 22px",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <img
              src="/section-26/logo-mark.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </span>
          <span className="font-sans text-[20px] leading-[25.5px] font-semibold tracking-[-0.4px] whitespace-nowrap text-white">
            Visionary
          </span>
        </a>

        <button type="button" aria-label="Open menu" className="size-6">
          <img
            src="/section-26/menu.svg"
            alt=""
            className="block size-6 max-w-none"
          />
        </button>
      </nav>

      {/* Headline + logo strip */}
      <div className="absolute top-[155px] left-[calc(50%+0.5px)] z-20 flex -translate-x-1/2 flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center text-white">
          <h1 className="font-instrument-serif text-[56px] leading-[1.1] tracking-[-1.68px] whitespace-nowrap">
            Your Everyday
            <br />
            Wellness Partner
          </h1>
          <p className="w-[399px] font-sans text-[16px] leading-[1.4] tracking-[-0.32px] opacity-60">
            Stay on top of your health with a trusted partner by your side-track
            habits, monitor progress, and
            <br />
            receive personalized guidance for a
            <br />
            balanced, healthier life every day.
          </p>
        </div>

        {/* Trusted logos — the strip is masked to fade at both ends */}
        <div className="relative h-[62px] w-[572.243px]">
          <img
            src="/section-26/logo-strip.svg"
            alt=""
            className="absolute top-0 left-10 block h-[62.075px] w-[954.297px] max-w-none"
          />
        </div>
      </div>

      {/* Arcs + film grain. The export is flattened against black, so it is
          screen-blended — black drops out and only the light survives. */}
      <img
        aria-hidden
        src="/section-26/arcs-texture.png"
        alt=""
        className="pointer-events-none absolute inset-0 z-0 block size-full max-w-none mix-blend-screen"
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <Orb />
      </div>

      {/* Hand */}
      <img
        aria-hidden
        src="/section-26/hand.png"
        alt=""
        className="pointer-events-none absolute top-[calc(50%+255px)] left-[calc(50%-4px)] z-10 h-[410px] w-[738px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
      />

      {/* Bottom light bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-35.15px] left-[68.62px] h-[51.15px] w-[342.55px] blur-[18.083px]"
      >
        <div className="absolute inset-0 bg-[rgba(180,52,26,0.1)] backdrop-blur-[25.833px]" />
      </div>
    </div>
  </main>
);
