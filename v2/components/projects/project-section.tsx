"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { Project } from "@/types/project";

const projects: Project[] = [
  {
    title: "Hydra",
    year: "2024",
    description: "A robust distributed task scheduler",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    title: "Shawty",
    year: "2024",
    description: "A very light url shortner with expiration",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
];

export function ProjectsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-background to-muted py-12 md:py-24 lg:py-32">
      <motion.div
        className="container space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="space-y-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Build fast, Ship fast.
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 max-w-[800px] mx-auto">
            Here are some of the projects I&apos;ve worked on.
          </p>
        </motion.div>
        <motion.div
          className="space-y-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
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
