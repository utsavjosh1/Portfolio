import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalMockup } from "@/components/ui/TerminalMockup";
import { siteConfig } from "@/data/config";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[var(--bg)] overflow-hidden"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow orb */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--accent-glow)] blur-[180px] animate-orb-float z-0 opacity-30" />

      {/* Content */}
      <div className="relative z-10 page-container w-full py-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Name tag */}
            <div className="opacity-0 animate-reveal">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-3)]">
                {siteConfig.name}
              </span>
            </div>

            {/* Headline */}
            <h1 className="opacity-0 animate-reveal-1 text-4xl sm:text-5xl md:text-6xl font-display leading-[1.08] text-[var(--text)]">
              I build systems{" "}
              <span className="italic text-accent block sm:inline">
                that scale.
              </span>
            </h1>

            {/* Sub-text */}
            <p className="text-base md:text-lg text-[var(--text-2)] leading-relaxed max-w-[48ch] font-body font-light opacity-0 animate-reveal-2">
              {siteConfig.role} focused on backend systems, AI integration, and
              automation. {siteConfig.location}.
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-4 opacity-0 animate-reveal-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="#projects">
                  View Work
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>

            {/* Subtle stats line */}
            <div className="opacity-0 animate-reveal-5">
              <div className="flex items-center gap-2 text-[var(--text-3)] font-mono text-[11px] tracking-wider">
                {siteConfig.stats.map((stat, i) => (
                  <span key={stat.label} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[var(--border-2)]">·</span>}
                    <span className="text-[var(--text-2)]">
                      {stat.value}
                    </span>{" "}
                    {stat.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Terminal */}
          <div className="hidden lg:block">
            <TerminalMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
