"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Icon } from "@/components/icons.svgs";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/home/profile-image";
import { StatItem } from "@/components/home/stat-item";
import { TechStackItem } from "@/components/home/tech-stack-item";

// Lazy load heavier components
const ContactSection = lazy(() =>
  import("@/components/contact/contact-section").then((module) => ({
    default: module.ContactSection,
  }))
);

const ProjectsPage = lazy(() => import("@/components/projects/project"));

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
  "@id": "https://www.joshiutsav.com/#homepage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://www.joshiutsav.com/#person",
    name: "Utsav Joshi",
    alternateName: ["joshiutsav", "utsavjoshi"],
    jobTitle: "Software Engineer",
    knowsAbout: TECH_STACK.map((tech) => tech.name),
    url: "https://www.joshiutsav.com",
    image: PROFILE_DATA.avatarUrl,
    sameAs: [
      "https://github.com/utsavjosh1",
      "https://linkedin.com/in/utsavjosh1",
      "https://twitter.com/utsavjosh1",
      "https://www.instagram.com/utsavjosh1/",
    ],
    description:
      "Utsav Joshi (joshiutsav) - Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js.",
    givenName: "Utsav",
    familyName: "Joshi",
    additionalName: "joshiutsav",
    nationality: "Indian",
    worksFor: {
      "@type": "Organization",
      name: "Nextbill",
      description: "Financial Technology Solutions",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.joshiutsav.com",
      },
    ],
  },
};

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    },
  },
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);

    // Simulate content loaded state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Preload critical images
  useEffect(() => {
    if (isClient) {
      const img = new Image();
      img.src = PROFILE_DATA.avatarUrl;
      img.crossOrigin = "anonymous";
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }}
      />
      <AnimatePresence>
        <motion.main
          className="space-y-16 relative"
          itemScope
          itemType="https://schema.org/ProfilePage"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.section
            className="space-y-8"
            aria-label="Introduction"
            variants={itemVariants}
          >
            <h1 className="sr-only">
              Utsav Joshi (joshiutsav) - Software Engineer & Full Stack
              Developer
            </h1>
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
              variants={itemVariants}
            >
              <ProfileImage avatar={PROFILE_DATA.avatarUrl} />
              <Link href={"https://github.com/utsavjosh1"}>
                <motion.div className="space-y-4" variants={itemVariants}>
                  <StatItem
                    icon={<Icon name="github" className="w-6 h-6" />}
                    text={`${PROFILE_DATA.repoCount} repositories on GitHub`}
                  />
                  <StatItem
                    icon={<Icon name="graph" className="w-6 h-6" />}
                    text="500 views on blogs"
                  />
                </motion.div>
              </Link>
            </motion.div>

            <motion.blockquote
              className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground relative group"
              itemProp="description"
              variants={itemVariants}
            >
              {PROFILE_DATA.bio}
            </motion.blockquote>

            <motion.div variants={itemVariants}>
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
            </motion.div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            className="space-y-8 group"
            aria-label="Technical Skills"
            variants={itemVariants}
          >
            <motion.h2 className="text-2xl font-bold" variants={itemVariants}>
              Tech Stack
            </motion.h2>

            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 perspective"
              variants={containerVariants}
            >
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <TechStackItem
                    name={tech.name}
                    icon={tech.icon}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            className="space-y-8 group"
            aria-label="Featured Projects"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-between"
              variants={itemVariants}
            >
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
            </motion.div>

            <motion.div
              className="grid gap-8 transform-gpu relative"
              variants={itemVariants}
            >
              <Suspense
                fallback={
                  <motion.div
                    className="h-60 bg-muted rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" />
                    </div>
                  </motion.div>
                }
              >
                <ProjectsPage />
              </Suspense>
            </motion.div>
          </motion.section>

          {/* Contact Section - Lazy loaded */}
          <motion.div variants={itemVariants}>
            <Suspense
              fallback={
                <motion.div
                  className="h-40 bg-muted rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" />
                  </div>
                </motion.div>
              }
            >
              <ContactSection />
            </Suspense>
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </>
  );
}
