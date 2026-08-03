import type { Metadata } from "next";
import { Sec1Hero } from "./component/ui/sec1-hero";

export const metadata: Metadata = {
  title: "Build Your Global Team. Effortlessly.",
  description:
    "Hire exceptional talent across 180+ countries, automate compliance, and manage international payroll.",
};

const Sec1 = () => <Sec1Hero />;

export default Sec1;
