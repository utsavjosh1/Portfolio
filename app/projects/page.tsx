"use client";

import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectProps } from "@/types/project";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useMemo } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create Supabase client once
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // Track component mount state
    let isMounted = true;
    
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("*")
          .limit(10); 
       
        if (error) {
          if (isMounted) {
            console.error("Error fetching projects:", error.message);
            setError(error.message);
          }
        } else if (isMounted) {
          setProjects(data || []);
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
          console.error("Unexpected error fetching projects:", errorMessage);
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    // Use AbortController for fetch requests
    const controller = new AbortController();
    
    // Delay the non-critical data fetch by a small amount to prioritize UI rendering
    const timeoutId = setTimeout(() => {
      fetchProjects();
    }, 100);
    
    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 text-center py-12">
        <h2 className="text-xl font-semibold">Unable to load projects</h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <p className="text-muted-foreground mt-2">A complete collection of my work</p>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
