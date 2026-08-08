import type { Metadata } from "next";

import { Section44Hero } from "./components/ui/section-44-hero";

export const metadata: Metadata = {
  title: "ArchiFlow — Everything Connected. Nothing Missed.",
  description:
    "AstraCore connects every tool your team uses, so work flows naturally from idea to execution.",
};

const Section44 = () => <Section44Hero />;

export default Section44;
