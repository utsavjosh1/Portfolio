"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const AnimatedThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = (e: React.MouseEvent) => {
    // Get the position of the click relative to the viewport
    const x = e.clientX
    const y = e.clientY

    // Store the position for the full page effect
    localStorage.setItem("themeToggleX", `${x}px`)
    localStorage.setItem("themeToggleY", `${y}px`)

    // Set the position for the animation origin
    setPosition({ x, y })

    // Start animation
    setIsAnimating(true)

    // Toggle theme
    setTheme(theme === "dark" ? "light" : "dark")

    // End animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <button onClick={toggleTheme} className="relative h-10 w-20 rounded-full bg-stone-200 dark:bg-stone-800">
      <div
        className={`absolute left-1 top-1 h-8 w-8 rounded-full bg-white transition-all duration-300 ${
          theme === "dark" ? "translate-x-full bg-stone-900" : ""
        }`}
      />
      {isAnimating && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: theme === "dark" ? "white" : "black",
            transformOrigin: `${position.x}px ${position.y}px`,
            animation: "ripple 1s ease-out",
            pointerEvents: "none",
          }}
        />
      )}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}

export default AnimatedThemeToggle
