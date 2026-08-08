/**
 * The signup counter — four overlapped avatars, a count, and a laurel either
 * side of the pair.
 *
 * The laurels are absolute because they hang *outside* the row they bracket:
 * both are taller than the 30px avatars and sit centred on the row, so putting
 * them in the flow would set the row's height instead of decorating it. They
 * are the same export mirrored, not two files — Figma ships one branch twice
 * under different node ids, and `-scale-x-100` closes the bracket for free.
 */

const AVATARS = [
  "/section-42/avatar-1.png",
  "/section-42/avatar-2.png",
  "/section-42/avatar-3.png",
  "/section-42/avatar-4.png",
];

/**
 * The laurel export is 27.018 x 47.894 because Figma bakes the drop-shadow
 * bleed into the viewBox; the node itself is 27.018 x 38.453. The SVG carries
 * `preserveAspectRatio="none"`, so filling the node's box is what puts the
 * artwork back where the frame draws it.
 */
const LAUREL_CLASS =
  "pointer-events-none absolute top-1/2 h-[28.84px] w-[20.264px] -translate-y-1/2 ipad:h-[38.453px] ipad:w-[27.018px]";

export const SocialProof = () => (
  <div
    data-keep-out="box"
    className="relative flex items-center gap-[8.25px] ipad:gap-[11px]"
  >
    <div className="flex items-center">
      {AVATARS.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          width={60}
          height={60}
          /* The overlap is a right margin on every avatar but the last, so the
             row's own width stays honest and the laurels bracket the real edge. */
          className={`block size-[22.5px] max-w-none rounded-full border-[1.5px] border-solid border-white ipad:size-[30px] ${
            index < AVATARS.length - 1 ? "-mr-[6.75px] ipad:-mr-[9px]" : ""
          }`}
        />
      ))}
    </div>

    {/*
      Figma holds the count on one line, but at 320px the row needs about 300px
      of the 288px available, so the line is only held from `android-sm` up —
      the frames all sit above that and reproduce exactly.
    */}
    <span className="font-tight text-[12px] font-medium tracking-[-0.01em] text-[#222525] android-sm:whitespace-nowrap ipad:text-[16px]">
      Users join us every second - 484,984
    </span>

    <img
      src="/section-42/wreath.svg"
      alt=""
      aria-hidden
      className={`${LAUREL_CLASS} left-[-16.5px] ipad:left-[-22px]`}
    />
    <img
      src="/section-42/wreath.svg"
      alt=""
      aria-hidden
      className={`${LAUREL_CLASS} right-[-16px] -scale-x-100 ipad:right-[-22px]`}
    />
  </div>
);
