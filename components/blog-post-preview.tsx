import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BlogPostPreviewProps {
  title: string
  excerpt: string
  date: string
  slug: string
  className?: string
}

export function BlogPostPreview({ title, excerpt, date, slug, className }: BlogPostPreviewProps) {
  // Ensure proper blog post URL format
  const blogUrl = slug.startsWith('/blog/') ? slug : `/blog/${slug}`
  
  return (
    <Link href={blogUrl} className="group">
      <Card className={cn("overflow-hidden transition-all hover:bg-muted/30 border-border", className)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
          <p className="mt-4 text-xs text-muted-foreground">{date}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
