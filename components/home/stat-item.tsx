"use client";

import type React from "react";
interface StatItemProps {
  icon: React.ReactNode;
  text: string;
}

export function StatItem({ icon, text }: StatItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="group flex flex-row  gap-2">
        <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300 transform group-hover:scale-125 origin-center group-hover:rotate-6">
          {icon}
        </span>
        <span className="font-medium group-hover:text-primary transition-colors duration-300 relative overflow-hidden">
          {text}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/70 group-hover:w-full transition-all duration-500 ease-out"></span>
        </span>
      </div>
    </div>
  );
}
