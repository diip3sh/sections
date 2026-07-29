import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "nav";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "inline-flex cursor-pointer touch-manipulation items-center justify-center whitespace-nowrap font-sans text-[15px] font-medium leading-none tracking-[-0.6px] transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90";

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
        className={`${BASE_CLASS} min-h-11 rounded-[36px] border border-black/10 bg-black/[0.02] px-6 py-3 text-black/70 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} min-h-11 rounded-[36px] border border-black bg-[linear-gradient(180deg,#4d4d4d_0%,#0a0a0a_100%)] px-6 py-3 text-white shadow-[inset_0_4px_5px_rgba(0,0,0,0.25),0_18px_40px_rgba(0,0,0,0.22)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
