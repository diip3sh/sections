import type { Metadata } from "next";
import { Section12Hero } from "./components/ui/section-12-hero";

export const metadata: Metadata = {
  title: "Elevating Portraits Through Perspective",
  description:
    "Thoughtfully crafted portraits with refined lighting, style, and timeless storytelling.",
};

const Section12 = () => {
  return <Section12Hero />;
};

export default Section12;
