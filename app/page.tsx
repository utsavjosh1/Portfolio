"use client";

import HeroSection from "@/components/home/hero-section";
import { ProjectsGrid } from "@/components/projects/project-grid";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="space-y-12">
        <ProjectsGrid
          title="Build fast, Ship fast."
          description="Here are some of the projects I've worked on."
        />
      </div>
    </main>
  );
}
