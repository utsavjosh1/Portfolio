import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

import { ProjectService } from "@/lib/services/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"
import { MarkdownContent } from "@/components/ui/markdown-content"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await ProjectService.getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} - Utsav Joshi`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export async function generateStaticParams() {
  const projects = await ProjectService.getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await ProjectService.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Get related projects (other featured projects)
  const allProjects = await ProjectService.getAllProjects()
  const relatedProjects = allProjects
    .filter(p => p.slug !== project.slug && p.featured)
    .slice(0, 3)
    .map(p => ({
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.technologies.map((pt: any) => pt.technology.name),
      link: `/projects/${p.slug}`
    }))

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative p-8 md:p-12 space-y-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((pt: any) => (
                  <Badge key={pt.technology.name} variant="secondary" className="px-3 py-1">
                    {pt.technology.name}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {project.demo && (
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                )}
                {project.github && (
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="gap-2 border-2 hover:bg-muted">
                      <Github className="h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {project.content && (
        <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardContent className="p-8">
            <MarkdownContent 
              content={project.content} 
              className="text-foreground"
            />
          </CardContent>
        </Card>
      )}

      {/* Technologies Section */}
      {project.technologies && project.technologies.length > 0 && (
        <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Technologies Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.technologies.map((pt: any) => (
                <div key={pt.technology.name} className="group p-4 rounded-xl border border-border/50 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {pt.technology.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {pt.technology.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Project Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image: string, index: number) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Stats */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <CardContent className="p-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {project.year}
              </div>
              <div className="text-sm text-muted-foreground">Year</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {project.status}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {project.technologies.length}
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject.title}
                  title={relatedProject.title}
                  description={relatedProject.description}
                  image={relatedProject.image}
                  tags={relatedProject.tags}
                  link={relatedProject.link}
                  className="h-full"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 