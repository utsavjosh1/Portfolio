import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote/rsc';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return project;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  return (
    <main className="container max-w-4xl py-8 mx-auto">
      <div className="space-y-8">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="group mb-8"
        >
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <Link 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="outline" size="sm">
                <Link 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Project Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>{project.description}</p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.features.map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Content */}
        {project.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={project.content} />
          </div>
        )}

        {/* Project Metadata */}
        <div className="grid gap-4 py-8 border-t">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Created:</span>
            <time dateTime={project.createdAt.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(project.createdAt)}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Last Updated:</span>
            <time dateTime={project.updatedAt.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(project.updatedAt)}
            </time>
          </div>
        </div>
      </div>
    </main>
  );
} 