/**
 * The orange corner ticks — Figma `Rectangle 1430107540/541` on the stat boxes
 * and `Rectangle 1430107470-473` on the logo strip.
 *
 * Figma exports each one as its own SVG, four per box, rotated. Every one of
 * them is the same two strokes meeting at a right angle — `M0 0.5 H12 V12.5` —
 * which is a pair of borders, so none of the eight files ship.
 *
 * They hang a pixel outside their box on the stat cards and sit flush on the
 * logo strip, which is the only thing `inset` carries.
 */
export const Corners = ({
  size,
  inset = "0",
}: {
  /** Tailwind size utility — `size-3` on the stat boxes, `size-2.5` on the strip. */
  size: string;
  /** Offset from the box corner; `-px` pulls the tick outside the border. */
  inset?: string;
}) => (
  <>
    <span
      aria-hidden
      className={`pointer-events-none absolute ${size} border-t border-l border-solid border-[#f40]`}
      style={{ top: inset, left: inset }}
    />
    <span
      aria-hidden
      className={`pointer-events-none absolute ${size} border-t border-r border-solid border-[#f40]`}
      style={{ top: inset, right: inset }}
    />
    <span
      aria-hidden
      className={`pointer-events-none absolute ${size} border-b border-l border-solid border-[#f40]`}
      style={{ bottom: inset, left: inset }}
    />
    <span
      aria-hidden
      className={`pointer-events-none absolute ${size} border-r border-b border-solid border-[#f40]`}
      style={{ bottom: inset, right: inset }}
    />
  </>
);
