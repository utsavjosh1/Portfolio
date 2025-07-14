import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";
import { ExperienceItem } from "@/components/experience-item";
import { BlogPostPreview } from "@/components/blog-post-preview";
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { TechStackCarousel } from "@/components/tech-stack-carousel";
import { HomepageService } from "@/lib/services/homepage";
import { OGImages } from "@/lib/og-image";

export const metadata: Metadata = {
  title: "Utsav Joshi | Software Engineer",
  description:
    "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
  keywords:
    "software engineer, portfolio, AI, automation, web development, React, Next.js, full-stack, JobHaunt, QuizGPT",
  openGraph: {
    title: "Utsav Joshi | Software Engineer",
    description:
      "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
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
    title: "Utsav Joshi | Software Engineer",
    description:
      "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
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

// Optimized ISR: Cache for 5 minutes in production, immediate in dev
export const revalidate = process.env.NODE_ENV === "production" ? 300 : 0;

// Empty state component
function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-16 border border-dashed border-border/50 rounded-xl bg-muted/20">
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground/80">{description}</p>
      </div>
    </div>
  );
}

export default async function Home() {
  // Use optimized service with aggressive caching
  let data;
  try {
    data = await HomepageService.getHomepageData();
  } catch (error) {
    console.error("Failed to load homepage data:", error);
    // Fallback to empty data to prevent page crash
    data = {
      featuredProjects: [],
      recentPosts: [],
      recentExperiences: [],
    };
  }

  const { featuredProjects, recentPosts, recentExperiences } = data;

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section - Minimal and Elegant */}
      <section className="relative">
        <div className="text-center space-y-8 sm:space-y-12">
          {/* Profile Image */}
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 mx-auto overflow-hidden rounded-full border-2 border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
                alt="Utsav Joshi"
                width={128}
                height={128}
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 96px, 128px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLm4QfxkUy2+qNM3CoURYFhX6ZuBOUkLwF5YXTyWBz6UGg/9k="
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Utsav Joshi
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Software Engineer building AI & Automation tools
              </p>
            </div>

            {/* Location and Availability */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Remote</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Available for work</span>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground">
              I build{" "}
              <span className="text-foreground font-medium">
                scalable systems
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">
                AI-driven products
              </span>{" "}
              that solve real-world problems.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact" prefetch={true}>
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/projects" prefetch={true}>
                View my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="https://github.com/utsavjosh1"
              aria-label="GitHub profile"
              className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 group"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/utsavjosh1/"
              aria-label="LinkedIn profile"
              className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 group"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="mailto:hi@joshiutsav.com"
              aria-label="Email contact"
              className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 group"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            A diverse tech stack powering modern, scalable solutions across
            frontend, backend, and AI domains.
          </p>
        </div>
        <TechStackCarousel />
      </section>

      {/* About Me Section */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about building innovative solutions that bridge
            technology and real-world impact.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-8 text-center">
              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                Hi! I&apos;m Utsav Joshi, a passionate Software Engineer with over{" "}
                <strong className="text-foreground">
                  1 year of professional experience
                </strong>{" "}
                and 3 years of hands-on involvement in the tech field.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                During this time, I&apos;ve worked with clients, contributed to
                impactful projects, and continuously expanded my knowledge. I&apos;m
                currently focused on building scalable systems, automation
                tools, and AI-driven products that solve real-world problems.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                When I&apos;m not coding, I&apos;m exploring new technologies or diving
                deep into system design. Currently learning{" "}
                <strong className="text-foreground">Golang</strong> to explore
                system-level programming and expand my backend expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16 opacity-50" />

      {/* Featured Projects Section */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A selection of projects I&apos;m most proud of, showcasing different
            aspects of my expertise.
          </p>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <div
                key={project.slug}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image || "/placeholder.svg"}
                  tags={project.technologies}
                  link={`/projects/${project.slug}`}
                  priority={index < 2}
                  className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border/50 bg-card"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No featured projects yet"
            description="Featured projects will appear here once they are added to the portfolio."
          />
        )}

        {/* <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects" prefetch={true}>
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </section>

      <Separator className="my-16 opacity-50" />

      {/* Experience Section */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                          My professional journey and the impact I&apos;ve made along the way.
          </p>
        </div>

        {recentExperiences.length > 0 ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            {recentExperiences.map((experience, index) => (
              <div
                key={experience.id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <ExperienceItem
                  company={experience.company}
                  position={experience.position}
                  period={
                    experience.current
                      ? `${experience.startDate.getFullYear()} - Present`
                      : `${experience.startDate.getFullYear()} - ${
                          experience.endDate?.getFullYear() || "Present"
                        }`
                  }
                  description={experience.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No work experience added yet"
            description="Professional experience and work history will be displayed here."
          />
        )}

        {/* <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/experience" prefetch={true}>
              View full experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </section>

      <Separator className="my-16 opacity-50" />

      {/* Latest Writing Section */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Latest Writing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights on web development and technology.
          </p>
        </div>

        {recentPosts.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {recentPosts.map((post, index) => (
              <div
                key={post.slug}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <BlogPostPreview
                  title={post.title}
                  excerpt={post.excerpt}
                  date={
                    post.publishedAt?.toISOString().split("T")[0] ||
                    post.createdAt.toISOString().split("T")[0]
                  }
                  slug={post.slug}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No blog posts yet"
            description="Latest blog posts and articles will appear here once published."
          />
        )}

        {/* <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog" prefetch={true}>
              Read all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </section>

      {/* Structured Data for SEO */}
      <PersonStructuredData
        name="Utsav Joshi"
        jobTitle="Software Engineer"
        url="https://www.joshiutsav.com"
        image="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
        email="hi@joshiutsav.com"
        location="Remote"
        description="Software Engineer specializing in AI, automation, and building scalable web systems with React and Next.js."
        sameAs={[
          "https://github.com/utsavjosh1",
          "https://www.linkedin.com/in/utsavjosh1/",
        ]}
      />

      <WebsiteStructuredData />
    </div>
  );
}
