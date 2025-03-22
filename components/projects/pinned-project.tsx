"use client"

import { ProjectCard } from "@/components/projects/project-card"
import type { ProjectProps } from "@/types/project"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PinnedProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create Supabase client once
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    // Track component mount state
    let isMounted = true

    async function fetchPinnedProjects() {
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("*")
          .eq("pinned", true)
          .limit(3)

        if (error) {
          if (isMounted) {
            console.error("Error fetching pinned projects:", error.message)
            setError(error.message)
          }
        } else if (isMounted) {
          setProjects(data || [])
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
          console.error("Unexpected error fetching pinned projects:", errorMessage)
          setError(errorMessage)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Use AbortController for fetch requests
    const controller = new AbortController()

    fetchPinnedProjects()

    // Cleanup function
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [supabase])

  if (loading) {
    return (
      <div className="space-y-4 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-muted-foreground">Loading featured projects...</p>
      </div>
    )
  }

  if (error) {
    return null // Don't show error in hero section, just hide it
  }

  if (projects.length === 0) {
    return null // Don't show empty state in hero section
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects" className="flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

