"use client";

import Image from "next/image";
import { useState } from "react";

type PricingFeature = {
  text: string;
  isGroupLabel?: boolean;
};

type ButtonVariant = "dark" | "blue" | "muted";

type PlanId = "basic" | "pro" | "enterprise" | "elite";

type PricingPlan = {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
};

const ELITE_PRICES = {
  monthlyPrice: "$59",
  yearlyPrice: "$590",
} as const;

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for small teams and startups.",
    monthlyPrice: "$10",
    yearlyPrice: "$100",
    features: [
      { text: "Task Management" },
      { text: "AI Summary" },
      { text: "Progress Tracking" },
      { text: "Smart Labels" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal for growing teams and projects.",
    monthlyPrice: "$25",
    yearlyPrice: "$250",
    features: [
      { text: "Everything in Basic +", isGroupLabel: true },
      { text: "Team Collaboration" },
      { text: "Bulk Actions" },
      { text: "2-way Translation" },
      { text: "Advanced Reporting" },
      { text: "Customizable Dashboards" },
      { text: "Priority Support" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Built for large organizations needs.",
    monthlyPrice: "$49",
    yearlyPrice: "$39",
    features: [
      { text: "Everything in Pro +", isGroupLabel: true },
      { text: "SAML sso" },
      { text: "Dedicated Account Manager" },
      { text: "Enterprise Integrations" },
      { text: "Data Analytics" },
      { text: "Security Enhancements" },
      { text: "Custom Workflows" },
    ],
  },
];

const ELITE_FEATURES_LEFT: PricingFeature[] = [
  { text: "Everything in Enterprise +", isGroupLabel: true },
  { text: "Priority Custom Development" },
  { text: "Enhanced Cloud Storage" },
  { text: "Tailored Training Programs" },
  { text: "Dedicated Infrastructure" },
  { text: "API Access" },
  { text: "White-labeling Options" },
];

const ELITE_FEATURES_RIGHT: PricingFeature[] = [
  { text: "Global Deployment Support" },
  { text: "In-depth Analytics" },
  { text: "Custom Reports" },
  { text: "Exclusive Webinars" },
];

const TOGGLE_KNOB_TRAVEL_PX = 17;

const DottedArrow = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4.5 shrink-0"
  >
    <circle cx="6" cy="3" r="1.5" fill="currentColor" />
    <circle cx="9" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="6" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const BillingToggle = ({
  checked,
  onChange,
  dark = false,
}: {
  checked: boolean;
  onChange: () => void;
  dark?: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label="Billed yearly"
    onClick={onChange}
    className={`relative inline-flex h-5 w-9.25 shrink-0 touch-manipulation items-center rounded-full p-1 transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
      dark ? "focus-visible:outline-white" : "focus-visible:outline-[#1b1f22]"
    } ${checked ? "bg-[#2fd90d]" : dark ? "bg-[#444d55]" : "bg-[#dee5ed]"}`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1 left-1 size-3 rounded-full bg-white will-change-transform transition-transform duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
        checked
          ? "shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          : "shadow-[0_3px_5px_rgba(104,110,124,0.25),0_1px_1px_rgba(104,110,124,0.25)]"
      }`}
      style={{
        transform: checked
          ? `translateX(${TOGGLE_KNOB_TRAVEL_PX}px)`
          : "translateX(0)",
      }}
    />
  </button>
);

const FeatureItem = ({
  text,
  isGroupLabel,
  tone,
}: PricingFeature & { tone: "light" | "dark" }) => {
  const checkSrc =
    tone === "dark"
      ? isGroupLabel
        ? "/section-8/check-elite-bold.svg"
        : "/section-8/check-elite.svg"
      : isGroupLabel
        ? "/section-8/check-bold.svg"
        : "/section-8/check-gray.svg";

  return (
    <li className="flex w-full items-center gap-2">
      <Image
        src={checkSrc}
        alt=""
        width={14}
        height={14}
        className="size-3.5 shrink-0"
        aria-hidden="true"
      />
      <span
        className={`min-w-0 flex-1 text-[clamp(17px,1.5vw,18px)] leading-normal text-pretty ${
          isGroupLabel ? "font-semibold" : "font-medium"
        } ${
          tone === "dark"
            ? isGroupLabel
              ? "text-white"
              : "text-[#aab4bb]"
            : isGroupLabel
              ? "text-[#1b1f22]"
              : "text-[#4e5960]"
        }`}
      >
        {text}
      </span>
    </li>
  );
};

const CtaButton = ({ variant }: { variant: ButtonVariant }) => {
  const isBlue = variant === "blue";

  return (
    <a
      href="#get-started"
      className={`relative inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-1.5 overflow-clip rounded-lg px-5 py-3.5 text-[17px] font-semibold leading-none text-white transition-[transform,background-color] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b1f22] active:scale-[0.98] motion-reduce:active:scale-100 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 ${
        variant === "muted" ? "bg-[#444d55]" : "bg-[#1b1f22]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-linear-to-b from-[#5e8fed] to-[#306fe8] transition-opacity duration-200 ease motion-reduce:transition-none ${
          isBlue ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="relative z-10 inline-flex items-center gap-1.5">
        <span className="leading-none">Get started</span>
        <DottedArrow />
      </span>
    </a>
  );
};

const PriceRow = ({
  price,
  period,
  dark = false,
}: {
  price: string;
  period: string;
  dark?: boolean;
}) => (
  <div className="flex items-baseline gap-2 whitespace-nowrap">
    <span
      className={`text-[clamp(34px,5vw,58px)] font-bold leading-none ${
        dark ? "text-white" : "text-[#1b1f22]"
      }`}
    >
      {price}
    </span>
    <span
      className={`text-[clamp(18px,2vw,18px)] font-medium leading-normal ${
        dark ? "text-[#8e9ca4]" : "text-[#5b6971]"
      }`}
    >
      {period}
    </span>
  </div>
);

const PlanColumn = ({
  plan,
  showDivider,
  isActive,
  onToggle,
}: {
  plan: PricingPlan;
  showDivider: boolean;
  isActive: boolean;
  onToggle: () => void;
}) => (
  <article
    className={`flex min-w-0 flex-1 flex-col items-start ${
      showDivider
        ? "border-t border-solid border-[#dee5ed] ipad-landscape:border-t-0 ipad-landscape:border-l"
        : ""
    }`}
  >
    <div className="flex w-full flex-col items-start gap-6 border-b border-solid border-[#dee5ed] p-5 iphone:p-6 ipad-landscape:p-7.5">
      <div className="flex w-full flex-col items-start gap-10 ipad-landscape:gap-15">
        <div className="flex w-full flex-col gap-1 leading-normal">
          <h3 className="text-[clamp(22px,22px,22px)] font-semibold text-[#1b1f22]">
            {plan.name}
          </h3>
          <p className="text-[clamp(18px,2vw,18px)] font-medium text-[#5b6971]">
            {plan.description}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-7.5">
          <PriceRow
            price={isActive ? plan.yearlyPrice : plan.monthlyPrice}
            period={isActive ? "per member / year" : "per member / month"}
          />

          <div className="flex items-center gap-2">
            <BillingToggle checked={isActive} onChange={onToggle} />
            <span className="text-base font-medium whitespace-nowrap text-[#1b1f22]">
              Billed yearly
            </span>
          </div>
        </div>
      </div>

      <CtaButton variant={isActive ? "blue" : "dark"} />
    </div>

    <ul className="flex w-full flex-col items-start gap-3 p-5 iphone:p-6 ipad-landscape:p-7.5">
      {plan.features.map((feature) => (
        <FeatureItem key={feature.text} {...feature} tone="light" />
      ))}
    </ul>
  </article>
);

const ElitePlan = ({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => void;
}) => (
  <section
    aria-labelledby="elite-heading"
    className="relative z-1 flex w-full flex-col overflow-clip rounded-tl-xl rounded-tr-xl rounded-br-[30px] rounded-bl-[30px] ipad-landscape:flex-row ipad-landscape:items-stretch"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
    >
      <div className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-[#292f33] to-[#1b1f22]" />
      <div
        className="absolute inset-0 rounded-[inherit] opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "url(/section-8/elite-bg.png)",
          backgroundSize: "14px 14px",
          backgroundPosition: "top left",
        }}
      />
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_92%_78%,rgba(94,143,237,0.55)_0%,rgba(48,111,232,0.2)_28%,transparent_58%)]" />
      <div className="pointer-events-none absolute -right-10 -bottom-5 h-70 w-80 overflow-hidden opacity-90">
        <Image
          src="/section-8/elite-glow-1.svg"
          alt=""
          width={504}
          height={451}
          className="absolute top-0 right-0 h-auto w-105 max-w-none"
        />
      </div>
      <div className="pointer-events-none absolute -right-30 -bottom-45 h-90 w-120 overflow-hidden opacity-40">
        <Image
          src="/section-8/elite-glow-2.svg"
          alt=""
          width={898}
          height={693}
          className="absolute right-0 bottom-0 h-auto w-140 max-w-none"
        />
      </div>
    </div>

    <div className="relative flex min-w-0 flex-1 flex-col items-start gap-6 p-6 iphone:p-8 ipad-landscape:p-12.5">
      <div className="flex w-full flex-col items-start gap-10 ipad-landscape:gap-15">
        <div className="flex w-full flex-col gap-1 leading-normal">
          <h3
            id="elite-heading"
            className="text-[clamp(22px,22px,22px)] font-semibold text-white"
          >
            Elite
          </h3>
          <p className="text-[clamp(18px,2vw,18px)] font-medium text-[#8e9ca4]">
            Built for Large organizations needs.
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-7.5">
          <PriceRow
            price={
              isActive ? ELITE_PRICES.yearlyPrice : ELITE_PRICES.monthlyPrice
            }
            period={isActive ? "per member / year" : "per member / month"}
            dark
          />

          <div className="flex items-center gap-2">
            <BillingToggle checked={isActive} onChange={onToggle} dark />
            <span className="text-base font-medium whitespace-nowrap text-white">
              Billed yearly
            </span>
          </div>
        </div>
      </div>

      <CtaButton variant={isActive ? "blue" : "muted"} />
    </div>

    <ul className="relative flex min-w-0 flex-1 flex-col items-start justify-center gap-3  px-6 py-8 iphone:px-8 ipad-landscape:border-t-0 ipad-landscape:border-x ipad-landscape:border-[#2d3339] ipad-landscape:px-7.5 ipad-landscape:py-12.5">
      {ELITE_FEATURES_LEFT.map((feature) => (
        <FeatureItem key={feature.text} {...feature} tone="dark" />
      ))}
    </ul>

    <ul className="relative flex min-w-0 flex-1 flex-col items-start justify-center gap-3 px-6 py-8 iphone:px-8 ipad-landscape:border-t-0 ipad-landscape:px-7.5 ipad-landscape:py-12.5">
      {ELITE_FEATURES_RIGHT.map((feature) => (
        <FeatureItem key={feature.text} {...feature} tone="dark" />
      ))}
    </ul>
  </section>
);

const Section8 = () => {
  const [activePlanId, setActivePlanId] = useState<PlanId | null>("enterprise");

  const handlePlanToggle = (planId: PlanId) => {
    setActivePlanId((prev) => (prev === planId ? null : planId));
  };

  return (
    <main className="min-h-screen bg-white text-[#1b1f22]">
      <section
        aria-labelledby="pricing-heading"
        className="relative mx-auto flex w-full max-w-360 flex-col items-center px-4 py-16 sm:px-6 sm:py-20 ipad:px-10 ipad:py-24 ipad-landscape:px-30 ipad-landscape:py-25"
      >
        <div className="relative z-10 flex w-full max-w-300 flex-col items-center gap-12 ipad:gap-20">
          <header className="animate-section-rise flex w-full flex-col items-center gap-5 text-center motion-reduce:animate-none">
            <div className="relative inline-flex items-center justify-center overflow-clip rounded-full px-3.5 py-2">
              <Image
                src="/section-8/badge-bg.png"
                alt=""
                width={108}
                height={40}
                className="absolute inset-0 size-full object-cover"
                aria-hidden="true"
              />
              <span className="relative z-10 text-base font-medium leading-normal whitespace-nowrap text-white">
                Our Pricing
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_4px_5px_rgba(255,255,255,0.1),inset_0_2px_2px_rgba(255,255,255,0.25)]"
              />
            </div>

            <div className="flex w-full max-w-200 flex-col items-center gap-4">
              <h1
                id="pricing-heading"
                className="w-full bg-center bg-cover bg-clip-text bg-no-repeat text-[clamp(34px,5vw,58px)] font-bold leading-[1.2] text-transparent"
                style={{
                  backgroundImage: "url(/section-8/heading-fill.png)",
                }}
              >
                Affordable Pricing Plans
              </h1>
              <p className="max-w-160 text-pretty text-[clamp(18px,2.5vw,20px)] font-medium leading-normal text-[#5b6971]">
                Explore flexible pricing plans designed to suit businesses of
                all sizes, ensuring maximum value and productivity.
              </p>
            </div>
          </header>

          <div className="animate-section-rise flex w-full max-w-[418px] flex-col items-start motion-reduce:animate-none [animation-delay:120ms] ipad-landscape:max-w-none">
            <div className="relative z-2 mb-0 flex w-full flex-col overflow-clip rounded-xl border border-solid border-[#dee5ed] bg-white ipad-landscape:-mb-7.5 ipad-landscape:flex-row ipad-landscape:items-start">
              {PRICING_PLANS.map((plan, index) => (
                <PlanColumn
                  key={plan.id}
                  plan={plan}
                  showDivider={index > 0}
                  isActive={activePlanId === plan.id}
                  onToggle={() => handlePlanToggle(plan.id)}
                />
              ))}
            </div>

            <ElitePlan
              isActive={activePlanId === "elite"}
              onToggle={() => handlePlanToggle("elite")}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Section8;
