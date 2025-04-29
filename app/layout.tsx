import { Suspense, lazy } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Components
import AnalyticsProvider from "@/_analytics/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/darkmode";
import ErrorBoundary from "@/components/ErrorBoundary";

// Styles
import "./globals.css";

// Font
const inter = Inter({ subsets: ["latin"] });

// Lazy loaded components
const LazyFloatingDockDemo = lazy(() =>
  import("@/components/floating-nav").then((mod) => ({
    default: mod.FloatingDockDemo,
  }))
);

// Separate viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Main metadata configuration
export const metadata = {
  metadataBase: new URL('https://utsavjosh1.com'),
  title: {
    default: "Utsav Joshi | Full Stack Developer & Software Engineer",
    template: "%s | Utsav Joshi"
  },
  description: "Expert Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. View my latest projects, technical blog posts, and professional experience in web development.",
  keywords: [
    "Utsav Joshi",
    "Full Stack Developer",
    "React Developer",
    "Next.js Expert",
    "TypeScript Developer",
    "Software Engineer India",
    "Web Development Delhi",
    "MERN Stack Developer",
    "JavaScript Engineer",
    "Cloud Computing Expert"
  ],
  authors: [{ name: "Utsav Joshi", url: "https://utsavjosh1.com" }],
  creator: "Utsav Joshi",
  publisher: "Utsav Joshi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://utsavjosh1.com",
    title: "Utsav Joshi | Full Stack Software Engineer & JavaScript Expert",
    description: "Professional portfolio of Utsav Joshi, a skilled software engineer specializing in modern web development with React, Next.js, and Node.js. Explore projects, technical expertise, and professional background.",
    siteName: "Utsav Joshi - Software Engineer Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Utsav Joshi - Professional Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi | Software Engineer & JavaScript Expert",
    description: "Software engineering portfolio showcasing full stack development expertise, technical projects and professional skills.",
    creator: "@utsavjosh1",
    site: "@utsavjosh1",
    images: ["/api/og"],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://utsavjosh1.com",
    languages: {
      "en-US": "https://utsavjosh1.com",
    },
  },
  category: "Technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/mstile-144x144.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Utsav Joshi",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
  },
};

// Enhanced JSON-LD Schema with more structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Utsav Joshi",
  url: "https://utsavjosh1.com",
  sameAs: [
    "https://github.com/utsavjosh1",
    "https://linkedin.com/in/utsavjosh1",
    "https://x.com/utsavjosh1",
  ],
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Nextbill",
    description: "Financial Services Technology",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "API Design",
    "Software Architecture",
    "Cloud Computing",
    "Database Design",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "IGNOU",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Software Development Services",
      description:
        "Expert software engineering, web application development, and technical consulting",
    },
  },
};

// Additional WebSite schema to improve ranking
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://utsavjosh1.com",
  name: "Utsav Joshi - Software Engineer Portfolio",
  description:
    "Professional portfolio of Utsav Joshi showcasing software engineering projects, technical skills, and professional experience.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://utsavjosh1.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="author" content="Utsav Joshi" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta property="article:author" content="Utsav Joshi" />
        <AnalyticsProvider />
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
                <div className="w-full px-4 sm:px-6 mx-auto sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
                  <nav
                    className="flex justify-between items-center h-16"
                    aria-label="Main navigation"
                  >
                    <div className="w-full flex items-center justify-between text-4xl md:text-2xl font-bold">
                      <Link
                        href="/"
                        aria-label="Utsav Joshi - Software Engineer and Full Stack Developer"
                      >
                        utsavjosh1
                      </Link>
                    </div>
                    <ModeToggle />
                  </nav>
                </div>
              </header>

              <main id="main-content" className="flex-grow flex justify-center">
                <div className="w-full px-4 sm:px-6 py-6 mx-auto sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
                  {children}
                </div>
              </main>

              <footer className="mt-8 py-4">
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
