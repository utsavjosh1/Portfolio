import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <main className="container max-w-4xl py-8 mx-auto">
      <div className="space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-32" />

        {/* Project Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/3" />
          <div className="flex gap-4">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>

        {/* Project Image Skeleton */}
        <Skeleton className="w-full aspect-video rounded-lg" />

        {/* Project Description Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/6" />
        </div>

        {/* Tech Stack Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>

        {/* Metadata Skeleton */}
        <div className="grid gap-4 py-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
    </main>
  );
}
