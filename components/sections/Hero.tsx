"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const handleCtaHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setCtaOffset({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg)] overflow-hidden cursor-none"
    >
      {/* Design Element: The Core */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-20 border border-accent/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Premium Spotlight */}
      <div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-30 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 0.2 : 0,
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 text-center space-y-12">
        {/* Human Narrative */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.9] text-[var(--text)] tracking-tighter lowercase">
            i build software <span className="text-accent italic whitespace-nowrap">for the web.</span>
          </h1>
          <p className="text-base md:text-xl text-[var(--text-2)] font-body font-light tracking-tight lowercase">
            mostly backends. always javascript.
          </p>
        </div>

        {/* Magnetic High-End CTA */}
        <div className="flex justify-center">
          <div
            onMouseMove={handleCtaHover}
            onMouseLeave={() => setCtaOffset({ x: 0, y: 0 })}
            style={{
              transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`,
              transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <Link
              href="#projects"
              className="relative group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-[var(--border)] hover:border-accent transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="relative flex flex-col items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-[var(--text-2)] group-hover:text-[var(--bg)] transition-colors duration-500">
                <span>explore</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Texture */}
      <div 
        className="absolute inset-0 z-[-1] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--text) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </section>
  );
}
