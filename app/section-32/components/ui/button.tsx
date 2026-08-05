import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The two hero CTAs — Figma 2371:3234 (primary) and 2371:3269 (secondary),
 * identical at all three frames.
 *
 * Figma builds the primary as five nested frames: a black 2px collar, a stack
 * of five drop shadows, the lime pill, and then a 20-node `mix-blend-luminosity`
 * rig of blurred rounded borders inside a clipped 165 x 45 box. That rig is a
 * baked light sweep — what it actually renders is a soft highlight across the
 * top of the pill, which is what the two inset shadows Figma also sets already
 * say. So the collar, the shadows and the inset highlight are kept verbatim and
 * the rig is dropped: same pixels, twenty fewer nodes.
 */

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "relative inline-flex min-h-11 items-center justify-center whitespace-nowrap cursor-pointer touch-manipulation" +
  " font-sans text-[14px] leading-[1.5] font-medium tracking-[-0.42px]" +
  " transition-[opacity,transform] duration-200 ease-out" +
  " [-webkit-tap-highlight-color:transparent]" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bbfb50]" +
  " active:scale-[0.97] motion-reduce:active:scale-100" +
  " [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90";

/** Figma's five-stop cast shadow (2371:3235) plus the lime contact pair (2371:3236). */
const PRIMARY_SHADOW =
  "drop-shadow-[0px_148px_21px_rgba(0,0,0,0.01)] drop-shadow-[0px_95px_19px_rgba(0,0,0,0.08)]" +
  " drop-shadow-[0px_53px_16px_rgba(0,0,0,0.28)] drop-shadow-[0px_24px_12px_rgba(0,0,0,0.49)]" +
  " drop-shadow-[0px_6px_6.5px_rgba(0,0,0,0.56)] drop-shadow-[0px_5px_2.5px_rgba(87,133,11,0.05)]" +
  " drop-shadow-[0px_1px_0.5px_rgba(87,133,11,0.15)]";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: `gap-[2px] rounded-[12px] border border-solid border-[#9bec13] bg-[#bbfb50] px-[16px] py-[12px] text-[#050d19] ${PRIMARY_SHADOW}`,
  secondary:
    "w-[110px] rounded-[10px] bg-[#212f21] px-[18px] py-[12px] text-[#ccc]",
};

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const button = (
    <button
      type={type}
      className={`${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`}
      {...props}
    >
      {children}
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_7px_5px_0px_rgba(255,255,255,0.3),inset_0px_3px_1px_0px_rgba(255,255,255,0.5)]"
        />
      ) : null}
    </button>
  );

  // The primary sits in a black collar Figma draws as a 2px padded wrapper.
  return variant === "primary" ? (
    <span className="inline-flex rounded-[14px] bg-black p-[2px]">
      {button}
    </span>
  ) : (
    button
  );
};
