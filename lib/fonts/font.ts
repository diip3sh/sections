import localFont from "next/font/local";
import {
  Audiowide,
  Baskervville,
  DM_Mono,
  Geist,
  Geist_Mono,
  Gemunu_Libre,
  Hedvig_Letters_Serif,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  Inter_Tight,
  Covered_By_Your_Grace,
  Lato,
  Manrope,
  Monda,
  Orbit,
  Outfit,
  Playfair_Display,
  Poppins,
  Rajdhani,
  Red_Hat_Display,
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

export const gemunuLibre = Gemunu_Libre({
  variable: "--font-gemunu-libre-family",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const dmMono = DM_Mono({
  variable: "--font-dm-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const monda = Monda({
  variable: "--font-monda-family",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const lato = Lato({
  variable: "--font-lato-family",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const coveredByYourGrace = Covered_By_Your_Grace({
  variable: "--font-covered-by-your-grace-family",
  subsets: ["latin"],
  weight: ["400"],
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

export const hedvigLettersSerif = Hedvig_Letters_Serif({
  variable: "--font-hedvig-letters-serif-family",
  subsets: ["latin"],
  weight: ["400"],
});

export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif-family",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const rajdhani = Rajdhani({
  variable: "--font-rajdhani-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export const clash = localFont({
  src: "./clash-grotesk.ttf",
  variable: "--font-clash-grotesk-family",
  display: "swap",
});

export const audiowide = Audiowide({
  variable: "--font-audiowide-family",
  subsets: ["latin"],
  weight: ["400"],
});

export const orbit = Orbit({
  variable: "--font-orbit-family",
  subsets: ["latin"],
  weight: ["400"],
});

export const outfit = Outfit({
  variable: "--font-outfit-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const poppins = Poppins({
  variable: "--font-poppins-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const redHatDisplay = Red_Hat_Display({
  variable: "--font-redhat-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const HelveticaNeueNormal = localFont({
  src: "./helvetica-medium.ttf",
  variable: "--font-helvetica-neue-family",
  display: "swap",
});

export const canelaDeck = localFont({
  src: "./canela-deck-bold.ttf",
  variable: "--font-canela-deck-family",
  display: "swap",
});

export const Aeonik = localFont({
  src: "./aeonik.ttf",
  variable: "--font-aeonik-family",
  display: "swap",
});

export const CanelaDeck = localFont({
  src: "./canela-deck-trial.otf",
  variable: "--font-canela-deck-trail-family",
  display: "swap",
});

export const Helvetica = localFont({
  src: "./helvetica.ttf",
  variable: "--font-helvetica",
  display: "swap",
});
