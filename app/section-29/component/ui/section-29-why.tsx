import { FeatureCard, Plate, WideCard } from "./cards";
import { CornerBlocks } from "./corner-blocks";
import { EdgeDotBands } from "./edge-dot-bands";
import { GridColumns, GridRows } from "./grid-pattern";

/**
 * Figma 2356:54 / 2356:196 / 2356:338 — the AstraCore "Why" section at 402,
 * 744 and 1440.
 *
 * One centred column at every size; what changes is how the five tiles fold.
 * Phone stacks all five. Tablet pairs them — Trusted over Focus beside Connect
 * over Uptime, with Scale full width underneath. Desktop turns that pair into
 * three equal columns and Scale becomes the third, stretched to the other two
 * and spreading its art and copy apart.
 *
 * The column runs 286.3 / 599 / 1192 of a 402 / 744 / 1440 frame, so it is
 * held as a percentage with the Figma width as its cap: the dot bars either
 * side are fixed pixels, and a percentage keeps the gutter between them and
 * the cards from collapsing between breakpoints. Head room goes 81 -> 127 ->
 * 63 and the tail follows Figma's own (81 on phone, where the frame's 183px of
 * dead space is dropped).
 *
 * Backdrop layers paint bottom to top: ruled grid, the blurred wash that fades
 * it out behind the heading, the filled grid cells, the desktop-only wash that
 * erases everything below the heading, then the dotted edge bars.
 */

/** Figma "Ellipse 48453" (2356:131 / 2356:283) — a #f8f8f8 ellipse under a 26
 *  layer blur, which is what washes the grid out behind the heading. */
const Glow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute top-[56px] left-[calc(50%-0.43px)] h-[957px] w-[492px] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] ipad:top-[27px] ipad:left-[calc(50%+15.21px)] ipad:w-[689px] desktop-sm:hidden"
  />
);

/**
 * Figma "Ellipse 48453" + "Ellipse 48454" (2356:420 / 2356:421) — the desktop
 * wash, and the reason the grid only reads across the top of that frame.
 *
 * Both are painted in #f8f8f8, the same colour as the desktop background, so
 * they are invisible as shapes — what they do is cover. The wide one starts at
 * y90 and is 1052 tall, so everything below the heading is erased and its
 * blurred top arc is the fade; the small one softens the very top behind the
 * badge. They paint over the rules and the filled cells but under the dot
 * bars, which is why the bars stay crisp for the full height.
 *
 * The wide one overhangs the frame by 149px each side at 1440, so it is sized
 * from the section rather than pinned at 1738 — otherwise the fade would stop
 * short of the edges on a wider display.
 */
const DesktopGlow = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute top-[-17px] left-1/2 hidden h-[267px] w-[660px] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] desktop-sm:block"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-[90px] left-[calc(50%+42px)] hidden h-[1052px] w-[calc(100%+298px)] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] desktop-sm:block"
    />
  </>
);

const AVATARS = [
  { src: "/section-29/avatar-1.png", alt: "" },
  { src: "/section-29/avatar-2.png", alt: "" },
  { src: "/section-29/avatar-3.png", alt: "" },
];

/**
 * Figma draws each card image as a flat ASCII PNG scaled past its frame; these
 * are the same crops re-derived against the untouched renders in
 * public/section-29, so the object lands at the size and position Figma gives
 * it even though the source art has a slightly different aspect than Figma's
 * flattened PNG. The image frames grow 180 -> 212 on Focus, 198 -> 234 on
 * Connect and 173 -> 223 -> 283 on Scale, and the canvas behind each one
 * scales with it.
 */
const FEATURES = {
  focus: {
    title: "Focus",
    body: "Keep every project organized, reduce distractions, and help your team stay aligned on what matters most.",
    art: {
      src: "/section-29/image 3083601.png",
      alt: "An isometric cube rendered in ASCII characters",
      boxClassName: "h-[166px] w-[180px] ipad:h-[196px] ipad:w-[212px]",
      artClassName:
        "top-[-29.98px] left-[-30.13px] h-[242.3px] w-[242.3px] ipad:top-[-35.4px] ipad:left-[-35.49px] ipad:h-[285.4px] ipad:w-[285.4px]",
    },
  },
  connect: {
    title: "Connect",
    body: "Integrate with your favorite tools to create a connected workspace without changing how your team works.",
    art: {
      src: "/section-29/image 3083599.png",
      alt: "Interlocking isometric blocks rendered in ASCII characters",
      boxClassName: "h-[166px] w-[198px] ipad:h-[196px] ipad:w-[234px]",
      artClassName:
        "top-[-7.55px] left-[7.44px] h-[179.8px] w-[194.2px] ipad:top-[-8.91px] ipad:left-[8.79px] ipad:h-[212.3px] ipad:w-[229.5px]",
    },
  },
  scale: {
    title: "Scale",
    body: "From startups to enterprise teams, AstraCore grows with your business while keeping every workflow simple.",
    art: {
      src: "/section-29/image 3083603.png",
      alt: "A rising staircase of isometric blocks rendered in ASCII characters",
      boxClassName:
        "h-[166px] w-[173px] ipad:h-[213px] ipad:w-[223px] desktop-sm:h-[271px] desktop-sm:w-[283px]",
      artClassName:
        "top-[-21.83px] left-[-60.63px] h-[209.8px] w-[279.7px] ipad:top-[-28.01px] ipad:left-[-78.15px] ipad:h-[269.2px] ipad:w-[360.5px] desktop-sm:top-[-35.64px] desktop-sm:left-[-99.18px] desktop-sm:h-[342.5px] desktop-sm:w-[457.5px]",
    },
  },
};

export const Section29Why = () => (
  <section className="animate-hero-reveal relative flex w-full grow flex-col overflow-hidden bg-[#f5f5f2] desktop-sm:bg-[#f8f8f8]">
    {/* Past wide-lg the whole thing stops growing and centres as a 1440 stage,
        so the head room, the grid and the dot bars all keep the desktop frame's
        proportions instead of stretching. Everything positions against this
        rather than the section, which is why the padding lives here. */}
    <div className="relative mx-auto w-full grow overflow-hidden pt-[81px] ipad:pt-[127px] desktop-sm:pt-[63px] wide-lg:max-w-[1440px]">
      <GridRows />
      <GridColumns />
      <CornerBlocks />
      {/* Every wash goes over the cells as well as the rules, so the whole grid
        fades together; the dot bars paint last and stay clear of both. */}
      <Glow />
      <DesktopGlow />
      <EdgeDotBands />

      <div className="relative mx-auto flex w-[71.22%] max-w-[286.301px] flex-col items-center gap-[32px] pb-[81px] ipad:w-[80.51%] ipad:max-w-[599px] ipad:gap-[52px] ipad:pb-[104px] desktop-sm:w-[82.78%] desktop-sm:max-w-[1192px] desktop-sm:gap-[72px] desktop-sm:pb-[62px]">
        {/* From tablet up the header stops tracking the column and holds Figma's
          502px, which is what keeps the heading on one line. */}
        <header className="flex w-full flex-col items-center gap-[20px] ipad:w-[502px]">
          <div className="flex items-center gap-[8px] rounded-[100px] bg-[#efeff0] px-[14px] py-[12px]">
            <img
              src="/section-29/flame.svg"
              alt=""
              className="size-[16px] ipad:size-[18px]"
            />
            <span className="font-tight text-[12px] leading-[1.2] font-medium tracking-[-0.24px] whitespace-nowrap text-black ipad:text-[14px] ipad:tracking-[-0.28px]">
              Why AstraCore
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-[12px] text-center leading-[1.2] text-[#121212]">
            <h2 className="max-w-[282px] font-helvetica-neue text-[24px] tracking-[-0.48px] ipad:max-w-none ipad:text-[32px] ipad:tracking-[-0.64px]">
              Built Around the Way Teams Work.
            </h2>
            <p className="max-w-[238px] font-tight text-[16px] tracking-[-0.32px] opacity-60 ipad:max-w-none ipad:text-[18px] ipad:tracking-[-0.36px] ipad:whitespace-nowrap">
              Stay focused, connect your tools, and scale with confidence.
            </p>
          </div>
        </header>

        {/* Phone stacks the five tiles; tablet splits the first four into two
          stacks side by side; desktop dissolves that wrapper so the two stacks
          and Scale become three equal grid columns. */}
        <div className="flex w-full flex-col gap-[12px] ipad:gap-[16px] desktop-sm:grid desktop-sm:grid-cols-3 desktop-sm:items-stretch">
          <div className="flex flex-col gap-[12px] ipad:flex-row ipad:items-center ipad:gap-[16px] desktop-sm:contents">
            <div className="flex flex-col gap-[12px] ipad:w-[286px] ipad:shrink-0 ipad:gap-[16px] desktop-sm:w-auto">
              <Plate innerClassName="h-[76px] items-center gap-[10px] px-[20px] py-[12px]">
                {/* Avatars step just under half their width, so the overlap
                  tracks the 32 -> 42px jump on desktop. */}
                <div className="flex shrink-0 items-center">
                  {AVATARS.map((avatar, index) => (
                    <img
                      key={avatar.src}
                      src={avatar.src}
                      alt={avatar.alt}
                      width={32}
                      height={32}
                      className={`size-[32px] shrink-0 rounded-full desktop-sm:size-[42px] ${
                        index < AVATARS.length - 1
                          ? "mr-[-15.238px] desktop-sm:mr-[-20px]"
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <p className="w-[154px] font-tight text-[16px] leading-[1.2] font-medium text-black desktop-sm:w-auto desktop-sm:text-[18px] desktop-sm:whitespace-nowrap">
                  Trusted by 5,000+ Teams
                </p>
              </Plate>

              <FeatureCard {...FEATURES.focus} />
            </div>

            <div className="flex flex-col gap-[12px] ipad:flex-1 ipad:gap-[16px]">
              <FeatureCard {...FEATURES.connect} />

              <Plate innerClassName="h-[76px] items-center gap-[12px] px-[20px] py-[12px]">
                <img
                  src="/section-29/pie-chart.svg"
                  alt=""
                  className="size-[24px] shrink-0"
                />
                <p className="font-tight text-[16px] leading-[1.2] font-medium whitespace-nowrap text-black desktop-sm:text-[18px]">
                  99.99% Platform Uptime
                </p>
              </Plate>
            </div>
          </div>

          <WideCard {...FEATURES.scale} />
        </div>
      </div>
    </div>
  </section>
);
