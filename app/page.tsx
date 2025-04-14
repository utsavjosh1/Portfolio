"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { Icon } from "@/components/icons.svgs"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

// Lazy load the ProjectsPage component since it's below the fold
const ProjectsPage = dynamic(() => import("@/components/projects/project"), {
  loading: () => <div className="h-60 bg-muted rounded-lg animate-pulse"></div>,
  ssr: false,
})

// Animated section component for consistent animation handling
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "zoom-in"
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

// Hook for reduced motion preference
const usePrefersReducedMotion = () => {
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

// Extracted to separate components for better rendering
const StatItem = ({ icon, text, index = 0 }: { icon: React.ReactNode; text: string; index?: number }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <AnimatedSection
      delay={prefersReducedMotion ? 0 : index * 150}
      animation="slide-in-right"
      className="group flex items-center gap-4 text-base"
    >
      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110 origin-center">
        {icon}
      </span>
      <span className="font-medium group-hover:text-primary transition-colors duration-300">{text}</span>
    </AnimatedSection>
  )
}

const ProfileImage = ({ avatar }: { avatar: string }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <AnimatedSection animation="zoom-in" className="relative w-32 h-32 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-full animate-spin-slow opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <Image
        src={avatar || "/placeholder.svg"}
        alt="Profile"
        fill
        sizes="(max-width: 768px) 96px, 128px"
        className="rounded-full border-2 border-background object-cover transition-transform duration-700 hover:scale-110"
        priority
        placeholder="blur"
        unoptimized
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
      />
    </AnimatedSection>
  )
}

const TechStackItem = ({ name, icon, index }: { name: string; icon: string; index: number }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useMobile()
  const delay = prefersReducedMotion ? 0 : isMobile ? index * 100 : index * 80

  return (
    <AnimatedSection delay={delay} animation="fade-up" className="flex flex-col items-center gap-2 group">
      <div
        className="p-4 rounded-xl bg-background dark:bg-muted border shadow-sm 
          hover:shadow-lg hover:shadow-primary/10 transition-all duration-300
          hover:-translate-y-2 hover:scale-110 relative overflow-hidden"
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/20 to-primary/0 opacity-0 
          group-hover:opacity-100 transition-opacity duration-700 ease-in-out -z-10
          group-hover:animate-glow"
        ></div>

        <div className="relative w-12 h-12 z-10">
          <Image
            src={icon || "/placeholder.svg"}
            alt={name}
            fill
            sizes="48px"
            className="object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:rotate-6"
            unoptimized
          />
        </div>
      </div>
      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {name}
      </span>
    </AnimatedSection>
  )
}

// Animated heading component
const AnimatedHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <AnimatedSection animation="slide-in-left" className={className}>
      <h2 className="text-2xl font-bold relative inline-block">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary/70 to-primary/0 rounded-full group-hover:w-full transition-all duration-700 ease-out"></span>
      </h2>
    </AnimatedSection>
  )
}

export default function Home() {
  // Load state
  const [isLoaded, setIsLoaded] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useMobile()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Hardcoded data
  const avatarUrl =
    "https://avatars.githubusercontent.com/u/98454866?s=400&u=cf6b7cebb0f7ac602a9bc5b40ab2e4bae5dce048&v=4"
  const repoCount = 44
  const bio = "Coding since, birth, now, till death"

  // Tech stack data - preloaded for faster initial render
  const techStack = [
    { name: "MongoDB", icon: "/mongodb.svg" },
    { name: "Express.js", icon: "/express.svg" },
    { name: "React", icon: "/reactjs.svg" },
    { name: "Node.js", icon: "/nodejs.svg" },
    { name: "Next.js", icon: "/nextjs.svg" },
    { name: "TypeScript", icon: "/typescript.svg" },
  ]

  return (
    <main className="space-y-8 relative">
      {/* Background animated gradient */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>

      {/* Animated particles */}
      {!prefersReducedMotion && isLoaded && <ClientParticles />}

      {/* Hero Section - enhanced animations */}
      <section className={`space-y-8 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <ProfileImage avatar={avatarUrl} />
          <div className="space-y-4">
            <StatItem
              icon={<Icon name="github" className="w-6 h-6" />}
              text={`${repoCount} repositories on GitHub`}
              index={0}
            />
            <StatItem icon={<Icon name="graph" className="w-6 h-6" />} text="500 views on blogs" index={1} />
          </div>
        </div>

        <AnimatedSection delay={300} animation="fade-in">
          <blockquote className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground">
            {bio}
          </blockquote>
        </AnimatedSection>

        <AnimatedSection delay={500} animation="slide-in-right">
          <Button asChild variant="outline" size="lg" className="group hover:bg-primary/5 overflow-hidden relative">
            <Link href="/socials" className="inline-flex items-center gap-3 text-lg">
              <Icon name="external-link" className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-medium relative">
                More ways to connect
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
              </span>
              <span className="absolute inset-0 bg-primary/10 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
            </Link>
          </Button>
        </AnimatedSection>
      </section>

      {/* Tech Stack Section - already enhanced */}
      <section className="space-y-8 group">
        <AnimatedHeading className="group">Tech Stack</AnimatedHeading>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 perspective">
          {techStack.map((tech, index) => (
            <TechStackItem key={tech.name} name={tech.name} icon={tech.icon} index={index} />
          ))}
        </div>
      </section>

      {/* Projects Section - enhanced animations */}
      <section className="space-y-8 group">
        <div className="flex items-center justify-between">
          <AnimatedHeading className="group">Featured Projects</AnimatedHeading>
          <AnimatedSection animation="slide-in-right">
            <Button variant="ghost" size="sm" asChild className="group overflow-hidden relative">
              <Link href="/projects" className="flex items-center gap-1">
                View all
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-primary/10 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-md"></span>
              </Link>
            </Button>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="grid gap-8 transform-gpu">
            <ProjectsPage />
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}

function ClientParticles() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      width: number
      height: number
      top: number
      left: number
      duration: number
      delay: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    // Generate particles only on the client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: Math.random() * 30 + 10,
      height: Math.random() * 30 + 10,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/10 animate-float"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
