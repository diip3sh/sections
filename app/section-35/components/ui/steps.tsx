/**
 * The closing band — Figma 2394:4977-4999 (mobile), 2394:5032-5053 (tablet),
 * 2394:5069-5084 (desktop).
 *
 * A gradient-filled heading over three numbered steps. The steps are a three
 * column grid at every width — the phone keeps all three side by side rather
 * than stacking, which is what makes its type so small.
 *
 * The whole step block is one scale per breakpoint rather than a set of
 * independent sizes: the chip is 21.3 / 34.1 / 44px and the numeral inside it is
 * 9.68 / 15.49 / 20px, which are the same two ratios (0.484 and 0.774) applied
 * to the desktop pair. Rounded to whole pixels here, since a chip is a box and
 * not a measurement.
 *
 * The columns re-pitch rather than scale: Figma steps them 118.75 / 190 / 419.5
 * apart, so the gap between equal thirds of the content width is what changes.
 */

/**
 * Figma exports this fill as seven stops whose positions run 124%, 38%, 13%,
 * 8%, 26%, 77%, 115% — out of order, which CSS clamps into a flat colour, so it
 * cannot be transcribed. Measured off the frame instead: sampling down the
 * heading's glyphs gives a smooth vertical ramp, 185 at a quarter of the line
 * box and 205 at three quarters, which extrapolates to these two ends. The
 * angle Figma reports (-0.87 to -8.15deg across the six nodes) is handle jitter
 * on what is a vertical gradient.
 */
const SHEEN_FILL = "linear-gradient(0deg, #afafaf 0%, #d7d7d7 100%)";
const SHEEN = "bg-clip-text text-transparent";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    body: "Integrate your data, APIs, and existing tools in minutes with secure infrastructure.",
  },
  {
    number: "02",
    title: "Automate",
    body: "Build intelligent workflows powered by AI agents that reason, execute, and adapt.",
  },
  {
    /*
     * The phone frame shortens this to "monitoring and optimization" to save a
     * line at 8px. One string is kept — the copy is the same promise, and the
     * extra line costs nothing now the band grows with its content.
     */
    number: "03",
    title: "Scale",
    body: "Deploy globally with enterprise-grade reliability, monitoring, and continuous optimization.",
  },
];

export const Steps = () => (
  <section
    aria-labelledby="section-35-steps"
    className="shrink-0 px-[25px] pt-[23px] pb-[40px] ipad:px-[48px] ipad:pt-[27px] ipad:pb-[39px] desktop-sm:px-[41px] desktop-sm:pt-[32px] desktop-sm:pb-[49px]"
  >
    <h2
      id="section-35-steps"
      style={{ backgroundImage: SHEEN_FILL }}
      className={`font-gemunu text-[20px] leading-[25px] font-medium capitalize ipad:text-[32px] ipad:leading-[40px] ${SHEEN}`}
    >
      From Idea to Production in Three Steps :
    </h2>

    <ol className="mt-[12px] grid grid-cols-3 gap-[26px] ipad:mt-[25px] ipad:gap-[45px] desktop-sm:mt-[24px] desktop-sm:gap-[60px]">
      {STEPS.map(({ number, title, body }) => (
        <li key={number}>
          {/* The warm inset is Figma's, and it scales with the chip: 5px at 44,
              so 2.4 and 3.9 at the two smaller sizes. */}
          <span
            aria-hidden
            className="flex size-[21px] items-center justify-center bg-[#d8d8d8] shadow-[inset_0px_0px_2.4px_0px_rgba(249,109,9,0.1)] ipad:size-[34px] ipad:shadow-[inset_0px_0px_3.9px_0px_rgba(249,109,9,0.1)] desktop-sm:size-[44px] desktop-sm:shadow-[inset_0px_0px_5px_0px_rgba(249,109,9,0.1)]"
          >
            <span className="font-geist text-[9.7px] leading-[10px] font-semibold text-[#242424] ipad:text-[15.5px] ipad:leading-[16px] desktop-sm:text-[20px] desktop-sm:leading-[21px]">
              {number}
            </span>
          </span>

          <h3
            style={{ backgroundImage: SHEEN_FILL }}
            className={`mt-[8px] font-geist text-[12px] leading-[13.75px] font-medium capitalize ipad:mt-[13px] ipad:text-[18px] ipad:leading-[22px] desktop-sm:mt-[16px] desktop-sm:text-[20px] desktop-sm:leading-[21px] ${SHEEN}`}
          >
            {title}
          </h3>

          <p className="mt-[6px] font-geist text-[8px] leading-[10px] font-medium text-[#707070] capitalize ipad:mt-[12px] ipad:text-[10px] ipad:leading-[16px] desktop-sm:mt-[16px] desktop-sm:text-[15px] desktop-sm:leading-[21px]">
            {body}
          </p>
        </li>
      ))}
    </ol>
  </section>
);
