"use client";

import { useCallback, useState } from "react";

export type BillingCycle = "monthly" | "yearly";

type BillingToggleProps = {
  isYearly: boolean;
  onChange: () => void;
  className?: string;
};

const TOGGLE_BORDER_STYLE = {
  backgroundClip: "padding-box, border-box",
  backgroundOrigin: "padding-box, border-box",
  backgroundImage:
    "linear-gradient(transparent, transparent), conic-gradient(from 210deg, #ff2f2f 0deg, #ff7a1a 55deg, #f5c542 110deg, #2e6bff 180deg, #a752a5 250deg, #d511fd 300deg, #ff2f2f 360deg)",
} as const;

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
      className={`relative h-6.5 w-11.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent shadow-[0_0_0_1px_#fff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] ${className ?? ""}`}
      style={TOGGLE_BORDER_STYLE}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-colors duration-200 ease motion-reduce:transition-none ${
          isYearly ? "bg-white" : "bg-black"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-1 left-1 z-10 size-4 rounded-full transition-transform duration-200 ease-out motion-reduce:transition-none ${
          isYearly ? "translate-x-4.5" : "translate-x-0"
        }`}
      >
        <span
          className={`absolute inset-0 rounded-full transition-colors duration-200 ease motion-reduce:transition-none ${
            isYearly
              ? "bg-black shadow-[0px_2px_2px_rgba(0,0,0,0.3)]"
              : "bg-white shadow-none"
          }`}
        />
      </span>
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
