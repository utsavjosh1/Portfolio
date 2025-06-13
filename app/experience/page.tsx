import type { Metadata } from "next"
import { ExperienceItem } from "@/components/experience-item"

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience and career journey in web development.",
}

const experiences = [
  {
    company: "Tech Innovations Inc.",
    position: "Senior Frontend Developer",
    period: "2021 - Present",
    description:
      "Led the development of the company's flagship product, improving performance by 40% and implementing new features that increased user engagement. Mentored junior developers and established best practices for the frontend team.",
  },
  {
    company: "Digital Solutions Ltd.",
    position: "Full-Stack Developer",
    period: "2018 - 2021",
    description:
      "Worked on multiple client projects using React, Node.js, and AWS, delivering solutions on time and within budget. Implemented CI/CD pipelines that reduced deployment time by 60%.",
  },
  {
    company: "Creative Web Agency",
    position: "Frontend Developer",
    period: "2016 - 2018",
    description:
      "Developed responsive websites and web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs and improve user experience.",
  },
  {
    company: "Startup Ventures",
    position: "Junior Web Developer",
    period: "2014 - 2016",
    description:
      "Built and maintained websites using HTML, CSS, JavaScript, and PHP. Assisted in the development of the company's internal tools and client management system.",
  },
]

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground mt-2">My professional journey and career highlights.</p>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.company}
            company={experience.company}
            position={experience.position}
            period={experience.period}
            description={experience.description}
          />
        ))}
      </div>
    </div>
  )
}
