import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image?: string | null
  tags: string[]
  link?: string
  className?: string
  priority?: boolean
  variant?: 'default' | 'compact'
  showHoverEffect?: boolean
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  tags, 
  link, 
  className,
  priority = false,
  variant = 'default',
  showHoverEffect = true
}: ProjectCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <Link href={link} className="group block">
          {children}
        </Link>
      )
    }
    return <div className="group">{children}</div>
  }

  const hasImage = image && variant === 'default'
  const isClickable = !!link

  return (
    <CardWrapper>
      <Card className={cn(
        "overflow-hidden border-border/50 transition-all duration-300",
        showHoverEffect && "hover:border-border hover:shadow-lg",
        isClickable && showHoverEffect && "hover:-translate-y-1",
        variant === 'compact' && "bg-gradient-to-br from-background to-muted/20",
        className
      )}>
        {hasImage && (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/50">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={cn(
                "object-cover",
                showHoverEffect && "transition-transform duration-500 group-hover:scale-105"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLm4QfxkUy2+qNM3CoURYFhX6ZuBOUkLwF5YXTyWBz6UGg/9k="
            />
            {showHoverEffect && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </div>
        )}
        
        <CardContent className={cn(
          "space-y-4",
          hasImage ? "p-6" : "p-6",
          variant === 'compact' && !hasImage && "p-6"
        )}>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className={cn(
                "font-semibold leading-tight",
                variant === 'default' ? "text-lg" : "text-lg",
                isClickable && showHoverEffect && "group-hover:text-primary transition-colors"
              )}>
                {title}
              </h3>
              {isClickable && (
                <ArrowUpRight className={cn(
                  "h-5 w-5 text-muted-foreground flex-shrink-0",
                  showHoverEffect && "opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                )} />
              )}
            </div>
            
            <p className={cn(
              "text-muted-foreground leading-relaxed",
              variant === 'default' && "line-clamp-2"
            )}>
              {description}
            </p>
            
            {tags.length > 0 && (
              <div className={cn(
                "flex flex-wrap gap-2",
                variant === 'default' && "pt-2"
              )}>
                {variant === 'default' ? (
                  <>
                    {tags.slice(0, 4).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 4 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-1 text-muted-foreground border-muted-foreground/30"
                      >
                        +{tags.length - 4}
                      </Badge>
                    )}
                  </>
                ) : (
                  tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-xs px-2 py-1"
                    >
                      {tag}
                    </Badge>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
