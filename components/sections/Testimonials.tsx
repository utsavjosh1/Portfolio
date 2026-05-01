import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[var(--bg-2)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="space-y-4 mb-16">
            <SectionLabel label="Testimonials" />
            <h2 className="text-3xl md:text-4xl font-display text-[var(--text)]">
              What people{" "}
              <span className="italic text-accent">say.</span>
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <RevealWrapper key={testimonial.name} delay={index * 100}>
              <div className="group relative bg-surface border border-[var(--border)] rounded-2xl p-7 transition-all duration-300 hover:border-[var(--accent-dim)] hover:shadow-sm h-full flex flex-col">
                {/* Accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote mark */}
                <span className="block font-display text-4xl text-accent/20 leading-none mb-4 select-none">
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="text-[var(--text-2)] font-body font-light leading-relaxed text-[15px] flex-1">
                  {testimonial.quote}
                </p>

                {/* Attribution */}
                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <p className="text-sm font-body font-medium text-[var(--text)]">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] font-mono text-[var(--text-3)] mt-0.5">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
