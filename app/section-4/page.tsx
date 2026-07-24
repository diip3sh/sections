"use client";

import {
  BillingCycleControl,
  useBillingCycle,
} from "../section-2/components/billing-toggle";

const Section4 = () => {
  const { isYearly, toggleBillingCycle } = useBillingCycle();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1f0] px-4 py-16 text-[#111]">
      <BillingCycleControl
        isYearly={isYearly}
        onChange={toggleBillingCycle}
      />
    </main>
  );
};

export default Section4;
