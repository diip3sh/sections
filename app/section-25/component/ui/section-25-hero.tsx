import Image from "next/image";

import ASCIIWaves from "../originkit/character-waves";
import { DashboardCard } from "./dashboard-card";
import { Reveal, RevealGroup } from "./reveal";

const LOGOS = [
  {
    src: "/section-25/logo-logiqo.svg",
    width: 48,
    inset: "16.66% -0.49% 16.69% -6.9%",
  },
  {
    src: "/section-25/logo-nexora.svg",
    width: 49.846,
    inset: "16.66% -2.04% 16.69% -5.56%",
  },
  {
    src: "/section-25/logo-designo.svg",
    width: 56.615,
    inset: "16.66% -0.13% 16.69% -3.23%",
  },
  {
    src: "/section-25/logo-formix.svg",
    width: 50.462,
    inset: "16.69% -0.05% 16.69% -2.32%",
  },
  {
    src: "/section-25/logo-brandly.svg",
    width: 54.154,
    inset: "16.66% -0.14% 16.69% -2.41%",
  },
  {
    src: "/section-25/logo-markivo.svg",
    width: 56.615,
    inset: "16.66% 0.4% 16.69% -1.74%",
  },
  {
    src: "/section-25/logo-typely.svg",
    width: 57.846,
    inset: "19.04% 0.57% 19.02% 0.73%",
  },
];

/** One bracket asset, mirrored into each nav corner (Figma 2271:4754-4763). */
const NAV_LINKS = ["Solutions", "Platform", "Docs", "Pricing", "Resources"];

const CORNERS = [
  "top-0 left-0",
  "top-0 right-0 -scale-x-100",
  "bottom-0 left-0 -scale-y-100",
  "right-0 bottom-0 rotate-180",
];

export const Section25Hero = () => (
  <main className="relative min-h-dvh w-full overflow-hidden bg-[#262626]">
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[1920px] flex-col px-5 pt-5 ipad:px-8 desktop-sm:px-[50px] desktop-sm:pt-[13px]">
      {/* Nav + noise strip */}
      <div className="relative desktop-sm:border-b desktop-sm:border-[rgba(241,230,219,0.12)]">
        <div className="relative flex h-[64.495px] items-center justify-between px-3 py-5 ipad:h-20 ipad:px-4 ipad:py-6 desktop-sm:h-[76px] desktop-sm:px-[30px] desktop-sm:py-0">
          {CORNERS.map((position) => (
            <Image
              key={position}
              src="/section-25/corner-tl.svg"
              alt=""
              width={13}
              height={13}
              aria-hidden
              className={`pointer-events-none absolute size-[13px] ${position}`}
            />
          ))}

          <a href="/" className="flex items-end gap-[6.495px] ipad:gap-2">
            <Image
              src="/section-25/logo-mark.svg"
              alt=""
              width={29}
              height={25}
              className="h-[24.001px] w-[28.052px] ipad:h-[29.56px] ipad:w-[34.55px]"
            />
            <span className="flex items-center justify-center py-[3.248px] font-monda text-[22.734px] leading-[17.05px] font-medium text-[#f1e6db] ipad:py-1 ipad:text-[28px] ipad:leading-[21px]">
              aindesk
            </span>
          </a>

          {/* desktop centre links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 px-3 py-2 desktop-sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="flex items-center gap-px font-geist text-[15px] leading-[21px] font-medium whitespace-nowrap text-[#a49d9a] transition-colors duration-200 ease-out [@media(hover:hover)]:hover:text-[#f1e6db]"
                >
                  {link}
                  {link === "Solutions" && (
                    <Image
                      src="/section-25/chevron.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* desktop actions */}
          <div className="hidden items-center gap-4 desktop-sm:flex">
            <a
              href="#"
              className="text-center font-sans text-[15px] leading-[21px] font-medium text-[#eee] transition-opacity duration-200 ease-out [@media(hover:hover)]:hover:opacity-70"
            >
              Sign in
            </a>
            <button
              type="button"
              className="h-[45px] w-[113.63px] cursor-pointer rounded-[4px] bg-[#ff7038] text-center font-geist text-[15px] leading-[21px] font-medium text-[#121212] transition-colors duration-300 ease-out [@media(hover:hover)]:hover:bg-[#d95a2b]"
            >
              Get Started
            </button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="size-6 ipad:size-8 desktop-sm:hidden"
          >
            <Image
              src="/section-25/menu.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 ipad:size-8"
            />
          </button>
        </div>

        <div
          aria-hidden
          className="h-7 w-full opacity-25 mix-blend-plus-lighter ipad:h-[37px]"
          style={{
            backgroundImage: "url('/section-25/nav-noise.png')",
            backgroundSize: "239.6px 240px",
          }}
        />
      </div>

      {/* Rails — the two vertical hairlines framing the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-[112px] bottom-0 border-x border-[rgba(241,230,219,0.12)] ipad:inset-x-8 ipad:top-[137px] desktop-sm:inset-x-[50px] desktop-sm:top-[126px]"
      />

      {/* Two-column split from desktop-sm: copy left, wave field right */}
      <div className="desktop-sm:grid desktop-sm:grid-cols-[729fr_612fr]">
        <div className="desktop-sm:border-r desktop-sm:border-[rgba(241,230,219,0.12)]">
          {/* Hero copy */}
          <section className="relative flex flex-col gap-8 px-3 pt-6 ipad:gap-[50px] ipad:px-[30px] ipad:pt-[42px] desktop-sm:pt-[82.5px]">
            <RevealGroup className="flex flex-col gap-3" delay={0.15}>
              <Reveal className="flex items-center gap-2">
                <Image
                  src="/section-25/badge-dot.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-[14px]"
                />
                <p className="font-geist-mono text-[13px] leading-[1.5] font-medium tracking-[-0.26px] text-[#fbfaf4] ipad:text-[15px] ipad:tracking-[-0.3px]">
                  SCALABLE BY DESIGN
                </p>
              </Reveal>

              <Reveal>
                <h1 className="font-switzer text-[34px] leading-[1.1] font-semibold tracking-[-0.68px] text-[#f1e6db] ipad:text-[54px] ipad:tracking-[-1.08px]">
                  Build Your Own <br />
                  <span className="text-[#ff7038]">Intelligence Network</span>
                </h1>
              </Reveal>

              <Reveal>
                <p className="w-[326px] font-geist text-[16px] leading-[1.5] font-medium tracking-[-0.32px] text-[#b8b8b8] ipad:w-[507px] ipad:text-[18px] ipad:tracking-[-0.36px]">
                  Activate intelligent modules that analyze, predict, and act —
                  keeping your entire network in sync with zero manual control
                </p>
              </Reveal>

              <Reveal className="mt-5 flex items-center gap-[18px] ipad:mt-[38px]">
                <button
                  type="button"
                  className="flex w-[137px] cursor-pointer items-center justify-center rounded-[4px] bg-[#ff7038] px-6 py-4 font-geist text-[18px] leading-normal font-medium tracking-[-0.36px] whitespace-nowrap text-[#121212] transition-colors duration-300 ease-out [@media(hover:hover)]:hover:bg-[#d95a2b]"
                >
                  Start Building
                </button>

                <button
                  type="button"
                  className="group flex cursor-pointer items-center justify-center gap-px rounded-[10px] py-[13px]"
                >
                  <span className="font-geist text-[15px] leading-[1.5] font-medium tracking-[-0.3px] whitespace-nowrap text-[#838076]">
                    View Node Network
                  </span>
                  <span className="relative block size-[22px] overflow-hidden transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
                    <span className="absolute inset-[28.66%_35.7%_23.78%_35.72%] block">
                      <Image
                        src="/section-25/arrow.svg"
                        alt=""
                        fill
                        sizes="22px"
                        className="object-contain"
                      />
                    </span>
                  </span>
                </button>
              </Reveal>
            </RevealGroup>
          </section>

          {/* Trusted by teams */}
          <section className="relative mt-6 border-t desktop-sm:border-y border-[rgba(241,230,219,0.12)] p-5 ipad:mt-[50px] ipad:px-[30px] ipad:py-[50px] desktop-sm:mt-[51.5px]">
            <Reveal>
              <p className="font-dm-mono text-[14px] leading-[1.5] font-medium tracking-[0.14px] text-[#cfc7b5] uppercase">
                Trusted By Teams
              </p>
            </Reveal>

            <RevealGroup
              delay={0.05}
              stagger={0.07}
              className="mt-5 flex w-[326.462px] flex-wrap content-center items-center gap-x-[12.308px] gap-y-5 overflow-hidden ipad:w-full ipad:max-w-[600px] ipad:gap-5 desktop-sm:max-w-[570px]"
            >
              {LOGOS.map((logo) => (
                <Reveal
                  key={logo.src}
                  className="relative block h-[25.846px] w-[var(--w)] overflow-hidden ipad:h-[42px] ipad:w-[calc(var(--w)*1.625)]"
                  style={{ "--w": `${logo.width}px` } as React.CSSProperties}
                >
                  <span
                    className="absolute block"
                    style={{ inset: logo.inset }}
                  >
                    <Image
                      src={logo.src}
                      alt=""
                      fill
                      sizes="60px"
                      className="object-contain"
                    />
                  </span>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        </div>

        {/* ASCII wave field — height follows the dashboard card plus its padding */}
        <div className="relative desktop-sm:min-h-full">
          <div
            aria-hidden
            className="absolute inset-0 border desktop-sm:border-r desktop-sm:border-l-0 desktop-sm:border-t-0 desktop-sm:border-b border-[rgba(241,230,219,0.12)]"
          >
            <ASCIIWaves
              characters=" .:-+*=%@#"
              elementSize={12}
              color="#ff7038"
              background="#262626"
              direction="left"
              speed={16}
              waveTension={5}
              noiseScale={12}
              intensity={10}
              fontWeight="500"
              hasCursorInteraction
              interactionIntensity={15}
              interactionRadius={160}
            />
          </div>

          <div className="pointer-events-none relative flex justify-center px-[17px] py-[33px] ipad:py-[42px] desktop-sm:py-[120px]">
            <Reveal className="pointer-events-auto">
              <DashboardCard />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </main>
);
