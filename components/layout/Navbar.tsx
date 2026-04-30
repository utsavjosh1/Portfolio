"use client";

import Link from "next/link";
import { useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/config";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const isScrolled = useScrolled();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(9,9,11,0.95)] backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="page-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-accent tracking-wide group"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[11px] uppercase tracking-[0.15em] text-[var(--text-2)] hover:text-[var(--text)] transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Button variant="outline" size="sm" asChild>
            <Link href={`mailto:${siteConfig.email}`}>Say hello</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-2)] hover:text-[var(--text)]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-[var(--bg-2)] border-b border-[var(--border)] animate-fade-up">
          <div className="page-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-[var(--text-2)] hover:text-[var(--text)] transition-colors py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              asChild
              className="self-start mt-2"
            >
              <Link href={`mailto:${siteConfig.email}`}>Say hello</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
