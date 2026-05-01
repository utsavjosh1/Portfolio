import { Github, Linkedin, Mail } from "lucide-react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

const socialLinks = [
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedinUrl,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: siteConfig.githubUrl,
    icon: Github,
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-[var(--bg)] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent-glow)] blur-[200px] opacity-15 pointer-events-none" />

      <div className="relative z-10 page-container max-w-2xl mx-auto text-center">
        <RevealWrapper>
          <SectionLabel label="Contact" align="center" />
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <h2 className="text-3xl md:text-5xl font-display text-[var(--text)] mt-6 mb-4 lowercase">
            let&apos;s build something{" "}
            <span className="italic text-accent">together.</span>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200}>
          <p className="text-[var(--text-2)] font-body font-light mb-10 max-w-[50ch] mx-auto">
            Have a project in mind or just want to chat? I&apos;m always open to
            interesting conversations and new challenges.
          </p>
        </RevealWrapper>

        {/* Social Link Pills */}
        <RevealWrapper delay={300}>
          <div className="flex flex-wrap justify-center gap-3">
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
      </div>
    </section>
  );
}
