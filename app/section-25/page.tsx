import type { Metadata } from "next";

import { Section25Hero } from "./component/ui/section-25-hero";

export const metadata: Metadata = {
  title: "aindesk — Build Your Own Intelligence Network",
  description:
    "Activate intelligent modules that analyze, predict, and act — keeping your entire network in sync with zero manual control.",
};

const Section25 = () => <Section25Hero />;

export default Section25;
