import { BoardBackdrop } from "./board-backdrop";
import { EmailCapture } from "./email-capture";
import { StickerNote } from "./sticker-note";

/**
 * Figma frames:
 * - Mobile  2410:6841 — 402 x 874
 * - iPad    2410:6997 — 744 x 1133  (`ipad:`)
 * - Desktop 2410:7153 — 1280 x 617  (`desktop-sm:`)
 *
 * A waitlist plate floating on a ruled pinboard, with four handwritten notes
 * clipped and pinned around its edges. The notes are the section — they peel
 * and drag, which is why the frame is called `Draggable Sticker`.
 *
 * Two anchors, and everything follows one of them. The plate is centred and the
 * whole lattice hangs off it, so the rules, the four sparkles on its corners
 * and the three faint note marks all stay in register at any width (see
 * `board-backdrop`). The notes anchor to the board's own edges instead, because
 * that is what they do at every frame — Figma hangs each one off the nearest
 * edge, several of them half outside it.
 *
 * Height is where the three frames disagree and it needs deciding rather than
 * inheriting. The phone and tablet frames are device height already; desktop is
 * a 617px band, which would end a third of the way down a laptop and leave bare
 * page under it. So Figma's height is the floor everywhere and the surplus is
 * split: notes 1 and 4 hold the top edge, notes 2 and 3 the bottom, and the
 * plate stays centred between them. At exactly 1280 x 617 that reproduces the
 * desktop frame; as the board grows, the right-hand pair — which desktop stacks
 * because it has no room — opens into the four-corner arrangement the phone and
 * tablet frames already use.
 *
 * No `z-*` on the notes, and that is load-bearing. StickerDrag lifts the note
 * being dragged by writing an incrementing z-index onto its own container; a
 * z-index on the wrapper would make it a stacking context and trap that value
 * inside. Leaving the wrappers at `auto` puts them in the same painting group
 * as the `z-0` layers, ordered by DOM position, so at rest they sit above the
 * plate and on drag the note jumps clear of everything.
 */

/**
 * Each note ships as one flattened PNG — see `sticker-note`. The box is Figma's
 * tablet/desktop size; the phone draws all four at exactly 0.75 of it.
 */
const NOTES = [
  {
    id: "note-1",
    label: "Good! Redesign the button",
    width: 199.976,
    height: 234.508,
    className:
      "top-[51px] left-[-20px] w-[149.982px] ipad:top-[31px] ipad:left-[-15px] ipad:w-[199.976px]",
  },
  {
    id: "note-4",
    label: "Keep track of critical details",
    width: 220.25,
    height: 217.451,
    className:
      "top-[27.004px] right-[-20.174px] w-[165.188px] ipad:top-[77px] ipad:right-[-0.243px] ipad:w-[220.25px] desktop-sm:right-[2.756px]",
  },
  {
    id: "note-3",
    label: "This needs to be done ASAP",
    width: 230.092,
    height: 230.99,
    className:
      "bottom-[29.661px] left-[-43.239px] w-[172.569px] ipad:bottom-[114.813px] ipad:left-[-15.999px] ipad:w-[230.092px] desktop-sm:bottom-[28.012px] desktop-sm:left-[9.001px]",
  },
  {
    id: "note-2",
    label: "Pay attention to details",
    width: 220.9,
    height: 218.138,
    className:
      "bottom-[10.363px] right-[-25.281px] w-[165.675px] ipad:bottom-[88.866px] ipad:right-[-39.903px] ipad:w-[220.9px] desktop-sm:bottom-[141.862px] desktop-sm:right-[-17.903px]",
  },
];

export const Section38Hero = () => (
  <main className="animate-hero-reveal relative isolate flex min-h-[max(100dvh,874px)] w-full items-center justify-center overflow-hidden bg-[#f1f1e9] ipad:min-h-[max(100dvh,1133px)] desktop-sm:min-h-[max(100dvh,617px)]">
    <BoardBackdrop />

    {/* The plate carries the board colour so the rules stop at its edge — the
        clear band behind the headline is Figma's own opaque fill, not a fade.
        Its height is a floor rather than Figma's fixed 402/420, so a narrow
        phone that wraps the sub onto a fourth line grows the plate instead of
        pushing the copy out of it. */}
    <div className="relative z-0 flex w-full max-w-[402px] min-h-[402px] flex-col items-center justify-center gap-[24px] bg-[#f1f1e9] p-[16px] ipad:w-[588px] ipad:max-w-none ipad:min-h-[420px] ipad:gap-[40px]">
      <div className="flex w-full flex-col items-center gap-[8px] ipad:gap-[16px]">
        <p className="rounded-[4px] border border-solid border-[#ddd] px-[8px] py-[6px] font-geist text-[12px] leading-[1.4] whitespace-nowrap text-[#2a2722] ipad:px-[12px] ipad:py-[8px] ipad:text-[14px]">
          2,500+ early adopters
        </p>

        {/*
          Tracking is Figma's -1.28px at 32 and -1.92px at 48, which is -0.04em
          at both — one ratio rather than two numbers that agree by accident.
        */}
        <h1 className="text-center font-hedvig-serif text-[32px] leading-[1.1] tracking-[-0.04em] text-balance text-[#2a2722] ipad:text-[48px]">
          Get Early Access Before Everyone Else
        </h1>

        <p className="max-w-[340px] text-center font-geist text-[14px] leading-[1.4] text-pretty text-black opacity-60 ipad:max-w-none ipad:text-[16px]">
          Join the waitlist to be among the first to experience the platform.
          Get exclusive early access, product updates, and launch-only perks.
        </p>
      </div>

      <EmailCapture />
    </div>

    {NOTES.map(({ id, label, width, height, className }) => (
      <StickerNote
        key={id}
        src={`/section-38/${id}.png`}
        label={label}
        width={width}
        height={height}
        className={className}
      />
    ))}
  </main>
);
