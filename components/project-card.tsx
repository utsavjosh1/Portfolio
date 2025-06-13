import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  className?: string
}

export function ProjectCard({ title, description, image, tags, link, className }: ProjectCardProps) {
  return (
    <Link href={link} className="group">
      <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold">{title}</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
