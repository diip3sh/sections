import { NeuralDiagram } from "./neural-diagram";

/**
 * Figma "iPhone 16 & 17 Pro - 32" (2288:9670).
 *
 * The frame stacks its blocks top to bottom, and every block Figma gives
 * auto-layout to (nav, hero, trusted strip) is built with flex here. Only the
 * edge textures and the neural diagram stay absolutely placed — those are the
 * nodes Figma itself positions absolutely.
 *
 * Vertical rhythm from the frame: nav 56 -> hero at y100 (44 gap) -> hero ends
 * y382 -> diagram block 423 tall -> trusted strip at y805.
 */
export const Section27Hero = () => (
  <main className="w-full bg-[#0b0b0c]">
    <div className="relative flex w-full flex-col items-center overflow-hidden bg-[#0b0b0c]">
      {/* Nav — Figma 2288:9671, auto-layout row */}
      <nav className="z-20 flex h-14 w-full items-center justify-between bg-white p-4">
        <a href="/" className="block h-[18.535px] w-[90px]">
          <img
            src="/section-27/wordmark.svg"
            alt="Aurra"
            className="block size-full max-w-none"
          />
        </a>
        <button type="button" aria-label="Open menu" className="size-6">
          <img
            src="/section-27/menu.svg"
            alt=""
            className="block size-6 max-w-none"
          />
        </button>
      </nav>

      {/* Edge textures — Figma 2288:9679 (rule on its left edge) and 2288:9680
          (rule on its right edge). Same noise fill: 600 x 621.6 from the
          top-left at 7% opacity. */}
      {[
        { side: "left-0", rule: "border-l" },
        { side: "right-0", rule: "border-r" },
      ].map(({ side, rule }) => (
        <span
          key={side}
          aria-hidden
          className={`absolute top-14 z-0 block h-[817px] w-4 border-solid border-[#19191a] ${rule} ${side}`}
        >
          <span
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "url('/section-27/texture.png')",
              backgroundSize: "600px 621.6px",
              backgroundPosition: "top left",
            }}
          />
        </span>
      ))}

      {/* Headline + CTAs — Figma 2288:9681, auto-layout column, gap 24, px 8 */}
      <section className="z-20 mt-11 flex w-[367px] flex-col items-center gap-6 px-2">
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="relative h-24 w-full text-center font-geist text-[40px] leading-[48px] font-medium tracking-[-0.8px] text-white">
            <img
              src="/section-27/highlight.svg"
              alt=""
              aria-hidden
              className="absolute top-[48px] right-[58px] block h-[53px] w-[131px] max-w-none"
            />
            <span className="relative">Systems That Think </span>
            <span className="relative font-playfair leading-[48px] text-[#0b0b0c]">
              Ahead.
            </span>
          </h1>

          <p className="w-[307px] text-center font-geist text-[16px] leading-[1.5] font-medium tracking-[-0.32px] text-[#aaadac]">
            AI infrastructure for autonomous decisions and realtime
            intelligence.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-[1px] bg-white py-2 pr-2 pl-5 shadow-[2px_2px_0px_0px_#0b0b0c,3px_3px_0px_0px_white] max-w-[323px]"
          >
            <span className="font-geist text-[15px] leading-[1.5] font-semibold tracking-[-0.3px] whitespace-nowrap text-[#0b0b0c]">
              Explore System
            </span>
            <span className="relative block size-[23px] shrink-0">
              <img
                src="/section-27/arrow.svg"
                alt=""
                className="absolute top-0 left-1/2 block h-[23px] w-[11.5px] max-w-none -translate-x-1/2"
              />
            </span>
          </button>

          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center rounded-[1px] bg-white/5 px-5 py-2 shadow-[2px_2px_0px_0px_#0b0b0c,3px_3px_0px_0px_#171718] max-w-[323px]"
          >
            <span className="font-geist text-[15px] leading-[1.5] font-semibold tracking-[-0.3px] whitespace-nowrap text-white">
              Live Preview
            </span>
          </button>
        </div>
      </section>

      {/* Head, nodes and connectors */}
      <div className="z-10">
        <NeuralDiagram />
      </div>

      {/* Trusted strip — Figma 2288:13045, auto-layout column, gap 28 */}
      <section className="z-20 flex w-full flex-col items-center gap-7 overflow-hidden bg-white px-4 py-8">
        <p className="w-[232px] text-center font-geist text-[15px] leading-[1.4] font-medium text-[#646568]">
          TRUSTED BY 180+ PRODUCT COMPANY WORLD WIDE
        </p>
        <img
          src="/section-27/logos.png"
          alt=""
          className="block h-[52.5px] w-[754px] max-w-none shrink-0"
        />
      </section>
    </div>
  </main>
);
