import Link from "next/link";

import TextSphere from "./components/originkit/text-sphere";

const NAV_ITEMS = ["Home", "Pricing", "About", "Tools"] as const;

/**
 * Ported from the section's stylesheet. Four tiers in the source, mapped onto
 * the project's own breakpoints:
 *
 * | source            | here                     | shift |
 * | ----------------- | ------------------------ | ----- |
 * | `max-width: 420`  | base                     | —     |
 * | `421 – 800`       | `iphone-max:` 430        | +10   |
 * | `801 – 1024`      | `ipad-landscape:` 1024   | +223  |
 * | `1025 – 1279`     | `ipad-landscape:`        | +1    |
 * | `min-width: 1280` | `desktop-sm:`            | —     |
 *
 * The row tier therefore starts at 1024 rather than at the source's 801, which
 * hands the whole `ipad:` band — 768 to 1023 — back to the stacked composition:
 * globe on top, copy centred under it. That is the design at tablet widths, and
 * it is also the only thing that fits. The row tier states every value as its
 * share of 1280 in `vw`, so at 768 it renders a 28px headline against a 432px
 * globe with two columns of copy beside it, which is the desktop drawing
 * photographed from far away rather than a tablet layout.
 *
 * The nav's own CTA is desktop-only. Below 1024 the bar is a logo and a toggle;
 * between 1024 and 1280 the link row arrives but the button does not, which is
 * the width where the row tier is still scaling everything off `vw` and a second
 * "Get started" beside the hero's own reads as a duplicate rather than a
 * shortcut.
 * Two further things differ between the phone and the tablet band, because 402
 * and 900 are not the same problem: the phone stacks the action pair full width
 * while the band puts it back on a centred row, and the band splits the stats
 * into two bordered boxes on the sub's own 461 measure while the phone keeps
 * them joined and full width. All of it reverts at `ipad-landscape:`, where the
 * row tier takes over.
 *
 * The source's own `min-width: 801` **and** `max-aspect-ratio: 4/3` rule has no
 * breakpoint equivalent and is carried literally, stacked on the row tier's own
 * variant. It has to beat `desktop-sm:`, which it does — Tailwind emits stacked
 * arbitrary variants after the named breakpoints, matching the order the
 * stylesheet relied on.
 */

/** `body` — full bleed, because the shell caps at 1710 and the page shows past it. */
const PAGE =
  "w-full bg-[#f2f2f2] font-[family-name:Arial,Helvetica,sans-serif] text-[#080808] antialiased [color-scheme:light]";

/**
 * `.hero-shell`. The height is a floor at every tier, and each tier states its
 * own: the stacked tiers are the globe plus the copy under it — which is what
 * the `ipad:` band uses too — the row tier is the 1280 frame's 62.5% aspect held
 * in `vw`, and the desktop's is Figma's 800.
 */
const SHELL =
  "relative mx-auto w-full max-w-[1710px] overflow-hidden bg-[#f2f2f2] min-h-[100svh] h-[max(100svh,calc(620px+min(500px,100vw)))] ipad-landscape:h-[max(62.5vw,100svh)] desktop-sm:h-[max(800px,100svh)]";

const NAV_BAR =
  "relative z-10 grid grid-cols-[1fr_auto] items-center border-b border-black/10 h-[76px] px-[32px] ipad-landscape:grid-cols-[1fr_auto_1fr] ipad-landscape:h-[5.78125vw] ipad-landscape:px-[4.53125vw] desktop-sm:h-[74px] desktop-sm:px-[58px]";

/**
 * The source writes `transition: opacity 160ms ease`. Bare `ease` is not a
 * Tailwind v4 utility and compiles to nothing, so this is `ease-out` — the house
 * value, and the browser default `ease` was silently falling back to anyway.
 * Hover is gated behind a real pointer, which the source does not do: an
 * untethered `:hover` sticks on touch until the next tap elsewhere.
 */
const NAV_LINK =
  "transition-opacity duration-[160ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080808] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-50";

/** `.button` — everything the three sizes share. */
const BUTTON =
  "hidden desktop-sm:inline-flex items-center justify-center whitespace-nowrap tracking-[-0.02em] text-[16px] transition-colors duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080808] ipad-landscape:text-[1.25vw] desktop-sm:text-[16px]";

const BUTTON_DARK =
  "bg-[#080808] text-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#323232]";
const BUTTON_LIGHT =
  "border border-black/10 bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#e8e8e8]";

/**
 * Two boxes, never combined — `min-h` and the paddings would collide in the same
 * variant slot and Tailwind gives no ordering guarantee between two unprefixed
 * utilities of the same property. The stylesheet's bare `.button` box is not
 * here: both call sites override it, the nav's from `.nav-cta` and the hero
 * pair's from `.actions .button`, so it never resolved to anything on its own.
 */

/**
 * `.nav-cta` — smaller than the hero pair, and desktop-only, so only the
 * stylesheet's 1280 values survive: the tiers under it are the ones where the
 * bar carries a toggle instead and this button never renders.
 */
const NAV_CTA_BOX = "min-h-[48px] px-[16px] py-[12px]";

/** `.actions .button` — the hero pair, wider than the nav's. */
const ACTION_BOX =
  "min-h-[48px] min-w-[100px] px-[24px] py-[16px] ipad-landscape:min-h-[3.75vw] ipad-landscape:min-w-[7.8125vw] ipad-landscape:px-[1.875vw] ipad-landscape:py-[1.25vw] desktop-sm:min-h-[48px] desktop-sm:min-w-[clamp(100px,7.8125vw,125px)] desktop-sm:px-[clamp(24px,1.875vw,30px)] desktop-sm:py-[clamp(16px,1.25vw,20px)]";

/**
 * `.stats > div`. The divider is `border-l` on every cell with the first
 * cleared, rather than the source's `div + div` — one rule instead of two, and
 * it survives a third column being added.
 *
 * The two phone tiers carry more padding than the stylesheet's 12/16, which read
 * as a hairline of air around a 24px figure. The source's own 4px step between
 * the tiers is kept, moved up: 16 all round under 430, 20 across from there to
 * the tablet. From the row tier up nothing changes — that tier is a proportional
 * scale of the 1280 frame and its padding is already in step with its type.
 *
 * In the `ipad:` band the two cells are separate boxes rather than a divided
 * pair, so each closes its own outline: the `border-y`/`border-r` pair plus the
 * left edge the first cell otherwise clears. Every side is named explicitly and
 * named again to revert at `ipad-landscape:`, because `border-0` and `border-l`
 * are two different properties and their order between tiers is Tailwind's to
 * choose, not this file's. `first:` also outranks a bare breakpoint utility on
 * specificity, which is why the reinstated left edge carries the variant too.
 */
const STAT_CELL =
  "flex flex-col gap-[8px] border-l border-black/10 px-[16px] py-[16px] text-center first:border-l-0 iphone-max:px-[20px] ipad:border-y ipad:border-r ipad:first:border-l ipad-landscape:border-y-0 ipad-landscape:border-r-0 ipad-landscape:first:border-l-0 ipad-landscape:gap-[0.625vw] ipad-landscape:px-[1.25vw] ipad-landscape:py-[0.9375vw] ipad-landscape:text-left desktop-sm:gap-[clamp(8px,0.625vw,10px)] desktop-sm:px-[clamp(16px,1.25vw,20px)] desktop-sm:py-[clamp(12px,0.9375vw,15px)]";

export default function HomePage() {
  return (
    <main className={PAGE}>
      <div className={SHELL}>
        <header className={NAV_BAR}>
          <Link
            className="relative block h-[28px] w-[40px] ipad-landscape:h-[2.1875vw] ipad-landscape:w-[3.125vw] desktop-sm:h-[28px] desktop-sm:w-[40px]"
            href="#"
            aria-label="Origin home"
          >
            <img
              src="/section-40/logo-wordglobe.svg"
              alt=""
              width="40"
              height="28"
              className="block h-full w-full"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden tracking-[-0.02em] ipad-landscape:flex ipad-landscape:gap-[1.875vw] ipad-landscape:text-[1.25vw] desktop-sm:gap-[24px] desktop-sm:text-[16px]"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={NAV_LINK}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/*
            Everything below 1024 carries a toggle where the row tier carries the
            CTA: the links do not start until then, and a lone "Get started" on
            the bar reads as the page having no navigation at all. Drawn from
            three spans rather than shipped as an SVG — it is two rules of CSS
            against a request — and the hit area is the button, not the 22x14
            mark inside it.
          */}
          <button
            type="button"
            aria-label="Open menu"
            className={`flex min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-end justify-self-end ipad-landscape:hidden ${NAV_LINK}`}
          >
            <span
              aria-hidden
              className="flex h-[14px] w-[22px] flex-col justify-between"
            >
              <span className="block h-px w-full bg-[#080808]" />
              <span className="block h-px w-full bg-[#080808]" />
              <span className="block h-px w-full bg-[#080808]" />
            </span>
          </button>

          <Link
            className={`hidden justify-self-end desktop-sm:inline-flex ${BUTTON} ${NAV_CTA_BOX} ${BUTTON_DARK}`}
            href="#get-started"
          >
            Get started
          </Link>
        </header>

        {/* `.content-rails` — the two hairlines the composition is drawn between. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-[3] inset-x-[20px] border-x border-black/10 ipad-landscape:inset-x-[3.75vw] desktop-sm:inset-x-[48px]"
        />

        {/*
          `.wave-pattern`. The source points at `/word-globe-background.svg`;
          the file ships at `/section-40/`, so the path is corrected here.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-0 top-[76px] right-[20px] bottom-0 left-[20px] bg-[url(/section-40/word-globe-background.svg)] bg-top bg-repeat-y bg-[length:100%_auto] ipad-landscape:top-[5.78125vw] ipad-landscape:right-[3.75vw] ipad-landscape:left-[3.75vw] desktop-sm:top-[74px] desktop-sm:right-[48px] desktop-sm:left-[48px]"
        />

        {/*
          The drawing stops at 1192; the sheet does not. The rails and the wave
          above are direct children of the shell and keep its full height, but
          the globe and the copy are capped here, so a window taller than 1192
          gets ruled sheet under the composition rather than a composition
          stretched to fit it.

          Only the copy actually moves. The globe is measured from the top and
          does not care, but the copy hangs off the *bottom* in the row tier, so
          on a tall window it walked away from the globe and left the middle
          hollow. Capped, it stops 48 above 1192 wherever the sheet ends.

          No `z-index` on this wrapper, deliberately: at `z-auto` it is not a
          stacking context, so the globe's `z-2` and the copy's `z-5` still
          compare against the nav's `z-10` rather than being trapped inside.
          `pointer-events-none` for the same reason the wrapper spans the sheet
          at all — it must not swallow anything it merely covers.
        */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full max-h-[1192px]">
          <div className="pointer-events-auto absolute z-[2] left-1/2 -translate-x-1/2 top-[80px] h-[min(500px,100vw)] w-[min(500px,100vw)] ipad-landscape:top-[1.5625vw] ipad-landscape:h-[56.25vw] ipad-landscape:w-[56.25vw] desktop-sm:top-[20px] desktop-sm:h-[clamp(720px,calc(100svh-60px),900px)] desktop-sm:w-[clamp(720px,calc(100svh-60px),900px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:top-[clamp(20px,12svh,200px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:h-[clamp(720px,72vw,1100px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:w-[clamp(720px,72vw,1100px)]">
            <TextSphere
              word="###"
              color="#d77d84"
              font={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 500,
                fontSize: 15,
              }}
              speed={7}
              rotationSide="clockwise"
              twist={50}
              letterSpacing={240}
            />
          </div>

          {/*
            `.hero-content`. Stacked and stretched under the globe through the
            tablet band, a bottom-anchored row from 1024 up.
          */}
          <section className="pointer-events-auto absolute z-[5] left-1/2 flex -translate-x-1/2 justify-between top-[calc(96px+min(500px,100vw))] w-[calc(100%-48px)] flex-col items-stretch gap-[36px] iphone-max:w-[calc(100%-64px)] ipad-landscape:top-auto ipad-landscape:bottom-[3.75vw] ipad-landscape:w-[90.9375vw] ipad-landscape:flex-row ipad-landscape:items-end ipad-landscape:gap-0 desktop-sm:bottom-[48px] desktop-sm:w-[calc(100%-116px)]">
            <div className="w-full ipad-landscape:w-[35.78125vw] desktop-sm:w-[clamp(500px,38vw,608px)]">
              <h1 className="m-0 text-center font-normal leading-[0.97] tracking-[-0.04em] text-[clamp(40px,11vw,42px)] ipad:text-[48px] ipad-landscape:text-[3.75vw] ipad-landscape:text-left desktop-sm:text-[clamp(53px,4.1vw,66px)] text-balance ipad:max-w-[461px] ipad:mx-auto desktop-sm:max-w-none">
                Building the Economy of Tomorrow
              </h1>

              {/*
                The phone stacks the pair full width — at 402 the two sitting
                side by side leave each about 160px, which is narrower than
                either label wants and reads as a pair of chips rather than the
                page's primary action. From the tablet band up they are back on
                one centred row at their own width, which is what both the
                tablet drawing and the row tier show.
              */}
              <div
                id="get-started"
                className="flex flex-col justify-center gap-[8px] mt-[16px] ipad:flex-row ipad:gap-[16px] ipad-landscape:gap-[1.25vw] ipad-landscape:mt-[1.25vw] ipad-landscape:justify-start desktop-sm:gap-[clamp(16px,1.25vw,20px)] desktop-sm:mt-[clamp(16px,1.25vw,20px)]"
              >
                <Link
                  className={`w-full ipad:w-auto ${BUTTON} ${ACTION_BOX} ${BUTTON_DARK}`}
                  href="#"
                >
                  Get started
                </Link>
                <Link
                  className={`w-full ipad:w-auto ${BUTTON} ${ACTION_BOX} ${BUTTON_LIGHT}`}
                  href="#"
                >
                  Book a call
                </Link>
              </div>
            </div>

            <div className="w-full ipad-landscape:w-[29.375vw] desktop-sm:w-[clamp(406px,31.5vw,504px)]">
              {/*
                461 is the measure. Left to the column the sub runs the full
                width of the sheet in the tablet band — a single 900px line of
                14px type over a centred globe — and a line that long stops
                scanning as a paragraph. It is a cap rather than a width, so the
                phone, where the column is already narrower, is untouched. The
                row tier drops it: there the column itself is the measure.
              */}
              <p className="mx-auto max-w-[461px] text-center leading-[1.4] text-black/60 mb-[16px] text-[14px] iphone-max:text-[16px] ipad-landscape:mx-0 ipad-landscape:mb-[1.25vw] ipad-landscape:max-w-none ipad-landscape:text-[1.25vw] ipad-landscape:text-left desktop-sm:mb-[clamp(16px,1.25vw,20px)] desktop-sm:text-[clamp(17px,1.35vw,21.5px)]">
                Empowering governments, &amp; enterprises, with the insights,
                frameworks, and technology needed to build resilient economies.
              </p>

              {/*
                The tablet band splits the pair and centres it under the copy on
                the sub's own 461 measure, so the two blocks close on the same
                edges instead of the boxes running wider than the line above
                them. Below it the grid is the full width of a phone and joined;
                from 1024 it is joined again and shares the row with the copy, so
                both of those states are restated here rather than left to
                whatever the band happened to set.
              */}
              <div className="grid grid-cols-2 border border-black/10 ipad:mx-auto ipad:max-w-[461px] ipad:gap-[8px] ipad:border-0 ipad-landscape:mx-0 ipad-landscape:max-w-none ipad-landscape:gap-0 ipad-landscape:border">
                <div className={STAT_CELL}>
                  <strong className="font-normal leading-none tracking-[-0.02em] text-[24px] iphone-max:text-[28px] ipad-landscape:text-[2.1875vw] desktop-sm:text-[clamp(30px,2.35vw,38px)]">
                    150+
                  </strong>
                  <span className="text-black/60 text-[14px] ipad-landscape:text-[1.09375vw] desktop-sm:text-[clamp(15px,1.18vw,19px)]">
                    Countries engaged
                  </span>
                </div>
                <div className={STAT_CELL}>
                  <strong className="font-normal leading-none tracking-[-0.02em] text-[24px] iphone-max:text-[28px] ipad-landscape:text-[2.1875vw] desktop-sm:text-[clamp(30px,2.35vw,38px)]">
                    $4.8T
                  </strong>
                  <span className="text-black/60 text-[14px] ipad-landscape:text-[1.09375vw] desktop-sm:text-[clamp(15px,1.18vw,19px)]">
                    Investment tracked
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
