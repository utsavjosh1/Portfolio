"use client";

import HeroSection from "@/components/home/hero-section";
import { PinnedProjects } from "@/components/projects/pinned-project";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PinnedProjects />
    </main>
  );
}
