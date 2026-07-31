"use client";

/**
 * Hero visual layers (Figma element 2146:692).
 * Base: mask glow under circle; other layers (thunder, pixels) added next.
 *
 * Parent stays 317×317 for circle layout. Mask is centered and free to
 * overflow — set MASK_SIZE to grow/shrink the glow independently.
 */
const CIRCLE_SIZE = 317;
const MASK_SIZE = 400;
const THUNDER_MASK_SIZE = 192;

export const HeroVisual = () => {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 flex w-full items-center justify-center overflow-visible"
    >
      <div>
        <img
          src="/section-19/thunder-mask.png"
          alt=""
          width={THUNDER_MASK_SIZE}
          height={THUNDER_MASK_SIZE}
          className="pointer-events-none absolute inset-0 z-10 size-full max-w-none object-contain"
        />
      </div>
      <div
        className="relative overflow-visible"
        style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
      >
        <img
          src="/section-19/mask.png"
          alt=""
          width={MASK_SIZE}
          height={MASK_SIZE}
          className="pointer-events-none absolute z-0 max-w-none object-contain mix-blend-screen"
          style={{
            width: MASK_SIZE,
            height: MASK_SIZE,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          src="/section-19/circle.png"
          alt=""
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          className="pointer-events-none absolute inset-0 z-10 size-full max-w-none object-contain"
        />
      </div>
    </div>
  );
};
