/** @jsxImportSource react */
"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg)] overflow-hidden"
    >
      {/* Premium Ambient Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[var(--accent-glow)] blur-[120px] opacity-40 animate-orb-float" />
        <div 
          className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[rgba(163,58,255,0.06)] blur-[150px] opacity-60 animate-orb-float" 
          style={{ animationDelay: "-3s" }}
        />
        <div 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-[rgba(0,229,255,0.04)] blur-[100px] opacity-30 animate-orb-float"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      {/* CSS/SVG Starry Constellation Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* SVG Stars */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Static tiny stars */}
          <circle cx="12%" cy="15%" r="0.8" fill="#fff" opacity="0.6" />
          <circle cx="45%" cy="8%" r="1" fill="#fff" opacity="0.4" />
          <circle cx="78%" cy="25%" r="0.6" fill="#fff" opacity="0.8" />
          <circle cx="88%" cy="12%" r="1.2" fill="#fff" opacity="0.5" />
          <circle cx="25%" cy="45%" r="0.7" fill="#fff" opacity="0.7" />
          <circle cx="65%" cy="50%" r="0.9" fill="#fff" opacity="0.5" />
          <circle cx="15%" cy="75%" r="1.1" fill="#fff" opacity="0.4" />
          <circle cx="82%" cy="70%" r="0.8" fill="#fff" opacity="0.6" />
          <circle cx="50%" cy="85%" r="0.7" fill="#fff" opacity="0.8" />
          <circle cx="38%" cy="60%" r="1" fill="#fff" opacity="0.3" />

          {/* Pulsing/twinkling stars */}
          <circle cx="30%" cy="20%" r="1.5" fill="var(--accent)" className="animate-pulse-dot" style={{ animationDuration: "3s" } as any} />
          <circle cx="70%" cy="15%" r="1.2" fill="#fff" className="animate-pulse-dot" style={{ animationDuration: "4s" } as any} />
          <circle cx="85%" cy="55%" r="1.8" fill="var(--accent)" className="animate-pulse-dot" style={{ animationDuration: "5s" } as any} />
          <circle cx="20%" cy="65%" r="1" fill="#fff" className="animate-pulse-dot" style={{ animationDuration: "3.5s" } as any} />
          <circle cx="55%" cy="75%" r="1.4" fill="#fff" className="animate-pulse-dot" style={{ animationDuration: "4.5s" } as any} />
        </svg>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 text-center space-y-12 pointer-events-none select-none">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.9] text-[var(--text)] tracking-tighter lowercase">
            i build software{" "}
            <span className="text-accent italic whitespace-nowrap">
              for the web.
            </span>
          </h1>
          <p className="text-base md:text-xl text-[var(--text-2)] font-body font-light tracking-tight lowercase">
            mostly backends. always javascript.
          </p>
        </div>
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--text) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </section>
  );
}
