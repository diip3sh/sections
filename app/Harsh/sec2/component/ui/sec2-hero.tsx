import { ScaleFrame } from "../../../sec1/component/ui/scale-frame";
import { MediaGlobe } from "./media-globe";

const A = "/Harsh/sec2";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const PHONE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1279px)";
const DESKTOP_QUERY = "(min-width: 1280px)";

const NAV_LINKS = ["Home", "Pricing", "About", "Tools"];

/** Entrance stagger — `hero-reveal` (globals.css) fades + lifts, and collapses
 *  to a plain fade under prefers-reduced-motion. */
const REVEAL = "animate-hero-reveal";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** The whole BG group (glows + masked scan lines) exported as one image. Figma
 *  clips the export to the parent frame, so each PNG is exactly frame-sized
 *  (402×836 / 744×994 / 1280×913) and simply fills it. */
const Background = ({ src }: { src: string }) => (
  <img
    alt=""
    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
    src={`${A}/${src}`}
  />
);

const GetStartedButton = ({ className }: { className: string }) => (
  <button
    type="button"
    className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] transition-opacity duration-200 hover:opacity-80 drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)] ${className}`}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[999px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.33) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(240, 240, 240) 0%, rgb(240, 240, 240) 100%)",
      }}
    />
    <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-normal tracking-[-0.32px] text-[#060e08]">
      Get started
    </p>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_white,inset_0px_-1.5px_0px_0px_rgba(0,0,0,0.1)]" />
  </button>
);

/** The two hands are one photo, each revealed through its own alpha mask. */
const HandCutout = ({
  box,
  mask,
  maskSize,
  image,
}: {
  box: string;
  mask: string;
  maskSize: string;
  image: string;
}) => (
  <div
    className={`absolute ${box}`}
    style={{
      maskImage: `url("${A}/${mask}")`,
      WebkitMaskImage: `url("${A}/${mask}")`,
      maskMode: "alpha",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskSize,
      WebkitMaskSize: maskSize,
    }}
  >
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img alt="" className={`absolute max-w-none ${image}`} src={`${A}/hands.png`} />
    </div>
  </div>
);

/** The "glass" is a 301×166 plate of 10% white with a 2px backdrop-blur, the
 *  whole plate blurred by 20px and clipped by the card — offset exactly as in
 *  Figma, which is what gives each card its uneven, lit-from-one-side look. */
const GlassCard = ({
  className,
  plate,
  step,
  children,
}: {
  className: string;
  plate: string;
  step: number;
  children: React.ReactNode;
}) => (
  <div
    className={`absolute flex flex-col items-start overflow-clip border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-sm ${className}`}
  >
    <div
      className={`absolute h-[166px] w-[301px] -translate-x-1/2 -translate-y-1/2 blur-[20px] ${plate}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[2px]"
      />
    </div>
    {children}
  </div>
);

const PhoneFrame = () => (
  <div className="relative h-[836px] w-[402px] overflow-clip bg-[#101216]">
    <Background src="bg.png" />

    {/* Top Nav */}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex w-[402px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] p-[16px]`}
    >
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-between">
        <p className="relative shrink-0 whitespace-nowrap text-[22px] leading-normal tracking-[-0.66px] text-white">
          Hirefy
        </p>
        <div className="relative size-[24px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {/* copy */}
    <div className="absolute left-1/2 top-[90px] flex w-[370px] -translate-x-1/2 flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[8px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-[320px] shrink-0 text-[35px] leading-[40px] tracking-[-1.4px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[14px] leading-[1.5] opacity-70`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex w-full shrink-0 flex-col items-start justify-center gap-[8px]`}
      >
        <GetStartedButton className="w-full px-[24px] py-[14px]" />
        <button
          type="button"
          className="relative flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[14px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-normal tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </button>
      </div>
    </div>

    {/* globe */}
    <div style={delay(320)} className={`${REVEAL} absolute left-[calc(50%+0.5px)] top-[418px] h-[324px] w-[323px] -translate-x-1/2 overflow-clip rounded-[999px]`}>
      <MediaGlobe query={PHONE_QUERY} />
    </div>

    <HandCutout
      box="left-[172px] top-[344.46px] h-[177.31px] w-[230px]"
      mask="hand-mask-top.svg"
      maskSize="230px 177.309px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
    />

    <HandCutout
      box="left-[-27px] top-[571.65px] h-[212.8px] w-[224px]"
      mask="hand-mask-bottom.svg"
      maskSize="224px 212.801px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
    />

    {/* stat card */}
    <GlassCard
      className="left-[20px] top-[445px] w-[136px] gap-[4px] rounded-[6px] border p-[12px]"
      plate="left-[calc(50%-0.5px)] top-[calc(50%+0.5px)]"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[16px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {/* testimonial */}
    <GlassCard
      className="left-[calc(50%+79px)] top-[667px] w-[212px] -translate-x-1/2 gap-[12px] rounded-[4.729px] border-[0.788px] p-[12px]"
      plate="left-[calc(50%+25.5px)] top-[calc(50%+4.21px)]"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[28px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="28"
            width="28"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start text-[11px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

/* -------------------------------- tablet ------------------------------- */

const TabletFrame = () => (
  <div className="relative h-[994px] w-[744px] overflow-clip bg-[#101216]">
    <Background src="bg-ipad.png" />

    {/* Top Nav */}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex h-[64px] w-[744px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] px-[32px] py-[16px]`}
    >
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-between">
        <p className="relative shrink-0 whitespace-nowrap text-[28px] leading-normal tracking-[-0.84px] text-white">
          Hirefy
        </p>
        <div className="relative size-[24px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {/* copy */}
    <div className="absolute left-[149px] top-[120px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[48px] leading-[55px] tracking-[-1.92px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] opacity-70`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[12px]`}
      >
        <GetStartedButton className="px-[24px] py-[16px]" />
        <button
          type="button"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[16px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-normal tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </button>
      </div>
    </div>

    {/* globe */}
    <div style={delay(320)} className={`${REVEAL} absolute left-[163px] top-[432px] h-[420px] w-[418px] overflow-clip rounded-[999px]`}>
      <MediaGlobe query={TABLET_QUERY} />
    </div>

    <HandCutout
      box="left-[401px] top-[383.289px] h-[264.423px] w-[343px]"
      mask="ipad-mask-top.svg"
      maskSize="343px 264.423px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
    />

    <HandCutout
      box="left-0 top-[692.875px] h-[267.9px] w-[282px]"
      mask="ipad-mask-bottom.svg"
      maskSize="282px 267.9px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
    />

    {/* stat card */}
    <GlassCard
      className="left-[113px] top-[473px] w-[169px] gap-[4px] rounded-[6px] border p-[16px]"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[20px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {/* testimonial */}
    <GlassCard
      className="left-[441px] top-[740px] w-[246px] gap-[16px] rounded-[6px] border p-[14px]"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[32px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="32"
            width="32"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex w-[127px] shrink-0 flex-col items-start text-[12px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

/* ------------------------------- desktop ------------------------------- */

const DesktopFrame = () => (
  <div className="relative h-[913px] w-[1280px] overflow-clip bg-[#101216]">
    <Background src="bg-desktop.png" />

    {/* Top Nav */}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex h-[74px] w-[1280px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] px-[32px] py-[16px]`}
    >
      <div className="relative flex w-[1200px] shrink-0 items-center justify-between">
        <p className="relative shrink-0 whitespace-nowrap text-[28px] leading-normal tracking-[-0.84px] text-white">
          Hirefy
        </p>
        <GetStartedButton className="px-[16px] py-[12px]" />
        <div className="absolute left-1/2 top-[calc(50%-0.5px)] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[24px] whitespace-nowrap text-[16px] leading-normal text-white">
          {NAV_LINKS.map((link) => (
            <p
              key={link}
              className="relative shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </p>
          ))}
        </div>
      </div>
    </div>

    {/* copy */}
    <div className="absolute left-[417px] top-[144px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[48px] leading-[55px] tracking-[-1.92px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] opacity-70`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[12px]`}
      >
        <GetStartedButton className="px-[24px] py-[16px]" />
        <button
          type="button"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[16px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-normal tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </button>
      </div>
    </div>

    {/* globe */}
    <div style={delay(320)} className={`${REVEAL} absolute left-[431px] top-[448px] h-[420px] w-[418px] overflow-clip rounded-[999px]`}>
      <MediaGlobe query={DESKTOP_QUERY} />
    </div>

    <HandCutout
      box="left-[794px] top-[269.169px] h-[374.664px] w-[486px]"
      mask="desk-mask-top.svg"
      maskSize="486px 374.664px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
    />

    <HandCutout
      box="left-0 top-[592.398px] h-[420.85px] w-[443px]"
      mask="desk-mask-bottom.svg"
      maskSize="443px 420.85px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
    />

    {/* stat card */}
    <GlassCard
      className="left-[339px] top-[504px] w-[169px] gap-[4px] rounded-[6px] border p-[16px]"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[20px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {/* testimonial */}
    <GlassCard
      className="left-[803px] top-[685px] w-[246px] gap-[16px] rounded-[6px] border p-[14px]"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[32px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="32"
            width="32"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex w-[127px] shrink-0 flex-col items-start text-[12px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

export const Sec2Hero = () => (
  <main className="w-full bg-[#101216]" style={{ fontFamily: HELVETICA }}>
    <ScaleFrame frameWidth={402} className="w-full overflow-hidden min-[640px]:hidden">
      <PhoneFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="hidden w-full overflow-hidden min-[640px]:block desktop-sm:hidden"
    >
      <TabletFrame />
    </ScaleFrame>
    <ScaleFrame frameWidth={1280} className="hidden w-full overflow-hidden desktop-sm:block">
      <DesktopFrame />
    </ScaleFrame>
  </main>
);
