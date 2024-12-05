import { ProjectsGrid } from "@/components/projects/project-grid";
import { Project } from "@/types/project";

const projects: Project[] = [
  {
    title: "Hydra",
    year: "2024",
    description: "A robust distributed task scheduler",
    imageUrl: "/placeholder.svg?height=400&width=800",
    github: "https://github.com/yourusername/hydra",
    demo: "https://hydra-demo.vercel.app",
    pinned: true,
  },
  {
    title: "Shawty",
    year: "2024",
    description: "A very light url shortner with expiration",
    imageUrl: "/placeholder.svg?height=400&width=800",
    pinned: true,
  },
  {
    title: "Portfolio",
    year: "2023",
    description: "My personal portfolio website",
    imageUrl: "/placeholder.svg?height=400&width=800",
    pinned: true,
  },
  {
    title: "Task Manager",
    year: "2023",
    description: "A simple task management application",
    imageUrl: "/placeholder.svg?height=400&width=800",
    pinned: false,
  },
  {
    title: "Weather App",
    year: "2023",
    description: "A real-time weather forecasting application",
    imageUrl: "/placeholder.svg?height=400&width=800",
    pinned: false,
  },
  {
    title: "E-commerce Platform",
    year: "2022",
    description: "A full-featured online shopping platform",
    imageUrl: "/placeholder.svg?height=400&width=800",
    pinned: false,
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <ProjectsGrid
        projects={projects}
        title="All Projects"
        description="A comprehensive list of all the projects I've worked on."
      />
    </div>
  );
}
