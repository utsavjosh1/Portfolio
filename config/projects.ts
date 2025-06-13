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
    {
      title: "Task Management App",
      description: "A productivity tool for teams with real-time collaboration features.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "Firebase", "TypeScript"],
      link: "/projects/task-app",
      featured: true,
      status: "completed" as const,
      year: "2023",
    },
    {
      title: "Personal Finance Dashboard",
      description: "Interactive dashboard for tracking expenses and investments with data visualization.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "D3.js", "Node.js"],
      link: "/projects/finance-dashboard",
      featured: true,
      status: "completed" as const,
      year: "2023",
    },
    {
      title: "AI Content Generator",
      description: "Tool that uses machine learning to generate marketing copy and social media content.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Python", "TensorFlow", "React"],
      link: "/projects/ai-content-generator",
      featured: false,
      status: "completed" as const,
      year: "2023",
    },
    {
      title: "Real Estate Listing Platform",
      description: "Property search and listing platform with map integration and filtering options.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "MongoDB", "Google Maps API"],
      link: "/projects/real-estate",
      featured: false,
      status: "completed" as const,
      year: "2022",
    },
    {
      title: "Health & Fitness Tracker",
      description: "Mobile-first application for tracking workouts, nutrition, and health metrics.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React Native", "GraphQL", "AWS"],
      link: "/projects/fitness-tracker",
      featured: false,
      status: "completed" as const,
      year: "2022",
    },
  ] as Project[],
  
  // Helper functions
  getFeaturedProjects: () => projectsConfig.projects.filter(project => project.featured),
  getProjectsByStatus: (status: Project['status']) => projectsConfig.projects.filter(project => project.status === status),
  getProjectsByYear: (year: string) => projectsConfig.projects.filter(project => project.year === year),
} 