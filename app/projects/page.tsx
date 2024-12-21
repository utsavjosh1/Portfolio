"use client";

import { ProjectsGrid } from "@/components/projects/project-grid";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { ProjectProps } from "@/types/project";
import { ProjectsGridSkeleton } from "@/components/projects/project-grid-skeleton";

export default function ProjectsPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("*")
          .order("pinned", { ascending: false });
        if (error) {
          console.error("Error fetching projects:", error.message);
        } else {
          setProjects(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Unexpected error fetching projects:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <ProjectsGridSkeleton />;
  }

  if (!projects) {
    return null;
  }

  return (
    <div className="space-y-12">
      <ProjectsGrid
        title="Build fast, Ship fast."
        description="Here are some of the projects I've worked on."
      />
    </div>
  );
}
