"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Download, Check } from "lucide-react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

const socialLinks = [
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
  {
    label: "LinkedIn",
    href: siteConfig.linkedinUrl,
    icon: Linkedin,
    external: true,
  },
  { label: "GitHub", href: siteConfig.githubUrl, icon: Github, external: true },
  { label: "Download CV", href: siteConfig.cvUrl, icon: Download },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-[var(--bg-2)] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent-glow)] blur-[200px] opacity-20 pointer-events-none" />

      <div className="relative z-10 page-container max-w-2xl mx-auto text-center">
        <RevealWrapper>
          <SectionLabel label="Get In Touch" align="center" />
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <h2 className="text-3xl md:text-5xl font-display text-[var(--text)] mt-6 mb-4">
            Let&apos;s build something{" "}
            <span className="italic text-accent">remarkable</span>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200}>
          <p className="text-[var(--text-2)] font-body font-light mb-10 max-w-[50ch] mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of something special.
          </p>
        </RevealWrapper>

        {/* Social Link Pills */}
        <RevealWrapper delay={300}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-[var(--border)] rounded-full text-sm text-[var(--text-2)] font-body transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-1 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </RevealWrapper>

        {/* Email Display */}
        <RevealWrapper delay={400}>
          <div className="space-y-2">
            <button
              onClick={handleCopyEmail}
              className="text-2xl md:text-3xl font-display text-[var(--text)] hover:text-accent transition-colors cursor-pointer"
            >
              {copied ? (
                <span className="flex items-center gap-2 justify-center text-accent">
                  <Check className="h-6 w-6" />
                  Copied to clipboard!
                </span>
              ) : (
                siteConfig.email
              )}
            </button>
            <p className="font-mono text-[11px] text-[var(--text-3)]">
              ↑ Click to copy
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
