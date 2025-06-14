import type { Metadata } from "next"
import { ExperienceItem } from "@/components/experience-item"
import { ExperienceService } from "@/lib/services/experience"
import { OGImages } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Experience | Utsav Joshi",
  description: "My professional experience and career journey in web development.",
  openGraph: {
    title: "Experience | Utsav Joshi",
    description: "My professional experience and career journey in web development.",
    url: "https://joshiutsav.com/experience",
    siteName: "Utsav Joshi Portfolio",
    images: [
      {
        url: OGImages.experience(),
        width: 1200,
        height: 630,
        alt: "Utsav Joshi Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Utsav Joshi",
    description: "My professional experience and career journey in web development.",
    images: [OGImages.experience()],
  },
}

export default async function ExperiencePage() {
  // Fetch dynamic data from database
  const dynamicExperiences = await ExperienceService.getAllExperiences();
  
  // Fallback static data if no experiences in database
  const staticExperiences = [
    {
      id: "static-1",
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      period: "2021 - Present",
      description:
        "Led the development of the company's flagship product, improving performance by 40% and implementing new features that increased user engagement. Mentored junior developers and established best practices for the frontend team.",
    },
    {
      id: "static-2",
      company: "Digital Solutions Ltd.",
      position: "Full-Stack Developer",
      period: "2018 - 2021",
      description:
        "Worked on multiple client projects using React, Node.js, and AWS, delivering solutions on time and within budget. Implemented CI/CD pipelines that reduced deployment time by 60%.",
    },
    {
      id: "static-3",
      company: "Creative Web Agency",
      position: "Frontend Developer",
      period: "2016 - 2018",
      description:
        "Developed responsive websites and web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs and improve user experience.",
    },
    {
      id: "static-4",
      company: "Startup Ventures",
      position: "Junior Web Developer",
      period: "2014 - 2016",
      description:
        "Built and maintained websites using HTML, CSS, JavaScript, and PHP. Assisted in the development of the company's internal tools and client management system.",
    },
  ];

  // Use dynamic data if available, otherwise fallback to static
  const experiences = dynamicExperiences.length > 0 
    ? dynamicExperiences.map(exp => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        period: exp.current 
          ? `${exp.startDate.getFullYear()} - Present`
          : `${exp.startDate.getFullYear()} - ${exp.endDate?.getFullYear() || 'Present'}`,
        description: exp.description || ''
      }))
    : staticExperiences;
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground mt-2">My professional journey and career highlights.</p>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
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
