import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OGImages } from "@/lib/og-image";
import { TechStackCarousel } from "@/components/tech-stack-carousel";
import { ProjectCard } from "@/components/project-card";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ArrowUpIcon,
} from "@/components/animated-icons";

export const metadata: Metadata = {
  title: "Utsav Joshi — Software Engineer",
  description:
    "Software engineer building AI, automation tools and scalable web systems.",
  keywords:
    "software engineer, AI, automation, React, Next.js, Golang, Sentinel, Postly",
  openGraph: {
    title: "Utsav Joshi — Software Engineer",
    description:
      "Software engineer building AI products and automation systems.",
    url: "https://www.joshiutsav.com",
    images: [{ url: OGImages.home(), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi — Software Engineer",
    description: "Building AI, automations and scalable systems.",
    images: [OGImages.home()],
  },
  robots: { index: true, follow: true },
};

import { cacheLife } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("minutes");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="page-container relative">
        {/* Decorative Grid Background - Subtle */}
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Hero Section */}
        <section className="pt-20 pb-24 md:pt-48 md:pb-32 space-y-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between animate-fade-in-up">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-2 border-muted">
                <Image
                  src="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
                  alt="Utsav Joshi"
                  fill
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Utsav Joshi
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Available for new opportunities</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/utsavjosh1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50"
              >
                <GithubIcon className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/utsavjosh1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50"
              >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:hello@joshiutsav.com"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50"
              >
                <MailIcon className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="max-w-2xl space-y-6 animate-fade-in-up-delay">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Building high-performance{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
                systems
              </span>{" "}
              & intelligence.
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[60ch]">
              I engineer robust backend systems, scalable automation tools, and
              AI-driven solutions. My focus is on{" "}
              <span className="text-foreground font-medium">
                speed, efficiency, and invisible UI
              </span>
              .
            </p>

            <div className="pt-4">
              <Button
                asChild
                className="rounded-full px-8 h-12 text-base shadow-glow-sm hover:shadow-glow transition-all"
              >
                <Link href="#projects">
                  View Work
                  <ArrowUpIcon className="ml-2 h-4 w-4 rotate-90" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section id="projects" className="py-20 space-y-12">
          <div className="flex items-end justify-between border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
            <span className="text-muted-foreground text-sm font-mono hidden sm:block">
              01 — 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ProjectCard
              title="Sentinel"
              description="A high-performance system monitoring tool designed for real-time metrics and zero-latency alerts. Built with Go for raw speed and efficiency."
              tags={["Go", "Real-time", "Systems Programming", "InfluxDB"]}
              featured={true}
              github="https://github.com/utsavjosh1/sentinel"
            />

            <ProjectCard
              title="Postly"
              description="Advanced job scraping platform capable of handling millions of records with intelligent parsing and categorization."
              tags={["Python", "Scraping", "Celery", "PostgreSQL"]}
            />

            <ProjectCard
              title="Learnest"
              description="A modern Learning Management System (LMS) focused on intuitive UX and seamless content delivery."
              tags={["Next.js", "TypeScript", "Prisma", "Stripe"]}
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Technical Arsenal
            </h2>
            <p className="text-muted-foreground max-w-[40ch]">
              The tools and technologies I use to build world-class software.
            </p>
          </div>

          <TechStackCarousel />
        </section>

        {/* Contact/Footer Call to Action */}
        <section className="py-24 border-t">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to build something <br />
              extraordinary?
            </h2>
            <p className="text-muted-foreground max-w-[50ch] text-lg">
              I'm always open to discussing new projects, opportunities, or just
              chatting about tech.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-14 text-lg"
            >
              <Link href="mailto:hello@joshiutsav.com">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
