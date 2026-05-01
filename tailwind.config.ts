import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        "accent-glow": "var(--accent-glow)",
        "text-1": "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        red: "var(--red)",
        amber: "var(--amber)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
        strong: "var(--border-2)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--glow)",
      },
      animation: {
        "reveal": "reveal 0.7s var(--ease) forwards",
        "reveal-1": "reveal 0.7s var(--ease) 0.1s forwards",
        "reveal-2": "reveal 0.7s var(--ease) 0.2s forwards",
        "reveal-3": "reveal 0.7s var(--ease) 0.3s forwards",
        "reveal-4": "reveal 0.7s var(--ease) 0.4s forwards",
        "reveal-5": "reveal 0.7s var(--ease) 0.5s forwards",
        "reveal-6": "reveal 0.7s var(--ease) 0.6s forwards",
        "reveal-7": "reveal 0.7s var(--ease) 0.8s forwards",
        "fade-up": "fade-up 0.8s var(--ease) forwards",
        "fade-up-1": "fade-up 0.8s var(--ease) 0.1s forwards",
        "fade-up-2": "fade-up 0.8s var(--ease) 0.2s forwards",
        "fade-up-3": "fade-up 0.8s var(--ease) 0.3s forwards",
        "fade-left": "fade-left 1s var(--ease) forwards",
        "fade-left-1": "fade-left 1s var(--ease) 0.3s forwards",
        "orb-float": "orb-float 8s ease-in-out infinite alternate",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        blink: "blink-cursor 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
