import { Instrument_Serif, Inter } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-val-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-val-body",
  display: "swap",
});
