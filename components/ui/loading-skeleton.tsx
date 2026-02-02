import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text" | "circle";
  lines?: number;
}

export function LoadingSkeleton({
  className,
  variant = "default",
  lines = 1,
}: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded";

  switch (variant) {
    case "card":
      return (
        <div className={cn("space-y-3", className)}>
          <div className={cn(baseClasses, "h-48 w-full")} />
          <div className={cn(baseClasses, "h-4 w-3/4")} />
          <div className={cn(baseClasses, "h-4 w-1/2")} />
        </div>
      );

    case "text":
      return (
        <div className={cn("space-y-2", className)}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                baseClasses,
                "h-4",
                i === lines - 1 ? "w-2/3" : "w-full",
              )}
            />
          ))}
        </div>
      );

    case "circle":
      return <div className={cn(baseClasses, "rounded-full", className)} />;

    default:
      return <div className={cn(baseClasses, "h-4 w-full", className)} />;
  }
}

// Contact Page Skeleton
export function ContactPageLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <LoadingSkeleton className="h-10 w-1/2 mx-auto" />
        <LoadingSkeleton
          variant="text"
          lines={2}
          className="max-w-lg mx-auto"
        />
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
  );
}
