import { EdgeRails, ENGRAVED } from "./edge-rails";
import { FlameBand } from "./flame-band";
import { HoverList } from "./hover-list";

/**
 * Figma frames:
 * - Mobile  1459:1755 — 402 x 874
 * - Tablet  1459:1676 — 744 x 1133  (`ipad:`)
 * - Desktop 1459:1720 — 1440 x 906  (`desktop-sm:`)
 *
 * A closing hero: a serif line and its sub across the top, four capability rows
 * that swap a photograph in under the cursor, and a footer over a band of ASCII
 * fire that fills the foot of the sheet. Two engraved rules divide it and two
 * ruled rails frame it.
 *
 * **It is a column, not a set of coordinates.** Figma places every block
 * absolutely, but read down any of the three frames and the order never changes
 * — copy, rule, rows, footer — with the only real variation in what sits beside
 * what. So it is a flex column and the y numbers are spent as the gaps between
 * blocks, which is also what lets the desktop grow: the one `flex-1` spacer
 * between the rows and the closing rule takes the surplus, and at each frame's
 * own height it resolves to exactly Figma's gap (128 phone, 181 tablet, 57
 * desktop).
 *
 * Only two things are absolute, and both overlap something by design: the flame
 * band at the foot, and the still preview that stands in for the hover on a
 * touch screen.
 *
 * **Height.** Figma's 906 desktop frame ends mid-laptop, so it is a floor —
 * `desktop-sm:min-h-dvh` — and the surplus goes to that same spacer, which
 * holds the closing rule and the footer down on the fold where the design draws
 * them. The two stacked frames are already taller than the devices they are
 * drawn for and keep their own heights.
 *
 * **Width.** The sheet and its texture bleed; the rails, rules and copy cap at
 * 1440 — the split `section-30` uses. The rails are the frame edge here, so
 * past the cap the page colour and the texture simply continue.
 *
 * The desktop frame carries no nav and, on request, neither do the other two:
 * Figma's tablet and phone nav (logo + hamburger) is dropped at every width.
 *
 * Both frames also draw two "Mask group" smudges over the phone's texture —
 * 72x24 and 64x24 black boxes at blur 10 behind a 223px texture mask. Dropped on
 * request: they are sub-perceptual over a band that is already textured.
 */

/** Figma's frame fill. The desktop reports `#f6f5f3`, one level off its own two
 *  siblings, which is a hand-mixed swatch rather than a second colour. */
const SHEET = "bg-[#f5f5f2]";

const FOOTER_LINKS = ["Terms of Service", "Privacy Policy", "Cookies"] as const;

/** Muted footer ink — Figma `rgba(4,5,5,0.5)` at all three frames. */
const FOOTER_INK = "text-[14px] leading-[1.5] text-[rgba(4,5,5,0.5)]";

export const Section45Hero = () => (
  <main
    className={`relative isolate h-[874px] w-full overflow-hidden ipad:h-[1133px] desktop-sm:h-[906px] desktop-sm:min-h-dvh ${SHEET}`}
  >
    <FlameBand />

    <div className="relative z-10 mx-auto flex h-full w-full max-w-[402px] flex-col ipad:max-w-[744px] desktop-sm:max-w-[1440px]">
      <EdgeRails />

      {/*
        Copy. One block on the two stacked frames — centred on the phone, left
        on the tablet — and two columns of one row on the desktop, where Figma
        sets the sub against the right margin and drops it 48px so it sits on
        the headline's second line rather than its first.
      */}
      <header className="mt-[104px] flex w-[362px] flex-col items-center gap-[16px] self-center text-center text-black ipad:mt-[123px] ipad:ml-[86px] ipad:w-auto ipad:items-start ipad:self-start ipad:text-left desktop-sm:mt-[78px] desktop-sm:mr-[127px] desktop-sm:ml-[130px] desktop-sm:flex-row desktop-sm:items-start desktop-sm:justify-between desktop-sm:gap-0 desktop-sm:self-stretch">
        <h2 className="font-instrument-serif text-[32px] leading-[1.1] whitespace-nowrap uppercase ipad:text-[42px]">
          Let&apos;s build
          <br />
          something extraordinary.
        </h2>

        <p className="w-[298px] font-tight text-[16px] leading-[normal] text-pretty ipad:w-[400px] ipad:text-[18px] desktop-sm:mt-[48px]">
          Automate faster, collaborate smarter, and turn ideas into intelligent
          workflows.
        </p>
      </header>

      {/*
        The opening rule. Figma runs it past the frame on the phone, from the
        left rail rightwards on the tablet, and rail to rail on the desktop —
        one line seen against three different margins, so it is one element with
        three insets rather than three elements.
      */}
      <span
        aria-hidden
        className={`mt-[56px] h-px w-full shrink-0 ipad:mt-[64px] ipad:ml-[50px] ipad:w-[calc(100%-50px)] desktop-sm:mt-[29px] desktop-sm:mr-[103px] desktop-sm:ml-[103px] desktop-sm:w-auto ${ENGRAVED}`}
      />

      {/*
        The rows. The box is Figma's own group height at each frame, which is
        what centres the column inside it — see `hover-list.tsx`.
      */}
      <div className="mt-[85px] h-[161.46px] w-full shrink-0 ipad:mt-[65px] ipad:h-[249.64px] desktop-sm:mt-[45px] desktop-sm:h-[354px]">
        <HoverList />
      </div>

      {/*
        Where the section's surplus height goes. At each frame it resolves to
        Figma's own gap between the rows and the footer; on a window taller than
        906 it is the only thing that grows, so the closing rule and the footer
        stay on the fold.
      */}
      <div aria-hidden className="flex-1" />

      {/* Desktop alone closes the composition with a second rule. */}
      <span
        aria-hidden
        className={`mr-[103px] ml-[103px] hidden h-px shrink-0 desktop-sm:block ${ENGRAVED}`}
      />

      <div className="mb-[152px] flex w-[361px] flex-col gap-[20px] self-center ipad:mt-0 ipad:mr-[78px] ipad:mb-[276px] ipad:ml-[86px] ipad:w-auto ipad:flex-row ipad:items-center ipad:justify-between ipad:gap-0 ipad:self-stretch desktop-sm:mt-[19px] desktop-sm:mr-[133px] desktop-sm:mb-[209px] desktop-sm:ml-[130px]">
        <p className={`text-center font-poppins ipad:text-left ${FOOTER_INK}`}>
          © 2026 HireIQ Inc.
        </p>

        {/*
          Figma steps the three links 155 and 135 apart, which against their own
          measured widths is a 51 and a 50px gap — one gap, stated once, rather
          than three left offsets that only hold at the width they were dragged
          at.
        */}
        <ul className={`flex gap-[51px] font-redhat ${FOOTER_INK}`}>
          {FOOTER_LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                className="inline-flex items-center whitespace-nowrap transition-opacity duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040505] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/*
        The preview, for pointers that cannot hover. `HoverImageReveal` reveals
        its image under the cursor, so on a touch screen the frame's photograph
        would never appear at all — Figma draws it on all three. This is that
        still, at the frame's own position and size, and it stands down the
        moment a real pointer exists, where the live reveal takes over.

        The width bound is inside the media query rather than a `desktop-sm:`
        variant beside it. Tailwind emits arbitrary media variants after the
        named breakpoints, so `desktop-sm:hidden` loses to `(hover: none)` and a
        touch screen past 1280 would have shown this still at the tablet's
        coordinates. One condition cannot disagree with itself.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[348px] left-[211px] z-20 hidden h-[96px] w-[170.576px] ipad:top-[413px] ipad:left-[452px] ipad:h-[120.619px] ipad:w-[214.321px] [@media(hover:none)_and_(max-width:1279px)]:block"
      >
        <img
          src="/section-45/preview-field.png"
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
    </div>
  </main>
);
