"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Star, GitFork, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  tags?: string[]
  link?: string
  githubUrl?: string
  featured?: boolean
  className?: string
  priority?: boolean
  variant?: "default" | "compact"
  showHoverEffect?: boolean
  stats?: {
    stars?: number
    forks?: number
    views?: number
  }
  date?: string
}

export function ProjectCard({
  title,
  description,
  image,
  tags = [],
  link,
  githubUrl,
  featured = false,
  className,
  priority = false,
  variant = "default",
  showHoverEffect = true,
  stats,
  date,
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isCompact = variant === "compact"

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300",
        showHoverEffect && "hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      {/* Image Section */}
      {image && !isCompact && (
        <div className="aspect-video overflow-hidden bg-muted relative">
          {!imageError ? (
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={cn(
                "object-cover transition-all duration-300",
                showHoverEffect && "group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              priority={priority}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Image not available</div>
            </div>
          )}

          {/* Loading skeleton */}
          {!imageLoaded && !imageError && <div className="absolute inset-0 bg-muted animate-pulse" />}

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="text-xs font-medium">Featured</Badge>
            </div>
          )}

          {/* Quick actions overlay */}
          {(link || githubUrl) && showHoverEffect && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              {link && (
                <Button size="sm" asChild>
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Link>
                </Button>
              )}
              {githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <CardHeader className={cn("space-y-4", isCompact ? "pb-3" : "pb-4")}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              {featured && isCompact && <Badge className="text-xs">Featured</Badge>}
              {date && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{date}</span>
                </div>
              )}
            </div>
            <CardTitle
              className={cn(
                "leading-tight transition-colors",
                showHoverEffect && "group-hover:text-primary",
                isCompact ? "text-lg" : "text-xl",
              )}
            >
              {title}
            </CardTitle>
          </div>
          {(link || githubUrl) && !showHoverEffect && (
            <div className="flex gap-2">
              {link && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {githubUrl && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className={cn("text-muted-foreground leading-relaxed", isCompact ? "text-sm" : "text-base")}>
          {description}
        </p>

        {/* Stats */}
        {stats && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {stats.stars && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{stats.stars}</span>
              </div>
            )}
            {stats.forks && (
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                <span>{stats.forks}</span>
              </div>
            )}
            {stats.views && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{stats.views}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className={cn("space-y-4", isCompact ? "pt-0" : "pt-2")}>
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        {(link || githubUrl) && showHoverEffect && (
          <div className="flex gap-2 pt-2">
            {link && (
              <Button size="sm" asChild className="flex-1">
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button variant="outline" size="sm" asChild className={cn(link ? "flex-1" : "w-full")}>
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
