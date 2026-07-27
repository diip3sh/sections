"use client";

import Image from "next/image";
import { useBillingCycle } from "../section-2/components/billing-toggle";

type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  buttonLabel: string;
  isPopular?: boolean;
  features: string[];
};

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter plan",
    description:
      "The Starter Plan is perfect for businesses looking to build a professional website",
    monthlyPrice: 100,
    yearlyPrice: 499,
    buttonLabel: "Get Started",
    features: [
      "Professionally Designed Website",
      "Basic SEO Optimization",
      "Social Media Setup (3 Platforms)",
      "Monthly Performance Reports",
    ],
  },
  {
    name: "Growth Plan",
    description:
      "The Growth Plan is designed to accelerate your online growth with all the features.",
    monthlyPrice: 499,
    yearlyPrice: 999,
    buttonLabel: "Accelerate Growth",
    isPopular: true,
    features: [
      "Custom Website Design & Development",
      "Advanced SEO Strategy",
      "Social Media Management (5 Platforms)",
      "Monthly Strategy Sessions",
    ],
  },
  {
    name: "Enterprise Plan",
    description:
      "For enterprises with complex digital needs, our Enterprise Plan offers bespoke",
    monthlyPrice: null,
    yearlyPrice: null,
    buttonLabel: "Request Custom Quote",
    features: [
      "Tailored Solutions for Large Enterprises",
      "Advanced SEO & SEM Strategies",
      "Dedicated Social Media Manager",
      "Scalable Solutions for Future Growth",
    ],
  },
];

const getDisplayPrice = (
  monthlyPrice: number,
  yearlyPrice: number,
  isYearly: boolean,
) => (isYearly ? yearlyPrice : monthlyPrice);

const BillingToggle = ({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isYearly}
      aria-label="Toggle yearly billing"
      onClick={onChange}
      className="relative h-8 w-13.5 shrink-0 cursor-pointer rounded-full bg-[#1f1f1f] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cef240] motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 size-7 rounded-full bg-[#cef240] transition-transform duration-200 ease-out motion-reduce:transition-none ${
          isYearly ? "translate-x-5.5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

const FeatureItem = ({ label }: { label: string }) => {
  return (
    <li className="flex items-center gap-2">
      <span className="flex shrink-0 items-start rounded-full bg-[#1f1f1f] p-1.5">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-4/checkmark.svg"
          width={18}
          height={18}
          className="size-4.5"
        />
      </span>
      <span className="min-w-0 flex-1 text-[clamp(1.0625rem,2vw,1.125rem)] font-normal leading-normal text-[#b0b1b5]">
        {label}
      </span>
    </li>
  );
};

const Section4 = () => {
  const { isYearly, toggleBillingCycle } = useBillingCycle();

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-16 font-rethink text-[#f2f2f3] sm:px-6 sm:py-24">
      <section
        aria-labelledby="pricing-heading"
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 laptop:gap-15"
      >
        <header className="flex w-full max-w-245 flex-col items-center gap-2.5 text-center">
          <span className="flex items-center gap-0.5 rounded-[42px] border border-[#1f1f1f] bg-[#141414] px-3 py-1.5">
            <Image
              alt=""
              aria-hidden="true"
              src="/section-4/verified-check.svg"
              width={20}
              height={20}
              className="size-5"
            />
            <span className="text-base font-medium leading-normal tracking-[0.02em] text-[#daf66f]">
              Pricing plans
            </span>
          </span>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            <h1
              id="pricing-heading"
              className="w-full text-[clamp(1.75rem,4vw,3.625rem)] font-bold leading-[1.2] tracking-[0.02em] text-[#f2f2f3]"
            >
              Unlock Your Digital Potential with Outstand&apos;s Pricing Plans
            </h1>
            <p className="w-full max-w-180 text-[clamp(1.0625rem,2vw,1.125rem)] font-normal leading-normal tracking-[0.02em] text-[#96979c]">
              Embark on your digital journey with Outstand&apos;s range of
              pricing plans designed to meet your needs and propel your business
              forward.
            </p>
          </div>
        </header>

        <div className="flex w-full flex-col items-center gap-10">
          <div className="relative mt-10 flex items-center gap-4 rounded-[70px] bg-[#141414] px-4 py-2 ipad:mt-8 desktop-sm:mt-4">
            <span
              className={`text-base font-medium leading-normal tracking-[0.02em] transition-colors duration-200 ease motion-reduce:transition-none ${
                isYearly ? "text-[#cacbce]" : "text-[#cef240]"
              }`}
            >
              Monthly
            </span>

            <BillingToggle isYearly={isYearly} onChange={toggleBillingCycle} />

            <span
              className={`relative inline-block text-base font-medium leading-normal tracking-[0.02em] transition-colors duration-200 ease motion-reduce:transition-none ${
                isYearly ? "text-[#cef240]" : "text-[#cacbce]"
              }`}
            >
              Yearly
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-0 z-10 items-start gap-1 select-none ipad:-top-11 ipad:left-13.5 hidden iphone-max:flex"
              >
                <Image
                  alt=""
                  src="/section-4/save-arrow.svg"
                  width={44}
                  height={29}
                  className="h-8 w-10 -rotate-20 ipad:h-10 ipad:w-12.75 ipad:rotate-16"
                />
                <span className="relative -top-3 whitespace-nowrap text-sm font-normal leading-normal tracking-[0.02em] text-[#cef240] ipad:top-2.5 ipad:text-base">
                  ( Save 20% )
                </span>
                <Image
                  alt=""
                  src="/section-4/sparkle.svg"
                  width={11}
                  height={11}
                  className="relative -top-2 -rotate-8 size-2.5 ipad:top-0 ipad:size-3"
                />
              </span>
            </span>
          </div>

          <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 ipad:grid-cols-2 ipad:justify-items-stretch desktop-sm:flex desktop-sm:flex-wrap desktop-sm:justify-center">
            {PRICING_PLANS.map((plan) => {
              const price =
                plan.monthlyPrice === null || plan.yearlyPrice === null
                  ? null
                  : getDisplayPrice(
                      plan.monthlyPrice,
                      plan.yearlyPrice,
                      isYearly,
                    );

              const isStarter = plan.name === "Starter plan";

              return (
                <article
                  key={plan.name}
                  className={`flex h-fit w-full max-w-[369px] flex-col gap-7.5 self-start overflow-clip rounded-2xl border bg-[#141414] p-7.5 ipad:max-w-none desktop-sm:w-[369px] desktop-sm:max-w-[369px] desktop-sm:shrink-0 ${
                    plan.isPopular
                      ? "order-1 border-[#cef240] shadow-[0px_0px_0px_6px_#1a1a1a] ipad:col-span-2 desktop-sm:order-2 desktop-sm:col-span-1"
                      : isStarter
                        ? "order-2 border-[#1f1f1f] desktop-sm:order-1"
                        : "order-3 border-[#1f1f1f]"
                  }`}
                >
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center gap-5">
                      <h2 className="min-w-0 flex-1 text-[clamp(1.25rem,2vw,1.375rem)] font-semibold leading-normal text-[#f2f2f3]">
                        {plan.name}
                      </h2>

                      {plan.isPopular && (
                        <span className="flex shrink-0 items-center gap-1 rounded-[42px] border border-[#262626] bg-[#1a1a1a] px-3 py-2">
                          <Image
                            alt=""
                            aria-hidden="true"
                            src="/section-4/balloon.svg"
                            width={20}
                            height={20}
                            className="size-5"
                          />
                          <span className="text-sm font-medium leading-normal tracking-[0.02em] text-[#cef240]">
                            Popular
                          </span>
                        </span>
                      )}
                    </div>

                    <div
                      aria-hidden="true"
                      className="h-px w-full bg-[#1f1f1f]"
                    />

                    <p className="text-[clamp(1.0625rem,2vw,1.125rem)] font-normal leading-normal text-[#96979c]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-end leading-[0.73]">
                    {price === null ? (
                      <p className="text-[38px] font-medium whitespace-nowrap text-[#cef240]">
                        Custom pricing
                      </p>
                    ) : (
                      <>
                        <p className="text-[38px] font-medium tabular-nums text-[#cef240] transition-opacity duration-200 ease-[cubic-bezier(.215,.61,.355,1)] motion-reduce:transition-none">
                          ${price}
                        </p>
                        <p className="text-base font-medium text-[#96979c]">
                          /{isYearly ? "year" : "month"}
                        </p>
                      </>
                    )}
                  </div>

                  <ul className="flex w-full flex-col gap-3">
                    {plan.features.map((feature) => (
                      <FeatureItem key={feature} label={feature} />
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`flex min-h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-[53px] border border-[#262626] px-5 py-3.5 text-[clamp(1.0625rem,2vw,1.125rem)] font-medium leading-[1.2] tracking-[0.02em] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cef240] ${
                      plan.isPopular
                        ? "bg-[#cef240] text-[#0f0f0f] hover:bg-[#daf66f]"
                        : "bg-[#1a1a1a] text-[#f2f2f3] hover:bg-[#222]"
                    }`}
                  >
                    {plan.buttonLabel}
                    <Image
                      alt=""
                      aria-hidden="true"
                      src={
                        plan.isPopular
                          ? "/section-4/arrow-right-dark.svg"
                          : "/section-4/arrow-right.svg"
                      }
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Section4;
