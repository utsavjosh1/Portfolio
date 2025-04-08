"use client";

import React from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/config/project.data";

export default function ProjectsPage() {
  const pinnedProjects = projects.filter((project) => project.pinned);
  const otherProjects = projects.filter((project) => !project.pinned);

  return (
    <main className="space-y-12">
      {/* Pinned Projects */}
      {pinnedProjects.length > 0 && (
        <section>
          <div className="grid gap-8 md:grid-cols-1">
            {pinnedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isPinned={true}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
