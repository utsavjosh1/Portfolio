import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { ProjectService } from "@/lib/services/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Projects - Utsav Joshi",
  description: "A curated collection of my work, side projects, and experiments showcasing modern web development and innovative solutions.",
}

export default async function ProjectsPage() {
  const featuredProjects = await ProjectService.getFeaturedProjects()
  const allProjects = await ProjectService.getAllProjects()
  const totalProjects = allProjects.length
  const completedProjects = (await ProjectService.getProjectsByStatus('COMPLETED')).length

  // Transform data to match ProjectCard interface
  const transformedFeaturedProjects = featuredProjects.map(project => ({
    title: project.title,
    description: project.description,
    image: project.image,
    tags: project.technologies.map((pt: any) => pt.technology.name),
    link: `/projects/${project.slug}`
  }))

  const transformedAllProjects = allProjects.map(project => ({
    title: project.title,
    description: project.description,
    image: project.image,
    tags: project.technologies.map((pt: any) => pt.technology.name),
    link: `/projects/${project.slug}`
  }))

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl -z-10" />
        <div className="relative px-8 py-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated collection of my work, side projects, and experiments showcasing modern web development and innovative solutions.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalProjects}</div>
              <div className="text-muted-foreground">Total Projects</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{completedProjects}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{featuredProjects.length}</div>
              <div className="text-muted-foreground">Featured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {transformedFeaturedProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground">Highlighting my most impactful and innovative work</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {transformedFeaturedProjects.length} Featured
            </Badge>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {transformedFeaturedProjects.map((project, index) => (
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
                  className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
            <p className="text-muted-foreground">Explore my complete portfolio of work</p>
          </div>
          <div className="flex gap-2">
            {/* Filter buttons could be added here */}
            <Button variant="outline" size="sm">
              All ({totalProjects})
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {transformedAllProjects.map((project, index) => (
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
                className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:border-primary/20"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-none">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-xl font-semibold">Have a project in mind?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            I'm always interested in working on new and exciting projects. Let's discuss how we can bring your ideas to life.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Start a Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
