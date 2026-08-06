import { Corners } from "./corners";

/**
 * The partner strip — Figma 2405:6374 (mobile), 2405:6456 (tablet),
 * 2405:6554 (desktop).
 *
 * Five equal cells divided by hairlines, ruled above and below, with an orange
 * tick at each of its four corners. The phone shows three of the five and the
 * tablet four, so the two that drop are hidden rather than the strip being
 * rebuilt — the cells are `flex-1`, so the ones that remain simply re-divide.
 *
 * It carries `bg-black` because the disk passes behind it: Figma sets the same
 * fill for the same reason, and without it the orange runs through the logos.
 */

const LOGOS = [
  {
    name: "Logoipsum",
    /** Figma pairs a mark and a wordmark for this one only (2405:6556). */
    src: "/section-33/logo-1-type.svg",
    mark: "/section-33/logo-1-mark.svg",
    box: "h-[20.9px] w-[115px]",
    /** Absent from the phone frame. */
    hide: "hidden ipad:flex",
  },
  {
    name: "Ipsum",
    src: "/section-33/logo-2.svg",
    box: "h-[14.9px] w-[62.8px] ipad:h-[17px] ipad:w-[72px]",
    hide: "",
  },
  {
    name: "Lipsum",
    src: "/section-33/logo-3.svg",
    box: "h-[23.1px] w-[57.8px] ipad:h-[30.8px] ipad:w-[77px]",
    hide: "",
  },
  {
    name: "Looo",
    src: "/section-33/logo-4.svg",
    box: "h-[15px] w-[66px] ipad:h-[20px] ipad:w-[88px]",
    hide: "",
  },
  {
    name: "Ipsum",
    src: "/section-33/logo-2.svg",
    box: "h-[17px] w-[72px]",
    /** Desktop only — the fifth cell is where the strip runs to five. */
    hide: "hidden desktop-sm:flex",
  },
];

export const LogoStrip = () => (
  <section
    aria-label="Trusted by"
    className="relative z-10 flex h-[80px] w-full shrink-0 items-center border-y border-solid border-white/12 bg-black ipad:h-[85px]"
  >
    {LOGOS.map(({ name, src, mark, box, hide }, index) => (
      <div
        key={`${name}-${index}`}
        className={`relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden ${index < LOGOS.length - 1 ? "border-r border-solid border-white/12" : ""} ${hide}`}
      >
        {/* Figma composes the first logo from two overlaid crops of one 115px
            box; the rest are a single wordmark. */}
        {mark ? (
          <div className={`relative ${box}`} aria-hidden>
            {/* Each crop is a box positioned in the 115px logo, with the file
                filling that box — the inset cannot sit on the image itself, or
                `size-full` fights it and both halves land on top of each other. */}
            <div className="absolute inset-[0_78.9%_0_0]">
              <img
                src={mark}
                alt=""
                className="absolute inset-0 size-full max-w-none"
              />
            </div>
            <div className="absolute inset-[10%_0_7.5%_24.08%]">
              <img
                src={src}
                alt=""
                className="absolute inset-0 size-full max-w-none"
              />
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt=""
            aria-hidden
            className={`block max-w-none ${box}`}
          />
        )}
      </div>
    ))}

    <Corners size="size-2.5" />
  </section>
);
