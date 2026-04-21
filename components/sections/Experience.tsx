"use client";

import { useState } from "react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-24 bg-[var(--bg)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="space-y-4 mb-16">
            <SectionLabel label="Experience" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)]">
              Where I&apos;ve worked
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-200 cursor-pointer ${
                    activeIndex === index
                      ? "border-accent bg-[var(--accent-dim)] text-[var(--text)]"
                      : "border-[var(--border)] text-[var(--text-3)] hover:border-[var(--border-2)] hover:text-[var(--text-2)]"
                  }`}
                >
                  <span className="block text-sm font-body font-medium">
                    {exp.company}
                  </span>
                  <span className="block text-xs font-mono text-[var(--text-3)] mt-0.5">
                    {exp.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Entries */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <RevealWrapper key={index} delay={index * 100}>
                <div
                  className={`bg-surface border border-[var(--border)] rounded-2xl p-7 md:p-9 transition-all duration-300 ${
                    activeIndex === index
                      ? "lg:border-[var(--accent-dim)] lg:shadow-sm"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-display text-[var(--text)]">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-sm text-accent">
                        {exp.company}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--text-3)] bg-[var(--bg-3)] px-3 py-1 rounded-full border border-[var(--border)]">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-2)] font-body font-light leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--text-2)] font-body font-light"
                      >
                        <span className="text-accent mt-0.5 shrink-0">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
