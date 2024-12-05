"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { Project } from "@/types/project";

interface ProjectsGridProps {
  projects: Project[];
  title: string;
  description: string;
  isPinned?: boolean;
}

export function ProjectsGrid({
  projects,
  title,
  description,
}: ProjectsGridProps) {
  return (
    <section className="w-full py-8 mb-10">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="space-y-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </motion.div>
        <motion.div
          className="space-y-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
