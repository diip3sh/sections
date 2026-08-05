import type { Metadata } from "next";

import { Section31Hero } from "./components/ui/section-31-hero";

export const metadata: Metadata = {
  title: "Zentra — The Coordination Layer for All Chanins",
  description:
    "Fast, verifiable, and trust-minimized interoperability. Bridge assets, route intents,and confirm proof - without trusted relayers.",
};

const Section31 = () => <Section31Hero />;

export default Section31;
