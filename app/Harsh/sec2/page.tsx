import type { Metadata } from "next";
import { Sec2Hero } from "./component/ui/sec2-hero";

export const metadata: Metadata = {
  title: "Hirefy — Build Your Global Team. Effortlessly.",
  description:
    "Hire exceptional talent across 180+ countries, automate compliance, and manage international payroll.",
};

const Sec2 = () => <Sec2Hero />;

export default Sec2;
