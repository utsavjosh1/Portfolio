"use client";

import React, { useState, useEffect, useRef } from "react";
import { Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FontPreset = "default" | "inter" | "serif" | "mono";
type ColorPreset = "lime" | "rose" | "teal" | "indigo" | "amber" | "violet";

interface ColorOption {
  id: ColorPreset;
  label: string;
  colorClass: string;
  accent: string;
  accentDim: string;
  accentGlow: string;
}

const colorOptions: ColorOption[] = [
  {
    id: "lime",
    label: "Lime",
    colorClass: "bg-[#c8ff00]",
    accent: "#c8ff00",
    accentDim: "rgba(200, 255, 0, 0.08)",
    accentGlow: "rgba(200, 255, 0, 0.15)",
  },
  {
    id: "rose",
    label: "Rose",
    colorClass: "bg-[#ff4d6d]",
    accent: "#ff4d6d",
    accentDim: "rgba(255, 77, 109, 0.08)",
    accentGlow: "rgba(255, 77, 109, 0.15)",
  },
  {
    id: "teal",
    label: "Teal",
    colorClass: "bg-[#00f5d4]",
    accent: "#00f5d4",
    accentDim: "rgba(0, 245, 212, 0.08)",
    accentGlow: "rgba(0, 245, 212, 0.15)",
  },
  {
    id: "indigo",
    label: "Indigo",
    colorClass: "bg-[#4361ee]",
    accent: "#4361ee",
    accentDim: "rgba(67, 97, 238, 0.08)",
    accentGlow: "rgba(67, 97, 238, 0.15)",
  },
  {
    id: "amber",
    label: "Amber",
    colorClass: "bg-[#ffb703]",
    accent: "#ffb703",
    accentDim: "rgba(255, 183, 3, 0.08)",
    accentGlow: "rgba(255, 183, 3, 0.15)",
  },
  {
    id: "violet",
    label: "Violet",
    colorClass: "bg-[#7209b7]",
    accent: "#7209b7",
    accentDim: "rgba(114, 9, 183, 0.08)",
    accentGlow: "rgba(114, 9, 183, 0.15)",
  },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFont, setActiveFont] = useState<FontPreset>("default");
  const [activeColor, setActiveColor] = useState<ColorPreset>("lime");
  const panelRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.font) setActiveFont(parsed.font);
        if (parsed.color) setActiveColor(parsed.color);
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
  }, []);

  // Apply customizations dynamically
  useEffect(() => {
    const html = document.documentElement;

    // Apply color values
    const selectedColor = colorOptions.find((c) => c.id === activeColor) || colorOptions[0];
    html.style.setProperty("--accent", selectedColor.accent);
    html.style.setProperty("--accent-dim", selectedColor.accentDim);
    html.style.setProperty("--accent-glow", selectedColor.accentGlow);

    // Apply font values
    if (activeFont === "default") {
      html.style.setProperty("--font-display", "var(--font-val-display)");
      html.style.setProperty("--font-body", "var(--font-val-body)");
    } else if (activeFont === "inter") {
      html.style.setProperty("--font-display", "var(--font-val-body)");
      html.style.setProperty("--font-body", "var(--font-val-body)");
    } else if (activeFont === "serif") {
      html.style.setProperty("--font-display", "var(--font-val-display)");
      html.style.setProperty("--font-body", "var(--font-val-display)");
    } else if (activeFont === "mono") {
      html.style.setProperty("--font-display", "var(--font-val-mono)");
      html.style.setProperty("--font-body", "var(--font-val-mono)");
    }

    // Save to localStorage
    try {
      localStorage.setItem(
        "portfolio-settings",
        JSON.stringify({ font: activeFont, color: activeColor })
      );
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  }, [activeFont, activeColor]);

  // Close customizer if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed top-5 right-5 z-50 pointer-events-auto" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize theme"
        className={cn(
          "flex aspect-square size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-[var(--text-2)] transition-all duration-300 shadow-sm",
          isOpen ? "text-accent border-accent/40 bg-white/10" : "hover:text-accent hover:border-accent/30 hover:bg-white/10"
        )}
      >
        {isOpen ? <X size={18} /> : <Settings size={18} className="animate-spin" style={{ animationDuration: "12s" }} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-64 p-5 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-lg space-y-5 animate-reveal-1">
          {/* Font Presets */}
          <div className="space-y-2">
            <span className="block text-[8px] font-mono uppercase tracking-[0.2em] text-[var(--text-3)] font-medium">
              Typography
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(["default", "inter", "serif", "mono"] as FontPreset[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFont(f)}
                  className={cn(
                    "px-2 py-1.5 text-[9px] font-mono border rounded capitalize transition-all duration-200",
                    activeFont === f
                      ? "border-accent text-accent bg-accent/5 font-semibold"
                      : "border-white/5 text-[var(--text-2)] hover:border-white/20 hover:text-[var(--text)] bg-white/5"
                  )}
                >
                  {f === "default" ? "Mix (Default)" : f}
                </button>
              ))}
            </div>
          </div>

          {/* Color Accent Presets */}
          <div className="space-y-2.5">
            <span className="block text-[8px] font-mono uppercase tracking-[0.2em] text-[var(--text-3)] font-medium">
              Accent Color
            </span>
            <div className="flex gap-2.5 flex-wrap items-center">
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveColor(c.id)}
                  title={c.label}
                  aria-label={`Select ${c.label} accent color`}
                  className={cn(
                    "size-5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
                    c.colorClass,
                    activeColor === c.id
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                      : "opacity-80 hover:opacity-100"
                  )}
                >
                  {activeColor === c.id && (
                    <div className="size-1.5 rounded-full bg-black animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
