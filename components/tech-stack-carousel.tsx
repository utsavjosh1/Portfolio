"use client";

import { useState } from "react";
import {
  Rocket,
  Database,
  Cloud,
  BrainCircuit,
  SlidersHorizontal,
  Zap,
  Globe,
  Code,
  Cpu,
  Terminal,
  Server,
  Layout,
} from "lucide-react";

// Icon mapping for different technology categories
const iconMap = {
  Language: <Code className="h-4 w-4" />,
  Framework: <Layout className="h-4 w-4" />,
  Runtime: <Cpu className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Cache: <Zap className="h-4 w-4" />,
  Backend: <Server className="h-4 w-4" />,
  Protocol: <Globe className="h-4 w-4" />,
  Cloud: <Cloud className="h-4 w-4" />,
  DevOps: <Terminal className="h-4 w-4" />,
  Platform: <Cloud className="h-4 w-4" />,
  AI: <BrainCircuit className="h-4 w-4" />,
  "Vector DB": <BrainCircuit className="h-4 w-4" />,
  Tool: <SlidersHorizontal className="h-4 w-4" />,
  default: <Code className="h-4 w-4" />,
};

// Color mapping for different categories - adjusted for deep dark mode
const colorMap = {
  Language: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Framework: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Runtime: "bg-green-500/10 text-green-400 border-green-500/20",
  Database: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Cache: "bg-red-500/10 text-red-400 border-red-500/20",
  Backend: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Protocol: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Cloud: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  DevOps: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Platform: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  AI: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Vector DB": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Tool: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  default: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

interface Technology {
  id: string;
  name: string;
  category: string;
  color?: string;
  icon?: string;
}

// Static data based on user profile
const technologies: Technology[] = [
  // Languages
  { id: "1", name: "Go", category: "Language" },
  { id: "2", name: "TypeScript", category: "Language" },
  { id: "3", name: "Python", category: "Language" },
  { id: "4", name: "SQL", category: "Language" },

  // Frameworks & Runtimes
  { id: "5", name: "Next.js", category: "Framework" },
  { id: "6", name: "React", category: "Framework" },
  { id: "7", name: "Tailwind CSS", category: "Framework" },
  { id: "8", name: "Gin", category: "Backend" },
  { id: "9", name: "Echo", category: "Backend" },

  // Database & Infra
  { id: "10", name: "PostgreSQL", category: "Database" },
  { id: "11", name: "Redis", category: "Cache" },
  { id: "12", name: "Docker", category: "DevOps" },
  { id: "13", name: "Kubernetes", category: "DevOps" },
  { id: "14", name: "AWS", category: "Cloud" },

  // Tools & AI
  { id: "15", name: "Linux", category: "Tool" },
  { id: "16", name: "Git", category: "Tool" },
  { id: "17", name: "Vercel", category: "Platform" },
  { id: "18", name: "OpenAI API", category: "AI" },
  { id: "19", name: "ChromaDB", category: "Vector DB" },
];

interface CarouselRowProps {
  items: Technology[];
  direction: "left" | "right";
  speed: number;
}

function CarouselRow({ items, direction, speed }: CarouselRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  // Get animation class based on direction and speed
  const getAnimationClass = (dir: "left" | "right", spd: number) => {
    const animations = {
      left: {
        1: "animate-scroll-left-1",
        2: "animate-scroll-left-2",
        3: "animate-scroll-left-3",
      },
      right: {
        1: "animate-scroll-right-1",
        2: "animate-scroll-right-2",
        3: "animate-scroll-right-3",
      },
    };
    return (
      animations[dir][spd as keyof typeof animations.left] || animations[dir][1]
    );
  };

  const animationClass = getAnimationClass(direction, speed);

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-4 ${animationClass}`}
        style={{
          width: "max-content",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedItems.map((tech, itemIndex) => {
          const categoryKey = tech.category || "default";
          const icon =
            iconMap[categoryKey as keyof typeof iconMap] || iconMap.default;
          const colorClass =
            colorMap[categoryKey as keyof typeof colorMap] || colorMap.default;

          return (
            <div
              key={`${tech.id}-${itemIndex}`}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border backdrop-blur-sm hover:scale-105 hover:shadow-glow ${colorClass}`}
            >
              <span className="opacity-80">{icon}</span>
              <span className="whitespace-nowrap">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechStackCarousel() {
  // Organize technologies into rows based on category/logic to balance them
  const rows = [
    technologies.slice(0, 7), // Languages & Core Frameworks
    technologies.slice(7, 13), // Backend, DB, DevOps
    technologies.slice(13), // Cloud, Tools, AI
  ];

  return (
    <div className="relative space-y-6 py-10 w-full overflow-hidden">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Dynamic rows */}
      {rows.map((row, index) => (
        <CarouselRow
          key={index}
          items={row}
          direction={index % 2 === 0 ? "left" : "right"}
          speed={index + 1}
        />
      ))}
    </div>
  );
}
