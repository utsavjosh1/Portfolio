"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

// Icon mapping for different technology categories
const iconMap = {
  Language: <Code className="h-4 w-4" />,
  Framework: <Rocket className="h-4 w-4" />,
  Runtime: <Cpu className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Cache: <Zap className="h-4 w-4" />,
  Backend: <Database className="h-4 w-4" />,
  Protocol: <Globe className="h-4 w-4" />,
  Cloud: <Cloud className="h-4 w-4" />,
  DevOps: <Cloud className="h-4 w-4" />,
  Platform: <Cloud className="h-4 w-4" />,
  AI: <BrainCircuit className="h-4 w-4" />,
  "Vector DB": <BrainCircuit className="h-4 w-4" />,
  Tool: <SlidersHorizontal className="h-4 w-4" />,
  default: <Code className="h-4 w-4" />,
};

// Color mapping for different categories
const colorMap = {
  Language:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Framework:
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
  Runtime:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  Database:
    "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  Cache:
    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  Backend:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Protocol:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  Cloud:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  DevOps:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Platform:
    "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800",
  AI: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  "Vector DB":
    "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  Tool: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  default:
    "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800",
};

interface Technology {
  id: string;
  name: string;
  category: string | null;
  color: string | null;
  icon: string | null;
  order: number;
  active: boolean;
}

interface CarouselRowProps {
  items: Technology[];
  direction: "left" | "right";
  speed: number;
  index: number;
}

function CarouselRow({ items, direction, speed, index }: CarouselRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  const animationClass =
    direction === "left"
      ? `animate-scroll-left-${speed}`
      : `animate-scroll-right-${speed}`;

  return (
    <div
      className="relative overflow-hidden p-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-3 ${animationClass}`}
        style={{
          width: `${duplicatedItems.length * 140}px`,
          animationDelay: `${index * 0.5}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedItems.map((tech, itemIndex) => {
          const categoryKey = tech.category || "default";
          const icon =
            iconMap[categoryKey as keyof typeof iconMap] || iconMap.default;
          const colorClass =
            tech.color ||
            colorMap[categoryKey as keyof typeof colorMap] ||
            colorMap.default;

          return (
            <div
              key={`${tech.id}-${itemIndex}`}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default border backdrop-blur-sm hover:scale-105 hover:shadow-md ${colorClass}`}
              style={{ minWidth: "140px" }}
            >
              <span className="opacity-80">{icon}</span>
              <span className="truncate">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechStackCarousel() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch technologies from database
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch("/api/technologies");
        if (!response.ok) {
          throw new Error("Failed to fetch technologies");
        }
        const data = await response.json();
        setTechnologies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  // Organize technologies into rows based on category
  const organizeIntoRows = (techs: Technology[]) => {
    const categories = {
      languages: ["Language", "Runtime"],
      backend: ["Database", "Cache", "Backend", "Protocol"],
      cloud: ["Cloud", "DevOps", "Platform", "AI", "Vector DB", "Tool"],
    };

    const rows = [
      techs.filter((tech) =>
        categories.languages.includes(tech.category || "")
      ),
      techs.filter((tech) => categories.backend.includes(tech.category || "")),
      techs.filter((tech) => categories.cloud.includes(tech.category || "")),
    ];

    // If any row is empty, distribute remaining technologies
    const remaining = techs.filter(
      (tech) =>
        !categories.languages.includes(tech.category || "") &&
        !categories.backend.includes(tech.category || "") &&
        !categories.cloud.includes(tech.category || "")
    );

    // Distribute remaining technologies to rows that need them
    remaining.forEach((tech, index) => {
      rows[index % 3].push(tech);
    });

    return rows.filter((row) => row.length > 0);
  };

  if (loading) {
    return (
      <div className="relative space-y-4 py-8">
        <div className="text-center text-muted-foreground">
          Loading technologies...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative space-y-4 py-8">
        <div className="text-center text-red-500">
          Error loading technologies: {error}
        </div>
      </div>
    );
  }

  // Filter active technologies and sort by order
  const activeTechnologies = technologies
    .filter((tech) => tech.active)
    .sort((a, b) => a.order - b.order);

  const techRows = organizeIntoRows(activeTechnologies);

  if (techRows.length === 0) {
    return (
      <div className="relative space-y-4 py-8">
        <div className="text-center text-muted-foreground">
          No technologies found
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-4 py-8">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Dynamic rows based on fetched data */}
      {techRows.map((row, index) => (
        <CarouselRow
          key={index}
          items={row}
          direction={index % 2 === 0 ? "left" : "right"}
          speed={index + 1}
          index={index}
        />
      ))}

      {/* Interactive hint */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/60 animate-pulse">
        Hover to pause
      </div>
    </div>
  );
}
