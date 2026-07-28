import localFont from "next/font/local";
import {
  Baskervville,
  Geist,
  Instrument_Sans,
  Inter,
  Inter_Tight,
  Manrope,
  Rethink_Sans,
  Space_Grotesk,
  Tillana,
  Urbanist,
} from "next/font/google";

export const switzer = localFont({
  src: "./switzer.ttf",
  variable: "--font-switzer-family",
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const geist = Geist({
  variable: "--font-geist-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const tillana = Tillana({
  variable: "--font-tillana-family",
  subsets: ["latin"],
  weight: ["500"],
});

export const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const baskervville = Baskervville({
  variable: "--font-baskervville-family",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const urbanist = Urbanist({
  variable: "--font-urbanist-family",
  subsets: ["latin"],
  weight: ["700"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
