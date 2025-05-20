"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { Project } from "@prisma/client";

interface ProjectsProps {
  projects: Project[];
  showOnlyPinned?: boolean;
}

export default function Projects({
  projects,
  showOnlyPinned = false,
}: ProjectsProps) {
  // Ensure projects are serialized
  const serializedProjects = projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toString(),
    updatedAt: project.updatedAt.toString(),
  }));

  const projectsToShow = showOnlyPinned
    ? serializedProjects.filter((project) => project.pinned)
    : serializedProjects;

  return (
    <div className="space-y-16">
      <section>
        <div className="grid gap-8 md:grid-cols-1">
          {projectsToShow.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={serializedProjects.indexOf(project)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
