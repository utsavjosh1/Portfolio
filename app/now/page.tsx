import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, MapPin, Book, Code, Coffee, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Now | Utsav Joshi",
  description: "What I'm working on right now - current projects, learning, and life updates.",
  openGraph: {
    title: "Now - Utsav Joshi",
    description: "What I'm working on right now - current projects, learning, and life updates.",
    url: "https://www.joshiutsav.com/now",
  },
  twitter: {
    card: "summary_large_image",
    title: "Now | Utsav Joshi",
    description: "What I'm working on right now - current projects, learning, and life updates.",
  },
}

export const revalidate = 86400 // 24 hours

const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

const currentProjects = [
  {
    title: "JobHaunt",
    description: "An AI-powered job scraper bot to help streamline job discovery and applications.",
    tags: ["AI", "Automation", "Scraping"],
    status: "Active Development",
    progress: 75,
    link: "https://jobhaunt.com",
  },
  {
    title: "QuizGPT",
    description: "A microservice designed for generating quizzes using AI, part of my B2B SaaS CMS product.",
    tags: ["AI", "SaaS", "Microservice"],
    status: "Beta Testing",
    progress: 90,
    link: "https://quizgpt.ai",
  },
  {
    title: "Learnest",
    description: "A content management system for coaching institutes, built for scalability and ease of use.",
    tags: ["SaaS", "CMS", "B2B"],
    status: "Planning",
    progress: 25,
  },
  {
    title: "LeadGen Scraper",
    description: "A custom lead generation scraper targeting business growth and outreach automation.",
    tags: ["Automation", "Lead Generation", "Scraping"],
    status: "Active Development",
    progress: 60,
  },
]

const learningItems = [
  {
    title: "Golang",
    description: "Exploring system-level programming and performance-first backend services.",
    progress: 40,
    resources: ["Go by Example", "Effective Go", "Go Concurrency Patterns"],
  },
  {
    title: "System Design",
    description:
      "Deepening my understanding of scalable architecture patterns, microservices, and distributed systems.",
    progress: 60,
    resources: ["Designing Data-Intensive Applications", "System Design Interview"],
  },
  {
    title: "AI & Vector Search",
    description: "Working with OpenAI, LangChain, and Pinecone to build intelligent applications.",
    progress: 70,
    resources: ["LangChain Documentation", "Pinecone Vector Database", "OpenAI Cookbook"],
  },
]

export default function NowPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl -z-10" />
            <div className="relative px-6 py-16 text-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {currentDate}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">What I'm doing now</h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A glimpse into my current projects, learning journey, and what's keeping me busy these days. Inspired
                  by{" "}
                  <Link
                    href="https://nownownow.com"
                    className="underline hover:no-underline text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    nownownow.com
                  </Link>
                  .
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
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Code className="h-7 w-7 text-primary" />
                Projects I'm Working On
              </h2>
              <p className="text-muted-foreground text-lg">What I'm actively building and shipping.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {currentProjects.map((project, index) => (
                <Card key={project.title} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge
                          variant={
                            project.status === "Active Development"
                              ? "default"
                              : project.status === "Beta Testing"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      {project.link && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          {/* Learning */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Book className="h-7 w-7 text-primary" />
                Currently Learning
              </h2>
              <p className="text-muted-foreground text-lg">Skills and technologies I'm diving deep into.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {learningItems.map((item, index) => (
                <Card key={item.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Resources:</h4>
                      <ul className="space-y-1">
                        {item.resources.map((resource, resourceIndex) => (
                          <li key={resourceIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-1 w-1 bg-muted-foreground rounded-full" />
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          {/* Life Updates */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Coffee className="h-7 w-7 text-primary" />
                Life Updates
              </h2>
              <p className="text-muted-foreground text-lg">What's happening in my world outside of code.</p>
            </div>

            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  I'm currently based remotely and enjoying the flexibility it provides. When I'm not coding, you'll
                  find me exploring new coffee shops, reading about technology trends, or planning my next travel
                  adventure.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Recently, I've been fascinated by the intersection of AI and automation, which has led me to build
                  several tools that help streamline repetitive tasks. I'm also spending time contributing to open
                  source projects and sharing my learnings through blog posts.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  On the personal side, I've been reading "Designing Data-Intensive Applications" and practicing system
                  design problems. I'm also learning to play the guitar in my spare time - it's a nice creative outlet
                  from all the technical work!
                </p>
              </div>
            </Card>
          </section>

          {/* CTA */}
          <section className="text-center py-12 border-t border-border/50">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Want to work together?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
                I'm always open to discussing interesting projects and opportunities. Let's chat about how we can create
                something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/projects">
                    View my projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
