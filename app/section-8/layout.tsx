import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Affordable Plans",
  description:
    "Explore flexible pricing plans designed to suit businesses of all sizes, ensuring maximum value and productivity.",
};

export default function Section8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
