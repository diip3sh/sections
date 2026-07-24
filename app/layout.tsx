import type { Metadata } from "next";
import {
  geist,
  inter,
  interTight,
  rethinkSans,
  switzer,
  tillana,
} from "@/lib/fonts/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suprema — Plan and navigate from idea to launch",
  description:
    "Create a clear roadmap, track progress, and smoothly guide your project from idea to successful launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${switzer.variable} ${rethinkSans.variable} ${geist.variable} ${tillana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
