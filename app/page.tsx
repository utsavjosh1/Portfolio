import HeroSection from "@/components/home/hero-section";
import { ProjectsGrid } from "@/components/projects/project-grid";
import { projectsData } from "@/config/data";

export default function Home() {
  const pinnedProjects = projectsData.filter((project) => project.pinned);

  return (
    <main>
      <HeroSection />
      <div className="space-y-12">
        <ProjectsGrid
          projects={pinnedProjects}
          title="Build fast, Ship fast."
          description="Here are some of the projects I've worked on."
          isPinned={true}
        />
      </div>
    </main>
  );
}
