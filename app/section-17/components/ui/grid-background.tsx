/**
 * Full-bleed Figma grid backgrounds — no max-width.
 *
 * Frames:
 * - Mobile: 402 × 779  → /section-17/bg/mobile-bg.png
 * - iPad: 744 × 1133   → /section-17/bg/ipad-bg.png
 * - Desktop: 1440 × 892 → /section-17/bg/desktop-bg.png
 *
 * Breakpoints match globals.css (`ipad` 768px, `desktop-sm` 1280px).
 */
export const GridBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f5f5f5]"
    >
      <picture className="absolute inset-0 block size-full">
        {/* desktop-sm and above */}
        <source
          media="(min-width: 1280px)"
          srcSet="/section-17/bg/desktop-bg.png"
        />
        {/* ipad → below desktop-sm */}
        <source
          media="(min-width: 768px)"
          srcSet="/section-17/bg/ipad-bg.png"
        />
        {/* mobile default */}
        {/*
          Mobile + iPad render the pattern at its natural Figma frame width
          (402 / 744) so grid rows land on the exact Figma y values. Scaling it
          with object-cover stretched the rows out of sync with the content,
          which is itself a fixed-width column. Desktop is fluid, so it keeps
          object-cover.
        */}
        <img
          src="/section-17/bg/mobile-bg.png"
          alt=""
          width={402}
          height={779}
          className="absolute top-0 left-1/2 h-auto w-[402px] max-w-none -translate-x-1/2 ipad:w-[744px] desktop-sm:inset-0 desktop-sm:left-0 desktop-sm:size-full desktop-sm:translate-x-0 desktop-sm:object-cover desktop-sm:object-top"
          decoding="async"
        />
      </picture>

      {/* SVG backgrounds (kept for reference)
      <picture className="absolute inset-0 block size-full">
        <source
          media="(min-width: 1280px)"
          srcSet="/section-17/bg/desktop-bg.svg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/section-17/bg/ipad-bg.svg"
        />
        <img
          src="/section-17/bg/mobile-bg.svg"
          alt=""
          width={402}
          height={779}
          className="size-full object-cover object-top"
          decoding="async"
        />
      </picture>
      */}
    </div>
  );
};
