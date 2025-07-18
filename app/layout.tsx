import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import Script from "next/script";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeEffect } from "@/components/theme-effect";
import { HomepageLoadingSkeleton } from "@/components/ui/loading-skeleton";
import { PageTransition } from "@/components/page-transition";

import "./globals.css";

// Optimized font loading with preload and fallback
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  generator: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="//vercel.com" />

        {/* Preconnect to critical resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Critical CSS inline to prevent FOUC */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for initial render */
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              margin: 0; 
              background: hsl(0 0% 100%);
              color: hsl(240 10% 3.9%);
            }
            @media (prefers-color-scheme: dark) {
              body {
                background: hsl(240 10% 3.9%);
                color: hsl(0 0% 98%);
              }
            }
            .theme-transition {
              transition: background-color 0.3s ease, color 0.3s ease;
            }
          `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased theme-transition",
          inter.variable
        )}
        suppressHydrationWarning
      >
        {/* Critical rendering path optimization */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ThemeEffect />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <Suspense fallback={<HomepageLoadingSkeleton />}>
                  <PageTransition>{children}</PageTransition>
                </Suspense>
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        <Suspense>
          <Analytics />
          <SpeedInsights />
        </Suspense>

        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
