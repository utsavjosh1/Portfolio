import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/config";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-2)]">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Visual Column — Compact initials element */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <RevealWrapper>
              <div className="relative aspect-square rounded-2xl bg-surface overflow-hidden border border-[var(--border)]">
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
          </div>

          {/* Content Column — min-w-0 prevents content-driven overflow */}
          <div className="flex-1 min-w-0 space-y-8">
            <RevealWrapper>
              <SectionLabel label="About" />
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h2 className="text-3xl md:text-4xl font-display leading-tight text-[var(--text)] lowercase">
                i build software that{" "}
                <span className="italic text-accent">people rely on.</span>
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="space-y-5 text-[var(--text-2)] font-body font-light leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <strong className="text-[var(--text)] font-medium">
                    {siteConfig.name}
                  </strong>
                  , a software engineer who thrives at the intersection of
                  architecture and automation. While I build across the full
                  stack, my mind lives in the backend—designing systems that
                  handle complexity with elegance.
                </p>

                <p>
                  Over the last two years, I&apos;ve focused on engineering
                  high-impact solutions: from architecting{" "}
                  <strong className="text-[var(--text)] font-medium">
                    financial engines
                  </strong>{" "}
                  that process millions of records for tax compliance, to
                  building Go-based{" "}
                  <strong className="text-[var(--text)] font-medium">
                    microservices
                  </strong>{" "}
                  for global LMS platforms. I also enjoy bridging the gap
                  between data and intelligence, having developed platforms
                  leveraging{" "}
                  <strong className="text-[var(--text)] font-medium">
                    vector search and RAG
                  </strong>
                  .
                </p>

                <p>
                  My work is defined by a focus on reliability, scale, and the
                  invisible infrastructure that makes modern software feel
                  seamless. When I&apos;m not orchestrating data flows, I&apos;m
                  usually exploring the nuances of music or deep-diving into the
                  next technical frontier.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
