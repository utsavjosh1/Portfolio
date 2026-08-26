import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/data/config";

const socialLinks = [
  { name: "GitHub", href: siteConfig.githubUrl, icon: Github, external: true },
  {
    name: "LinkedIn",
    href: siteConfig.linkedinUrl,
    icon: Linkedin,
    external: true,
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--text-2)]">
            © {siteConfig.name}
          </span>
          <span
            className="hidden h-4 w-px bg-[var(--border)] md:block"
            aria-hidden="true"
          />
          <div className="flex gap-1">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="flex size-11 items-center justify-center text-[var(--text-2)] hover:text-accent"
                  aria-label={social.name}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        <a
          href="#main-content"
          className="flex min-h-11 items-center gap-2 font-mono text-xs text-[var(--text-2)] hover:text-accent"
        >
          <ArrowUp className="size-3" aria-hidden="true" />
          Back to top
        </a>
      </div>
    </footer>
  );
}
