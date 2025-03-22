import { Suspense, lazy } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Components
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/darkmode";
import { ContentSkeleton } from "@/components/layoutSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Styles
import "./globals.css";

// Font
const inter = Inter({ subsets: ["latin"] });

// Lazy loaded components
const LazyFloatingDockDemo = lazy(() => 
  import("@/components/floating-nav").then(mod => ({
    default: mod.FloatingDockDemo
  }))
);

// Metadata
export const metadata = {
  title: "Utsav Joshi | Developer",
  description: "Discover Utsav Joshi's portfolio, showcasing skills in JavaScript, TypeScript, web development, and innovative tech projects.",
  keywords: [
    "Utsav Joshi", "Developer Portfolio", "JavaScript", "TypeScript", 
    "Web Development", "Tech Enthusiast", "Projects", "Frontend", "Backend"
  ],
  openGraph: {
    title: "Utsav Joshi | Developer and Tech Enthusiast",
    description: "Explore Utsav Joshi's portfolio, projects, skills, and more.",
    url: "https://joshiutsav.com",
    type: "website",
    images: [{
      url: "https://your-portfolio-url.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Utsav Joshi Portfolio Image"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi | Developer and Tech Enthusiast",
    description: "Portfolio of Utsav Joshi, showcasing tech projects and skills."
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://joshiutsav.com/"
  }
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Utsav Joshi",
  "url": "https://joshiutsav.com",
  "sameAs": [
    "https://github.com/joshiutsav",
    "https://linkedin.com/in/joshi-utsav"
  ],
  "jobTitle": "Developer",
  "worksFor": {
    "@type": "Financial Service",
    "name": "Nextbill"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to main content
              </a>
              
              <div className="flex flex-col min-h-screen">
                <header className="w-full border-b border-b-foreground/10">
                  <div className="w-full md:w-2/5 mx-auto px-4 sm:px-6">
                    <nav
                      className="flex justify-between items-center h-16"
                      aria-label="Main navigation"
                    >
                      <div className="w-full flex items-center justify-between text-4xl md:text-2xl font-bold">
                        <Link href="/">JoshiUtsav</Link>
                      </div>
                      <ModeToggle />
                    </nav>
                  </div>
                </header>

                <main
                  id="main-content"
                  className="flex-grow flex justify-center"
                >
                  <div className="w-full md:w-2/5 px-4 sm:px-6 py-6">
                    <Suspense fallback={<ContentSkeleton />}>
                      {children}
                    </Suspense>
                  </div>
                </main>
                
                <footer>
                  <div className="fixed bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4">
                    <Suspense fallback={null}>
                      <LazyFloatingDockDemo />
                    </Suspense>
                  </div>
                </footer>
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}