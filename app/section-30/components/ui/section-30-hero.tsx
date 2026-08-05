import InteractiveLines from "../originkit/reactive-lines";

/** Primary CTA fill — mint base + white→transparent top sheen (Figma 2356:1304). */
const PRIMARY_CTA_FILL =
  "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(133, 233, 188, 0) 100%), linear-gradient(90deg, rgb(112, 229, 177) 0%, rgb(112, 229, 177) 100%)";

const NAV_LINKS = ["Home", "Pricing", "About", "Tools"] as const;

/** Shared pressable / focus stack — house Button contract, inlined for this single-file root. */
const CONTROL =
  "cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent] transition-[opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100";

const LOGO_CELL =
  "relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden border-r border-solid border-white/10 ipad:border-white/12";

/**
 * Mobile marquee cell — one third of the rail-to-rail band
 * (`100vw - 2rem` matches `mx-4` rails; `ipad` never shows this strip).
 */
const MARQUEE_CELL =
  "relative flex h-full w-[calc((100vw-2rem)/3)] shrink-0 items-center justify-center overflow-hidden border-r border-solid border-white/10";

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)";

/**
 * Copy column only — max-width preserves Figma line breaks past the reference
 * frame. Never wrap rails / horizontal rules in this; they must stay viewport-sized.
 * Mobile is fluid inside the gutter (no max-w).
 */
const COPY =
  "relative mx-auto w-full ipad:max-w-[632px] desktop-sm:max-w-[1168px]";

/**
 * Inset from the viewport rails (left-4 / left-12) with Figma's content padding
 * on top (20px mobile, 56px ipad+ → px-5 / px-14).
 */
const GUTTER = "px-5 ipad:px-14";

/** Logo / rule band sits flush on the rails — mx matches left-4 / left-12. */
const RAIL_BAND = "mx-4 ipad:mx-12";

/**
 * Desktop bubble x — Figma left is relative to the 1280 stage, which is centered
 * in the viewport: stageLeft + figmaX = 50% - 640px + figmaX.
 */
const BUBBLE_1_LEFT = "left-[calc(50%-640px+744px)]";
const BUBBLE_2_LEFT = "left-[calc(50%-640px+801px)]";

const Logoipsum = ({ boxClass }: { boxClass: string }) => (
  <div className={boxClass} aria-hidden>
    <div className="absolute inset-[0_78.9%_0_0]">
      <img
        src="/section-30/logo-1-mark.svg"
        alt=""
        className="absolute inset-0 size-full max-w-none"
      />
    </div>
    <div className="absolute inset-[10%_0_7.5%_24.08%]">
      <img
        src="/section-30/logo-1-type.svg"
        alt=""
        className="absolute inset-0 size-full max-w-none"
      />
    </div>
  </div>
);

/** Three mobile logos — one marquee half. Duplicate the half for a seamless -50% loop. */
const MobileLogoHalf = () => (
  <>
    <div className={MARQUEE_CELL}>
      <Logoipsum boxClass="relative h-[17.8px] w-[97.9px]" />
    </div>
    <div className={MARQUEE_CELL}>
      <img
        src="/section-30/logo-2.svg"
        alt=""
        className="h-[15px] w-[63.3px] max-w-none"
      />
    </div>
    <div className={MARQUEE_CELL}>
      <img
        src="/section-30/logo-3.svg"
        alt=""
        className="h-[25.9px] w-[64.8px] max-w-none"
      />
    </div>
  </>
);

/**
 * Figma frames:
 * - Mobile  2356:1291 — 402 × 874
 * - iPad    2356:1339 — 744 × 1133  (`ipad:`)
 * - Desktop 2356:1392 — 1280 × 832  (`desktop-sm:`)
 *
 * Layout split (load-bearing):
 * - Rails + horizontal rules → viewport (full height / full width). Never inside a max-w.
 * - Logo band → rail-to-rail (`mx-4` / `mx-12`), no content max-w.
 * - Copy → gutter padding + optional max-w for line breaks only.
 * - `min-h-dvh` so tall laptops don't flash body grey under the hero.
 */
export const Section30Hero = () => (
  <main className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-[#17281e]">
    {/*
      Live wavy field — replaces Figma's baked background PNG (2356:1292 / 1340 / 1393).
      Absolute on <main> so it fills whatever height min-h-dvh resolves to.
    */}
    <div aria-hidden className="absolute inset-0 z-0">
      <InteractiveLines
        backgroundColor="#17281e"
        lineColor="rgba(133, 233, 188, 0.65)"
        lineWidth={0.55}
        minLines={40}
        maxLines={120}
        fade
        fadeIntensity={20}
      />
    </div>

    {/*
      Edge rails — full viewport height, inset from the viewport edge
      (Figma 2356:1309 / 1405). Independent of any content max-w.
    */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-4 z-[1] w-px bg-white/10 ipad:left-12"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-4 z-[1] w-px bg-white/10 ipad:right-12"
    />

    {/* Nav — border-b spans the full viewport; logo/CTA sit on COPY max-w */}
    <nav
      aria-label="Primary"
      className="relative z-10 w-full border-b border-solid border-white/10"
    >
      <div className={`${GUTTER} relative py-5 desktop-sm:py-4`}>
        <div className={`${COPY} flex items-center justify-between`}>
          <a
            href="/"
            aria-label="Procura AI home"
            className={`relative z-10 font-tight text-[20px] leading-[normal] tracking-[-0.6px] whitespace-nowrap text-white ${CONTROL} [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70`}
          >
            Procura AI
          </a>

          {/*
            Hamburger stays 24×24 in layout (Figma 2356:1296) so nav height stays
            ~65px and hero copy lands at y100 / y120. Hit area expands via an
            absolute inset — min-h-11 in-flow would push the whole column down.
          */}
          <button
            type="button"
            aria-label="Open menu"
            className={`relative z-10 size-6 shrink-0 desktop-sm:hidden ${CONTROL}`}
          >
            <span aria-hidden className="absolute -inset-2.5" />
            <img
              src="/section-30/menu.svg"
              alt=""
              className="relative block size-full max-w-none"
            />
          </button>

          {/* Desktop nav CTA (2356:1397) — Figma spells this "Book a Call" */}
          <button
            type="button"
            className={`relative z-10 hidden shrink-0 items-center justify-center rounded-lg px-3 py-2.5 font-tight text-[14px] leading-[normal] font-medium whitespace-nowrap text-[#0d1611] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.1),0px_11px_5.5px_0px_rgba(0,0,0,0.09),0px_26px_7.5px_0px_rgba(0,0,0,0.05)] desktop-sm:inline-flex ${CONTROL} [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90`}
            style={{ backgroundImage: PRIMARY_CTA_FILL }}
          >
            Book a Call
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-1px_0px_0px_rgba(0,0,0,0.12)]"
            />
          </button>
        </div>

        {/* Desktop center links — positioned against the full-width gutter, not COPY */}
        <ul className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 desktop-sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`inline-flex min-h-11 items-center font-tight text-[16px] leading-[normal] whitespace-nowrap text-white ${CONTROL} [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>

    {/*
      Content — gutter from the rails; COPY max-w only on the type column.
      flex-1 so trusted sinks to the bottom on tall viewports.
    */}
    <div className={`relative z-10 flex flex-1 flex-col ${GUTTER}`}>
      {/*
        Hero copy — Figma tops: mobile y100 / ipad+y120.
        Nav ≈ 65px (mobile/ipad) / 70px (desktop CTA + leading), so mt = 36 / 56 / 50.
      */}
      <div
        className={`${COPY} mt-9 flex flex-col ipad:mt-14 desktop-sm:mt-[50px]`}
      >
        <div className="flex w-full flex-col gap-6 ipad:w-[611px] ipad:gap-8">
          <div className="flex w-full flex-col gap-2 font-tight text-white ipad:gap-4">
            <h1 className="text-balance text-[35px] leading-[1.1] tracking-[-1.4px] ipad:text-[48px] ipad:tracking-[-1.92px] desktop-sm:text-[56px] desktop-sm:tracking-[-2.24px]">
              See Every Process. Improve Every Outcome.
            </h1>
            <p className="text-pretty text-[14px] leading-[1.5] opacity-60 ipad:w-[530px] ipad:text-[16px]">
              Turn fragmented workflows into measurable business performance
              with AI-powered process intelligence, automation, and real-time
              operational insights.
            </p>
          </div>

          <div className="flex items-start gap-2">
            {/*
              Hero primary label is "Boo a Call" in all three Figma frames
              (2356:1305 / 1355 / 1414) — transcribed literally.
            */}
            <button
              type="button"
              className={`relative inline-flex shrink-0 items-center justify-center rounded-lg px-4 py-3 font-tight text-[16px] leading-[normal] font-medium whitespace-nowrap text-[#0d1611] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.1),0px_11px_5.5px_0px_rgba(0,0,0,0.09),0px_26px_7.5px_0px_rgba(0,0,0,0.05)] ${CONTROL} [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90`}
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
              className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-solid border-[rgba(133,233,188,0.2)] px-4 py-3 font-tight text-[16px] leading-[normal] font-medium whitespace-nowrap text-white ${CONTROL} [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/5`}
            >
              Get Started
            </button>
          </div>
        </div>

        {/*
          Chat bubbles (mobile + ipad) — stacked in flow.
          Desktop uses the absolute layer on <main> below so Figma y stays frame-relative.
        */}
        <div className="mt-10 flex w-full flex-col gap-[27px] ipad:mt-12 ipad:gap-8 desktop-sm:hidden">
          <div className="flex w-[208px] max-w-full items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] border border-solid border-[#2d503e] bg-[#254131] p-2 ipad:w-[370px] ipad:p-4">
            <p className="font-tight text-[12px] leading-[1.4] text-white/80 ipad:text-[14px] ipad:leading-[1.5] ipad:whitespace-nowrap">
              Where can AI create the biggest operational impact?
            </p>
          </div>

          {/*
            Figma mobile: left 95 / width 287 inside 402 (right edge 382, rail at 386).
            Fixed 287px overflows on <402 viewports — cap to the remaining content
            width after the 75px offset so the bubble stays inside the right rail.
          */}
          <div className="ml-[75px] flex w-[calc(100%-75px)] max-w-[287px] items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] border border-solid border-[#2d503e] bg-[#254131] p-2 ipad:ml-[233px] ipad:w-[399px] ipad:max-w-none ipad:p-4">
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
      </div>
    </div>

    {/*
      Desktop bubbles — absolute to <main> so top matches Figma frame y (353 / 440).
      left = centered-stage origin + Figma x (see BUBBLE_*_LEFT).
    */}
    <div className="pointer-events-none absolute inset-0 z-20 hidden desktop-sm:block">
      <div
        className={`pointer-events-auto absolute top-[353px] ${BUBBLE_1_LEFT} flex items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] border border-solid border-[#2d503e] bg-[#254131] p-4`}
      >
        <p className="font-tight text-[14px] leading-[1.5] whitespace-nowrap text-white/80">
          Where can AI create the biggest operational impact?
        </p>
      </div>

      <div
        className={`pointer-events-auto absolute top-[440px] ${BUBBLE_2_LEFT} flex w-[359px] items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] border border-solid border-[#2d503e] bg-[#254131] p-4`}
      >
        <p className="font-tight text-[14px] leading-[1.5] text-white/80">
          Customer onboarding has the highest automation potential. AI can
          verify documents, assign approvals, & trigger follow-up actions,{" "}
          <span className="text-[#71e5b1]">
            reducing processing time by 68%
          </span>{" "}
          while maintaining compliance.
        </p>
      </div>
    </div>

    {/*
      Trusted + logos
      - Label uses copy max-w + gutter.
      - Horizontal rules are full-viewport (`w-full border-t/b`).
      - Logo cells sit rail-to-rail (`RAIL_BAND`), never inside a content max-w.
    */}
    <div className="relative z-10 w-full pb-12 ipad:pb-[72px] desktop-sm:pb-8">
      <p
        className={`${GUTTER} font-tight text-[14px] leading-[normal] text-white ipad:text-[16px]`}
      >
        <span className={`${COPY} block`}>Trusted by teams from</span>
      </p>

      {/*
        Full-bleed horizontal rules (touch screen left/right). Inner band is
        clamped to the vertical rails so cells start/stop on those lines.
      */}
      <div className="mt-4 w-full border-t border-b border-solid border-white/10 bg-[#17281e] ipad:border-white/12">
        {/* Mobile marquee */}
        <div
          className={`${RAIL_BAND} h-20 overflow-hidden ipad:hidden`}
          style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
          <div className="flex h-full w-max animate-logo-marquee will-change-transform">
            <div className="flex h-full shrink-0">
              <MobileLogoHalf />
            </div>
            <div className="flex h-full shrink-0" aria-hidden>
              <MobileLogoHalf />
            </div>
          </div>
        </div>

        {/* iPad + desktop — static equal cells, rail to rail */}
        <div className={`${RAIL_BAND} hidden h-[85px] ipad:flex`}>
          <div className={LOGO_CELL}>
            <Logoipsum boxClass="relative h-[20.9px] w-[115px]" />
          </div>

          <div className={LOGO_CELL}>
            <img
              src="/section-30/logo-2.svg"
              alt=""
              className="h-[17px] w-[72px] max-w-none"
            />
          </div>

          <div className={LOGO_CELL}>
            <img
              src="/section-30/logo-3.svg"
              alt=""
              className="h-[30.8px] w-[77px] max-w-none"
            />
          </div>

          <div className={LOGO_CELL}>
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
  </main>
);
