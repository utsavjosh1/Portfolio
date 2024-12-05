import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/darkmode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/icons.svgs";
import Banner from "@/components/banner";
import { FloatingDockDemo } from "@/components/floating-nav";
import { ContentSkeleton } from "@/components/layoutSkeleton";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Utsav Joshi | Developer",
  description:
    "Discover Utsav Joshi's portfolio, showcasing skills in JavaScript, TypeScript, web development, and innovative tech projects.",
  keywords: [
    "Utsav Joshi",
    "Developer Portfolio",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Tech Enthusiast",
    "Projects",
    "Frontend",
    "Backend",
  ],
  openGraph: {
    title: "Utsav Joshi | Developer and Tech Enthusiast",
    description: "Explore Utsav Joshi's portfolio, projects, skills, and more.",
    url: "https://joshiutsav.vercel.app",
    type: "website",
    images: [
      {
        url: "https://your-portfolio-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Utsav Joshi Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi | Developer and Tech Enthusiast",
    description:
      "Portfolio of Utsav Joshi, showcasing tech projects and skills.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://joshiutsav.vercel.app/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Banner text={"This website is still under development"} />
          <div className="flex flex-col min-h-screen">
            <header className="w-full border-b border-b-foreground/10">
              <div className="w-full md:w-2/5 mx-auto px-4 sm:px-6">
                <nav className="flex justify-between items-center h-14">
                  <div className="text-xl md:text-2xl font-bold">
                    <Link href="/">Utsav Joshi</Link>
                  </div>
                </nav>
              </div>
            </header>

            <main className="flex-grow flex justify-center">
              <div className="w-full md:w-2/5 px-4 sm:px-6 py-6">
                <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
              </div>
            </main>

            <footer>
              <div className="fixed bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4">
                <div className="flex items-center gap-4">
                  <Link href="/">
                    <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/98454866?v=4"
                        className="border-1 shadow-sm"
                        alt="Utsav Joshi"
                      />
                      <AvatarFallback>
                        <Icon
                          name="home"
                          className="h-5 w-5 text-neutral-500 dark:text-neutral-300"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <FloatingDockDemo />
                  <ModeToggle />
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
