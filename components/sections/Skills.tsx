import {
  Code,
  Layout,
  Server,
  Database,
  Cloud,
  BrainCircuit,
} from "lucide-react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-5 w-5" />,
  Layout: <Layout className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Cloud: <Cloud className="h-5 w-5" />,
  BrainCircuit: <BrainCircuit className="h-5 w-5" />,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[var(--bg)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="text-center space-y-4 mb-16">
            <SectionLabel label="Skills" align="center" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)]">
              Technical Arsenal
            </h2>
            <p className="text-[var(--text-2)] font-body font-light max-w-[40ch] mx-auto">
              The tools and technologies I use to build world-class software.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <RevealWrapper key={category.title} delay={index * 100}>
              <div className="group relative bg-surface border border-[var(--border)] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--accent-dim)] overflow-hidden">
                {/* Top highlight line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--accent-dim)] text-accent">
                    {iconMap[category.icon] || <Code className="h-5 w-5" />}
                  </div>
                  <h3 className="font-body font-medium text-[var(--text)]">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono rounded-full bg-[var(--bg-3)] border border-[var(--border)] text-[var(--text-2)] transition-all duration-200 hover:border-accent hover:text-accent hover:bg-[var(--accent-dim)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
