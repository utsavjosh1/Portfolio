import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CursorEffect } from "@/components/ui/CursorEffect";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/config";
import { dmSerif, dmMono, outfit } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  keywords: [
    "software engineer",
    "full-stack developer",
    "Go",
    "TypeScript",
    "React",
    "Next.js",
    "AI",
    "automation",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.bio,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.bio,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
      className={cn("dark", dmSerif.variable, dmMono.variable, outfit.variable)}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] font-body font-light antialiased">
        {/* <CursorEffect /> */}
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
