import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'circle'
  lines?: number
}

export function LoadingSkeleton({ 
  className, 
  variant = 'default', 
  lines = 1 
}: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded"
  
  switch (variant) {
    case 'card':
      return (
        <div className={cn("space-y-3", className)}>
          <div className={cn(baseClasses, "h-48 w-full")} />
          <div className={cn(baseClasses, "h-4 w-3/4")} />
          <div className={cn(baseClasses, "h-4 w-1/2")} />
        </div>
      )
    
    case 'text':
      return (
        <div className={cn("space-y-2", className)}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                baseClasses,
                "h-4",
                i === lines - 1 ? "w-2/3" : "w-full"
              )}
            />
          ))}
        </div>
      )
    
    case 'circle':
      return (
        <div className={cn(baseClasses, "rounded-full", className)} />
      )
    
    default:
      return (
        <div className={cn(baseClasses, "h-4 w-full", className)} />
      )
  }
}

// Homepage specific loading skeletons
export function HomepageLoadingSkeleton() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <LoadingSkeleton variant="circle" className="h-20 w-20" />
          <div className="space-y-2 flex-1">
            <LoadingSkeleton className="h-8 w-48" />
            <LoadingSkeleton className="h-4 w-32" />
          </div>
        </div>
        <LoadingSkeleton variant="text" lines={3} />
        <div className="flex gap-3">
          <LoadingSkeleton className="h-10 w-32" />
          <LoadingSkeleton className="h-10 w-40" />
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-8 w-48" />
          <LoadingSkeleton className="h-6 w-20" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </section>

      {/* Experience Section Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-8 w-32" />
          <LoadingSkeleton className="h-6 w-20" />
        </div>
        <div className="space-y-6">
          <LoadingSkeleton variant="text" lines={4} />
          <LoadingSkeleton variant="text" lines={4} />
        </div>
      </section>

      {/* Blog Section Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-8 w-32" />
          <LoadingSkeleton className="h-6 w-20" />
        </div>
        <div className="space-y-4">
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={3} />
        </div>
      </section>
    </div>
  )
}

// Projects Page Skeleton
export function ProjectsPageLoadingSkeleton() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section Skeleton */}
      <div className="text-center space-y-6">
        <LoadingSkeleton className="h-12 w-1/3 mx-auto" />
        <LoadingSkeleton variant="text" lines={2} className="max-w-xl mx-auto" />
        <div className="flex items-center justify-center gap-8 py-6">
          <LoadingSkeleton className="h-10 w-20" />
          <LoadingSkeleton className="h-10 w-20" />
          <LoadingSkeleton className="h-10 w-20" />
        </div>
      </div>
      
      {/* Projects Grid Skeleton */}
      <section className="space-y-6">
        <LoadingSkeleton className="h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </section>
    </div>
  )
}

// Blog Page Skeleton
export function BlogPageLoadingSkeleton() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section Skeleton */}
      <div className="text-center space-y-6">
        <LoadingSkeleton className="h-12 w-1/3 mx-auto" />
        <LoadingSkeleton variant="text" lines={2} className="max-w-xl mx-auto" />
        <div className="flex items-center justify-center gap-8 py-6">
          <LoadingSkeleton className="h-10 w-20" />
          <LoadingSkeleton className="h-10 w-20" />
        </div>
      </div>
      
      {/* Blog List Skeleton */}
      <section className="space-y-6">
        <LoadingSkeleton className="h-8 w-48" />
        <div className="space-y-4">
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={3} />
        </div>
      </section>
    </div>
  )
}

// Experience Page Skeleton
export function ExperiencePageLoadingSkeleton() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section Skeleton */}
      <div className="text-center space-y-6">
        <LoadingSkeleton className="h-12 w-1/3 mx-auto" />
        <LoadingSkeleton variant="text" lines={2} className="max-w-xl mx-auto" />
      </div>

      {/* Experience List Skeleton */}
      <div className="space-y-8">
        <LoadingSkeleton variant="text" lines={4} />
        <LoadingSkeleton variant="text" lines={4} />
        <LoadingSkeleton variant="text" lines={4} />
      </div>
    </div>
  )
}

// Single Project Page Skeleton
export function ProjectPostLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <LoadingSkeleton className="h-12 w-3/4" />
      <LoadingSkeleton variant="text" lines={2} />
      <div className="flex gap-4">
        <LoadingSkeleton className="h-10 w-32" />
        <LoadingSkeleton className="h-10 w-32" />
      </div>
      <LoadingSkeleton className="h-96 w-full" variant="card" />
      <LoadingSkeleton variant="text" lines={8} />
    </div>
  )
}

// Single Blog Post Skeleton
export function BlogPostLoadingSkeleton() {
  return (
    <article className="space-y-8 animate-fade-in">
      <LoadingSkeleton className="h-12 w-3/4" />
      <div className="flex gap-4">
        <LoadingSkeleton className="h-6 w-24" />
        <LoadingSkeleton className="h-6 w-24" />
      </div>
      <LoadingSkeleton variant="text" lines={15} />
    </article>
  )
}

// Contact Page Skeleton
export function ContactPageLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <LoadingSkeleton className="h-10 w-1/2 mx-auto" />
        <LoadingSkeleton variant="text" lines={2} className="max-w-lg mx-auto" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-16" />
          <LoadingSkeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-16" />
          <LoadingSkeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-16" />
          <LoadingSkeleton className="h-24 w-full" />
        </div>
        <LoadingSkeleton className="h-12 w-32" />
      </div>
    </div>
  )
} 