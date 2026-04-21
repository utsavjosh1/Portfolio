"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/config";

const socialLinks = [
  { name: "GitHub", href: siteConfig.githubUrl, icon: Github },
  { name: "LinkedIn", href: siteConfig.linkedinUrl, icon: Linkedin },
  { name: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="page-container py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[var(--text-3)]">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span className="hidden md:block h-4 w-px bg-[var(--border)]" />
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-3)] hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[var(--text-3)] hover:text-accent transition-colors font-mono cursor-pointer"
          >
            <ArrowUp className="h-3 w-3" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
