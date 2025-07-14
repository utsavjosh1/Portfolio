"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeEffect() {
  const { resolvedTheme } = useTheme()
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)
  const [position, setPosition] = useState({ x: "50%", y: "50%" })
  const [showTransition, setShowTransition] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Skip initial render
    if (prevTheme === undefined) {
      setPrevTheme(resolvedTheme)
      return
    }

    // Only show transition when changing from dark to light
    if (prevTheme === "dark" && resolvedTheme === "light") {
      // Get the last clicked position or use center of screen
      const lastX = localStorage.getItem("themeToggleX") || "50%"
      const lastY = localStorage.getItem("themeToggleY") || "50%"

      setPosition({ x: lastX, y: lastY })
      setShowTransition(true)

      // Hide transition after animation completes
      setTimeout(() => {
        setShowTransition(false)
      }, 1000)
    }

    setPrevTheme(resolvedTheme)
  }, [resolvedTheme, prevTheme, mounted])

  if (!mounted || !showTransition) return null

  return (
    <div
      className="page-transition"
      style={
        {
          "--x": position.x,
          "--y": position.y,
        } as React.CSSProperties
      }
    />
  )
}
