import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "relative inline-flex shrink-0 touch-manipulation items-center justify-center overflow-clip rounded-[32px] font-sans text-[20px] font-medium leading-[1.2] tracking-[-0.4px] text-white transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 cursor-pointer";

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
        className={`${BASE_CLASS} border border-solid border-[#3a3a3a] px-4 py-3.5 ${className}`}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[32px] bg-[#262626]"
        />
        <span className="relative z-1 text-[20px] text-center">{children}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_-4px_4px_0_rgba(255,255,255,0.05),inset_0_4px_4px_0_rgba(255,255,255,0.05)]"
        />
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} px-5 py-3.5 shadow-[0_4px_2px_0_rgba(0,0,0,0.25),0_-1.2px_0.5px_0_rgba(255,255,255,0.4),0_66px_19px_0_rgba(0,0,0,0),0_42px_17px_0_rgba(0,0,0,0.01),0_24px_14px_0_rgba(0,0,0,0.05),0_11px_11px_0_rgba(0,0,0,0.09),0_3px_6px_0_rgba(0,0,0,0.1)] ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(77.36deg,#191b1a_13.89%,#19231e_18.74%,#19261f_23.4%,#19271b_33.87%,#192a1a_38.59%,#19301b_43.32%,#234818_52.9%,#25c36f_114.64%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[32px] bg-[url('/section-16/textures/btn-noise.png')] bg-size-[100px_100px] bg-top-left opacity-60"
      />
      <span className="relative z-1 whitespace-nowrap text-[20px]">
        {children}
      </span>
    </button>
  );
};
