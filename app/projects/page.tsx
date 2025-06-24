import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { ProjectService } from "@/lib/services/projects"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { NoProjects } from "@/components/no-projects"

export const metadata: Metadata = {
  title: "Projects - Utsav Joshi",
  description: "A curated collection of my work, side projects, and experiments showcasing modern web development and innovative solutions.",
}

// Fallback data for when database is unavailable
const fallbackProjectsData = {
  allProjects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.",
      image: "/placeholder.svg" as string | null,
      slug: "ecommerce-platform",
      featured: true,
      status: "COMPLETED" as const,
      technologies: [
        { technology: { name: "Next.js" } },
        { technology: { name: "TypeScript" } },
        { technology: { name: "Stripe" } },
        { technology: { name: "Tailwind CSS" } }
      ]
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg" as string | null,
      slug: "task-management",
      featured: false,
      status: "COMPLETED" as const,
      technologies: [
        { technology: { name: "React" } },
        { technology: { name: "Node.js" } },
        { technology: { name: "Socket.io" } },
        { technology: { name: "MongoDB" } }
      ]
    }
  ],
  featuredProjects: [
    {
      id: "1",
      title: "E-Commerce Platform", 
      description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.",
      image: "/placeholder.svg" as string | null,
      slug: "ecommerce-platform",
      featured: true,
      status: "COMPLETED" as const,
      technologies: [
        { technology: { name: "Next.js" } },
        { technology: { name: "TypeScript" } },
        { technology: { name: "Stripe" } },
        { technology: { name: "Tailwind CSS" } }
      ]
    }
  ],
  completedProjects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.",
      image: "/placeholder.svg" as string | null,
      slug: "ecommerce-platform",
      featured: true,
      status: "COMPLETED" as const,
      technologies: [
        { technology: { name: "Next.js" } },
        { technology: { name: "TypeScript" } },
        { technology: { name: "Stripe" } },
        { technology: { name: "Tailwind CSS" } }
      ]
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg" as string | null,
      slug: "task-management",
      featured: false,
      status: "COMPLETED" as const,
      technologies: [
        { technology: { name: "React" } },
        { technology: { name: "Node.js" } },
        { technology: { name: "Socket.io" } },
        { technology: { name: "MongoDB" } }
      ]
    }
  ],
  totalProjects: 2
};

export default async function ProjectsPage() {
  let projectsData: any = fallbackProjectsData;

  try {
    // Optimized: Single database query with error handling
    const data = await ProjectService.getProjectsPageData();
    if (data.totalProjects > 0) {
      projectsData = data;
    }
  } catch (error) {
    console.warn('Database unavailable during build, using fallback data:', error);
    // Continue with fallback data
  }

  const { allProjects, featuredProjects, completedProjects, totalProjects } = projectsData;

  // Check if there are no projects
  const hasNoProjects = totalProjects === 0;

  // Transform data to match ProjectCard interface (optimized)
  const transformProject = (project: any) => ({
    title: project.title,
    description: project.description,
    image: project.image || "/placeholder.svg",
    tags: project.technologies.map((pt: any) => pt.technology.name),
    link: `/projects/${project.slug}`
  })

  const transformedFeaturedProjects = featuredProjects.map(transformProject)
  const transformedAllProjects = allProjects.map(transformProject)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 rounded-2xl -z-10" />
        <div className="relative px-6 py-16 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A curated collection of my work showcasing modern web development and innovative solutions.
            </p>
          </div>
          
          {/* Stats */}
          {!hasNoProjects && (
            <div className="flex items-center justify-center gap-8 text-sm border-t border-b border-border py-6">
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{totalProjects}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Total</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{completedProjects.length}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Completed</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{featuredProjects.length}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Featured</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasNoProjects ? (
        <NoProjects />
      ) : (
        <div className="space-y-12">
          {/* Featured Projects */}
          {transformedFeaturedProjects.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Featured Projects</h2>
                <span className="px-2 py-1 text-xs font-medium bg-foreground text-background rounded">
                  {transformedFeaturedProjects.length}
                </span>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {transformedFeaturedProjects.map((project: any, index: any) => (
                  <div
                    key={project.title}
                    className="group animate-in fade-in-50 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      link={project.link}
                      className="h-full transition-all duration-200 hover:bg-muted/30 border-border"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Projects */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <h2 className="text-xl font-bold tracking-tight text-foreground">All Projects</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {transformedAllProjects.map((project: any, index: any) => (
                <div
                  key={project.title}
                  className="group animate-in fade-in-50 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link}
                    className="h-full transition-all duration-200 hover:bg-muted/30 border-border"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="pt-8 border-t border-border">
            <NewsletterSignup source="projects" />
          </section>
        </div>
      )}
    </div>
  )
}
