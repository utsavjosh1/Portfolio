import HeroSection from "@/components/home/hero-section";
import { ProjectsGrid } from "@/components/projects/project-grid";
import { Project } from "@/types/project";

const projects: Project[] = [
  {
    title: "Hydra",
    year: "2024",
    description:
      "A robust distributed task scheduler built with Go and React. Features include job queuing, retry mechanisms, and real-time monitoring.",
    imageUrl: "/placeholder.svg?height=400&width=800",
    github: "https://github.com/yourusername/hydra",
    demo: "https://hydra-demo.vercel.app",
    pinned: true,
  },
  {
    title: "Shawty",
    year: "2024",
    description:
      "A lightweight URL shortener service with expiration support. Built using Next.js, PostgreSQL, and TypeScript.",
    imageUrl: "/placeholder.svg?height=400&width=800",
    github: "https://github.com/yourusername/shawty",
    demo: "https://shawty.vercel.app",
    pinned: true,
  },
  {
    title: "Portfolio",
    year: "2023",
    description:
      "My personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion for smooth animations.",
    imageUrl: "/placeholder.svg?height=400&width=800",
    github: "https://github.com/yourusername/portfolio",
    demo: "https://portfolio.vercel.app",
    pinned: true,
  },
];

export default function Home() {
  const pinnedProjects = projects.filter((project) => project.pinned);

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
