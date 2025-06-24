"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BulbThemeToggle } from "@/components/bulb-theme-toggle"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Memoize scroll handler to prevent unnecessary re-renders
  const handleScroll = useMemo(() => {
    let ticking = false
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }
  }, [])

  useEffect(() => {
    // Passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="flex justify-center">
        <div className="w-[40%] min-w-[320px] flex h-16 items-center justify-between px-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            prefetch={true}
          >
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80 relative py-2",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
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
            <BulbThemeToggle />
          </nav>

          <div className="flex md:hidden items-center">
            <BulbThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b" id="mobile-menu">
          <div className="flex justify-center">
            <nav 
              className="w-[40%] min-w-[320px] flex flex-col space-y-4 px-4 py-6"
              role="navigation" 
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 py-2",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                  prefetch={true}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
