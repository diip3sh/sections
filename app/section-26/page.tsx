import type { Metadata } from "next";

import { Section26Hero } from "./component/ui/section-26-hero";

export const metadata: Metadata = {
  title: "Visionary — Your Everyday Wellness Partner",
  description:
    "Stay on top of your health with a trusted partner by your side—track habits, monitor progress, and receive personalized guidance for a balanced, healthier life every day.",
};

const Section26 = () => <Section26Hero />;

export default Section26;
