/**
 * Everything behind the copy — Figma 2402:5114 (mobile), 2402:5509 (tablet),
 * 2402:6001 / 2402:6092 (desktop).
 *
 * Figma draws this grid the way it draws every grid: as several hundred
 * absolutely-positioned 65.5px divs, each carrying a border and a one-pixel
 * white drop shadow, stacked into 262px bands. What it actually is is two
 * repeating gradients — a dark hairline followed by a white one, every 65.5px,
 * on each axis. The white is the whole point: it is the bevel that makes the
 * rules read as engraved into the page rather than drawn on top of it, and it
 * is why this cannot be a plain 1px line.
 *
 * The grid runs rail to rail and the full height. Figma leaves a 113px gap in it
 * where the stats sit, which is not a property of the grid — it is the stats
 * band painting the page colour over it, so that is where it lives here.
 *
 * The two rails are stated separately rather than left to the repeat. The band
 * is 1184 / 648 / 370 wide against a 65.5px cell, so the repeat never lands on
 * the right edge on its own.
 */

/** Figma's cell: 262px bands of four rows. */
const CELL = "65.5px";

const ENGRAVED =
  `repeating-linear-gradient(to right, rgba(0,0,0,0.12) 0 1px, #ffffff 1px 2px, transparent 2px ${CELL}), ` +
  `repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0 1px, #ffffff 1px 2px, transparent 2px ${CELL})`;

/** A single rail, drawn with the same hairline-plus-bevel as the grid. */
const RAIL =
  "absolute inset-y-0 w-px bg-black/12 shadow-[1px_0px_0px_0px_#ffffff]";

/**
 * The lighter cells scattered through the top band (Figma 2402:5994-6000).
 * Desktop only — neither stacked frame has them. Stated as grid coordinates
 * rather than Figma's pixel lefts, so they stay on the cell they were drawn on
 * when the stage is wider than the 1280 frame.
 */
const FILLED_CELLS = [
  [2, 2],
  [4, 1],
  [6, 0],
  [10, 2],
  [12, 0],
  [14, 1],
  [15, 3],
] as const;

/**
 * Figma tiles this grain at half its natural size down both margins, outside the
 * rails — 16px of it on the phone, 47 above. It is photographic noise, which is
 * the one case the background rules allow an image for.
 */
const GRAIN =
  "absolute inset-y-0 w-[16px] bg-[url('/section-36/grain.png')] bg-[length:500px_518px] bg-left-top opacity-50 ipad:w-[47px]";

/** Rail to rail — the box every part of the pattern is measured from. */
const BAND =
  "absolute inset-y-0 right-[16px] left-[16px] ipad:right-[48px] ipad:left-[48px]";

export const GridBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    {/*
      The lighter cells go *under* the rules, which is the order Figma stacks
      them in — its fills are nodes 5994-6000 and the grid block that covers them
      is 6001. Painted on top instead, each fill swallows the hairline and bevel
      running down its own left edge, and the grid comes apart wherever one sits.
      Sampling the frame shows the rule surviving: the column at a fill's edge
      reads `#d0d2d5` then pure white, then the `#f3f4f7` fill.
    */}
    <div className={BAND}>
      {FILLED_CELLS.map(([col, row]) => (
        <span
          key={`${col}-${row}`}
          className="absolute hidden bg-[#f3f4f7] desktop-sm:block"
          style={{
            left: `calc(${col} * ${CELL})`,
            top: `calc(${row} * ${CELL})`,
            width: CELL,
            height: CELL,
          }}
        />
      ))}
    </div>

    <div className={BAND} style={{ backgroundImage: ENGRAVED }} />

    <div className={`${GRAIN} left-0`} />
    <div className={`${GRAIN} right-0`} />
  </div>
);

/**
 * The two rails, kept out of the backdrop on purpose.
 *
 * The stats band spans rail to rail and paints the page colour to mask the grid
 * behind it, which also masks the rails it starts on — they vanish for the
 * height of the band. Figma has the same overlap and resolves it by paint order:
 * its rails group (2402:6300) is drawn *after* the stats, so the hairline runs
 * unbroken over the cells. Sampling the frame confirms it — the rail column
 * reads `#e4e5e8` against the `#f3f4f7` cell inside the band.
 *
 * So they render above the content instead of under it, which is why they are a
 * separate layer rather than two more spans in the backdrop.
 */
export const Rails = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <span className={`left-[16px] ipad:left-[48px] ${RAIL}`} />
    <span className={`right-[16px] ipad:right-[48px] ${RAIL}`} />
  </div>
);
