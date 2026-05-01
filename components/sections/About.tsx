import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-2)]">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
          {/* Visual Column — Compact initials element */}
          <RevealWrapper>
            <div className="relative aspect-square max-w-[280px] rounded-2xl bg-surface overflow-hidden border border-[var(--border)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[80px] font-display font-normal leading-none bg-gradient-to-br from-[var(--text)] to-[var(--text-3)] bg-clip-text text-transparent select-none">
                  UJ
                </span>
              </div>
              {/* Accent gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--accent-dim)] to-transparent" />
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </RevealWrapper>

          {/* Content Column */}
          <div className="space-y-8">
            <RevealWrapper>
              <SectionLabel label="About" />
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h2 className="text-3xl md:text-4xl font-display leading-tight text-[var(--text)] lowercase">
                i build software that{" "}
                <span className="italic text-accent">
                  people rely on.
                </span>
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="space-y-5 text-[var(--text-2)] font-body font-light leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <strong className="text-[var(--text)] font-medium">
                    {siteConfig.name}
                  </strong>
                  , a full-stack engineer with around two years of professional
                  experience. I lean backend — that&apos;s where I spend most of
                  my thinking.
                </p>

                <p>
                  I&apos;ve built job platforms with{" "}
                  <strong className="text-[var(--text)] font-medium">
                    vector search and AI pipelines
                  </strong>
                  , booking systems, chatbot systems, and LMS tools. My work
                  tends to involve scraping, automation, and making complex
                  things work reliably at scale.
                </p>

                <p>
                  When I&apos;m not coding, I&apos;m usually exploring music or
                  digging into something new.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
