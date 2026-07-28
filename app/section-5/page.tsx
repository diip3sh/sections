import type { Metadata } from "next";
import Section5Content from "./components/section-5-content";

export const metadata: Metadata = {
  title: "OnChat — Task Management Made Simple and Powerful",
  description:
    "We optimize for the single statistic that matters: Amount of real-world tasks a model can solve.",
};

const Section5 = () => {
  return <Section5Content />;
};

export default Section5;
