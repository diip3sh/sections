import type { Metadata } from "next";
import { Sec3Hero } from "./component/ui/sec3-hero";

export const metadata: Metadata = {
  title: "Aurra — Systems That Think Ahead",
  description:
    "AI infrastructure for autonomous decisions and realtime intelligence.",
};

const Sec3 = () => <Sec3Hero />;

export default Sec3;
