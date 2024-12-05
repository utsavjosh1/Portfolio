"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Icon } from "@/components/icons.svgs";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <Card className="group overflow-hidden bg-background hover:shadow-lg transition-all duration-300 border border-muted">
        <CardContent className="p-0">
          <div className="relative">
            <motion.div
              className="relative aspect-[2/1] overflow-hidden bg-muted"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Image
                src={project.imageUrl}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-center transition-transform"
                sizes="(min-width: 768px) 40vw, 100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {project.github && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="rounded-full"
                    >
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="github" className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {project.demo && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="rounded-full"
                    >
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="external-link" className="w-4 h-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold tracking-tight text-lg">
                  {project.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
