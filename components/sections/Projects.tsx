import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[var(--bg)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="space-y-4 mb-16">
            <SectionLabel label="Selected Work" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)] lowercase">
              projects i&apos;ve{" "}
              <span className="italic text-accent">built.</span>
            </h2>
          </div>
        </RevealWrapper>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <RevealWrapper key={project.id} delay={index * 100}>
              <div
                className={`group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0 rounded-xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent-dim)] hover:shadow-md ${
                  index % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Visual Panel */}
                <div
                  className={`relative flex items-center justify-center min-h-[220px] md:min-h-[300px] bg-gradient-to-br ${project.gradient} transition-transform duration-500 ${
                    index % 2 !== 0 ? "md:[direction:ltr]" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-20" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Info Panel */}
                <div
                  className={`flex flex-col justify-center p-7 md:p-9 bg-surface ${
                    index % 2 !== 0 ? "md:[direction:ltr]" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {/* Number + Type */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-accent font-medium">
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
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-[var(--bg-3)] border border-[var(--border)] text-[var(--text-2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-1">
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
                          Source
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
