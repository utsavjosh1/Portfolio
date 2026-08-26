import Link from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/data/config";

const navLinks = [
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/blog" },
];

export default function Navbar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 bg-transparent"
    >
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center font-mono text-sm tracking-wide text-accent"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center text-[11px] uppercase tracking-[0.15em] text-[var(--text-2)] hover:text-[var(--text)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-full border border-strong bg-surface px-4 py-2 text-xs hover:border-accent hover:text-accent"
          >
            Say hello
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary
            aria-label="Toggle navigation"
            className="flex size-11 cursor-pointer list-none items-center justify-center text-[var(--text-2)] hover:text-[var(--text)] [&::-webkit-details-marker]:hidden"
          >
            <Menu className="size-5 group-open:hidden" aria-hidden="true" />
            <X className="hidden size-5 group-open:block" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-12 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-lg">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm uppercase tracking-[0.12em] text-[var(--text-2)] hover:bg-white/5 hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 flex min-h-11 items-center rounded-lg px-3 text-sm text-accent hover:bg-white/5"
              >
                Say hello
              </Link>
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}
