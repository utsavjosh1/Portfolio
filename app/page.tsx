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

// Static fallback data for when database is unavailable
const fallbackProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.",
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "/projects/ecommerce-platform"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg", 
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "/projects/task-management"
  }
];

const fallbackPosts = [
  {
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to create performant and scalable web applications using Next.js and modern development practices.",
    slug: "scalable-nextjs-apps",
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15')
  },
  {
    title: "TypeScript Best Practices for React Developers",
    excerpt: "Discover essential TypeScript patterns and best practices that will make your React code more robust and maintainable.",
    slug: "typescript-react-best-practices", 
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10')
  }
];

const fallbackExperiences = [
  {
    id: "1",
    company: "Nextbill",
    position: "Software Engineer",
    description: "Led the development of the company's flagship product, improving performance by 40% and implementing new features that increased user engagement.",
    startDate: new Date('2023-01-01'),
    endDate: null,
    current: true,
    location: "Remote",
    website: null,
    logo: null,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2", 
    company: "IIT Madras",
    position: "Backend Developer",
    description: "Worked on multiple research projects using React, Node.js, and AWS, delivering solutions on time and within budget.",
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-04-01'),
    current: false,
    location: "Chennai, India",
    website: null,
    logo: null,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default async function Home() {
  let featuredProjects = fallbackProjects;
  let recentPosts = fallbackPosts;
  let recentExperiences = fallbackExperiences;

  try {
    // Optimized: Use parallel data fetching for better performance with error handling
    const [featuredProjectsData, postsData, experiencesData] = await Promise.allSettled([
      ProjectService.getFeaturedProjects(),
      BlogService.getRecentPosts(2),
      ExperienceService.getRecentExperiences(2)
    ]);

    // Handle featured projects
    if (featuredProjectsData.status === 'fulfilled' && featuredProjectsData.value.length > 0) {
      featuredProjects = featuredProjectsData.value.slice(0, 2).map(project => ({
        title: project.title,
        description: project.description,
        image: project.image || "/placeholder.svg",
        tags: project.technologies.map((pt: any) => pt.technology.name),
        link: `/projects/${project.slug}`
      }));
    }

    // Handle recent posts
    if (postsData.status === 'fulfilled' && postsData.value.length > 0) {
      recentPosts = postsData.value.map((post: any) => ({
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        publishedAt: post.publishedAt || new Date(),
        createdAt: post.createdAt
      }));
    }

    // Handle recent experiences
    if (experiencesData.status === 'fulfilled' && experiencesData.value.length > 0) {
      recentExperiences = experiencesData.value.map((experience: any) => ({
        id: experience.id,
        company: experience.company,
        position: experience.position,
        description: experience.description || '',
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
        location: experience.location,
        website: experience.website,
        logo: experience.logo,
        order: experience.order,
        createdAt: experience.createdAt,
        updatedAt: experience.updatedAt
      }));
    }
  } catch (error) {
    console.warn('Database unavailable during build, using fallback data:', error);
    // Continue with fallback data
  }

  return (
    <div className="space-y-16">
      {/* Hero Section - Critical Above-the-fold Content */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          {/* Optimized profile image with priority loading */}
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary flex-shrink-0">
            <Image
              src="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
              alt="Utsav Joshi"
              width={80}
              height={80}
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="80px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLm4QfxkUy2+qNM3CoURYFhX6ZuBOUkLwF5YXTyWBz6UGg/9k="
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Utsav Joshi</h1>
            <p className="text-muted-foreground">Full-Stack Developer</p>
          </div>
        </div>

        <p className="max-w-prose text-lg leading-relaxed">
          I build accessible, user-friendly web applications with modern
          technologies. Focused on creating elegant solutions to complex
          problems.
        </p>

        {/* CTA Buttons - Critical for conversion */}
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact" prefetch={true}>
              Get in touch <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects" prefetch={true}>View all projects</Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <Link
            href="https://github.com/utsavjosh1"
            aria-label="GitHub profile"
            className="transition-colors hover:text-foreground"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/utsavjosh1/"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-foreground"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link 
            href="mailto:hi@joshiutsav.com" 
            aria-label="Email contact"
            className="transition-colors hover:text-foreground"
          >
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
            <Link href="/projects" prefetch={true}>
              View all <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              priority={index < 2} // Load first 2 images with priority
              className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
          ))}
        </div>
      </section>

      <Separator />

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/experience" prefetch={true}>
              View all <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {recentExperiences.map((experience) => (
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
          ))}
        </div>
      </section>

      <Separator />

      {/* Recent Blog Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Latest Posts</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" prefetch={true}>
              View all <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <BlogPostPreview
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]}
              slug={post.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
