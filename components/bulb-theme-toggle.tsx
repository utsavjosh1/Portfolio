"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BulbThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    // Get the position of the click
    const x = e.clientX
    const y = e.clientY

    // Store the position for the full page effect
    localStorage.setItem("themeToggleX", `${x}px`)
    localStorage.setItem("themeToggleY", `${y}px`)

    // Start animation
    setIsAnimating(true)

    // Toggle theme
    setTheme(theme === "dark" ? "light" : "dark")

    // End animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Lightbulb className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label="Toggle theme"
    >
      {/* Bulb icon */}
      <div className="relative">
        <Lightbulb
          className={cn(
            "h-[1.2rem] w-[1.2rem] transition-all duration-300",
            isDark ? "text-gray-400" : "text-yellow-400",
            isAnimating && !isDark && "animate-glow",
          )}
          fill={!isDark ? "currentColor" : "none"}
        />

        {/* Light rays */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full",
            isDark ? "opacity-0" : "opacity-100",
            "transition-opacity duration-300",
          )}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute top-1/2 left-1/2 bg-yellow-400/70 h-0.5 origin-left",
                isAnimating && !isDark ? "animate-rays-expand" : "",
              )}
              style={{
                width: isAnimating && !isDark ? "12px" : "8px",
                transform: `rotate(${i * 45}deg)`,
                opacity: isDark ? 0 : isAnimating ? 1 : 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-yellow-400/20 transition-opacity duration-300",
          isDark ? "opacity-0" : "opacity-100",
          isAnimating && !isDark ? "animate-glow-expand" : "",
        )}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
