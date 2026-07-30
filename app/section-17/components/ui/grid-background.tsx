/**
 * Full-bleed Figma grid backgrounds — no max-width.
 *
 * Frames:
 * - Mobile: 402 × 779  → /section-17/bg/mobile-bg.svg
 * - iPad: 744 × 1133   → /section-17/bg/ipad-bg.svg
 * - Desktop: 1440 × 892 → /section-17/bg/desktop-bg.svg
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
          srcSet="/section-17/bg/desktop-bg.svg"
        />
        {/* ipad → below desktop-sm */}
        <source
          media="(min-width: 768px)"
          srcSet="/section-17/bg/ipad-bg.svg"
        />
        {/* mobile default */}
        <img
          src="/section-17/bg/mobile-bg.svg"
          alt=""
          width={402}
          height={779}
          className="size-full object-cover object-top"
          decoding="async"
        />
      </picture>
    </div>
  );
};
