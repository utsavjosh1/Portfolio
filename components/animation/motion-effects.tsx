"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

// Hook for reduced motion preference
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

// Hook for cursor spotlight effect
export const useCursorSpotlight = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMouseInWindow, setIsMouseInWindow] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsMouseInWindow(true)
    const handleMouseLeave = () => setIsMouseInWindow(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return { cursorPosition, isMouseInWindow }
}

// Animated section component for consistent animation handling
export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "zoom-in" | "bounce" | "pulse"
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [delay, prefersReducedMotion])

  const getAnimationClasses = () => {
    if (prefersReducedMotion) return "opacity-100"

    const baseClasses = "transition-all duration-1000 ease-out"
    const visibleClass = isVisible ? "opacity-100" : "opacity-0"

    switch (animation) {
      case "fade-up":
        return `${baseClasses} ${visibleClass} ${isVisible ? "translate-y-0" : "translate-y-16"}`
      case "fade-in":
        return `${baseClasses} ${visibleClass}`
      case "slide-in-right":
        return `${baseClasses} ${visibleClass} ${isVisible ? "translate-x-0" : "translate-x-16"}`
      case "slide-in-left":
        return `${baseClasses} ${visibleClass} ${isVisible ? "translate-x-0" : "-translate-x-16"}`
      case "zoom-in":
        return `${baseClasses} ${visibleClass} ${isVisible ? "scale-100" : "scale-95"}`
      case "bounce":
        return `${baseClasses} ${visibleClass} ${isVisible ? "animate-bounce" : ""}`
      case "pulse":
        return `${baseClasses} ${visibleClass} ${isVisible ? "animate-pulse" : ""}`
      default:
        return `${baseClasses} ${visibleClass}`
    }
  }

  return (
    <div ref={sectionRef} className={`${getAnimationClasses()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// Animated heading component
export const AnimatedHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <AnimatedSection animation="slide-in-left" className={className}>
      <h2 className="text-2xl font-bold relative inline-block group">
        {children}
        <span className="absolute -bottom-1 left-0 w-1/4 h-1 bg-gradient-to-r from-primary/90 to-primary/30 rounded-full group-hover:w-full transition-all duration-700 ease-out"></span>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full group-hover:w-full transition-all duration-1000 delay-100 ease-out"></span>
      </h2>
    </AnimatedSection>
  )
}
