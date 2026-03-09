import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalMockup } from "@/components/ui/TerminalMockup";
import { siteConfig } from "@/data/config";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[var(--bg)] overflow-hidden"
    >
      {/* Ambient Effects */}
      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow orb */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--accent-glow)] blur-[160px] animate-orb-float z-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 page-container w-full py-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="opacity-0 animate-fade-up">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                {siteConfig.name} —{" "}
                {siteConfig.available ? "Available for work" : "Currently busy"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="opacity-0 animate-fade-up-1 text-4xl sm:text-5xl md:text-6xl font-display leading-[1.1] text-[var(--text)]">
              Building things{" "}
              <span className="italic text-accent block sm:inline">
                that matter.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-[var(--text-2)] leading-relaxed max-w-[52ch] font-body font-light opacity-0 animate-fade-up-2">
              {siteConfig.bio}
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-4 opacity-0 animate-fade-up-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="#contact">Let&apos;s Talk</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-[var(--border)] opacity-0 animate-fade-up-7">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-2xl font-display text-[var(--text)]">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-3)]">
                    {stat.label}
                  </span>
                </div>
              ))}
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
