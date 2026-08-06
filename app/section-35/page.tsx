import type { Metadata } from "next";

import { Section35Hero } from "./components/ui/section-35-hero";

export const metadata: Metadata = {
  title: "Deblot — Build, Deploy & Scale Intelligent Systems",
  description:
    "The AI infrastructure platform. From idea to production in three steps: connect your data, automate with agents, and scale globally.",
};

const Section35 = () => <Section35Hero />;

export default Section35;
