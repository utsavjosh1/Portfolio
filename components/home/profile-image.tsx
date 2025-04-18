"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/animation/motion-effects";

interface ProfileImageProps {
  avatar: string;
}

export function ProfileImage({ avatar }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection
      animation="zoom-in"
      className="relative w-32 h-32 overflow-hidden rounded-full group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-primary/50 via-primary/30 to-transparent rounded-full 
        transition-all duration-1000 ease-in-out ${isHovered ? "animate-spin-slow opacity-100" : "opacity-0"}`}
      ></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary/30 rounded-full opacity-0 group-hover:opacity-100 animate-pulse-slow blur-md transition-opacity duration-700"></div>
      <Image
        src={avatar || "/placeholder.svg"}
        alt="Profile"
        fill
        sizes="(max-width: 768px) 96px, 128px"
        className="rounded-full border-2 border-background object-cover transition-all duration-700 group-hover:scale-110 z-10"
        priority
        placeholder="blur"
        unoptimized
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </AnimatedSection>
  );
}
