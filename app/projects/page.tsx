"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/config/project.data";

export default function ProjectsPage() {

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
