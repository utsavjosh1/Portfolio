import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/config";
import { instrumentSerif, jetbrainsMono, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
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
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.bio,
    siteName: siteConfig.name,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.bio,
    creator: "@utsavjosh1",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        instrumentSerif.variable,
        jetbrainsMono.variable,
        inter.variable,
      )}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] font-body font-light antialiased">
        <NoiseOverlay />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Analytics />
        <SpeedInsights />
        <FirebaseAnalytics />
        <JsonLd />
      </body>
    </html>
  );
}
