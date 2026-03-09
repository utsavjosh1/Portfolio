import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

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
                I build software and systems{" "}
                <span className="italic text-accent block sm:inline">
                  that people rely on.
                </span>
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="space-y-4 text-[var(--text-2)] font-body font-light leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <strong className="text-[var(--text)] font-medium">
                    {siteConfig.name}
                  </strong>
                  , a full stack engineer with around{" "}
                  <strong className="text-[var(--text)] font-medium">
                    two years of professional experience
                  </strong>
                  . I enjoy working across the stack, though I tend to spend
                  more of my time building and thinking about backend systems.
                </p>

                <p>
                  Over the past few years I&apos;ve worked on a range of
                  projects, from simple websites to full web applications. These
                  include{" "}
                  <strong className="text-[var(--text)] font-medium">
                    booking systems for gaming sessions
                  </strong>
                  ,
                  <strong className="text-[var(--text)] font-medium">
                    {" "}
                    chatbot systems with vector search
                  </strong>
                  , LMS platforms, and tools like{" "}
                  <strong className="text-[var(--text)] font-medium">
                    Postly
                  </strong>
                  , which combines scraping, automation, a Discord bot, and
                  chatbot functionality.
                </p>

                <p>
                  When I&apos;m not coding I&apos;m usually{" "}
                  <strong className="text-[var(--text)] font-medium">
                    exploring music
                  </strong>{" "}
                  or spending time{" "}
                  <strong className="text-[var(--text)] font-medium">
                    learning new technologies
                  </strong>
                  .
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
