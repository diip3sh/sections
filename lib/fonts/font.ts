import localFont from "next/font/local";
import { Inter, Inter_Tight, Rethink_Sans } from "next/font/google";

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
