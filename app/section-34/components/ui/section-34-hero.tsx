import { InfoBand } from "./info-band";
import { Navbar } from "./navbar";
import { WaveField } from "./wave-field";

/**
 * Figma frames:
 * - Mobile  2391:4825 — 402 x 874
 * - iPad    2391:4857 — 744 x 1133  (`ipad:`)
 * - Desktop 2391:4898 — 1280 x 832  (`desktop-sm:`)
 *
 * A full-viewport hero over a live dot field. Nothing here is capped: the nav
 * bar, the wave, the band rules and the cyan CTA all run edge to edge, and the
 * only inset in the design is a page gutter — rails at 16px on the phone and
 * 48px above it, with content sitting 4px inside them at 20px / 56px. So this
 * section has no stage `max-w`; the blocks that must not stretch carry their own
 * Figma width instead, which is the same rule applied one level down.
 *
 * All three frames are viewport-height rather than scroll-height (874 is an
 * iPhone 17, 1133 an iPad mini), so unlike most sections here the height floor
 * applies at every breakpoint, not just desktop:
 * `min-h-[max(100dvh, <frame>)]` — one property, so the two floors cannot fight.
 *
 * The surplus above that floor goes in one place, and the column says so without
 * a single absolute coordinate. Nav, headline, band and the frame's closing gap
 * are all in flow; the only flexible thing is the region holding the headline,
 * and it is bottom-aligned. Growth therefore opens up the empty wave field above
 * the headline, and the headline stays a fixed distance off the band, which is
 * the relationship the design actually draws. At each frame's own height it
 * reproduces Figma's absolute y exactly — 212 / 297 / 231 against Figma's
 * 212 / 297 / 231 — because those numbers were never anything but the leftovers.
 *
 * The wave is the live component in place of Figma's flattened render of it; see
 * `wave-field.tsx` for how its colours and pitch were recovered from that render.
 */

/**
 * Figma's `overlay` (2391:4827 / 4859 / 4900) is one 1280x832 gradient dropped at
 * a different offset in each frame, which is why its stop percentages differ
 * frame to frame while the pixels do not. Resolved back to absolute distances
 * from the bottom edge it is the same idea three times: the field fades out over
 * a stretch and then holds solid `#002fff` behind the band. Those two distances
 * are the only things that change, so they are the only things stated.
 */
const FADE_FILL =
  "linear-gradient(to top, #002fff 0, #002fff var(--fade-solid), transparent 100%)";

export const Section34Hero = () => (
  <main className="relative isolate flex min-h-[max(100dvh,874px)] w-full flex-col overflow-hidden bg-[#002fff] ipad:min-h-[max(100dvh,1133px)] desktop-sm:min-h-[max(100dvh,832px)]">
    <WaveField />

    <div
      aria-hidden
      style={{ backgroundImage: FADE_FILL }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[567px] [--fade-solid:266px] ipad:h-[629px] ipad:[--fade-solid:264px] desktop-sm:h-[416px] desktop-sm:[--fade-solid:116px]"
    />

    {/* The rails run the full height and are simply covered at the top by the
        opaque nav, exactly as Figma stacks them. */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[16px] z-[2] w-px bg-white/40 ipad:left-[48px]"
    />
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-[16px] z-[2] w-px bg-white/40 ipad:right-[48px]"
    />

    <Navbar />

    {/* The one flexible band. Bottom-aligned, so a viewport taller than the frame
        grows the wave field above the headline rather than the gap below it. */}
    <div className="relative z-10 flex flex-1 flex-col justify-end px-[20px] ipad:px-[56px]">
      {/*
        The break is unconditional — all three frames read "Your Front Desk," /
        "Powered by AI" — so it is a `<br />` rather than a width that happens to
        wrap there, which would drift with the font's own metrics.

        Tracking is Figma's -2.88 / -4.8 / -6px, which is exactly -0.06em at
        48 / 80 / 100px. Stating it once as the ratio keeps it correct between
        the breakpoints too, where a px value tuned for one size is not.

        The phone size is Figma's 48px held by a clamp rather than stated flat.
        402 is the narrowest frame the design gives, and at 48px the first line
        needs every pixel of it — below ~400 it breaks into four lines and the
        shape of the headline goes with it. 12vw reaches 48 at exactly 402, so
        the clamp is inert at and above the frame width and only does anything
        on the phones the design never drew.
      */}
      <h1 className="mb-[191px] font-helvetica-neue text-[clamp(36px,12vw,48px)] leading-[1.1] tracking-[-0.06em] text-white ipad:mb-[56px] ipad:text-[80px] desktop-sm:text-[100px]">
        Your Front Desk,
        <br />
        Powered by AI
      </h1>
    </div>

    <InfoBand />

    {/* Figma leaves the band clear of the frame's bottom edge — the rails carry
        on past it, so the gap is part of the design rather than slack. */}
    <div
      aria-hidden
      className="h-[40px] shrink-0 ipad:h-[22px] desktop-sm:h-[24px]"
    />
  </main>
);
