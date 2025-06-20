import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";
import { ExperienceItem } from "@/components/experience-item";
import { BlogPostPreview } from "@/components/blog-post-preview";
import { ProjectService } from "@/lib/services/projects";
import { BlogService } from "@/lib/services/blog";
import { ExperienceService } from "@/lib/services/experience";
import { OGImages } from "@/lib/og-image";

export const metadata: Metadata = {
  title: "Utsav Joshi | Full-Stack Developer",
  description:
    "Portfolio of Utsav Joshi, a full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: "developer, portfolio, web development, React, Next.js, full-stack",
  openGraph: {
    title: "Utsav Joshi | Full-Stack Developer",
    description:
      "Portfolio of Utsav Joshi, a full-stack developer specializing in React, Next.js, and modern web technologies.",
    url: "https://www.joshiutsav.com",
    siteName: "Utsav Joshi Portfolio",
    images: [
      {
        url: OGImages.home(),
        width: 1200,
        height: 630,
        alt: "Utsav Joshi Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi | Full-Stack Developer",
    description:
      "Portfolio of Utsav Joshi, a full-stack developer specializing in React, Next.js, and modern web technologies.",
    images: [OGImages.home()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Home() {
  // Fetch dynamic data from database
  const featuredProjectsData = await ProjectService.getFeaturedProjects();
  const featuredProjects = featuredProjectsData.slice(0, 2).map(project => ({
    title: project.title,
    description: project.description,
    image: project.image || "/images/project-placeholder.jpg",
    tags: project.technologies.map((pt: any) => pt.technology.name),
    link: `/projects/${project.slug}`
  }));
  
  const recentPosts = await BlogService.getRecentPosts(2);
  const recentExperiences = await ExperienceService.getRecentExperiences(2);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary">
            <Image
              src="https://avatars.githubusercontent.com/u/98454866?s=400&u=cf6b7cebb0f7ac602a9bc5b40ab2e4bae5dce048&v=4"
              alt="Utsav Joshi"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Utsav Joshi</h1>
            <p className="text-muted-foreground">Full-Stack Developer</p>
          </div>
        </div>

        <p className="max-w-prose text-lg">
          I build accessible, user-friendly web applications with modern
          technologies. Focused on creating elegant solutions to complex
          problems.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>

        <div className="flex gap-4">
          <Link
            href="https://github.com/utsavjosh1"
            aria-label="GitHub profile"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/utsavjosh1/"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link href="mailto:hi@joshiutsav.com" aria-label="Email contact">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
      </section>

      <Separator />

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Featured Projects
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
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

      <Separator />

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/experience">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {recentExperiences.length > 0 ? (
            recentExperiences.map((experience) => (
              <ExperienceItem
                key={experience.id}
                company={experience.company}
                position={experience.position}
                period={experience.current 
                  ? `${experience.startDate.getFullYear()} - Present`
                  : `${experience.startDate.getFullYear()} - ${experience.endDate?.getFullYear() || 'Present'}`
                }
                description={experience.description || ''}
              />
            ))
          ) : (
            // Fallback static data when no experiences in database
            <>
              <ExperienceItem
                company="Nextbill"
                position="Software Engineer"
                period="2023 - Present"
                description="Led the development of the company's flagship product, improving performance by 40% and implementing new features that increased user engagement."
              />
              <ExperienceItem
                company="IIT Madras"
                position="Backend Developer"
                period="3 months"
                description="Worked on multiple research projects using React, Node.js, and AWS, delivering solutions on time and within budget."
              />
            </>
          )}
        </div>
      </section>

      <Separator />

      {/* Blog Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Latest Articles
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              View blog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {recentPosts.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <div className="text-4xl">📝</div>
              <h3 className="text-lg font-semibold">Blog Coming Soon</h3>
              <p className="text-muted-foreground">
                I'm currently working on some awesome articles about authentication, 
                security best practices, and modern web development. Stay tuned for 
                in-depth guides coming soon!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  JWT vs Sessions
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  OAuth 2.0
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Zero-Trust Auth
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  API Security
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {recentPosts.map((post, index) => (
              <div
                key={post.slug}
                className="group animate-in fade-in-50 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogPostPreview
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]}
                  slug={post.slug}
                  className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
