import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronDown,
  Dot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { TechStackCarousel } from "@/components/tech-stack-carousel";
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { ProjectService } from "@/lib/query/projects";
import { OGImages } from "@/lib/og-image";
import type { Project } from "@/types";

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

export const revalidate = 300;

export default async function Home() {
  let featuredProjects: Project[] = [];

  try {
    featuredProjects = await ProjectService.getFeaturedProjects();
  } catch (error) {
    console.error("Failed to load featured projects:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-full overflow-hidden border border-border/50">
                  <Image
                    src="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
                    alt="Utsav Joshi"
                    width={64}
                    height={64}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Utsav Joshi</h1>
                <p className="text-muted-foreground">Software Engineer</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Remote</span>
                  <Dot className="h-3 w-3" />
                  <span>Available</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Building AI & automation <br />
                tools that{" "}
                <span className="text-muted-foreground">solve problems</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                I specialize in creating scalable systems and AI-driven products
                that make a real impact. Currently focused on automation, web
                development, and exploring system-level programming with Go.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com/utsavjosh1"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/utsavjosh1/"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center pt-12">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-xs uppercase tracking-wider">
                  Scroll to explore
                </span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects. Each project
              demonstrates different skills and technologies.
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.description}
                  image={project.image || "/placeholder.svg"}
                  tags={project.technologies.map(
                    (tech) => tech.technology.name
                  )}
                  link={`/projects/${project.slug}`}
                  priority={index < 3}
                  className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border/50 bg-card"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No featured projects found.
            </div>
          )}
        </div>
      </section>

      {/* About Me + Tech Stack */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Passionate about building innovative solutions that bridge
              technology and real-world impact.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-center space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Hi! I&apos;m Utsav Joshi, a passionate Software Engineer with over{" "}
              <strong className="text-foreground">
                1 year of professional experience
              </strong>{" "}
              and 3 years of hands-on involvement in the tech field.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I specialize in building scalable systems, automation tools, and
              AI-driven products that solve real-world problems. Currently
              learning <strong className="text-foreground">Golang</strong> to
              expand my backend expertise.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Technologies I Work With</h3>
            <TechStackCarousel />
          </div>

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/about">
                Learn more about me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I&apos;m always excited to work on interesting projects and
            collaborate with talented people. Let&apos;s discuss how we can bring
            your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">Read my blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Data */}
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
