import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/config";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[var(--bg)] overflow-hidden"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content — Full width, centered */}
      <div className="relative z-10 page-container w-full py-32 lg:py-0">
        <div className="max-w-4xl">
          {/* Name tag */}
          <div className="opacity-0 animate-reveal mb-6">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-3)]">
              {siteConfig.location}
            </span>
          </div>

          {/* Headline — big, editorial */}
          <h1 className="opacity-0 animate-reveal-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[1.05] text-[var(--text)] mb-6">
            I build systems
            <br />
            <span className="italic text-accent">that scale.</span>
          </h1>

          {/* Sub-text */}
          <p className="text-lg md:text-xl text-[var(--text-2)] leading-relaxed max-w-[52ch] font-body font-light opacity-0 animate-reveal-2 mb-10">
            {siteConfig.role} focused on backend architecture, AI integration,
            and automation tools that people rely on.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4 opacity-0 animate-reveal-3 mb-16">
            <Button variant="primary" size="lg" asChild>
              <Link href="#projects">
                View Work
                <ArrowDown className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
