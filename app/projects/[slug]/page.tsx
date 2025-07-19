/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Code } from "lucide-react"

import { ProjectService } from "@/lib/services/projects"
import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Back Navigation */}
          <div style={{ animation: `fadeInUp 0.6s ease-out both` }}>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted/50 transition-colors -ml-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="space-y-12" style={{ animation: `fadeInUp 0.6s ease-out 0.1s both` }}>
            <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span className="capitalize">{project.status.toLowerCase()}</span>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.demo && (
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-3">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.github && (
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-3">
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                </Link>
              )}
              {!project.github && (
                <Button variant="outline" size="lg" className="gap-3 opacity-50 cursor-not-allowed" disabled>
                  <Github className="h-4 w-4" />
                  Private Repository
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.technologies.map((pt: any, index: number) => (
                <Badge 
                  key={pt.technology.name} 
                  variant="secondary" 
                  className="px-3 py-1.5"
                  style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.05}s both` }}
                >
                  {pt.technology.name}
                </Badge>
              ))}
            </div>
          </section>

          {/* Project Image */}
          {project.image && (
            <section style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }}>
              <div className="relative group max-w-4xl mx-auto">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority
                  />
                </div>
              </div>
            </section>
          )}

          {/* Video Section */}
          {project.video && (
            <section style={{ animation: `fadeInUp 0.6s ease-out 0.4s both` }}>
              <div className="space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold">Demo Video</h2>
                <div className="relative group">
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-background">
                    <video
                      src={project.video}
                      controls
                      className="w-full h-full object-cover"
                      poster={project.image || "/placeholder.svg"}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Overview Section */}
          {project.content && (
            <section className="space-y-8 max-w-4xl mx-auto" style={{ animation: `fadeInUp 0.6s ease-out 0.5s both` }}>
              <h2 className="text-2xl sm:text-3xl font-bold">Overview</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownContent 
                  content={project.content} 
                  className="text-muted-foreground leading-relaxed"
                />
              </div>
            </section>
          )}

          {/* Technologies Section */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="space-y-8" style={{ animation: `fadeInUp 0.6s ease-out 0.6s both` }}>
              <div className="space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">Technologies</h2>
                <p className="text-muted-foreground">Tech stack and tools that power this project</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.technologies.map((pt: any, index: number) => (
                  <div 
                    key={pt.technology.name} 
                    className="group p-6 rounded-xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:-translate-y-1"
                    style={{ animation: `fadeInUp 0.6s ease-out ${0.7 + index * 0.1}s both` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border border-border/30">
                        {pt.technology.image ? (
                          <Image
                            src={pt.technology.image}
                            alt={pt.technology.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Code className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {pt.technology.name}
                        </h4>
                        {pt.technology.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {pt.technology.description}
                          </p>
                        )}
                        {pt.technology.category && (
                          <div className="text-xs text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-md inline-block">
                            {pt.technology.category}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-8" style={{ animation: `fadeInUp 0.6s ease-out 0.8s both` }}>
              <div className="space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">Gallery</h2>
                <p className="text-muted-foreground">Screenshots and previews of the application</p>
              </div>
              <ProjectGallery images={project.gallery} projectTitle={project.title} />
            </section>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="space-y-8" style={{ animation: `fadeInUp 0.6s ease-out 0.9s both` }}>
              <div className="space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">Related Projects</h2>
                <p className="text-muted-foreground">Explore more of my work</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((relatedProject, index) => (
                  <div
                    key={relatedProject.title}
                    style={{ animation: `fadeInUp 0.6s ease-out ${1.0 + index * 0.1}s both` }}
                  >
                    <ProjectCard
                      title={relatedProject.title}
                      description={relatedProject.description}
                      image={relatedProject.image}
                      tags={relatedProject.tags}
                      link={relatedProject.link}
                      className="h-full border-border/50"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <section className="pt-8 border-t border-border/50 max-w-4xl mx-auto" style={{ animation: `fadeInUp 0.6s ease-out 1.1s both` }}>
            <NewsletterSignup source={`project-${project.slug}`} />
          </section>
        </div>
      </div>
    </div>
  )
} 