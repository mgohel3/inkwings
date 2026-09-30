import { Bricolage_Grotesque, Instrument_Sans, Caveat } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});
