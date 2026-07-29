export const GlowBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {/* Figma left glow: inset ~12.8% top, overhang left, ~68% from right */}
      <img
        src="/section-14/glow-left.svg"
        alt=""
        className="absolute top-[12.76%] left-[-11%] h-[53.7%] w-[42.5%] max-w-none"
        aria-hidden="true"
      />
      {/* Figma right glow: mirrored */}
      <img
        src="/section-14/glow-right.svg"
        alt=""
        className="absolute top-[12.76%] right-[-11%] h-[64.4%] w-[42.5%] max-w-none -scale-x-100"
        aria-hidden="true"
      />
    </div>
  );
};
