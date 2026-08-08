import type { Metadata } from "next";

import { Section45Hero } from "./components/ui/section-45-hero";

export const metadata: Metadata = {
  title: "HireIQ — Let's build something extraordinary.",
  description:
    "Automate faster, collaborate smarter, and turn ideas into intelligent workflows.",
};

const Section45 = () => <Section45Hero />;

export default Section45;
