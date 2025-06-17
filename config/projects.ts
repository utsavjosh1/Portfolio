export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'archived'
  year?: string
  github?: string
  demo?: string
}

export const projectsConfig = {
  // Page metadata
  metadata: {
    title: "Projects",
    description: "Explore my portfolio of web development and design projects.",
  },
  
  // Projects data
  projects: [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store built with Next.js, Stripe, and a headless CMS.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      link: "/projects/ecommerce",
      featured: true,
      status: "completed" as const,
      year: "2023",
    },
  ] as Project[],
  
  // Helper functions
  getFeaturedProjects: () => projectsConfig.projects.filter(project => project.featured),
  getProjectsByStatus: (status: Project['status']) => projectsConfig.projects.filter(project => project.status === status),
  getProjectsByYear: (year: string) => projectsConfig.projects.filter(project => project.year === year),
} 