"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import { Project } from "@prisma/client"

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
  isPinned?: boolean
}

const buttonVariants = {
  initial: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
}

export function ProjectCard({ project, index, isPinned }: ProjectCardProps) {
  // Format date for display
  const formattedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

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
            <motion.div className="relative aspect-video overflow-hidden bg-muted" whileHover="hover">
              <Image
                src={project.imageUrl || ""}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-center transition-transform group-hover:scale-105"
                sizes="(min-width: 768px) 90vw, 100vw"
                priority={index === 0}
              />
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {project.demo && (
                  <motion.div variants={buttonVariants}>
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="rounded-full bg-white text-black hover:bg-gray-200"
                    >
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {project.github && (
                  <motion.div variants={buttonVariants}>
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="rounded-full bg-white text-black hover:bg-gray-200"
                    >
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold tracking-tight text-lg">{project.title}</h3>
                <span className="text-sm text-muted-foreground">{formattedDate}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

