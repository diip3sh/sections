import type { Metadata } from "next";
import {
  Aeonik,
  audiowide,
  baskervville,
  canelaDeck,
  clash,
  geist,
  HelveticaNeueNormal,
  instrumentSans,
  instrumentSerif,
  inter,
  interTight,
  dmMono,
  geistMono,
  lato,
  monda,
  manrope,
  outfit,
  playfairDisplay,
  redHatDisplay,
  rethinkSans,
  spaceGrotesk,
  switzer,
  tillana,
  urbanist,
  CanelaDeck,
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
      className={`${inter.variable} ${interTight.variable} ${lato.variable} ${geistMono.variable} ${dmMono.variable} ${monda.variable} ${switzer.variable} ${rethinkSans.variable} ${geist.variable} ${tillana.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${manrope.variable} ${baskervville.variable} ${playfairDisplay.variable} ${urbanist.variable} ${spaceGrotesk.variable} ${clash.variable} ${audiowide.variable} ${outfit.variable} ${redHatDisplay.variable} ${HelveticaNeueNormal.variable} ${Aeonik.variable} ${CanelaDeck.variable} h-full antialiased`}
      className={`${inter.variable} ${interTight.variable} ${switzer.variable} ${rethinkSans.variable} ${geist.variable} ${tillana.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${manrope.variable} ${baskervville.variable} ${playfairDisplay.variable} ${urbanist.variable} ${spaceGrotesk.variable} ${clash.variable} ${audiowide.variable} ${outfit.variable} ${redHatDisplay.variable} ${HelveticaNeueNormal.variable} ${Aeonik.variable} ${canelaDeck.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
