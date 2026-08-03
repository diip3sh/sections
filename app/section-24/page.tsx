import type { Metadata } from "next";

import { Section24Hero } from "./component/ui/section-24-hero";

export const metadata: Metadata = {
  title: "ArchiFlow — Designed for Living, Built for You",
  description:
    "Crafted house plans for modern living—designed to make your dream home a reality.",
};

const Section24 = () => <Section24Hero />;

export default Section24;
