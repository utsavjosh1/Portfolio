import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle, Code } from "lucide-react"

import { ProjectService } from "@/lib/services/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"
import { MarkdownContent } from "@/components/ui/markdown-content"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ProjectGallery } from "@/components/project-gallery"
import { OGImages } from "@/lib/og-image"

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

  const technologies = project.technologies.map((pt: any) => pt.technology.name)
  const ogImageUrl = OGImages.project(project.title, project.description, technologies)

  return {
    title: `${project.title} | Utsav Joshi`,
    description: project.description,
    keywords: `${project.title}, ${technologies.join(', ')}, web development, portfolio`,
    openGraph: {
      title: `${project.title} | Utsav Joshi`,
      description: project.description,
      url: `https://www.joshiutsav.com/projects/${project.slug}`,
      siteName: "Utsav Joshi Portfolio",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project by Utsav Joshi`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Utsav Joshi`,
      description: project.description,
      images: [ogImageUrl],
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
    .slice(0, 2)
    .map(p => ({
      title: p.title,
      description: p.description,
      image: p.image || "/placeholder.svg",
      tags: p.technologies.map((pt: any) => pt.technology.name),
      link: `/projects/${p.slug}`
    }))

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <div className="animate-in fade-in-50 duration-300">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted/50 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Video Section */}
      {project.video && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-background via-muted/10 to-muted/20 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="relative p-8 md:p-16">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Project Demo & Setup</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Watch how to set up and run this application
                </p>
              </div>
              
              <div className="relative group max-w-4xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-muted/20 to-muted/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-2xl bg-background">
                  <video
                    src={project.video}
                    controls
                    className="w-full h-full object-cover"
                    poster={project.image || "/placeholder.svg"}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-background via-muted/10 to-muted/20 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="relative p-8 md:p-16 space-y-10">
          {/* Project Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{project.year}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="capitalize">{project.status.toLowerCase()}</span>
            </div>
          </div>

          {/* Project Title and Description */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              {project.description}
            </p>
          </div>
          
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((pt: any, index: number) => (
              <Badge 
                key={pt.technology.name} 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium hover:bg-muted transition-colors animate-in fade-in-50 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pt.technology.name}
              </Badge>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.demo && (
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-3 px-8 py-6 text-base font-medium hover:scale-105 transition-all duration-200">
                  <ExternalLink className="h-5 w-5" />
                  Live Demo
                </Button>
              </Link>
            )}
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-3 px-8 py-6 text-base font-medium hover:bg-muted hover:scale-105 transition-all duration-200">
                  <Github className="h-5 w-5" />
                  View Code
                </Button>
              </Link>
            )}
            {!project.github && (
              <Button variant="outline" size="lg" className="gap-3 px-8 py-6 text-base font-medium opacity-50 cursor-not-allowed" disabled>
                <Github className="h-5 w-5" />
                Private Repository
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Project Image Section */}
      {project.image && (
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-muted/20 to-muted/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-2xl bg-background">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      )}

      {/* Overview Section */}
      {project.content && (
        <Card className="border-border shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-foreground rounded-sm" />
              </div>
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <MarkdownContent 
              content={project.content} 
              className="text-foreground prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
            />
          </CardContent>
        </Card>
      )}

      {/* Technologies Section */}
      {project.technologies && project.technologies.length > 0 && (
        <Card className="border-border shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Code className="h-4 w-4 text-foreground" />
              </div>
              Technologies Used
            </CardTitle>
            <p className="text-muted-foreground">Tech stack and tools that power this project</p>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6 grid grid-cols-2 gap-4">
              {project.technologies.map((pt: any, index: number) => (
                <div 
                  key={pt.technology.name} 
                  className="group p-6 rounded-2xl border border-border bg-background hover:bg-muted/30 hover:border-muted-foreground/20 transition-all hover:shadow-md hover:-translate-y-1 animate-in fade-in-50 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-muted group-hover:bg-foreground/10 flex items-center justify-center transition-colors duration-300 overflow-hidden border border-border">
                      {pt.technology.image ? (
                        <Image
                          src={pt.technology.image}
                          alt={pt.technology.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-foreground rounded-md" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className="font-semibold text-foreground text-xl group-hover:text-foreground transition-colors">
                        {pt.technology.name}
                      </h4>
                      {pt.technology.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {pt.technology.description}
                        </p>
                      )}
                      {pt.technology.category && (
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wide font-medium bg-muted/50 px-3 py-1 rounded-full inline-block">
                          {pt.technology.category}
                        </div>
                      )}
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
        <Card className="border-border shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-400">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Project Gallery</CardTitle>
            <p className="text-muted-foreground">Screenshots and previews of the application</p>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <ProjectGallery images={project.gallery} projectTitle={project.title} />
          </CardContent>
        </Card>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Card className="border-border shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Related Projects</CardTitle>
            <p className="text-muted-foreground">Explore more of my work</p>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid gap-8 md:grid-cols-2">
              {relatedProjects.map((relatedProject, index) => (
                <div
                  key={relatedProject.title}
                  className="animate-in fade-in-50 duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <ProjectCard
                    title={relatedProject.title}
                    description={relatedProject.description}
                    image={relatedProject.image}
                    tags={relatedProject.tags}
                    link={relatedProject.link}
                    className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <section className="pt-12 border-t border-border animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-700">
        <NewsletterSignup source={`project-${project.slug}`} />
      </section>
    </div>
  )
} 