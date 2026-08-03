import { ScaleFrame } from "../../../sec1/component/ui/scale-frame";
import { MediaGlobe } from "./media-globe";

const A = "/Harsh/sec2";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const GLOBE_QUERY = "(min-width: 0px)";

/** bg-glow — every blob keeps its Figma box, rotation and overscan inset. */
const GLOWS = [
  {
    box: "left-[237.84px] top-[555.5px] h-[304.147px] w-[249.789px] opacity-75",
    inner: "inset-[-48.94%_-59.59%]",
    src: "glow-1.svg",
  },
  {
    box: "left-[4.22px] top-[687.51px] h-[144.955px] w-[267.261px] opacity-75",
    inner: "inset-[-102.68%_-55.69%]",
    src: "glow-2.svg",
  },
  {
    box: "left-[-102.84px] top-[698.07px] h-[263.909px] w-[440.437px] opacity-75",
    inner: "inset-[-42.65%_-33.7%_-42.65%_-27.11%]",
    src: "glow-group.svg",
  },
];

const ROTATED_GLOWS = [
  {
    box: "left-[115.08px] top-[555.72px] h-[411.278px] w-[497.59px] mix-blend-plus-lighter",
    rotate: "rotate-[-29.2deg]",
    inner: "h-[221.843px] w-[446.046px] opacity-75",
    overscan: "inset-[-67.09%_-33.37%]",
    src: "glow-3.svg",
  },
  {
    box: "left-[-115.64px] top-[-32.51px] h-[204.852px] w-[329.897px]",
    rotate: "rotate-[163.97deg]",
    inner: "h-[124.814px] w-[307.381px] opacity-53",
    overscan: "inset-[-119.25%_-48.42%]",
    src: "glow-4.svg",
  },
  {
    box: "left-[-119.49px] top-[-13.94px] h-[160.204px] w-[241.794px] mix-blend-plus-lighter",
    rotate: "rotate-[155.67deg]",
    inner: "h-[70.203px] w-[233.617px] opacity-53",
    overscan: "inset-[-212.01%_-63.71%]",
    src: "glow-5.svg",
  },
  {
    box: "left-[213px] top-[-97px] size-[322.855px]",
    rotate: "rotate-45",
    inner: "h-[121.103px] w-[335.484px] opacity-75",
    overscan: "inset-[-122.9%_-44.37%]",
    src: "glow-6.svg",
  },
];

const PATTERN_LINES = Array.from({ length: 48 }, (_, index) => index);

const Background = () => (
  <div className="pointer-events-none absolute inset-0 overflow-clip">
    {GLOWS.map((glow) => (
      <div key={glow.src} className={`absolute ${glow.box}`}>
        <div className={`absolute ${glow.inner}`}>
          <img alt="" className="block size-full max-w-none" src={`${A}/${glow.src}`} />
        </div>
      </div>
    ))}

    {ROTATED_GLOWS.map((glow) => (
      <div key={glow.src} className={`absolute flex items-center justify-center ${glow.box}`}>
        <div className={`flex-none ${glow.rotate}`}>
          <div className={`relative ${glow.inner}`}>
            <div className={`absolute ${glow.overscan}`}>
              <img alt="" className="block size-full max-w-none" src={`${A}/${glow.src}`} />
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* scan lines, masked to the same soft falloff as the design */}
    <div
      className="absolute left-[calc(50%+27.16px)] top-[-97px] flex w-[828.316px] -translate-x-1/2 flex-col items-start gap-[20.708px]"
      style={{
        maskImage: `url("${A}/pattern-mask.svg")`,
        WebkitMaskImage: `url("${A}/pattern-mask.svg")`,
        maskMode: "alpha",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "1003.912px 1285.094px",
        WebkitMaskSize: "1003.912px 1285.094px",
        maskPosition: "-103.098px -113.551px",
        WebkitMaskPosition: "-103.098px -113.551px",
      }}
    >
      {PATTERN_LINES.map((line) => (
        <div key={line} className="relative h-0 w-[828.316px] shrink-0 mix-blend-overlay">
          <div className="absolute inset-[-1.94px_0_-0.65px_0]">
            <img alt="" className="block size-full max-w-none" src={`${A}/line.svg`} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GetStartedButton = () => (
  <div className="relative flex w-full shrink-0 items-center justify-center rounded-[999px] px-[24px] py-[14px] drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)]">
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
  </div>
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

const GlassCard = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <div
    className={`absolute flex flex-col items-start overflow-clip border-solid border-[rgba(255,255,255,0.1)] ${className}`}
  >
    <div className="absolute left-1/2 top-1/2 h-[166px] w-[301px] -translate-x-1/2 -translate-y-1/2 blur-[20px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[2px]"
      />
    </div>
    {children}
  </div>
);

const Sec2Frame = () => (
  <div className="relative h-[836px] w-[402px] overflow-clip bg-[#101216]">
    <Background />

    {/* Top Nav */}
    <div className="absolute left-0 top-0 flex w-[402px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] p-[16px]">
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-between">
        <p className="relative shrink-0 whitespace-nowrap text-[22px] leading-normal tracking-[-0.66px] text-white">
          Hirefy
        </p>
        <div className="relative size-[24px] shrink-0">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {/* copy */}
    <div className="absolute left-1/2 top-[90px] flex w-[370px] -translate-x-1/2 flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[8px] text-center text-white">
        <h1 className="relative w-[320px] shrink-0 text-[35px] leading-[40px] tracking-[-1.4px]">
          Build Your Global Team. Effortlessly.
        </h1>
        <p className="relative w-full shrink-0 text-[14px] leading-[1.5] opacity-70">
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-[8px]">
        <GetStartedButton />
        <div className="relative flex w-full shrink-0 items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[14px]">
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-normal tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </div>
      </div>
    </div>

    {/* globe */}
    <div className="absolute left-[calc(50%+0.5px)] top-[418px] h-[324px] w-[323px] -translate-x-1/2 overflow-clip rounded-[999px]">
      <MediaGlobe query={GLOBE_QUERY} />
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
    <GlassCard className="left-[20px] top-[445px] w-[136px] gap-[4px] rounded-[6px] border p-[12px]">
      <p className="relative w-full shrink-0 text-[16px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {/* testimonial */}
    <GlassCard className="left-[calc(50%+79px)] top-[667px] w-[212px] -translate-x-1/2 gap-[12px] rounded-[4.729px] border-[0.788px] p-[12px]">
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

export const Sec2Hero = () => (
  <main className="w-full bg-[#101216]" style={{ fontFamily: HELVETICA }}>
    <ScaleFrame frameWidth={402} className="w-full overflow-hidden">
      <Sec2Frame />
    </ScaleFrame>
  </main>
);
