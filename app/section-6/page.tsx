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
};

const STEPS: Step[] = [
  {
    step: "Step 01",
    title: "Create an Account",
    description:
      "Create an account to start exploring and enrolling in our amazing courses and blogs.",
    screen: "/section-6/screen-1.png",
    screenAlt:
      "Task details screen showing assign to, deadline, priority, and members",
  },
  {
    step: "Step 02",
    title: "Complete your Course",
    description:
      "Complete your courses by engaging with all the nice lessons and assignments.",
    screen: "/section-6/screen-2.png",
    screenAlt: "Dashboard screen showing ongoing projects and search",
  },
  {
    step: "Step 03",
    title: "Receive Certificates",
    description:
      "Earn certificates upon course completion to showcase your new skills.",
    screen: "/section-6/screen-3.png",
    screenAlt: "Project details screen showing a 78 percent progress gauge",
  },
];

const PhoneMockup = ({
  screen,
  screenAlt,
}: {
  screen: string;
  screenAlt: string;
}) => {
  return (
    <div className="absolute bottom-[-239px] left-1/2 h-[532px] w-[263.67px] -translate-x-1/2 overflow-clip">
      {/* Outer frame */}
      <div className="absolute inset-x-[0.84%] inset-y-0">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-6/phone-frame.svg"
          width={259}
          height={532}
          className="size-full"
        />
      </div>

      {/* Screen glare */}
      <div className="absolute inset-[0.23%_1.33%_0.24%_1.32%] mix-blend-screen">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-6/phone-glare.svg"
          width={256}
          height={529}
          className="size-full"
        />
      </div>

      {/* Inner bezel */}
      <div className="absolute inset-[0.76%_2.53%_0.76%_2.51%]">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-6/phone-bezel.svg"
          width={250}
          height={524}
          className="size-full"
        />
      </div>

      {/* App screen */}
      <div className="absolute inset-[2.36%_5.65%_2.36%_5.64%] overflow-hidden rounded-[28px]">
        <Image
          alt={screenAlt}
          src={screen}
          width={234}
          height={507}
          className="size-full object-cover object-top"
          sizes="264px"
          priority
        />
      </div>

      {/* Side buttons — insets relative to phone */}
      <div
        className="absolute inset-[25.55%_0_62.4%_99.14%]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-btn-r.svg"
          width={3}
          height={64}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[23.01%_99.16%_69.35%_0]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-btn-l1.svg"
          width={3}
          height={40}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[32.62%_99.16%_59.75%_0]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-btn-l2.svg"
          width={3}
          height={40}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[15.8%_99.16%_80.28%_0]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-btn-l3.svg"
          width={3}
          height={21}
          className="size-full"
        />
      </div>

      {/* Dynamic Island — all insets relative to phone */}
      <div
        className="absolute inset-[3.82%_39.39%_93.01%_38.52%]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-island.svg"
          width={58}
          height={17}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[4.72%_42.07%_93.9%_55.13%]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-cam-1.svg"
          width={7}
          height={7}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[5.01%_42.67%_94.2%_55.73%]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-cam-2.svg"
          width={5}
          height={5}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[5.06%_42.77%_94.24%_55.83%]"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-cam-3.svg"
          width={5}
          height={5}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[5.06%_42.77%_94.24%_55.83%] mix-blend-multiply"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-cam-4.svg"
          width={5}
          height={5}
          className="size-full"
        />
      </div>
      <div
        className="absolute inset-[5.47%_42.84%_94.29%_56.66%] mix-blend-screen"
        aria-hidden="true"
      >
        <Image
          alt=""
          src="/section-6/phone-cam-5.svg"
          width={2}
          height={2}
          className="size-full"
        />
      </div>
    </div>
  );
};

const CardVisual = ({
  screen,
  screenAlt,
}: {
  screen: string;
  screenAlt: string;
}) => {
  return (
    <div className="relative h-[321px] w-full shrink-0 overflow-clip rounded-t-3xl border-2 border-solid border-white">
      {/* Soft blue light glow */}
      <div
        aria-hidden="true"
        className="absolute top-[-236.59px] left-[-54.77px] h-[343.5px] w-[373.54px] opacity-60 mix-blend-hard-light blur-[10px]"
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

      {/* Dot / concentric pattern */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-182.45px] left-[calc(50%-0.33px)] h-[422.9px] w-[431.76px] -translate-x-1/2"
      >
        <Image
          alt=""
          src="/section-6/pattern.svg"
          width={432}
          height={423}
          className="size-full"
        />
      </div>

      <PhoneMockup screen={screen} screenAlt={screenAlt} />
    </div>
  );
};

const CornerShapes = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-65.54px] left-0 flex h-[65.54px] w-[34.04px] items-center justify-center"
      >
        <div className="h-[65.54px] w-[34.04px] -scale-y-100 rotate-180">
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
        className="pointer-events-none absolute top-[-65.54px] right-0 h-[65.54px] w-[34.04px]"
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

const StepCard = ({ step, title, description, screen, screenAlt }: Step) => {
  return (
    <article className="relative flex min-w-0 flex-1 flex-col items-end overflow-clip rounded-3xl border border-solid border-[#e1e4eb] p-1.5 shadow-[0_0_0_5px_white]">
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

      <CardVisual screen={screen} screenAlt={screenAlt} />

      <div className="relative z-10 flex w-full shrink-0 flex-col items-center justify-center gap-3 rounded-b-[20px] bg-white px-[30px] py-6 shadow-[0_-2px_6px_rgba(183,183,183,0.1),0_2px_4px_rgba(178,181,188,0.2)]">
        <CornerShapes />

        <div className="flex items-center justify-center rounded-full border border-solid border-[#e7e9ef] px-2.5 py-[5px]">
          <span className="font-instrument text-[15px] leading-normal font-medium whitespace-nowrap text-[#3d3d3d]">
            {step}
          </span>
        </div>

        <div className="flex w-full flex-col gap-1 text-center leading-normal">
          <h3 className="font-tight text-[22px] font-medium text-[#1a1a1a]">
            {title}
          </h3>
          <p className="font-instrument text-[17px] font-medium text-[#616161]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

const Section6 = () => {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#0d0d0d]">
      <section
        aria-labelledby="steps-heading"
        className="mx-auto flex w-full max-w-300 flex-col items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 ipad:gap-15 ipad:py-[95px]"
      >
        <header className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center gap-1 overflow-clip rounded-full border border-[#d4e7f6] bg-[#f2f7fd] px-2.5 py-1.5 shadow-[0_0_0_3px_white,0_2px_3px_rgba(183,183,183,0.1)]">
            <Image
              alt=""
              aria-hidden="true"
              src="/section-6/process-icon.svg"
              width={24}
              height={24}
              className="size-6"
            />
            <span className="font-instrument text-[17px] leading-normal font-medium text-[#3d3d3d]">
              Process
            </span>
          </div>

          <h1
            id="steps-heading"
            className="font-tight text-center text-[clamp(2.25rem,6vw,4rem)] leading-[1.2] font-medium tracking-[-0.02em] text-[#0d0d0d]"
          >
            Steps to Start
          </h1>
        </header>

        <div className="flex w-full flex-col items-center gap-10 ipad:gap-12.5">
          <div className="flex w-full flex-col gap-5 ipad:flex-row">
            {STEPS.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>

          <a
            href="#get-started"
            className="inline-flex touch-manipulation items-center justify-center rounded-full bg-[#3385ff] px-6 py-4 font-instrument text-[17px] leading-normal font-semibold text-white transition-colors duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3385ff] active:bg-[#2468d4] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#2a75e6]"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default Section6;
