import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "nav";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "inline-flex cursor-pointer touch-manipulation items-center justify-center whitespace-nowrap font-sans text-[15px] font-medium leading-none tracking-[-0.6px] transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90";

/** Mobile CTA height 18px; Figma tablet/desktop frame is 42px */
const CTA_SIZE =
  "h-[18px] min-h-[18px] px-4 py-0 ipad:h-[42px] ipad:min-h-[42px] ipad:px-6 ipad:py-3";

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  if (variant === "nav") {
    return (
      <button
        type={type}
        className={`${BASE_CLASS} min-h-11 rounded-[36px] bg-black px-5 py-2.5 text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        type={type}
        className={`${BASE_CLASS} ${CTA_SIZE} rounded-[36px] border border-black/10 bg-black/[0.02] text-black/70 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} ${CTA_SIZE} relative overflow-hidden rounded-[36px] border border-black bg-[linear-gradient(180deg,#4d4d4d_0%,#0a0a0a_100%)] text-white shadow-[0_7px_8px_rgba(0,0,0,0.18),0_28px_14px_rgba(0,0,0,0.16),0_64px_19px_rgba(0,0,0,0.09),0_114px_23px_rgba(0,0,0,0.03)] ${className}`}
      {...props}
    >
      <span className="relative z-[1]">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_4px_5px_rgba(0,0,0,0.25)]"
      />
    </button>
  );
};
