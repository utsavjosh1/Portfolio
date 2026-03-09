import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

const values = [
  {
    emoji: "⚡",
    title: "Performance First",
    description:
      "Every millisecond counts. I build systems optimized for speed and efficiency.",
  },
  {
    emoji: "🧩",
    title: "Clean Architecture",
    description:
      "Modular, maintainable code that scales with your team and product.",
  },
  {
    emoji: "🤖",
    title: "AI-Driven",
    description:
      "Leveraging machine learning and LLMs to build intelligent, adaptive systems.",
  },
  {
    emoji: "🔒",
    title: "Reliability",
    description:
      "Battle-tested solutions with monitoring, alerting, and graceful error handling.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-2)]">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          {/* Image Column */}
          <RevealWrapper>
            <div className="relative aspect-[4/5] rounded-3xl bg-surface overflow-hidden border border-[var(--border)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl">👨‍💻</span>
              </div>
              {/* Accent gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--accent-dim)] to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 bg-accent text-[var(--bg)] font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                {siteConfig.available
                  ? "Open to opportunities"
                  : "Currently busy"}
              </div>
            </div>
          </RevealWrapper>

          {/* Content Column */}
          <div className="space-y-8">
            <RevealWrapper>
              <SectionLabel label="About Me" />
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h2 className="text-3xl md:text-4xl font-display leading-tight text-[var(--text)]">
                Crafting digital experiences with{" "}
                <span className="italic text-accent">precision</span>
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="space-y-4 text-[var(--text-2)] font-body font-light leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <strong className="text-[var(--text)] font-medium">
                    {siteConfig.name}
                  </strong>
                  , a software engineer who thrives at the intersection of
                  performance engineering and intelligent systems.
                </p>
                <p>
                  My work spans from building{" "}
                  <strong className="text-[var(--text)] font-medium">
                    real-time monitoring tools
                  </strong>{" "}
                  in Go to architecting{" "}
                  <strong className="text-[var(--text)] font-medium">
                    full-stack web platforms
                  </strong>{" "}
                  with Next.js and TypeScript. I believe in writing code that is
                  not only functional but elegant.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m exploring open-source
                  projects, experimenting with AI models, or optimizing systems
                  to squeeze out every last bit of performance.
                </p>
              </div>
            </RevealWrapper>

            {/* Values Grid */}
            {/* <RevealWrapper delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="group bg-surface border border-[var(--border)] rounded-xl p-5 transition-all duration-300 hover:border-[var(--border-2)] hover:-translate-y-1"
                  >
                    <span className="text-2xl mb-3 block">{value.emoji}</span>
                    <h3 className="font-body font-medium text-sm text-[var(--text)] mb-1">
                      {value.title}
                    </h3>
                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </RevealWrapper> */}
          </div>
        </div>
      </div>
    </section>
  );
}
