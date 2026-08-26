import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { EntityJsonLd } from "@/components/json-ld";
import Navbar from "@/components/layout/Navbar";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { siteConfig, siteTitle } from "@/data/config";
import { instrumentSerif, inter } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: siteTitle,
    description: siteConfig.bio,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.bio,
    creator: "@utsavjosh1",
    images: ["/api/og"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  applicationName: `${siteConfig.name} Portfolio`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] font-body text-[var(--text)] antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NoiseOverlay />
        <Navbar />
        {children}
        <EntityJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
