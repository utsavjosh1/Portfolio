"use client"

import { ProjectsGrid } from "@/components/projects/project-grid";
import { projectsData } from "@/config/data";

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <ProjectsGrid
        projects={projectsData}
        title="All Projects"
        description="A comprehensive list of all the projects I've worked on."
      />
    </div>
  );
}
