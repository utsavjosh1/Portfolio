"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { ProjectProps } from "@/types/project";
import { ProjectsGridSkeleton } from "@/components/projects/project-grid-skeleton";

export function ProjectsGrid({ title, description }: ProjectProps) {
  const supabase = createClient();
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("*")
          .eq("pinned", true)
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

  return (
    <section className="w-full py-8 mb-10">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
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
