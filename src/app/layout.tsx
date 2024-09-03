import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingDockDemo } from "@/components/floating-nav";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/darkmode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconHome } from "@tabler/icons-react";
import Banner from "@/components/banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Utsav Joshi ",
  description:
    "The portfolio of Utsav Joshi, a skilled web developer with expertise in Next.js, TypeScript, and modern web technologies. Discover projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <link rel="icon" href="/image/logo.png" /> */}</head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Banner text={"This website is still under development"} />

          {children}
          <div className="fixed bottom-5 inset-x-0 flex items-center justify-center gap-2 px-4 md:px-8 lg:px-24">
            <div className="flex items-center gap-5 md:gap-2">
              <Link href={"/"}>
                <Avatar>
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/98454866?v=4"
                    className="border-1 shadow-sm"
                  />
                  <AvatarFallback>
                    <IconHome className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <FloatingDockDemo />
              <ModeToggle />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
