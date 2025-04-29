"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/icons.svgs";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/home/profile-image";
import { StatItem } from "@/components/home/stat-item";
import { TechStackItem } from "@/components/home/tech-stack-item";
import { ContactSection } from "@/components/contact/contact-section";

const ProjectsPage = dynamic(() => import("@/components/projects/project"), {
  loading: () => <div className="h-60 bg-muted rounded-lg animate-pulse"></div>,
  ssr: false,
});

// Data
const PROFILE_DATA = {
  avatarUrl:
    "https://avatars.githubusercontent.com/u/98454866?s=400&u=cf6b7cebb0f7ac602a9bc5b40ab2e4bae5dce048&v=4",
  repoCount: 42,
  bio: "Coding since, birth, now, till death",
};

const TECH_STACK = [
  { name: "MongoDB", icon: "/mongodb.svg" },
  { name: "Express.js", icon: "/express.svg" },
  { name: "React", icon: "/reactjs.svg" },
  { name: "Node.js", icon: "/nodejs.svg" },
  { name: "Next.js", icon: "/nextjs.svg" },
  { name: "TypeScript", icon: "/typescript.svg" },
];

// Add structured data
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Utsav Joshi",
    jobTitle: "Full Stack Developer",
    knowsAbout: TECH_STACK.map((tech) => tech.name),
    url: "https://utsavjosh1.com",
    image: PROFILE_DATA.avatarUrl,
    sameAs: [
      "https://github.com/utsavjosh1",
      "https://linkedin.com/in/utsavjosh1",
      "https://twitter.com/utsavjosh1",
    ],
  },
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }}
      />
      <main
        className="space-y-16 relative"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
        {/* Hero Section */}
        <section
          className={`space-y-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          aria-label="Introduction"
        >
          <h1 className="sr-only">
            Utsav Joshi - Full Stack Developer Portfolio
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <ProfileImage avatar={PROFILE_DATA.avatarUrl} />
            <Link href={"https://github.com/utsavjosh1"}>
              <div className="space-y-4">
                <StatItem
                  icon={<Icon name="github" className="w-6 h-6" />}
                  text={`${PROFILE_DATA.repoCount} repositories on GitHub`}
                />
                <StatItem
                  icon={<Icon name="graph" className="w-6 h-6" />}
                  text="500 views on blogs"
                />
              </div>
            </Link>
          </div>

          <blockquote
            className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground relative group"
            itemProp="description"
          >
            {PROFILE_DATA.bio}
          </blockquote>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="group hover:bg-primary/10 overflow-hidden relative"
          >
            <Link
              href="/socials"
              className="inline-flex items-center gap-3 text-lg"
              aria-label="Connect with me on social media"
            >
              <Icon
                name="external-link"
                className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125"
              />
              <span className="font-medium relative">
                More ways to connect
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 ease-out"></span>
              </span>
              <span className="absolute inset-0 bg-primary/10 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>
            </Link>
          </Button>
        </section>

        {/* Tech Stack Section */}
        <section className="space-y-8 group" aria-label="Technical Skills">
          <h2 className="text-2xl font-bold">Tech Stack</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 perspective">
            {TECH_STACK.map((tech, index) => (
              <TechStackItem
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-8 group" aria-label="Featured Projects">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="group overflow-hidden relative"
            >
              <Link
                href="/projects"
                className="flex items-center gap-1"
                aria-label="View all projects"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-primary/10 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-md"></span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 transform-gpu relative">
            <ProjectsPage />
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  );
}
