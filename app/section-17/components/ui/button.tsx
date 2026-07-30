import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "inline-flex cursor-pointer touch-manipulation items-center justify-center whitespace-nowrap rounded-[36px] px-6 py-3 font-sans text-[15px] font-medium leading-none tracking-[-0.6px] transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 cursor-pointer";

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        type={type}
        className={`${BASE_CLASS} border border-solid border-black/10 bg-black/[0.02] text-black/70 hover:border-black/20 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} relative border border-solid border-[#f74406] text-white shadow-[0_8px_20px_rgba(0,0,0,0.18),0_16px_40px_rgba(0,0,0,0.12)] ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-linear-to-b from-[#ff9874] to-[#f74000]"
      />
      <span className="relative z-1">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_4px_5px_0_#f9a587]"
      />
    </button>
  );
};
