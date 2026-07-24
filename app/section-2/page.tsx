"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import {
  BillingCycleControl,
  useBillingCycle,
} from "./components/billing-toggle";

type PricingPlan = {
  name: string;
  description: string;
  icon: string;
  monthlyPrice: number;
  yearlyPrice: number;
  buttonLabel: string;
  isPopular?: boolean;
  emphasizedFeature?: string;
  features: string[];
};

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    description: "Perfect for small teams and startups.",
    icon: "/section-2/basic.svg",
    monthlyPrice: 10,
    yearlyPrice: 100,
    buttonLabel: "Get Started",
    features: [
      "Task Management",
      "AI Summary",
      "Progress Tracking",
      "Smart Labels",
    ],
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and projects.",
    icon: "/section-2/pro.svg",
    monthlyPrice: 25,
    yearlyPrice: 200,
    buttonLabel: "Start 7-day free trial",
    isPopular: true,
    emphasizedFeature: "Everything in Basic +",
    features: [
      "Everything in Basic +",
      "Team Collaboration",
      "Bulk Actions",
      "2-way Translation",
      "Advanced Reporting",
      "Customizable Dashboards",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    description: "Built for large organizations needs.",
    icon: "/section-2/enterprise.svg",
    monthlyPrice: 39,
    yearlyPrice: 319,
    buttonLabel: "Start 7-day free trial",
    emphasizedFeature: "Everything in Basic +",
    features: [
      "Everything in Basic +",
      "SAML sso",
      "Dedicated Account Manager",
      "Enterprise Integrations",
      "Data Analytics",
      "Security Enhancements",
      "Custom Workflows",
    ],
  },
];

const BENEFITS = [
  { icon: "/section-2/calendar.svg", label: "Free 7 days trial" },
  { icon: "/section-2/card.svg", label: "No credit card required" },
  { icon: "/section-2/database.svg", label: "Data migration" },
] as const;

const CARD_OUTLINE_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]";

const CARD_SURFACE_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04),0px_3px_4px_rgba(0,0,0,0.05),0px_1px_0.5px_rgba(0,0,0,0.2)]";

const PriceRow = ({
  price,
  isYearly,
}: {
  price: number;
  isYearly: boolean;
}) => {
  const suffixRef = useRef<HTMLSpanElement>(null);
  const previousLeft = useRef<number | null>(null);

  useLayoutEffect(() => {
    const suffix = suffixRef.current;
    if (!suffix) return;

    const currentLeft = suffix.getBoundingClientRect().left;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (previousLeft.current !== null && !prefersReducedMotion) {
      const deltaX = previousLeft.current - currentLeft;

      if (Math.abs(deltaX) > 0.5) {
        suffix.style.transform = `translateX(${deltaX}px)`;
        suffix.style.transition = "none";
        suffix.getBoundingClientRect();
        suffix.style.transition =
          "transform 200ms cubic-bezier(.215,.61,.355,1)";
        suffix.style.transform = "translateX(0)";
      }
    }

    previousLeft.current = currentLeft;
  }, [price, isYearly]);

  return (
    <div className="flex flex-wrap items-end gap-x-2 gap-y-0.5 iphone:flex-nowrap">
      <span className="font-tight text-[clamp(2.25rem,9vw,2.625rem)] font-semibold tabular-nums leading-none tracking-[-0.04em] transition-opacity duration-200 ease-[cubic-bezier(.215,.61,.355,1)] motion-reduce:transition-none">
        ${price}
      </span>
      <span
        ref={suffixRef}
        className="grid text-[15px] font-medium leading-normal text-[#4d4d4d] iphone:text-[17px]"
      >
        <span
          aria-hidden={isYearly}
          className={`col-start-1 row-start-1 transition-opacity duration-200 ease-[cubic-bezier(.215,.61,.355,1)] motion-reduce:transition-none ${
            isYearly ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          per member / month
        </span>
        <span
          aria-hidden={!isYearly}
          className={`col-start-1 row-start-1 transition-opacity duration-200 ease-[cubic-bezier(.215,.61,.355,1)] motion-reduce:transition-none ${
            isYearly ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          per member / yearly
        </span>
      </span>
    </div>
  );
};

const Section2 = () => {
  const { isYearly, toggleBillingCycle, getPrice } = useBillingCycle();

  return (
    <main className="min-h-screen bg-[#f4f1f0] px-2 py-16 text-[#111] sm:px-6 sm:py-24">
      <section
        aria-labelledby="pricing-heading"
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10"
      >
        <header className="flex max-w-101.25 lg:max-w-205 flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-white px-2.5 py-2 text-base font-medium leading-none shadow-[0px_1px_0.5px_rgba(0,0,0,0.1)]">
            Pricing &amp; Plans
          </span>
          <div className="flex flex-col items-center gap-3.5">
            <h1
              id="pricing-heading"
              className="font-switzer font-semibold leading-[1.2] tracking-[-0.04em] text-[clamp(30px,4vw,52px)]"
            >
              Affordable Pricing Plans
            </h1>

            <p className="max-w-155 text-[17px] font-medium leading-6.5 text-[#3d3d3d] sm:text-lg">
              Flexible, transparent pricing to support your team’s productivity
              and growth at every stage.
            </p>
          </div>
        </header>

        <BillingCycleControl
          isYearly={isYearly}
          onChange={toggleBillingCycle}
        />

        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full flex-wrap items-stretch justify-center gap-5">
            {PRICING_PLANS.map((plan) => {
              const price = getPrice(plan.monthlyPrice, plan.yearlyPrice);

              return (
                <article
                  key={plan.name}
                  className={`flex min-w-0 w-full max-w-90.5 flex-col rounded-[20px] bg-[#edeae8] ${CARD_OUTLINE_SHADOW} ${
                    plan.isPopular ? "border-2 border-transparent" : ""
                  }`}
                  style={
                    plan.isPopular
                      ? {
                          backgroundClip: "padding-box, border-box",
                          backgroundImage:
                            "linear-gradient(#edeae8, #edeae8), linear-gradient(90deg, #fe2e2e 0%, #f3661c 26%, #cf6954 44%, #a752a5 58%, #9348ce 70%, #c31bf6 88%, #e89ef4 100%)",
                          backgroundOrigin: "padding-box, border-box",
                        }
                      : undefined
                  }
                >
                  <div
                    className={`relative z-10 flex flex-col gap-8 bg-white p-5 ${CARD_SURFACE_SHADOW} android-sm:gap-9 android-sm:p-6 iphone:gap-10 iphone:p-7.5 ${
                      plan.isPopular
                        ? "-mx-0.5 -mt-0.5 rounded-[20px] rounded-b-[19px] pt-7 android-sm:pt-7.5 iphone:pt-8"
                        : "rounded-[19px]"
                    }`}
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      src={plan.icon}
                      width={48}
                      height={48}
                      className="size-12"
                    />

                    {plan.isPopular && (
                      <span className="absolute right-2.5 top-2.5 flex items-center justify-center rounded-[100px] bg-[#111] px-2 py-1 text-[14px] font-medium leading-normal whitespace-nowrap text-white iphone:px-2.5 iphone:py-1.5 iphone:text-base">
                        Most Popular
                      </span>
                    )}

                    <div className="flex flex-col gap-6 iphone:gap-7.5">
                      <div className="flex flex-col gap-0.5">
                        <h2 className="text-xl font-semibold leading-normal iphone:text-[22px]">
                          {plan.name}
                        </h2>
                        <p className="text-[15px] font-medium leading-normal text-[#4d4d4d] iphone:text-[17px]">
                          {plan.description}
                        </p>
                      </div>

                      <PriceRow price={price} isYearly={isYearly} />

                      <button
                        type="button"
                        className="min-h-11 w-full cursor-pointer rounded-lg bg-[#111] px-5 py-3 text-[15px] font-semibold leading-none text-white transition-colors duration-200 ease-[cubic-bezier(.215,.61,.355,1)] hover:bg-[#2a2a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] iphone:min-h-12 iphone:px-6 iphone:py-3.5 iphone:text-[17px]"
                      >
                        {plan.buttonLabel}
                      </button>
                    </div>
                  </div>

                  <ul className="flex flex-1 flex-col gap-2.5 rounded-b-[18px] px-5 pb-6 pt-4 text-[15px] font-medium leading-normal android-sm:px-6 iphone:gap-3 iphone:px-7.5 iphone:pb-7.5 iphone:pt-5 iphone:text-[17px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Image
                          alt=""
                          aria-hidden="true"
                          src="/section-2/check.svg"
                          width={14}
                          height={14}
                          className="size-3.5 shrink-0"
                        />
                        <span
                          className={
                            feature === plan.emphasizedFeature
                              ? "font-semibold"
                              : undefined
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-7.5">
            <div className="flex w-full max-w-90.5 flex-col items-center gap-5 rounded-[10px] border border-[#ded8d3] bg-[#e9e5e2] p-5 iphone-max:w-full iphone-max:max-w-none sm:flex-row sm:items-center sm:justify-between sm:gap-12.5 sm:py-2.5 sm:pl-5 sm:pr-2.5">
              <p className="text-center text-[17px] font-medium leading-normal text-[#1a1a1a] sm:text-left">
                We just launched our startup program -{" "}
                <span
                  className="bg-clip-text font-semibold text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(89.99999752581606deg, rgb(255, 47, 47) 0%, rgb(239, 123, 22) 36.277%, rgb(138, 67, 225) 69.752%, rgb(213, 17, 253) 100%)",
                  }}
                >
                  Get 50% off
                </span>
              </p>
              <button
                type="button"
                className="min-h-10 shrink-0 cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-[15px] font-semibold leading-none text-[#111] shadow-[0px_1px_0.5px_rgba(0,0,0,0.08)] transition-colors duration-200 ease-[cubic-bezier(.215,.61,.355,1)] hover:bg-[#f5f3f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
              >
                Apply Now
              </button>
            </div>

            <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-3">
              {BENEFITS.map((benefit, index) => (
                <li key={benefit.label} className="flex items-center gap-5">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden size-1 rounded-full bg-[#d3cbc5] sm:block"
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    <Image
                      alt=""
                      aria-hidden="true"
                      src={benefit.icon}
                      width={24}
                      height={24}
                      className="size-6"
                    />
                    <span className="text-[17px] font-medium leading-normal">
                      {benefit.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Section2;
