import { Corners } from "./corners";

/**
 * The partner strip — Figma 2405:6374 (mobile), 2405:6456 (tablet),
 * 2405:6554 (desktop).
 *
 * Equal cells divided by hairlines, ruled above and below, with an orange tick
 * at each of its four corners.
 *
 * Figma draws it static and drops logos to fit — three on the phone, four on the
 * tablet, five on desktop. It runs as a marquee here instead, which is an
 * addition rather than a transcription: every partner gets seen at every width,
 * and the cells keep the pitch Figma gives them, so a phone still shows three at
 * a time and desktop five. The house recipe applies — two identical halves in
 * one `w-max` track translated -50%, the duplicate `aria-hidden`, and the edges
 * feathered rather than cut.
 *
 * A half is all five logos at a cell pitch of a third / a quarter / a fifth of
 * the strip, so the narrowest half is still wider than the strip it runs in and
 * the loop never opens a gap before it snaps.
 *
 * It carries `bg-black` because the disk passes behind it: Figma sets the same
 * fill for the same reason, and without it the orange runs through the logos.
 */

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)";

/**
 * One cell, pitched off the strip so the marquee reads at the density Figma
 * draws — the strip is the stage width less its 16/48px margins.
 */
const CELL =
  "relative flex h-full w-[calc((100vw-32px)/3)] shrink-0 items-center justify-center overflow-hidden border-r border-solid border-white/12 ipad:w-[calc((100vw-96px)/4)] desktop-sm:w-[calc((min(100vw,1440px)-96px)/5)]";

const LOGOS = [
  {
    name: "Logoipsum",
    /** Figma pairs a mark and a wordmark for this one only (2405:6556). */
    src: "/section-33/logo-1-type.svg",
    mark: "/section-33/logo-1-mark.svg",
    box: "h-[16.9px] w-[93px] ipad:h-[20.9px] ipad:w-[115px]",
  },
  {
    name: "Ipsum",
    src: "/section-33/logo-2.svg",
    box: "h-[14.9px] w-[62.8px] ipad:h-[17px] ipad:w-[72px]",
  },
  {
    name: "Lipsum",
    src: "/section-33/logo-3.svg",
    box: "h-[23.1px] w-[57.8px] ipad:h-[30.8px] ipad:w-[77px]",
  },
  {
    name: "Looo",
    src: "/section-33/logo-4.svg",
    box: "h-[15px] w-[66px] ipad:h-[20px] ipad:w-[88px]",
  },
  {
    name: "Ipsum Alt",
    src: "/section-33/logo-2.svg",
    box: "h-[14.9px] w-[62.8px] ipad:h-[17px] ipad:w-[72px]",
  },
];

/** One half of the loop. The duplicate is hidden from the reading order. */
const Half = () => (
  <>
    {LOGOS.map(({ name, src, mark, box }) => (
      <div key={name} className={CELL}>
        {/* Figma composes the first logo from two overlaid crops of one 115px
            box; each crop is a positioned box with the file filling it, since
            an inset on the image itself fights `size-full`. */}
        {mark ? (
          <div className={`relative ${box}`}>
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
          <img src={src} alt="" className={`block max-w-none ${box}`} />
        )}
      </div>
    ))}
  </>
);

export const LogoStrip = () => (
  <section
    aria-label="Trusted by"
    className="relative z-10 h-[80px] w-full shrink-0 overflow-hidden border-y border-solid border-white/12 bg-black ipad:h-[85px]"
  >
    <div
      className="h-full"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <div className="flex h-full w-max animate-logo-marquee will-change-transform">
        <div className="flex h-full shrink-0" aria-label="Partner logos">
          <Half />
        </div>
        <div className="flex h-full shrink-0" aria-hidden>
          <Half />
        </div>
      </div>
    </div>

    <Corners size="size-2.5" />
  </section>
);
