/**
 * Figma "Bg pattern" (1:1307) — the ruled grid every other element sits on.
 *
 * Split in two because Figma builds it in two different boxes: the row frame
 * (1:1315) is 1440 wide and the column frame (1:1308) is only 370. Rows
 * therefore bleed the full viewport while columns stay inside the phone stage —
 * which is also what keeps the rules meeting both screen edges no matter how
 * wide the window gets.
 *
 * Both rules carry Figma's 1px white offset shadow; that highlight is what
 * gives them their engraved edge against the #f5f5f5 field.
 *
 * Tablet (1:855) re-pitches rather than scales: rows go 73 -> 127 and start at
 * -86 instead of -50, and the column band moves in to 52/56 from the frame
 * edges. Neither is the phone grid multiplied by anything.
 */

/** -50 + 73k covers y = -50 through 826, i.e. past the 779 frame. */
const ROWS = 13;
const COLUMNS = 6;

/** 1px rules on a 73px pitch, starting 50px above the frame so the first
 *  visible one lands on y23 — the line the nav box hangs from. */
export const GridRows = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute -top-[50px] left-0 flex w-full flex-col gap-18 ipad:-top-[86px] ipad:gap-[126px]"
  >
    {Array.from({ length: ROWS }, (_, i) => (
      <span
        key={`row-${i}`}
        className="h-px w-full shrink-0 bg-[#e0e0e0] shadow-[0px_1px_0px_0px_#ffffff]"
      />
    ))}
  </div>
);

/** Six rules spread edge to edge across the content band, so the band reads as
 *  five equal cells. At the 402 frame that is Figma's 73.8px pitch;
 *  `justify-between` keeps the pitch proportional on other phone widths. */
export const GridColumns = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-y-0 right-4 left-4 flex items-stretch justify-between ipad:right-[56px] ipad:left-[52px]"
  >
    {Array.from({ length: COLUMNS }, (_, i) => (
      <span
        key={`col-${i}`}
        className="w-px shrink-0 bg-[#e0e0e0] shadow-[1px_0px_0px_0px_#ffffff]"
      />
    ))}
  </div>
);
