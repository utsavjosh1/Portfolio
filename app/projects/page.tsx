import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { ProjectService } from "@/lib/services/projects"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { NoProjects } from "@/components/no-projects"

export const metadata: Metadata = {
  title: "Projects - Utsav Joshi",
  description: "A curated collection of my work, side projects, and experiments showcasing modern web development and innovative solutions.",
}

// ISR Configuration for projects page
export const revalidate = 3600;

export default async function ProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let projectsData: any = {
    allProjects: [],
    featuredProjects: [],
    completedProjects: [],
    totalProjects: 0
  };

  try {
    // Optimized: Single database query with error handling
    const data = await ProjectService.getProjectsPageData();
    projectsData = data;
  } catch (error) {
    console.warn('Failed to fetch projects data:', error);
    // Continue with empty data
  }

  const { allProjects, featuredProjects, totalProjects } = projectsData;

  // Check if there are no published projects
  const hasNoProjects = totalProjects === 0;

  // Transform projects to match ProjectCard interface (optimized)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformProject = (project: any) => ({
    title: project.title,
    description: project.description,
    image: project.image || "/placeholder.svg",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: project.technologies.map((pt: any) => pt.technology.name),
    link: `/projects/${project.slug}`,
    priority: false
  })

  const transformedFeaturedProjects = featuredProjects.map(transformProject)
  const transformedAllProjects = allProjects.map(transformProject)

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Minimal Hero Section */}
      <section className="text-center space-y-6 sm:space-y-8 py-12 sm:py-16">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated collection of my work showcasing modern web development and innovative solutions.
          </p>
        </div>

        {/* Clean Stats */}
        {!hasNoProjects && (
          <div className="flex items-center justify-center gap-8 sm:gap-12 pt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{totalProjects}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            {featuredProjects.length > 0 && (
              <>
                <div className="w-px h-10 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{featuredProjects.length}</div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {hasNoProjects ? (
        <NoProjects />
      ) : (
        <div className="space-y-16 sm:space-y-20">
          {/* Featured Projects */}
          {transformedFeaturedProjects.length > 0 && (
            <section className="space-y-8 sm:space-y-12">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Work</h2>
                <p className="text-muted-foreground">My most impactful and innovative projects</p>
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {transformedFeaturedProjects.map((project: any, index: number) => (
                  <div
                    key={project.link}
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      link={project.link}
                      priority={index < 3}
                      className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Projects (if different from featured) */}
          {transformedAllProjects.length > transformedFeaturedProjects.length && (
            <section className="space-y-8 sm:space-y-12">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">All Projects</h2>
                <p className="text-muted-foreground">Exploring ideas and building solutions</p>
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                {transformedAllProjects
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .filter((project: any) => !transformedFeaturedProjects.some((featured: any) => featured.link === project.link))
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map((project: any, index: number) => (
                    <div
                      key={project.link}
                      style={{ 
                        animation: `fadeInUp 0.6s ease-out ${(index + transformedFeaturedProjects.length) * 0.1}s both`
                      }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        link={project.link}
                        priority={false}
                        className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Newsletter Section */}
          <section className="pt-8 sm:pt-12 border-t border-border/50">
            <NewsletterSignup source="projects" />
          </section>
        </div>
      )}
    </div>
  )
}
