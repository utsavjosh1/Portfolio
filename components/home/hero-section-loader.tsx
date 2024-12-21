"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HeroSectionLoader: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* Traits Section Skeleton */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-3">
        {[100, 120, 90].map((width, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-muted-foreground/60 select-none"
              >
                •
              </span>
            )}
            <Skeleton className={`h-7 w-${width}px rounded-md`} />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Profile Section Skeleton */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
      >
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
        <div className="space-y-4">
          <StatItemSkeleton />
          <StatItemSkeleton />
        </div>
      </motion.div>

      {/* Quote Section Skeleton */}
      <motion.div variants={item}>
        <div className="pl-6 border-l-4 border-primary/50 space-y-2">
          <Skeleton className="h-6 w-[280px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </motion.div>

      {/* Connect Button Skeleton */}
      <motion.div variants={item}>
        <Skeleton className="h-12 w-[250px] rounded-md" />
      </motion.div>
    </motion.div>
  );
};

const StatItemSkeleton: React.FC = () => (
  <motion.div className="flex items-center gap-4" variants={item}>
    <Skeleton className="w-6 h-6 rounded-full" />
    <Skeleton className="h-5 w-[200px]" />
  </motion.div>
);

export default HeroSectionLoader;
