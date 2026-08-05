import type { Metadata } from "next";

import { Section32Hero } from "./components/ui/section-32-hero";

export const metadata: Metadata = {
  title: "Ozone — The AI Workforce for Modern Businesses",
  description:
    "Replace repetitive work with AI agents that think, act, and collaborate across your entire business.",
};

const Section32 = () => <Section32Hero />;

export default Section32;
