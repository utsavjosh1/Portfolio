import { Skeleton } from "@/components/ui/skeleton";

const HeroSectionLoader: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Traits Loader */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-24" />
        ))}
      </div>

      {/* Profile Loader */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      {/* Quote Loader */}
      <div className="pl-4">
        <Skeleton className="h-7 w-64" />
      </div>

      {/* Connect Button Loader */}
      <Skeleton className="h-10 w-44" />

      {/* Projects Header Loader */}
      <div className="space-y-4 pt-8">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-6 w-96" />
      </div>
    </div>
  );
};

export default HeroSectionLoader;
