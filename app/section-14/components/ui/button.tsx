import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
};

const BASE_CLASS =
  "inline-flex w-full touch-manipulation items-center justify-center gap-2.5 rounded-[12px] px-6 font-clash text-[16px] leading-[21px] capitalize transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90";

export const Button = ({
  variant = "primary",
  children,
  icon,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        type={type}
        className={`${BASE_CLASS} min-h-11 border-[0.6px] border-solid border-white bg-[linear-gradient(133.14deg,#000_31.45%,#323232_54.98%,#282828_100%)] py-3 text-white shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.25)] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} min-h-[53px] border-[0.6px] border-solid border-[#f6f6f6] bg-white py-4 text-black shadow-[inset_0_0_5px_0_rgba(255,255,255,0.1)] ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};
