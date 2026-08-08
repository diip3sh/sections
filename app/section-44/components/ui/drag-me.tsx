/**
 * The hand-drawn "Drag me" annotation (Figma 1457:1550 / 1457:1475 /
 * 1457:1276) — a curved arrow, a grab-hand glyph and the label, aimed at the
 * Claude sticker.
 *
 * The three pieces are placed independently rather than as one block with
 * offsets, because Figma re-arranges them per frame: the phone and tablet set
 * the hand well right of the arrow's tail, desktop tucks it almost under it.
 * Each `left` is a percentage of the stage, from Figma's own inset percentages
 * on the frame — 66.47 / 72.68 / 84.58 for the arrow, and so on — so the
 * annotation tracks the sticker it points at as the stage re-pitches.
 *
 * Every box is Figma's measured size. The arrow and hand exports carry
 * `preserveAspectRatio="none"`, so a box of the wrong ratio does not crop them,
 * it distorts them — which is why these are stated as width *and* height rather
 * than a square.
 */
export const DragMe = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
    {/* Mirrored as Figma mirrors it, so the curve sweeps in from the right. */}
    <img
      src="/section-44/drag-arrow.svg"
      alt=""
      className="absolute left-[66.47%] top-[463.5px] block h-[44.8px] w-[52.7px] max-w-none -scale-x-100 ipad:left-[72.68%] ipad:top-[572.9px] ipad:h-[61.2px] ipad:w-[71.9px] desktop-sm:left-[84.58%] desktop-sm:top-[394px] desktop-sm:h-[61.15px] desktop-sm:w-[71.87px]"
    />

    <img
      src="/section-44/drag-hand.svg"
      alt=""
      className="absolute left-[77.96%] top-[492.1px] block h-[18.8px] w-[19.8px] max-w-none ipad:left-[81.15%] ipad:top-[612px] ipad:h-[25.6px] ipad:w-[27px] desktop-sm:left-[85.14%] desktop-sm:top-[433px] desktop-sm:h-[25.6px] desktop-sm:w-[27px]"
    />

    {/*
      The label is turned inside its own box, so the box is the *rotated* bounds
      Figma reports (39.978 / 54.259 square-ish) and the type is centred in it —
      placing the text itself at those coordinates would set the corner of an
      unturned line instead.
    */}
    <div className="absolute left-[81.42%] top-[459px] flex h-[39.193px] w-[39.978px] items-center justify-center ipad:left-[83.7%] ipad:top-[567px] ipad:h-[53.187px] ipad:w-[54.259px] desktop-sm:left-[86.46%] desktop-sm:top-[424.518px]">
      <p className="rotate-[-43.55deg] font-covered text-[13.192px] leading-[1.3] tracking-[-0.02em] whitespace-nowrap text-[#2b2a2a] opacity-80 ipad:text-[18px]">
        Drag me
      </p>
    </div>
  </div>
);
