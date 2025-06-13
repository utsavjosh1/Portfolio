"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Lightbulb, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function EnhancedThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [overlayStyle, setOverlayStyle] = useState({})

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      // Set the position for the animation origin
      setOverlayStyle({
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 70%)`,
      })

      // Start animation
      setIsAnimating(true)

      // Toggle theme
      setTheme(theme === "dark" ? "light" : "dark")

      // End animation after it completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
    }
  }

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Lightbulb className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <>
      {/* Light bulb animation overlay */}
      {isAnimating && theme === "light" && (
        <div className="fixed inset-0 z-[100] pointer-events-none light-animation" style={overlayStyle} />
      )}

      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn("relative overflow-hidden", isAnimating && theme === "light" && "animate-pulse")}
        aria-label="Toggle theme"
      >
        <Lightbulb
          className={cn(
            "h-[1.2rem] w-[1.2rem] transition-all",
            theme === "dark" ? "opacity-0" : "opacity-100",
            isAnimating && theme === "light" && "animate-glow text-yellow-400",
          )}
          fill={theme === "light" ? "currentColor" : "none"}
        />
        <Moon
          className={cn(
            "absolute h-[1.2rem] w-[1.2rem] transition-all",
            theme === "dark" ? "opacity-100" : "opacity-0",
          )}
        />
        <span className="sr-only">Toggle theme</span>

        {/* Light rays effect */}
        {theme === "light" && (
          <div className={cn("absolute inset-0 flex items-center justify-center", isAnimating && "animate-rays")}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute bg-yellow-400/70 h-1 w-6 origin-center",
                  isAnimating ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-300",
                )}
                style={{
                  transform: `rotate(${i * 45}deg) translateX(${isAnimating ? "12px" : "8px"})`,
                  opacity: isAnimating ? 1 : 0,
                }}
              />
            ))}
          </div>
        )}
      </Button>
    </>
  )
}
