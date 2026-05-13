"use client";

import React from "react";
import { useSpaceStore } from "../../hooks/useSpaceStore";

export default function HUD({ active }: { active: boolean }) {
  const { hudMessage, focusedPlanet } = useSpaceStore();

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-8 flex flex-col justify-between">
      {/* Top HUD: Current Focus */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80">
              Navigation Status
            </span>
          </div>
          <h2 className="text-xl font-display text-white lowercase tracking-tight">
            {hudMessage}
          </h2>
        </div>

        {focusedPlanet && (
          <div className="text-right space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80">
              Current Target
            </span>
            <div className="text-2xl font-display text-white lowercase">
              {focusedPlanet.name}
            </div>
          </div>
        )}
      </div>

      {/* Bottom HUD: Instructions */}
      <div className="flex justify-between items-end">
        <div className="flex gap-8">
          <div className="space-y-1">
            <span className="block text-[8px] font-mono uppercase tracking-widest text-white/30">Movement</span>
            <span className="block text-[10px] font-mono text-white/60">Mouse to Look</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[8px] font-mono uppercase tracking-widest text-white/30">Jump Keys</span>
            <span className="block text-[10px] font-mono text-white/60">1-8 Planets • 0 Overview</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[8px] font-mono uppercase tracking-widest text-white/30">Actions</span>
            <span className="block text-[10px] font-mono text-white/60">Click to Travel • Scroll to Zoom</span>
          </div>
        </div>

        <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/40 animate-progress" />
        </div>
      </div>
    </div>
  );
}
