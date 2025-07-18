import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, Mail, Github, Linkedin } from "lucide-react"

const experience = [
  {
    title: "Software Engineer",
    company: "Nextbill",
    period: "2024 - Present",
    description:
      "Working on scaling internal tools and product features across the stack. Took ownership of key workflows and helped optimize document processing and user onboarding flows.",
    achievements: [
      "Built and shipped partner onboarding (frontend + backend)",
      "Implemented subuser onboarding with access control",
      "Created an OCR pipeline using Document AI to convert PDFs into structured JSON",
      "Replaced legacy PDFKit-based email system with a Puppeteer + AWS Lambda solution for dynamic email generation",
    ],
  },
  {
    title: "Backend Developer",
    company: "Crowdfunding Platform (Stealth Startup)",
    period: "2023 - 2024",
    description:
      "Handled backend systems including APIs, authentication, and database design. Helped establish secure, scalable services for a high-traffic crowdfunding platform.",
    achievements: [
      "Designed and maintained backend infrastructure",
      "Integrated secure payment and user management features",
      "Optimized API performance and database queries for large data volumes",
    ],
  },
]

const education = [
  {
    degree: "Bachelor of Computer Application",
    institution: "Indira Gandhi National Open University",
    period: "2023-2027",
    description: "ahh, not so active here..",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-border shadow-lg">
                <Image
                  src="https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/Me.jpg"
                  alt="Utsav Joshi"
                  width={128}
                  height={128}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">About Me</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Available for work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Introduction</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Hi! I'm Utsav Joshi, a passionate Software Engineer with over{" "}
                <strong className="text-foreground">1 year of professional experience</strong> and 3 years of hands-on
                involvement in the tech field. I specialize in building scalable systems, automation tools, and
                AI-driven products that solve real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                During my career, I've worked with clients across various industries, contributed to impactful projects,
                and continuously expanded my knowledge. I'm currently focused on exploring the intersection of AI and
                automation, building tools that streamline complex workflows and enhance productivity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, I'm exploring new technologies, diving deep into system design, or contributing to
                open source projects. Currently learning <strong className="text-foreground">Golang</strong> to explore
                system-level programming and expand my backend expertise.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <p className="text-muted-foreground font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="outline">{exp.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <p className="text-muted-foreground font-medium">{edu.institution}</p>
                      </div>
                      <Badge variant="outline">{edu.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact & Social */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Let's Connect</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">hi@joshiutsav.com</p>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Github className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground">@utsavjosh1</p>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Linkedin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">@utsavjosh1</p>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 border-t border-border/50">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Ready to Work Together?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I'm always excited to take on new challenges and collaborate on interesting projects. Let's discuss how
                we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/projects">View my projects</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
