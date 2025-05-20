import { Suspense } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MotionProvider } from "@/components/providers/motion-provider";
import { 
  AnimatedHero, 
  AnimatedTechStack, 
  AnimatedProjectsHeader 
} from "@/components/home/animated-sections";
import { PAGE_SCHEMA } from "@/config/constants";
import Projects from "@/components/projects/project";
import { getProjects } from "./actions/project";

// Lazy load heavier components
const ContactSection = dynamic(() =>
  import("@/components/contact/contact-section").then((module) => ({
    default: module.ContactSection,
  }))
);

export default async function Home() {
  const { projects, error } = await getProjects();

  return (
    <>
      <Script
        id="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }}
      />
      
      <MotionProvider>
        {/* Hero Section */}
        <AnimatedHero />

        {/* Tech Stack Section */}
        <AnimatedTechStack />

        {/* Projects Section */}
        <section className="space-y-8">
          <AnimatedProjectsHeader />
          <Suspense fallback={<LoadingSpinner />}>
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : !projects || projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found</p>
              </div>
            ) : (
              <Projects projects={projects} showOnlyPinned={true} />
            )}
          </Suspense>
        </section>

        {/* Contact Section */}
        <section>
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSection />
          </Suspense>
        </section>
      </MotionProvider>
    </>
  );
}
