"use client";

import { useRef, useState, useEffect } from "react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section id="experience" className="py-24 bg-[var(--bg)]" ref={containerRef}>
      <div className="page-container">
        <RevealWrapper>
          <div className="space-y-4 mb-20">
            <SectionLabel label="Experience" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)] lowercase">
              the timeline.
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">
          {/* Sticky Timeline Sidebar */}
          <div className="hidden lg:block sticky top-32">
            <div className="relative pl-8 border-l border-[var(--border)] space-y-12">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className="relative flex flex-col items-start text-left group"
                >
                  {/* Dot */}
                  <div 
                    className={`absolute left-[-33px] top-1.5 w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                      activeIndex === index 
                        ? "bg-accent border-accent scale-150" 
                        : "bg-[var(--bg)] border-[var(--border)] group-hover:border-[var(--text-3)]"
                    }`} 
                  />
                  
                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeIndex === index ? "text-accent" : "text-[var(--text-3)]"
                  }`}>
                    {exp.period}
                  </span>
                  <span className={`text-xs font-medium transition-colors duration-300 mt-1 ${
                    activeIndex === index ? "text-[var(--text)]" : "text-[var(--text-3)]"
                  }`}>
                    {exp.company}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Experience List */}
          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={`transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="max-w-3xl">
                  {/* Header */}
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl md:text-3xl font-display text-[var(--text)] lowercase">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-accent uppercase tracking-widest font-medium">
                        {exp.company}
                      </span>
                      <span className="h-px w-8 bg-[var(--border)]" />
                      <span className="lg:hidden font-mono text-[10px] text-[var(--text-3)] uppercase">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-8">
                    <p className="text-base md:text-lg text-[var(--text-2)] font-body font-light leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-4">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 text-sm text-[var(--text-2)] font-body font-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
