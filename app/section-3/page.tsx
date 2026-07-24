import type { Metadata } from "next";
import Image from "next/image";
import Globe from "./globe";
import OrbitControls from "./orbit-controls";

export const metadata: Metadata = {
  title: "Global Presence — Suprema",
  description:
    "Empowering teams across the globe to collaborate seamlessly, driving innovation and success everywhere.",
};

const METRICS = [
  { value: "100%", label: "Increase in Progress Tracking" },
  { value: "50%", label: "Faster Project Completion Rates" },
  { value: "90%", label: "Satisfaction Rate Among Users" },
] as const;

const Section3 = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-4 text-white sm:px-6">
      <section
        aria-labelledby="global-presence-heading"
        className="relative mx-auto flex w-full max-w-295.5 flex-col items-center py-10 sm:min-h-197.5 sm:py-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none relative h-106 w-full shrink-0 overflow-hidden sm:absolute sm:inset-x-0 sm:top-0 sm:h-126"
        >
          <div className="absolute left-1/2 top-67 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_70%)] sm:top-92.375 sm:h-82.75 sm:w-82.75" />

          <OrbitControls />

          <div className="pointer-events-auto absolute left-1/2 top-28 size-78 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing sm:top-51 sm:size-82.75">
            <div className="relative size-78 sm:size-82.75">
              <Globe
                direction="right"
                dots={{
                  color: "#282828",
                  size: 10,
                  density: 4,
                  allDots: false,
                }}
                speed={0}
                stopOnHover={false}
                interactive
                showOutline={false}
                showGrid={false}
                oceanColor="#050505"
                scale={9}
                initialLatitude={23}
                initialLongitude={-23}
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-black sm:h-28" />
        </div>

        <div className="relative z-10 flex w-full flex-1 flex-col items-center pt-4 sm:min-h-197.5 sm:pt-104">
          <header className="-mt-20 flex w-full max-w-220.5 flex-col items-center gap-4 px-2 text-center sm:mt-0">
            <p className="flex items-center gap-1 text-[15px] font-medium leading-normal text-[#adb1b8] sm:text-[17px]">
              <Image
                alt=""
                aria-hidden="true"
                src="/section-3/globe-icon.svg"
                width={22}
                height={22}
                className="size-4.5 sm:size-5.5"
              />
              Global Presence
            </p>

            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <h1
                id="global-presence-heading"
                className="font-tight text-[clamp(2.125rem,8vw,3.625rem)] font-bold leading-[1.2] tracking-[-0.04em] text-balance text-white [text-shadow:0_8px_30px_rgba(255,255,255,0.25),0_4px_8px_rgba(255,255,255,0.05)]"
              >
                Connecting Worldwide Teams
              </h1>

              <p className="max-w-2xl text-[15px] font-medium leading-normal text-pretty text-[#9297a0] sm:text-[18px]">
                Empowering teams across the globe to collaborate seamlessly,
                driving innovation and success everywhere.
              </p>
            </div>
          </header>

          <div aria-hidden="true" className="hidden min-h-10 flex-1 sm:block" />

          <ul className="mt-16 grid w-full max-w-140 shrink-0 sm:mt-0 sm:max-w-none sm:grid-cols-3 sm:divide-x sm:divide-[#18191b]">
            {METRICS.map((metric, index) => (
              <li
                key={metric.value}
                className={`flex w-full max-w-81.75  mx-auto flex-col self-center items-center gap-2 py-8 text-center sm:max-w-none sm:self-auto sm:gap-6 sm:px-6 sm:py-0 ${
                  index === 0
                    ? "border-b border-[#18191b] sm:border-b-0"
                    : index === METRICS.length - 1
                      ? "border-t border-[#18191b] sm:border-t-0"
                      : ""
                }`}
              >
                <span className="bg-linear-to-br from-white to-white/50 bg-clip-text font-tight text-[clamp(2.375rem,10vw,3.625rem)] font-semibold tabular-nums leading-[1.2] tracking-[-0.04em] text-transparent [text-shadow:0_8px_30px_rgba(255,255,255,0.25),0_4px_8px_rgba(255,255,255,0.05)]">
                  {metric.value}
                </span>

                <span className="text-[15px] font-medium leading-normal text-[#6b707a] sm:text-[18px]">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Section3;
