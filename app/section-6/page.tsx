import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Steps to Start — Process",
  description:
    "Create an account, complete your course, and receive certificates in three simple steps.",
};

type Step = {
  step: string;
  title: string;
  description: string;
  screen: string;
  screenAlt: string;
  screenWidth: number;
  screenHeight: number;
};

const STEPS: Step[] = [
  {
    step: "Step 01",
    title: "Create an Account",
    description:
      "Create an account to start exploring and enrolling in our amazing courses and blogs.",
    screen: "/section-6/vector.png",
    screenAlt: "Dashboard screen showing ongoing projects and today’s tasks",
    screenWidth: 780,
    screenHeight: 1688,
  },
  {
    step: "Step 02",
    title: "Complete your Course",
    description:
      "Complete your courses by engaging with all the nice lessons and assignments.",
    screen: "/section-6/vector2.png",
    screenAlt:
      "Task details screen showing assign to, deadline, priority, and checklist",
    screenWidth: 780,
    screenHeight: 1688,
  },
  {
    step: "Step 03",
    title: "Receive Certificates",
    description:
      "Earn certificates upon course completion to showcase your new skills.",
    screen: "/section-6/vector3.png",
    screenAlt: "Project details screen showing a 78 percent progress gauge",
    screenWidth: 1560,
    screenHeight: 3376,
  },
];

/**
 * Upright mobile.svg frame — vector screen shows through the SVG hole.
 * Placement matches Figma: ~12% top inset, ~65% card width, clipped mid-body.
 */
const MobileShowcase = ({
  screen,
  screenAlt,
  screenWidth,
  screenHeight,
}: {
  screen: string;
  screenAlt: string;
  screenWidth: number;
  screenHeight: number;
}) => {
  return (
    <div className="absolute top-[12%] left-1/2 aspect-[234.606/475.386] w-[clamp(9.5rem,64.7%,14.662875rem)] -translate-x-1/2">
      {/* Screen behind frame — shows through mobile.svg hole */}
      <div className="absolute inset-[1.4%_4.2%_1.4%_4.2%] overflow-hidden bg-white">
        <Image
          alt={screenAlt}
          src={screen}
          width={screenWidth}
          height={screenHeight}
          sizes="(max-width: 640px) 65vw, 235px"
          className="size-full object-cover object-top"
          priority
        />
      </div>

      <Image
        alt=""
        aria-hidden="true"
        src="/section-6/mobile.svg"
        width={235}
        height={476}
        className="pointer-events-none absolute inset-0 z-10 size-full object-fill"
      />
    </div>
  );
};

const CardVisual = ({
  screen,
  screenAlt,
  screenWidth,
  screenHeight,
}: {
  screen: string;
  screenAlt: string;
  screenWidth: number;
  screenHeight: number;
}) => {
  return (
    <div className="relative h-[clamp(12.5rem,52vw,20.0625rem)] w-full shrink-0 overflow-clip rounded-t-3xl border-2 border-solid border-white">
      {/* Soft blue light glow */}
      <div
        aria-hidden="true"
        className="absolute top-[-74%] left-[-17%] h-[107%] w-[116%] opacity-60 mix-blend-hard-light blur-[10px]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            src="/section-6/lights.png"
            width={1200}
            height={1097}
            className="absolute top-[-40.28%] left-[-34.47%] h-[167.81%] w-[168.94%] max-w-none"
          />
        </div>
      </div>

      {/* Dot / concentric pattern behind phone */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-57%] left-1/2 aspect-[431.76/422.9] w-[134%] max-w-none -translate-x-1/2"
      >
        <Image
          alt=""
          src="/section-6/pattern.svg"
          width={432}
          height={423}
          className="size-full"
        />
      </div>

      <MobileShowcase
        screen={screen}
        screenAlt={screenAlt}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
    </div>
  );
};

const CornerShapes = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-3.25rem] left-0 flex h-[3.25rem] w-[clamp(1.5rem,5vw,2.125rem)] items-center justify-center"
      >
        <div className="size-full -scale-y-100 rotate-180">
          <Image
            alt=""
            src="/section-6/shape-left.svg"
            width={34}
            height={66}
            className="size-full"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-3.25rem] right-0 h-[3.25rem] w-[clamp(1.5rem,5vw,2.125rem)]"
      >
        <Image
          alt=""
          src="/section-6/shape-right.svg"
          width={34}
          height={66}
          className="size-full"
        />
      </div>
    </>
  );
};

const StepCard = ({
  step,
  title,
  description,
  screen,
  screenAlt,
  screenWidth,
  screenHeight,
}: Step) => {
  return (
    <article className="relative flex h-full min-w-0 flex-1 flex-col overflow-clip rounded-3xl border border-solid border-[#e1e4eb] p-1.5 shadow-[0_0_0_5px_white]">
      {/* Card background: gradient + texture + fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl"
      >
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-[#eaf3fb] to-white" />
        <div
          className="absolute inset-0 rounded-3xl bg-size-[140px_140px] bg-top-left opacity-80 mix-blend-luminosity"
          style={{ backgroundImage: "url(/section-6/card-texture.png)" }}
        />
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-[rgba(234,243,251,0)] to-white" />
      </div>

      <CardVisual
        screen={screen}
        screenAlt={screenAlt}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-3 rounded-b-[20px] bg-white px-[clamp(1rem,4vw,1.875rem)] py-[clamp(1.25rem,4vw,1.5rem)] shadow-[0_-2px_6px_rgba(183,183,183,0.1),0_2px_4px_rgba(178,181,188,0.2)]">
        <CornerShapes />

        <div className="flex items-center justify-center rounded-full border border-solid border-[#e7e9ef] px-2.5 py-[5px]">
          <span className="font-instrument text-[clamp(0.8125rem,2.5vw,0.9375rem)] leading-normal font-medium whitespace-nowrap text-[#3d3d3d]">
            {step}
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-1 text-center leading-normal">
          <h3 className="font-space text-[clamp(1.125rem,3.5vw,1.375rem)] font-medium text-[#1a1a1a]">
            {title}
          </h3>
          <p className="w-fit max-w-full text-balance font-instrument text-[clamp(0.9375rem,2.8vw,17px)] leading-[1.5] font-medium text-[#616161]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

const Section6 = () => {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6f7f9] text-[#0d0d0d]">
      <section
        aria-labelledby="steps-heading"
        className="mx-auto flex w-full max-w-300 flex-col items-center gap-[clamp(2rem,5vw,2.5rem)] px-4 py-[clamp(3rem,8vw,4rem)] pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 ipad:gap-15 ipad:px-8 ipad:py-[95px] laptop:px-10"
      >
        <header className="flex w-full max-w-3xl flex-col items-center gap-4">
          <div className="flex items-center gap-1 overflow-clip rounded-full border border-[#d4e7f6] bg-[#f2f7fd] px-2.5 py-1.5 shadow-[0_0_0_3px_white,0_2px_3px_rgba(183,183,183,0.1)]">
            <Image
              alt=""
              aria-hidden="true"
              src="/section-6/process-icon.svg"
              width={24}
              height={24}
              className="size-6 shrink-0"
            />
            <span className="font-instrument text-[clamp(0.9375rem,2.5vw,1.0625rem)] leading-normal font-medium text-[#3d3d3d]">
              Process
            </span>
          </div>

          <h1
            id="steps-heading"
            className="font-space text-center text-[clamp(2rem,12vw,64px)] leading-[1.2] font-medium text-balance text-[#0d0d0d]"
          >
            Steps to Start
          </h1>
        </header>

        <div className="flex w-full flex-col items-center gap-[clamp(2rem,5vw,3.125rem)]">
          <div className="grid w-full grid-cols-1 items-stretch gap-5 iphone-max:gap-6 ipad:grid-cols-3 ipad:gap-5 ipad-landscape:gap-6 laptop:gap-6">
            {STEPS.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>

          <a
            href="#get-started"
            className="inline-flex min-h-11 w-full max-w-sm touch-manipulation items-center justify-center rounded-full bg-[#3385ff] px-6 py-4 font-instrument text-[clamp(0.9375rem,2.5vw,1.0625rem)] leading-normal font-semibold text-white transition-colors duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3385ff] active:bg-[#2468d4] iphone:w-auto iphone:max-w-none [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#2a75e6]"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default Section6;
