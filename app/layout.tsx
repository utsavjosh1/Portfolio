import type React from "react";
import { Suspense, lazy } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

// Components
import AnalyticsProvider from "@/_analytics/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/darkmode";
import ErrorBoundary from "@/components/ErrorBoundary";

// Styles
import "./globals.css";

// Font - Optimize with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

// Lazy load floating nav
const LazyFloatingDockDemo = lazy(() =>
  import("@/components/floating-nav").then((mod) => ({
    default: mod.FloatingDockDemo,
  }))
);

// Viewport settings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// ✅ Dynamic metadata generation with canonical
export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const path = params?.slug?.length ? `/${params.slug.join("/")}` : "/";
  const fullUrl = `https://www.joshiutsav.com${path}`;

  return {
    metadataBase: new URL("https://www.joshiutsav.com"),
    title: {
      default:
        "Utsav Joshi | Software Engineer & Full Stack Developer | joshiutsav.com",
      template: "%s | Utsav Joshi - Software Engineer",
    },
    description:
      "Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js. View portfolio, projects, and professional experience.",
    keywords: [
      "Utsav Joshi",
      "joshiutsav",
      "utsavjoshi",
      "Utsav Joshi Software Engineer",
      "Utsav Joshi Portfolio",
      "joshiutsav.com",
      "Senior Full Stack Developer",
      "JavaScript Expert",
      "TypeScript Developer",
      "React Engineer",
      "Next.js Developer",
      "Node.js Specialist",
      "Full Stack Development",
      "Web Application Engineer",
      "Software Architecture",
      "Cloud Computing Expert",
      "API Development",
      "Frontend Developer",
      "Backend Engineer",
    ],
    authors: [{ name: "Utsav Joshi", url: "https://www.joshiutsav.com" }],
    creator: "Utsav Joshi",
    publisher: "Utsav Joshi",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      title:
        "Utsav Joshi | Software Engineer & Full Stack Developer | joshiutsav.com",
      description:
        "Professional portfolio of Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development, JavaScript, TypeScript, React, and Node.js.",
      siteName: "Utsav Joshi - Software Engineer Portfolio",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: "Utsav Joshi - Software Engineer & Full Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Utsav Joshi | Software Engineer & Full Stack Developer",
      description:
        "Professional portfolio of Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development and modern web technologies.",
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
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": fullUrl,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    category: "Technology",
    classification: "Professional Portfolio",
    referrer: "origin-when-cross-origin",
    verification: {
      google: "G-YGSVWFZS92",
    },
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
}

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.joshiutsav.com/me",
  name: "Utsav Joshi",
  alternateName: ["joshiutsav", "utsavjoshi"],
  url: "https://www.joshiutsav.com",
  sameAs: [
    "https://github.com/utsavjosh1",
    "https://linkedin.com/in/utsavjosh1",
    "https://x.com/utsavjosh1",
    "https://www.instagram.com/utsavjosh1/",
  ],
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Nextbill",
    description: "Advanced Financial Technology Solutions",
  },
  knowsAbout: [
    "JavaScript Architecture",
    "TypeScript Development",
    "React Application Design",
    "Next.js Performance Optimization",
    "Node.js Scalability",
    "API Microservices",
    "Cloud Infrastructure",
    "Web Performance Optimization",
    "Serverless Architecture",
    "Progressive Web Applications",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "IGNOU",
    sameAs: "https://www.ignou.ac.in/",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Enterprise Web Development",
      description:
        "Specialized software engineering solutions focusing on performance, scalability, and exceptional user experiences",
    },
  },
  image: "https://avatars.githubusercontent.com/u/98454866?v=4",
  description:
    "Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js.",
  givenName: "Utsav",
  familyName: "Joshi",
  additionalName: "joshiutsav",
  honorificPrefix: "Mr.",
  nationality: "Indian",
  birthPlace: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
      addressRegion: "Delhi",
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.joshiutsav.com/#website",
  url: "https://www.joshiutsav.com",
  name: "Utsav Joshi - Software Engineer Portfolio",
  alternateName: ["joshiutsav.com", "Utsav Joshi Portfolio"],
  description:
    "Professional portfolio of Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.joshiutsav.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
  copyrightYear: new Date().getFullYear(),
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  author: {
    "@type": "Person",
    "@id": "https://www.joshiutsav.com/#person",
    name: "Utsav Joshi",
    url: "https://www.joshiutsav.com",
  },
  publisher: {
    "@type": "Person",
    "@id": "https://www.joshiutsav.com/#person",
    name: "Utsav Joshi",
    url: "https://www.joshiutsav.com",
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://www.joshiutsav.com/#profile",
  mainEntity: {
    "@type": "Person",
    "@id": "https://www.joshiutsav.com/#person",
    name: "Utsav Joshi",
    alternateName: ["joshiutsav", "utsavjoshi"],
    url: "https://www.joshiutsav.com",
    jobTitle: "Senior Full Stack Engineer",
    description:
      "Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js.",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Computer Science Degree",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "IGNOU",
        },
      },
    ],
    knowsAbout: [
      "Web Development",
      "Software Architecture",
      "JavaScript Ecosystems",
      "Full Stack Engineering",
      "React Development",
      "Node.js Development",
      "TypeScript",
      "Next.js",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.joshiutsav.com",
      },
    ],
  },
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          as="image"
          href="https://avatars.githubusercontent.com/u/98454866?v=4"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="google-site-verification" content="G-YGSVWFZS92" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="author" content="Utsav Joshi" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta property="article:author" content="Utsav Joshi" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <AnalyticsProvider />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
                    <h1 className="w-full flex items-center justify-between text-4xl md:text-2xl font-bold">
                      <Link
                        href="/"
                        aria-label="Utsav Joshi - Senior Full Stack Engineer"
                      >
                        Utsav Joshi
                      </Link>
                    </h1>
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
