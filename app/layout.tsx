import type { Metadata } from "next";
import {
  baskervville,
  geist,
  instrumentSans,
  inter,
  interTight,
  manrope,
  rethinkSans,
  spaceGrotesk,
  switzer,
  tillana,
  urbanist,
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
      className={`${inter.variable} ${interTight.variable} ${switzer.variable} ${rethinkSans.variable} ${geist.variable} ${tillana.variable} ${instrumentSans.variable} ${manrope.variable} ${baskervville.variable} ${urbanist.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
