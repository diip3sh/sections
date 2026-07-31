import type { Metadata } from "next";
import { Section19Hero } from "./component/ui/section-19-hero";

export const metadata: Metadata = {
  title: "Neura — Intelligent Service Automation",
  description:
    "Automate your customer service with conversational AI that can answer, understand, and adapt to each user in real time.",
};

const Section19 = () => <Section19Hero />;

export default Section19;
