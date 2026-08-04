import { ScaleFrame } from "../../../sec1/component/ui/scale-frame";
import { ParticleBand } from "./particle-band";

const A = "/Harsh/sec3";

/** Entrance stagger — `hero-reveal` (globals.css) fades + lifts, and collapses
 *  to a plain fade under prefers-reduced-motion. */
const REVEAL = "animate-hero-reveal";

/** Figma sets "Ahead." in Canela Deck — the family is registered in
 *  lib/fonts/font.ts from Canela-Deck-Bold.ttf and exposed as --font-canela. */
const CANELA = {
  fontFamily: "var(--font-canela-deck-family), serif",
} as const;
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Seven 141.75px cells (Figma 2001:27548). Each entry is the logo's own box;
 *  `parts` are the sub-shapes for the two logos Figma draws as several groups,
 *  positioned by the same insets as the design. */
type TrustedLogo = {
  key: string;
  width: string;
  height: string;
  widthLg: string;
  heightLg: string;
  src?: string;
  parts?: { src: string; inset: string }[];
};

const TRUSTED_LOGOS: TrustedLogo[] = [
  { key: "shopify", widthLg: "131px", heightLg: "24px", src: "l1.svg", width: "84.214px", height: "15.468px" },
  { key: "cmswire", widthLg: "105px", heightLg: "25px", src: "l2.svg", width: "67.5px", height: "16.04px" },
  {
    key: "ramp",
    widthLg: "87px",
    heightLg: "25px",
    width: "55.929px",
    height: "15.918px",
    parts: [
      { src: "c3b.svg", inset: "inset-[0.24%_75.33%_2.58%_0.27%]" },
      { src: "c3a.svg", inset: "inset-[19.52%_0.12%_0.02%_28.53%]" },
    ],
  },
  {
    key: "logo-4",
    widthLg: "97.395px",
    heightLg: "16.055px",
    width: "62.708px",
    height: "10.05px",
    src: "c4-img.svg",
  },
  { key: "logo-5", widthLg: "93px", heightLg: "25px", src: "c5.svg", width: "59.786px", height: "15.977px" },
  { key: "logo-6", widthLg: "124.084px", heightLg: "18.73px", src: "l6.svg", width: "79.769px", height: "12.041px" },
  { key: "logo-7", widthLg: "69px", heightLg: "25px", src: "l7.svg", width: "44.357px", height: "16.005px" },
];

/** The logo strip, scrolling. The list is rendered twice and the track slides
 *  exactly -50%, so the second copy lands where the first started and the loop
 *  is seamless; the duplicate is hidden from assistive tech. `trusted-marquee`
 *  (globals.css) is a no-op under prefers-reduced-motion. */
const LogoMarquee = ({
  size,
  /** caps the travelling window; the white bar behind it stays full width */
  className = "",
}: {
  size: "sm" | "lg";
  className?: string;
}) => {
  const sm = size === "sm";
  const cell = sm ? "h-[45px] w-[141.75px]" : "h-[70px] w-[220.5px]";

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div className="flex w-max animate-trusted-marquee items-center will-change-transform motion-reduce:animate-none">
        {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
          <div
            key={`${logo.key}-${i}`}
            aria-hidden={i >= TRUSTED_LOGOS.length}
            className={`relative flex ${cell} shrink-0 flex-col items-center justify-center overflow-clip`}
          >
            <div
              className="relative shrink-0 overflow-clip"
              style={{
                width: sm ? logo.width : logo.widthLg,
                height: sm ? logo.height : logo.heightLg,
              }}
            >
              {logo.src && (
                <img
                  alt=""
                  className="absolute inset-0 block size-full max-w-none"
                  src={`${A}/logos/${logo.src}`}
                />
              )}
              {logo.parts?.map((part) => (
                <div key={part.src} className={`absolute ${part.inset}`}>
                  <img
                    alt=""
                    className="absolute inset-0 block size-full max-w-none"
                    src={`${A}/logos/${part.src}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** The badge's ends are a 1px rule plus a 24%-opacity noise strip, mirrored. */
const BadgeEdge = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`absolute top-[-1px] flex h-[42px] w-[10px] items-center ${
      side === "left" ? "left-[-1px] -scale-x-100" : "right-[-1px]"
    }`}
  >
    <div className="relative h-full w-px shrink-0">
      <img alt="" className="block size-full max-w-none" src={`${A}/badge-line.svg`} />
    </div>
    <div
      aria-hidden
      className="relative h-full min-w-px flex-[1_0_0] bg-left-top opacity-24"
      style={{
        backgroundImage: `url("${A}/badge-texture.png")`,
        backgroundSize: "200px 207.2px",
      }}
    />
  </div>
);

/** "Ahead." with its grey slab behind it. Anchoring the slab to the word (not
 *  to fixed coordinates) keeps them together whatever the serif's metrics are —
 *  positioning it absolutely made the two words collide. */
const Highlighted = ({
  slab,
  padX,
  padY,
  gapLeft = 0,
  children,
}: {
  slab: string;
  padX: number;
  padY: number;
  /** widens the space between this word and the one before it */
  gapLeft?: number;
  children: React.ReactNode;
}) => (
  <span
    className="relative inline-block align-baseline"
    style={{ marginLeft: gapLeft || undefined }}
  >
    <img
      alt=""
      aria-hidden
      className="pointer-events-none absolute block max-w-none"
      src={`${A}/${slab}`}
      style={{
        left: -padX,
        top: -padY,
        width: `calc(100% + ${padX * 2}px)`,
        height: `calc(100% + ${padY * 2}px)`,
      }}
    />
    <span className="relative text-[#0b0b0c]" style={CANELA}>
      {children}
    </span>
  </span>
);

const Badge = ({ fontSize }: { fontSize: string }) => (
  <div
    style={delay(80)}
    className={`${REVEAL} relative flex shrink-0 items-center justify-center gap-[10px] overflow-clip border border-solid border-[#4f4f4f] bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px]`}
  >
    <p
      style={{ fontSize, letterSpacing: `${(parseFloat(fontSize) * -0.02).toFixed(2)}px` }}
      className="relative shrink-0 whitespace-nowrap text-center font-mono font-medium leading-[1.5] text-white"
    >
      AI infrastructure for autonomous
    </p>
    <BadgeEdge side="left" />
    <BadgeEdge side="right" />
  </div>
);

const ExploreButton = () => (
  <button
    type="button"
    className="relative flex shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[1px] bg-white py-[8px] pl-[20px] pr-[8px] shadow-[2px_2px_0px_0px_#0b0b0c,3px_3px_0px_0px_white] transition-opacity duration-200 hover:opacity-80"
  >
    <p className="relative shrink-0 whitespace-nowrap font-geist text-[15px] font-semibold leading-[1.5] tracking-[-0.3px] text-[#0b0b0c]">
      Explore System
    </p>
    <div className="relative size-[23px] shrink-0">
      <div className="absolute left-[calc(50%+0.36px)] top-0 h-[23px] w-[11.5px] -translate-x-1/2">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/arrow.svg`} />
      </div>
    </div>
  </button>
);

const PreviewButton = () => (
  <button
    type="button"
    // opacity-80 dimmed this one against the dark hero, which is the opposite
    // of the intent — raise the white fill instead so it lifts on hover
    className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[1px] bg-[rgba(255,255,255,0.05)] px-[20px] py-[8px] shadow-[2px_2px_0px_0px_#0b0b0c,3px_3px_0px_0px_#171718] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.14)]"
  >
    <p className="relative shrink-0 whitespace-nowrap font-geist text-[15px] font-semibold leading-[1.5] tracking-[-0.3px] text-white">
      Live Preview
    </p>
  </button>
);

/* `data-hero` marks the hover target the particle band listens to; the white
   nav and trust bar carry `data-hero-exclude`, so the dots only assemble into
   the skyline while the cursor is over the black part of the frame. */
const PhoneFrame = () => (
  <div data-hero className="relative h-[874px] w-[402px] overflow-clip bg-[#0b0b0c]">
    {/* Nav */}
    <div
      data-hero-exclude
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex h-[56px] w-[402px] items-center justify-between bg-white p-[16px]`}
    >
      <div className="relative h-[18.535px] w-[90px] shrink-0">
        <img
          alt="Aurra"
          className="absolute inset-0 block size-full max-w-none"
          src={`${A}/logo.svg`}
        />
      </div>
      <div className="relative size-[24px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
        <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
      </div>
    </div>

    {/* copy — Figma frame is 610 wide and overflows the 402 screen on both
        sides; the content inside is centred, so it clips identically */}
    <div className="absolute left-1/2 top-[130px] flex w-[610px] -translate-x-1/2 flex-col items-center gap-[50px] p-[10px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[24px]">
        <Badge fontSize="14px" />

        <div className="relative flex w-full shrink-0 flex-col items-center gap-[10px] text-center">
          <div
            style={delay(160)}
            className={`${REVEAL} relative shrink-0 whitespace-nowrap tracking-[-0.96px]`}
          >
            <p className="mb-0 font-geist text-[36px] font-medium leading-[1.2] text-white">
              Systems That Think
            </p>
            <p className="text-[36px] leading-[1.2]">
              <Highlighted slab="highlight.svg" padX={8} padY={0}>
                Ahead.
              </Highlighted>
            </p>
          </div>

          <p
            style={delay(240)}
            className={`${REVEAL} relative w-[374px] shrink-0 font-geist text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-[#aaadac]`}
          >
            AI infrastructure for autonomous decisions and realtime intelligence.
          </p>
        </div>
      </div>

      <div
        style={delay(320)}
        className={`${REVEAL} relative flex shrink-0 items-start gap-[20px]`}
      >
        <ExploreButton />
        <PreviewButton />
      </div>
    </div>

    {/* particle skyline — drawn at its full 1440px width and pinned to the
        bottom of the hero (the frame clips whatever falls outside) */}
    <div
      // nudged right of centre, so the visible slice sits left of the
      // artwork's middle
      style={{ ...delay(400), width: 1440, height: 309.4, left: "calc(50% + 130px)" }}
      className={`${REVEAL} absolute bottom-[92px] -translate-x-1/2`}
    >
      <ParticleBand />
    </div>

    {/* trusted by — the strip is 972 wide and the frame clips it either side */}
    <div
      data-hero-exclude
      style={delay(480)}
      className={`${REVEAL} absolute left-1/2 top-[736px] flex w-[972px] -translate-x-1/2 flex-col items-center gap-[18px] bg-white pb-[32.143px] pt-[25.714px]`}
    >
      <p className="relative w-full shrink-0 text-center font-geist text-[9.643px] font-medium leading-[1.4] text-[#646568]">
        TRUSTED BY 180+ PRODUCT COMPANY WORLD WIDE
      </p>
      <LogoMarquee size="sm" />
    </div>
  </div>
);

/* -------------------------------- tablet ------------------------------- */

const TabletFrame = () => (
  <div data-hero className="relative h-[1133px] w-[744px] overflow-clip bg-[#0b0b0c]">
    {/* Nav — ScaleFrame blows the 744 design up to the viewport (1.38x at
        1024), which makes the bar and its logo read oversized. This wrapper
        undoes exactly that factor, so the header keeps its native 96px height
        and icon sizes while still spanning the full width: the box is widened
        by the same scale it is then shrunk by. The counter-scale lives on the
        wrapper because `hero-reveal` is `both`-filled and would otherwise
        overwrite the transform with its own translateY(0). */}
    <div
      className="absolute left-0 top-0 origin-top-left"
      style={{
        width: "calc(744px * var(--frame-scale, 1))",
        transform: "scale(calc(1 / var(--frame-scale, 1)))",
      }}
    >
      <div
        data-hero-exclude
        style={delay(0)}
        className={`${REVEAL} flex h-[96px] w-full items-center justify-between bg-white px-[48px]`}
      >
        <div className="relative h-[18.535px] w-[90px] shrink-0">
          <img alt="Aurra" className="absolute inset-0 block size-full max-w-none" src={`${A}/logo.svg`} />
        </div>
        <div className="relative size-[32px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {/* copy */}
    <div className="absolute left-1/2 top-[198px] flex w-[610px] -translate-x-1/2 flex-col items-center gap-[50px] p-[10px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[24px]">
        <Badge fontSize="17px" />

        <div className="relative flex w-full shrink-0 flex-col items-start gap-[10px] text-center">
          <p
            style={delay(160)}
            className={`${REVEAL} relative w-full shrink-0 whitespace-nowrap font-geist text-[48px] font-medium leading-[1.2] tracking-[-0.96px] text-white`}
          >
            Systems That Think{" "}
            <Highlighted slab="highlight-lg.svg" padX={6} padY={0} gapLeft={6}>
              Ahead.
            </Highlighted>
          </p>

          <p
            style={delay(240)}
            className={`${REVEAL} relative w-full shrink-0 font-geist text-[17px] font-medium leading-[1.5] tracking-[-0.34px] text-[#aaadac]`}
          >
            AI infrastructure for autonomous decisions and realtime intelligence.
          </p>
        </div>
      </div>

      <div style={delay(320)} className={`${REVEAL} relative flex shrink-0 items-start gap-[20px]`}>
        <ExploreButton />
        <PreviewButton />
      </div>
    </div>

    {/* particle skyline — 1611 wide in Figma, bottom-aligned to the trust bar */}
    <div
      style={{ ...delay(400), width: 1611, height: 346, left: "calc(50% + 180px)" }}
      className={`${REVEAL} absolute bottom-[170px] -translate-x-1/2`}
    >
      <ParticleBand />
    </div>

    {/* trusted by */}
    <div
      data-hero-exclude
      style={delay(480)}
      className={`${REVEAL} absolute left-1/2 top-[908px] flex w-[1512px] -translate-x-1/2 flex-col items-center gap-[28px] bg-white pb-[50px] pt-[40px]`}
    >
      <p className="relative w-full shrink-0 text-center font-geist text-[15px] font-medium leading-[1.4] text-[#646568]">
        TRUSTED BY 180+ PRODUCT COMPANY WORLD WIDE
      </p>
      <LogoMarquee size="lg" />
    </div>
  </div>
);

/* ------------------------------- desktop ------------------------------- */

const NAV_LINKS = [
  { label: "Platform", active: false },
  { label: "Solutions", active: true },
  { label: "Architecture", active: false },
  { label: "Resources", active: false },
  { label: "Contact", active: false },
];

/* Fluid, unlike the phone and tablet frames: the nav, the skyline and the trust
   bar stretch to the viewport, and only the fixed-width blocks inside them (the
   1223 nav row, the 610 copy column) stop growing. Scaling the whole 1440 canvas
   instead magnified the bars and artwork along with the copy. */
const DesktopFrame = () => (
  <div data-hero className="relative h-[955px] w-full overflow-clip bg-[#0b0b0c]">
    {/* Nav */}
    <div
      data-hero-exclude
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 h-[67px] w-full bg-white`}
    >
      <div className="absolute left-[calc(50%+0.5px)] top-0 flex w-[1223px] -translate-x-1/2 flex-col items-start overflow-clip py-[10px]">
        <div className="relative flex w-full shrink-0 items-center justify-between pl-[10px] pr-[20px]">
          <div className="relative h-[18.535px] w-[90px] shrink-0">
            <img alt="Aurra" className="absolute inset-0 block size-full max-w-none" src={`${A}/logo.svg`} />
          </div>

          <div className="relative flex shrink-0 items-center gap-[40px]">
            <div className="relative flex shrink-0 items-center gap-[28px] whitespace-nowrap font-geist text-[15px] font-medium leading-[1.5] tracking-[-0.3px]">
              {NAV_LINKS.map((link) => (
                <p
                  key={link.label}
                  className={`relative shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70 ${
                    link.active ? "text-[#0b0b0c]" : "text-[#424643]"
                  }`}
                >
                  {link.label}
                </p>
              ))}
            </div>

            <div className="relative flex shrink-0 items-start gap-[10px]">
              <button
                type="button"
                className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[1px] bg-[#0b0b0c] px-[32px] py-[12px] transition-opacity duration-200 hover:opacity-80"
              >
                <p className="relative shrink-0 whitespace-nowrap font-geist text-[15px] font-semibold leading-[1.5] tracking-[-0.3px] text-white">
                  Sign in
                </p>
              </button>
              <button
                type="button"
                // fading a white button on a white bar barely reads, so this
                // darkens the fill instead
                className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[1px] border border-solid border-[#0b0b0c] bg-white px-[32px] py-[12px] transition-colors duration-200 hover:bg-[#e4e4e6]"
              >
                <p className="relative shrink-0 whitespace-nowrap font-geist text-[15px] font-medium leading-[1.5] tracking-[-0.3px] text-[#0b0b0c]">
                  Request Access
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* copy — identical box and type to the tablet frame */}
    <div className="absolute left-1/2 top-[131px] flex w-[610px] -translate-x-1/2 flex-col items-center gap-[50px] p-[10px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[24px]">
        <Badge fontSize="17px" />

        <div className="relative flex w-full shrink-0 flex-col items-start gap-[10px] text-center">
          <p
            style={delay(160)}
            className={`${REVEAL} relative w-full shrink-0 whitespace-nowrap font-geist text-[48px] font-medium leading-[1.2] tracking-[-0.96px] text-white`}
          >
            Systems That Think{" "}
            <Highlighted slab="highlight-lg.svg" padX={6} padY={0} gapLeft={6}>
              Ahead.
            </Highlighted>
          </p>

          <p
            style={delay(240)}
            className={`${REVEAL} relative w-full shrink-0 font-geist text-[17px] font-medium leading-[1.5] tracking-[-0.34px] text-[#aaadac]`}
          >
            AI infrastructure for autonomous decisions and realtime intelligence.
          </p>
        </div>
      </div>

      <div style={delay(320)} className={`${REVEAL} relative flex shrink-0 items-start gap-[20px]`}>
        <ExploreButton />
        <PreviewButton />
      </div>
    </div>

    {/* particle skyline — 1611 wide, bottom-aligned to the trust bar */}
    <div
      style={{ ...delay(400), height: 346 }}
      className={`${REVEAL} absolute bottom-[140px] left-0 w-full`}
    >
      <ParticleBand />
    </div>

    {/* trusted by */}
    <div
      data-hero-exclude
      style={delay(480)}
      className={`${REVEAL} absolute left-0 top-[792px] flex w-full flex-col items-center gap-[28px] bg-white pb-[50px] pt-[40px]`}
    >
      <p className="relative w-full shrink-0 text-center font-geist text-[15px] font-medium leading-[1.4] text-[#646568]">
        TRUSTED BY 180+ PRODUCT COMPANY WORLD WIDE
      </p>
      {/* all seven now: the row scrolls, so it no longer has to be trimmed to
          the six cells that happened to fit the 1323 strip exactly. Capped to
          the 1440 design canvas, so on wide screens the strip stops growing
          instead of running edge to edge. One copy is 1543.5px, so the track
          always overflows the window and the -50% loop never shows a gap. */}
      <LogoMarquee size="lg" className="mx-auto max-w-360" />
    </div>
  </div>
);

export const Sec3Hero = () => (
  <main className="w-full bg-[#0b0b0c]">
    <ScaleFrame frameWidth={402} className="w-full overflow-hidden min-[640px]:hidden">
      <PhoneFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="hidden w-full overflow-hidden min-[640px]:block desktop-sm:hidden"
    >
      <TabletFrame />
    </ScaleFrame>
    {/* no ScaleFrame: DesktopFrame is fluid, so the bars and the skyline fill
        the viewport at their design height while the copy keeps its own width */}
    <div className="hidden w-full overflow-hidden desktop-sm:block">
      <DesktopFrame />
    </div>
  </main>
);
