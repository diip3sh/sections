"use client";

import { useCallback, useState } from "react";

export type BillingCycle = "monthly" | "yearly";

export const TOGGLE_GRADIENT_BORDER_STYLE = {
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient(transparent, transparent), linear-gradient(90deg, #ff2f2f 0%, #ff2f2f 50%, #d511fd 100%)",
  backgroundOrigin: "padding-box, border-box",
} as const;

type BillingToggleProps = {
  isYearly: boolean;
  onChange: () => void;
  className?: string;
};

export const BillingToggle = ({
  isYearly,
  onChange,
  className,
}: BillingToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isYearly}
      aria-label="Toggle yearly billing"
      onClick={onChange}
      className={`relative h-6.5 w-11.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-transform duration-200 ease-in-out active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] motion-reduce:transition-none motion-reduce:active:scale-100 ${className ?? ""}`}
      style={TOGGLE_GRADIENT_BORDER_STYLE}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0.5 rounded-full transition-colors duration-200 ease-in-out motion-reduce:transition-none ${
          isYearly ? "bg-white" : "bg-[#111]"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-1.5 z-10 size-4 -translate-y-1/2 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] transition-[transform,background-color] duration-200 ease-in-out motion-reduce:transition-none ${
          isYearly ? "translate-x-4.5 bg-[#111]" : "translate-x-0 bg-white"
        }`}
      />
    </button>
  );
};

type BillingCycleControlProps = {
  isYearly: boolean;
  onChange: () => void;
  monthlyLabel?: string;
  yearlyLabel?: string;
  className?: string;
};

export const BillingCycleControl = ({
  isYearly,
  onChange,
  monthlyLabel = "Billed Monthly",
  yearlyLabel = "Billed yearly",
  className,
}: BillingCycleControlProps) => {
  return (
    <div
      className={`flex items-center gap-3.5 text-[17px] font-medium ${className ?? ""}`}
    >
      <span
        className={`transition-colors duration-200 ease motion-reduce:transition-none ${
          isYearly ? "text-[#808080]" : "text-[#111]"
        }`}
      >
        {monthlyLabel}
      </span>

      <BillingToggle isYearly={isYearly} onChange={onChange} />

      <span
        className={`transition-colors duration-200 ease motion-reduce:transition-none ${
          isYearly ? "text-[#111]" : "text-[#808080]"
        }`}
      >
        {yearlyLabel}
      </span>
    </div>
  );
};

export const useBillingCycle = (initialCycle: BillingCycle = "monthly") => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialCycle);
  const isYearly = billingCycle === "yearly";

  const toggleBillingCycle = useCallback(() => {
    setBillingCycle((current) =>
      current === "monthly" ? "yearly" : "monthly",
    );
  }, []);

  const getPrice = useCallback(
    (monthlyPrice: number, yearlyPrice: number) =>
      isYearly ? yearlyPrice : monthlyPrice,
    [isYearly],
  );

  return {
    billingCycle,
    isYearly,
    setBillingCycle,
    toggleBillingCycle,
    getPrice,
  };
};
