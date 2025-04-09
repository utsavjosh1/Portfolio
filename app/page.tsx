"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { Icon } from "@/components/icons.svgs"
import { Button } from "@/components/ui/button"

// Lazy load the ProjectsPage component since it's below the fold
const ProjectsPage = dynamic(() => import("@/components/projects/project"), {
  loading: () => <div className="h-60 bg-muted rounded-lg animate-pulse"></div>,
  ssr: false
})

// Extracted to separate components for better rendering
const StatItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="group flex items-center gap-4 text-base">
    <span className="text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>
    <span className="font-medium group-hover:text-primary transition-colors">{text}</span>
  </div>
)

const ProfileImage = ({ avatar }: { avatar: string }) => (
  <div className="relative w-32 h-32">
    <Image
      src={avatar || "/placeholder.svg"}
      alt="Profile"
      fill
      sizes="(max-width: 768px) 96px, 128px"
      className="rounded-full border-2 border-background object-cover"
      priority
      placeholder="blur"
      unoptimized
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
    />
  </div>
)

const TechStackItem = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform">
    <div className="p-4 rounded-xl bg-background dark:bg-muted border shadow-sm hover:shadow-md transition-all">
      <div className="relative w-12 h-12">
        <Image 
          src={icon || "/placeholder.svg"} 
          alt={name} 
          fill
          sizes="48px"
          className="object-contain" 
          unoptimized
        />
      </div>
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
)

export default function Home() {
  // Load state
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Intersection observer for below-the-fold content
  useEffect(() => {
    setIsLoaded(true)
    
    // Use Intersection Observer to lazy load below-the-fold sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('opacity-100')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('.lazy-section').forEach(section => {
      observer.observe(section)
    })
    
    return () => observer.disconnect()
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
    <main className="space-y-16">
      {/* Hero Section - optimized for LCP */}
      <div 
        ref={heroRef}
        className={`space-y-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <ProfileImage avatar={avatarUrl} />
          <div className="space-y-4">
            <StatItem icon={<Icon name="github" className="w-6 h-6" />} text={`${repoCount} repositories on GitHub`} />
            <StatItem icon={<Icon name="graph" className="w-6 h-6" />} text="500 views on blogs" />
          </div>
        </div>

        <blockquote className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground">
          {bio}
        </blockquote>

        <Button asChild variant="outline" size="lg" className="group hover:bg-primary/5">
          <Link href="/socials" className="inline-flex items-center gap-3 text-lg">
            <Icon name="external-link" className="w-5 h-5" />
            <span className="font-medium">More ways to connect</span>
          </Link>
        </Button>
      </div>

      {/* Tech Stack Section - lazy loaded */}
      <div
        className="space-y-8 lazy-section opacity-0 transition-opacity duration-500"
      >
        <h2 className="text-2xl font-bold">Tech Stack</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {techStack.map((tech) => (
            <TechStackItem key={tech.name} name={tech.name} icon={tech.icon} />
          ))}
        </div>
      </div>

      {/* Projects Section - lazy loaded */}
      <div className="space-y-8 lazy-section opacity-0 transition-opacity duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8">
          <ProjectsPage />
        </div>
      </div>
    </main>
  )
}