import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Affordable Plans",
  description:
    "Explore flexible pricing plans designed to suit businesses of all sizes, ensuring maximum value and productivity.",
};

type PricingFeature = {
  text: string;
  isGroupLabel?: boolean;
};

type PricingPlan = {
  name: string;
  description: string;
  price: string;
  period: string;
  billedYearly: boolean;
  features: PricingFeature[];
  buttonVariant: "filled" | "outlined";
};

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    description: "Perfect for small teams and startups.",
    price: "$10",
    period: "per member / month",
    billedYearly: false,
    features: [
      { text: "Task Management" },
      { text: "AI Summary" },
      { text: "Progress Tracking" },
      { text: "Smart Labels" },
    ],
    buttonVariant: "filled",
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and projects.",
    price: "$25",
    period: "per member / month",
    billedYearly: false,
    features: [
      { text: "Everything in Basic +", isGroupLabel: true },
      { text: "Team Collaboration" },
      { text: "Bulk Actions" },
      { text: "2-way Translation" },
      { text: "Advanced Reporting" },
      { text: "Customizable Dashboards" },
      { text: "Priority Support" },
    ],
    buttonVariant: "outlined",
  },
  {
    name: "Enterprise",
    description: "Built for large organizations needs.",
    price: "$39",
    period: "per member / year",
    billedYearly: true,
    features: [
      { text: "Everything in Pro +", isGroupLabel: true },
      { text: "SAML sso" },
      { text: "Dedicated Account Manager" },
      { text: "Enterprise Integrations" },
      { text: "Data Analytics" },
      { text: "Security Enhancements" },
      { text: "Custom Workflows" },
    ],
    buttonVariant: "outlined",
  },
];

const ELITE_FEATURES_LEFT: PricingFeature[] = [
  { text: "Everything in Enterprise +", isGroupLabel: true },
  { text: "Priority Custom Development" },
  { text: "Enhanced Cloud Storage" },
  { text: "Tailored Training Programs" },
  { text: "Dedicated Infrastructure" },
  { text: "API Access" },
  { text: "White-labelling Options" },
];

const ELITE_FEATURES_RIGHT: PricingFeature[] = [
  { text: "Global Deployment Support" },
  { text: "In-depth Analytics" },
  { text: "Custom Reports" },
  { text: "Exclusive Webinars" },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.3 4L6 11.3L2.7 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5.25 3.5L8.75 7L5.25 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Toggle = ({ checked }: { checked: boolean }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label="Billed yearly"
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a2e] ${
      checked ? "bg-[#38c793]" : "bg-[#d1d5db]"
    }`}
  >
    <span
      className={`pointer-events-none inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ease ${
        checked ? "translate-x-[18px]" : "translate-x-[3px]"
      }`}
    />
  </button>
);

const FeatureItem = ({
  text,
  isGroupLabel,
  dark,
}: PricingFeature & { dark?: boolean }) => (
  <li className="flex items-start gap-2">
    <CheckIcon
      className={`mt-0.5 size-4 shrink-0 ${
        dark ? "text-[#6ee7b7]" : "text-[#38c793]"
      }`}
    />
    <span
      className={`text-sm leading-5 ${
        isGroupLabel
          ? "font-semibold"
          : "font-normal"
      } ${dark ? "text-white" : "text-[#374151]"}`}
    >
      {text}
    </span>
  </li>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const isFilled = plan.buttonVariant === "filled";

  return (
    <article className="flex flex-1 flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#111827]">
            {plan.name}
          </h3>
          <p className="text-sm text-[#6b7280]">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-[#111827]">
            {plan.price}
          </span>
          <span className="text-sm text-[#6b7280]">{plan.period}</span>
        </div>

        <div className="flex items-center gap-2">
          <Toggle checked={plan.billedYearly} />
          <span className="text-sm text-[#6b7280]">Billed yearly</span>
        </div>

        <a
          href="#get-started"
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a2e] ${
            isFilled
              ? "bg-[#1a1a2e] text-white hover:bg-[#2d2d44]"
              : "border border-[#d1d5db] bg-white text-[#374151] hover:bg-[#f9fafb]"
          }`}
        >
          Get started
          <ArrowIcon className="size-3.5" />
        </a>
      </div>

      <div className="mt-6 flex-1 border-t border-[#e5e7eb] pt-6">
        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <FeatureItem key={feature.text} {...feature} />
          ))}
        </ul>
      </div>
    </article>
  );
};

const EliteSection = () => (
  <section className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-white">
            Elite
          </h3>
          <p className="text-sm text-[#94a3b8]">
            Built for Large organizations needs.
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-white">
            $59
          </span>
          <span className="text-sm text-[#94a3b8]">per member / month</span>
        </div>

        <div className="flex items-center gap-2">
          <Toggle checked={false} />
          <span className="text-sm text-[#94a3b8]">Billed yearly</span>
        </div>

        <a
          href="#get-started"
          className="inline-flex w-fit items-center justify-center gap-1.5 rounded-lg border border-[#334155] bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 ease hover:bg-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get started
          <ArrowIcon className="size-3.5" />
        </a>
      </div>

      <div className="flex flex-1 gap-8 lg:gap-12">
        <ul className="flex flex-1 flex-col gap-3">
          {ELITE_FEATURES_LEFT.map((feature) => (
            <FeatureItem key={feature.text} {...feature} dark />
          ))}
        </ul>
        <ul className="flex flex-1 flex-col gap-3">
          {ELITE_FEATURES_RIGHT.map((feature) => (
            <FeatureItem key={feature.text} {...feature} dark />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Section8 = () => {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <section
        aria-labelledby="pricing-heading"
        className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-[120px] py-[100px] max-lg:px-10 max-md:px-6 max-md:py-16"
      >
        {/* Diagonal stripe background pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              #3b82f6 10px,
              #3b82f6 12px
            )`,
          }}
        />

        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-12">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="inline-block rounded-full bg-[#1a1a2e] px-4 py-1.5 text-xs font-medium tracking-wide text-white">
              Our Pricing
            </span>
            <h1
              id="pricing-heading"
              className="max-w-2xl text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#111827]"
            >
              Affordable Pricing Plans
            </h1>
            <p className="max-w-xl text-pretty text-base text-[#6b7280]">
              Explore flexible pricing plans designed to suit businesses of all
              sizes, ensuring maximum value and productivity.
            </p>
          </header>

          {/* Pricing Cards */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>

          {/* Elite Section */}
          <EliteSection />
        </div>
      </section>
    </main>
  );
};

export default Section8;
