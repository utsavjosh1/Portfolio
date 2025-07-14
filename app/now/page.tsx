import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Book, Code, Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Now | Utsav Joshi",
  description: "What I&apos;m working on right now - current projects, learning, and life updates.",
      openGraph: {
      title: "Now - Utsav Joshi",
      description: "What I&apos;m working on right now - current projects, learning, and life updates.",
    url: "https://www.joshiutsav.com/now",
  },
      twitter: {
      card: "summary_large_image",
      title: "Now | Utsav Joshi",
      description: "What I&apos;m working on right now - current projects, learning, and life updates.",
  },
};

// ISR Configuration
export const revalidate = 86400; // 24 hours - updated less frequently

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export default function NowPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl -z-10" />
        <div className="relative px-6 py-16 text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {currentDate}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              What I&apos;m doing now
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A glimpse into my current projects, learning journey, and what&apos;s keeping me busy these days.
              Inspired by <Link href="https://nownownow.com" className="underline hover:no-underline" target="_blank">nownownow.com</Link>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Remote</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Currently available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Projects */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
                            Projects I&apos;m Working On
          </h2>
                      <p className="text-muted-foreground">What I&apos;m actively building and shipping.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            title="JobHaunt"
            description="An AI-powered job scraper bot to help streamline job discovery and applications."
            tags={["AI", "Automation", "Scraping"]}
            variant="compact"
            showHoverEffect={false}
          />
          <ProjectCard
            title="QuizGPT"
            description="A microservice designed for generating quizzes using AI, part of my B2B SaaS CMS product."
            tags={["AI", "SaaS", "Microservice"]}
            variant="compact"
            showHoverEffect={false}
          />
          <ProjectCard
            title="Learnest"
            description="A content management system for coaching institutes, built for scalability and ease of use."
            tags={["SaaS", "CMS", "B2B"]}
            variant="compact"
            showHoverEffect={false}
          />
          <ProjectCard
            title="LeadGen Scraper"
            description="A custom lead generation scraper targeting business growth and outreach automation."
            tags={["Automation", "Lead Generation", "Scraping"]}
            variant="compact"
            showHoverEffect={false}
          />
        </div>
      </section>

      <Separator />

      {/* Learning */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            Currently Learning
          </h2>
                      <p className="text-muted-foreground">Skills and technologies I&apos;m diving deep into.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border rounded-xl space-y-3">
            <h3 className="font-semibold">Golang</h3>
            <p className="text-sm text-muted-foreground">
              Exploring system-level programming and performance-first backend services.
            </p>
          </div>
          <div className="p-6 border rounded-xl space-y-3">
            <h3 className="font-semibold">System Design</h3>
            <p className="text-sm text-muted-foreground">
              Deepening my understanding of scalable architecture patterns, 
              microservices, and distributed systems.
            </p>
          </div>
          <div className="p-6 border rounded-xl space-y-3">
            <h3 className="font-semibold">AI & Vector Search</h3>
            <p className="text-sm text-muted-foreground">
              Working with OpenAI, LangChain, and Pinecone to build intelligent applications.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Life Updates */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary" />
            Life Updates
          </h2>
                      <p className="text-muted-foreground">What&apos;s happening in my world outside of code.</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
                          I&apos;m currently based remotely and enjoying the flexibility it provides.
              When I&apos;m not coding, you&apos;ll find me exploring new coffee shops, 
            reading about technology trends, or planning my next travel adventure.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 border-t">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Want to work together?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
                          I&apos;m always open to discussing interesting projects and opportunities.
              Let&apos;s chat about how we can create something amazing together.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

 