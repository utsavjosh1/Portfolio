"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const navItems = [{ label: "Now", href: "/now" }] as const

export function Header() {
  const pathname = usePathname()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 bg-background/80 backdrop-blur-md border-b border-border/40"
      )}
    >
      <div className="flex justify-center">
        <div className="w-[50%] min-w-[320px] max-w-4xl flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            prefetch={true}
          >
            <span className="font-bold text-lg sm:text-xl">{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="flex items-center gap-4 sm:gap-6" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 relative py-2",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  prefetch={true}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />
                  )}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
