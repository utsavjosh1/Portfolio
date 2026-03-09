import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[var(--bg-2)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="space-y-4 mb-16">
            <SectionLabel label="Selected Work" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)]">
              Projects I&apos;ve built
            </h2>
          </div>
        </RevealWrapper>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <RevealWrapper key={project.id} delay={index * 100}>
              <div
                className={`group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0 rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent-dim)] hover:shadow-lg ${
                  index % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Visual Panel */}
                <div
                  className={`relative flex items-center justify-center min-h-[240px] md:min-h-[320px] bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-[1.02] ${
                    index % 2 !== 0 ? "md:[direction:ltr]" : ""
                  }`}
                >
                  {/* <span className="text-6xl md:text-7xl transition-transform duration-500 group-hover:scale-110">
                    {project.emoji}
                  </span> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-30" />
                </div>

                {/* Info Panel */}
                <div
                  className={`flex flex-col justify-center p-8 md:p-10 bg-surface ${
                    index % 2 !== 0 ? "md:[direction:ltr]" : ""
                  }`}
                >
                  <div className="space-y-5">
                    {/* Number + Type */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[var(--text-3)]">
                        {project.id}
                      </span>
                      <span className="h-px flex-1 bg-[var(--border)]" />
                      <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider">
                        {project.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-display text-[var(--text)]">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-2)] font-body font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[11px] font-mono rounded-full bg-[var(--bg-3)] border border-[var(--border)] text-[var(--text-2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-2">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-accent hover:underline transition-colors"
                        >
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
