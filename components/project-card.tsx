"use client";

import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  github,
  image,
  featured = false,
}: ProjectCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-card/50 text-card-foreground transition-all duration-300 hover:border-primary/20 hover:shadow-glow hover:-translate-y-1 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex h-full flex-col">
        {/* Project Image (Optional) */}
        {image && (
          <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/50">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>

            <div className="flex gap-2 text-muted-foreground">
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  className="rounded-full p-1 hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              )}
              {link && (
                <Link
                  href={link}
                  target="_blank"
                  className="rounded-full p-1 hover:bg-muted hover:text-foreground transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5" />
                  <span className="sr-only">Visit Project</span>
                </Link>
              )}
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/50 font-normal text-xs text-muted-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
