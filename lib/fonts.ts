import { Instrument_Serif, JetBrains_Mono, Inter, Caveat } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-val-display",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-val-mono",
  display: "swap",
});

export const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-val-body",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});
