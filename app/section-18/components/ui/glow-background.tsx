"use client";

/**
 * Figma Gradient Background #11 — full-bleed on all breakpoints.
 * Portrait + copy sit on top; no solid black band on mobile.
 */
export const GlowBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <img
        src="/section-18/bg/gradient.png"
        alt=""
        width={1440}
        height={840}
        className="absolute inset-0 size-full object-cover object-[center_top]"
      />
    </div>
  );
};
