/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next"
import { ExperienceItem } from "@/components/experience-item"
import { ExperienceService } from "@/lib/services/experience"
import { OGImages } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Experience | Utsav Joshi",
  description: "My professional experience and career journey in web development.",
  openGraph: {
    title: "Experience - Utsav Joshi",
    description: "My professional journey and career achievements in software development.",
    url: "https://www.joshiutsav.com/experience",
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

// ISR Configuration for experience page
export const revalidate = 3600;

// Empty state component for experience
function NoExperience() {
  return (
    <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
      <div className="space-y-3">
        <h3 className="text-xl font-medium text-muted-foreground">No work experience added yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Professional experience and career history will be displayed here once added.
        </p>
      </div>
    </div>
  );
}

export default async function ExperiencePage() {
  let experiences: any[] = [];

  try {
    // Fetch dynamic data from database
    const dynamicExperiences = await ExperienceService.getAllExperiences();
    
    // Transform the data for display
    experiences = dynamicExperiences.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      period: exp.current 
        ? `${exp.startDate.getFullYear()} - Present`
        : `${exp.startDate.getFullYear()} - ${exp.endDate?.getFullYear() || 'Present'}`,
      description: exp.description || ''
    }));
  } catch (error) {
    console.warn('Failed to fetch experience data:', error);
    // Continue with empty array
  }

  const hasNoExperience = experiences.length === 0;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 rounded-2xl -z-10" />
        <div className="relative px-6 py-16 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              My professional journey and career achievements in software development.
            </p>
          </div>
          
          {/* Stats */}
          {!hasNoExperience && (
            <div className="flex items-center justify-center gap-8 text-sm border-t border-b border-border py-6">
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{experiences.length}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Positions</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">
                  {experiences.filter(exp => exp.period.includes('Present')).length}
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Current</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experience Content */}
      {hasNoExperience ? (
        <NoExperience />
      ) : (
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="animate-in fade-in-50 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ExperienceItem
                company={experience.company}
                position={experience.position}
                period={experience.period}
                description={experience.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
