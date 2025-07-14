"use client"

import { useState } from "react"
import { Rocket, Database, Cloud, BrainCircuit, SlidersHorizontal, Zap, Globe, Code, Cpu } from "lucide-react"

// Organize tech items into three rows with different categories
const techRows = [
  // Row 1: Languages & Core Technologies
  [
    { name: "JavaScript", category: "Language", icon: <Code className="h-4 w-4" />, color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800" },
    { name: "TypeScript", category: "Language", icon: <Code className="h-4 w-4" />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
    { name: "Python", category: "Language", icon: <Code className="h-4 w-4" />, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" },
    { name: "React.js", category: "Framework", icon: <Rocket className="h-4 w-4" />, color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800" },
    { name: "Next.js", category: "Framework", icon: <Rocket className="h-4 w-4" />, color: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800" },
    { name: "Node.js", category: "Runtime", icon: <Cpu className="h-4 w-4" />, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" },
    { name: "TailwindCSS", category: "Framework", icon: <Rocket className="h-4 w-4" />, color: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800" },
  ],
  // Row 2: Backend & Databases
  [
    { name: "PostgreSQL", category: "Database", icon: <Database className="h-4 w-4" />, color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" },
    { name: "MongoDB", category: "Database", icon: <Database className="h-4 w-4" />, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" },
    { name: "Redis", category: "Cache", icon: <Zap className="h-4 w-4" />, color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800" },
    { name: "Supabase", category: "Backend", icon: <Database className="h-4 w-4" />, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
    { name: "Express.js", category: "Framework", icon: <Globe className="h-4 w-4" />, color: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800" },
    { name: "REST APIs", category: "Protocol", icon: <Globe className="h-4 w-4" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800" },
    { name: "WebSockets", category: "Protocol", icon: <Zap className="h-4 w-4" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
  ],
  // Row 3: Cloud & AI Technologies
  [
    { name: "AWS", category: "Cloud", icon: <Cloud className="h-4 w-4" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800" },
    { name: "Docker", category: "DevOps", icon: <Cloud className="h-4 w-4" />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
    { name: "Vercel", category: "Platform", icon: <Cloud className="h-4 w-4" />, color: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800" },
    { name: "OpenAI API", category: "AI", icon: <BrainCircuit className="h-4 w-4" />, color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800" },
    { name: "LangChain", category: "AI", icon: <BrainCircuit className="h-4 w-4" />, color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800" },
    { name: "Pinecone", category: "Vector DB", icon: <BrainCircuit className="h-4 w-4" />, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
    { name: "Git", category: "Tool", icon: <SlidersHorizontal className="h-4 w-4" />, color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800" },
  ]
]

interface CarouselRowProps {
  items: typeof techRows[0]
  direction: 'left' | 'right'
  speed: number
  index: number
}

function CarouselRow({ items, direction, speed, index }: CarouselRowProps) {
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate items for seamless infinite scroll - only need 2 copies
  const duplicatedItems = [...items, ...items]
  
  const animationClass = direction === 'left' 
    ? `animate-scroll-left-${speed}` 
    : `animate-scroll-right-${speed}`

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`flex gap-3 ${animationClass}`}
        style={{
          width: `${duplicatedItems.length * 140}px`,
          animationDelay: `${index * 0.5}s`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {duplicatedItems.map((tech, itemIndex) => (
          <div
            key={`${tech.name}-${itemIndex}`}
            className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default border backdrop-blur-sm hover:scale-105 hover:shadow-md ${tech.color}`}
            style={{ minWidth: "140px" }}
          >
            <span className="opacity-80">{tech.icon}</span>
            <span className="truncate">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechStackCarousel() {
  return (
    <div className="relative space-y-4 py-8">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Row 1: Left to Right (Slow) */}
      <CarouselRow 
        items={techRows[0]} 
        direction="left" 
        speed={1} 
        index={0}
      />
      
      {/* Row 2: Right to Left (Medium) */}
      <CarouselRow 
        items={techRows[1]} 
        direction="right" 
        speed={2} 
        index={1}
      />
      
      {/* Row 3: Left to Right (Fast) */}
      <CarouselRow 
        items={techRows[2]} 
        direction="left" 
        speed={3} 
        index={2}
      />
      
      {/* Interactive hint */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/60 animate-pulse">
        Hover to pause
      </div>
    </div>
  )
} 