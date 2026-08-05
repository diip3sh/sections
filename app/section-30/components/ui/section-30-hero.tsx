import InteractiveLines from "../originkit/reactive-lines";

/** Primary CTA fill — mint base + white→transparent top sheen (Figma 2356:1304). */
const PRIMARY_CTA_FILL =
  "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(133, 233, 188, 0) 100%), linear-gradient(90deg, rgb(112, 229, 177) 0%, rgb(112, 229, 177) 100%)";

const NAV_LINKS = ["Home", "Pricing", "About", "Tools"] as const;

const LOGO_CELL =
  "relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden border-r border-solid border-white/10 ipad:border-white/12";

/**
 * Figma frames:
 * - Mobile  2356:1291 — 402 × 874
 * - iPad    2356:1339 — 744 × 1133  (`ipad:`)
 * - Desktop 2356:1392 — 1280 × 832  (`desktop-sm:`)
 */
export const Section30Hero = () => (
  <main className="relative w-full overflow-hidden bg-[#17281e]">
    <div className="relative mx-auto h-[874px] w-full max-w-[402px] overflow-hidden ipad:h-[1133px] ipad:max-w-none desktop-sm:h-[832px] desktop-sm:max-w-[1280px]">
      {/* Live wavy field — replaces Figma's baked background PNG */}
      <InteractiveLines
        backgroundColor="#17281e"
        lineColor="rgba(133, 233, 188, 0.45)"
        lineWidth={0.5}
        fade
        fadeIntensity={18}
      />

      {/* Frame edge rails — 16px mobile, 48px ipad+ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-4 z-10 w-px bg-white/10 ipad:left-12"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-4 z-10 w-px bg-white/10 ipad:right-12"
      />

      <div className="relative z-10 flex h-full flex-col pb-12 ipad:pb-[72px] desktop-sm:pb-8">
        {/* Top Nav */}
        <nav className="relative flex w-full items-center justify-between border-b border-solid border-white/10 p-5 ipad:px-14 ipad:py-5 desktop-sm:py-4">
          <a
            href="/"
            className="relative z-10 font-tight text-[20px] leading-[normal] tracking-[-0.6px] whitespace-nowrap text-white"
          >
            Procura AI
          </a>

          {/* Desktop center links (2356:1400) */}
          <ul className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 desktop-sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-tight text-[16px] leading-[normal] whitespace-nowrap text-white transition-opacity duration-200 ease [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile / iPad hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className="relative z-10 size-6 shrink-0 overflow-hidden desktop-sm:hidden"
          >
            <img
              src="/section-30/menu.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </button>

          {/* Desktop nav CTA (2356:1397) */}
          <button
            type="button"
            className="relative z-10 hidden shrink-0 cursor-pointer items-center justify-center rounded-lg px-3 py-2.5 font-tight text-[14px] leading-[normal] font-medium whitespace-nowrap text-[#0d1611] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.1),0px_11px_5.5px_0px_rgba(0,0,0,0.09),0px_26px_7.5px_0px_rgba(0,0,0,0.05)] transition-opacity duration-200 ease desktop-sm:flex [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
            style={{ backgroundImage: PRIMARY_CTA_FILL }}
          >
            Book a Call
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-1px_0px_0px_rgba(0,0,0,0.12)]"
            />
          </button>
        </nav>

        {/* Hero copy + CTAs — top 100 mobile / 120 ipad+ */}
        <div className="mt-9 flex w-full flex-col px-5 ipad:mt-14 ipad:px-14 desktop-sm:mt-[51px]">
          <div className="flex w-full flex-col gap-6 ipad:w-[611px] ipad:gap-8">
            <div className="flex w-full flex-col gap-2 font-tight text-white ipad:gap-4">
              <h1 className="text-[35px] leading-[1.1] tracking-[-1.4px] ipad:text-[48px] ipad:tracking-[-1.92px] desktop-sm:text-[56px] desktop-sm:tracking-[-2.24px]">
                See Every Process. Improve Every Outcome.
              </h1>
              <p className="text-[14px] leading-[1.5] opacity-60 ipad:w-[530px] ipad:text-[16px]">
                Turn fragmented workflows into measurable business performance
                with AI-powered process intelligence, automation, and real-time
                operational insights.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <button
                type="button"
                className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-tight text-[16px] leading-[normal] font-medium whitespace-nowrap text-[#0d1611] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.1),0px_11px_5.5px_0px_rgba(0,0,0,0.09),0px_26px_7.5px_0px_rgba(0,0,0,0.05)] transition-opacity duration-200 ease [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
                style={{ backgroundImage: PRIMARY_CTA_FILL }}
              >
                Boo a Call
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-1px_0px_0px_rgba(0,0,0,0.12)]"
                />
              </button>

              <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-solid border-[rgba(133,233,188,0.2)] px-4 py-3 font-tight text-[16px] leading-[normal] font-medium whitespace-nowrap text-white transition-colors duration-200 ease [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/*
          Chat bubbles —
          mobile: stacked under CTAs
          ipad: stacked, larger (2356:1359)
          desktop-sm: absolute right side (2356:1455 / 1457)
        */}
        <div className="mt-10 flex w-full flex-col gap-[27px] px-5 ipad:mt-12 ipad:gap-8 ipad:px-14 desktop-sm:pointer-events-none desktop-sm:absolute desktop-sm:inset-0 desktop-sm:mt-0 desktop-sm:gap-0 desktop-sm:p-0">
          <div className="flex w-[208px] items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] border border-solid border-[#2d503e] bg-[#254131] p-2 ipad:w-[370px] ipad:p-4 desktop-sm:pointer-events-auto desktop-sm:absolute desktop-sm:top-[353px] desktop-sm:left-[744px] desktop-sm:w-auto">
            <p className="font-tight text-[12px] leading-[1.4] text-white/80 ipad:text-[14px] ipad:leading-[1.5] ipad:whitespace-nowrap">
              Where can AI create the biggest operational impact?
            </p>
          </div>

          <div className="ml-[75px] flex w-[287px] items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] border border-solid border-[#2d503e] bg-[#254131] p-2 ipad:ml-[233px] ipad:w-[399px] ipad:p-4 desktop-sm:pointer-events-auto desktop-sm:absolute desktop-sm:top-[440px] desktop-sm:left-[801px] desktop-sm:ml-0 desktop-sm:w-[359px]">
            <p className="font-tight text-[12px] leading-[1.5] text-white/80 ipad:text-[14px]">
              Customer onboarding has the highest automation potential. AI can
              verify documents, assign approvals, & trigger follow-up actions,{" "}
              <span className="text-[#71e5b1]">
                reducing processing time by 68%
              </span>{" "}
              while maintaining compliance.
            </p>
          </div>
        </div>

        {/* Trusted + logos */}
        <div className="mt-auto flex flex-col">
          <p className="px-5 font-tight text-[14px] leading-[normal] text-white ipad:px-14 ipad:text-[16px]">
            Trusted by teams from
          </p>

          <div className="mt-4 flex h-20 w-[370px] self-center border-t border-b border-solid border-white/10 bg-[#17281e] ipad:mt-4 ipad:h-[85px] ipad:w-auto ipad:self-stretch ipad:mx-12 ipad:border-white/12">
            {/* Logoipsum mark + type */}
            <div className={LOGO_CELL}>
              <div
                className="relative h-[17.8px] w-[97.9px] ipad:h-[20.9px] ipad:w-[115px]"
                aria-hidden
              >
                <img
                  src="/section-30/logo-1-mark.svg"
                  alt=""
                  className="absolute inset-[0_78.9%_0_0] size-full max-w-none"
                />
                <img
                  src="/section-30/logo-1-type.svg"
                  alt=""
                  className="absolute inset-[10%_0_7.5%_24.08%] size-full max-w-none"
                />
              </div>
            </div>

            {/* IPSUM */}
            <div className={LOGO_CELL}>
              <img
                src="/section-30/logo-2.svg"
                alt=""
                className="h-[15px] w-[63.3px] max-w-none ipad:h-[17px] ipad:w-[72px]"
              />
            </div>

            {/* Bar mark */}
            <div className={LOGO_CELL}>
              <img
                src="/section-30/logo-3.svg"
                alt=""
                className="h-[25.9px] w-[64.8px] max-w-none ipad:h-[30.8px] ipad:w-[77px]"
              />
            </div>

            {/* LOQO — ipad + desktop */}
            <div className={`${LOGO_CELL} hidden ipad:flex`}>
              <img
                src="/section-30/logo-4.svg"
                alt=""
                className="h-5 w-[88px] max-w-none"
              />
            </div>

            {/* IPSUM duplicate — desktop only; no right border (2356:1446) */}
            <div className="relative hidden h-full min-w-0 flex-1 items-center justify-center overflow-hidden desktop-sm:flex">
              <img
                src="/section-30/logo-2.svg"
                alt=""
                className="h-[17px] w-[72px] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
