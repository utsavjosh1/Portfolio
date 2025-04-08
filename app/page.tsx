"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion";
import { Icon } from "@/components/icons.svgs";
import { Button } from "@/components/ui/button";
import ProjectsPage from "@/components/projects/project"
import { projects } from "@/config/project.data"

// Lightweight animation variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const StatItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="group flex items-center gap-4 text-base">
    <span className="text-muted-foreground group-hover:text-primary transition-colors">
      {icon}
    </span>
    <span className="font-medium group-hover:text-primary transition-colors">
      {text}
    </span>
  </div>
);

const ProfileImage = ({ avatar }: { avatar: string }) => (
  <Image
    src={avatar}
    alt="Profile"
    width={120}
    height={120}
    className="rounded-full border-2 border-background"
    priority
  />
);

export default function Home() {
  // Hardcoded data
  const avatarUrl = "https://avatars.githubusercontent.com/u/98454866?s=400&u=cf6b7cebb0f7ac602a9bc5b40ab2e4bae5dce048&v=4";
  const repoCount = 44;
  const bio = "Coding since, birth, now, till death";
  
  return (
    <main className="space-y-16">
      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <ProfileImage avatar={avatarUrl} />
          <div className="space-y-4">
            <StatItem
              icon={<Icon name="github" className="w-6 h-6" />}
              text={`${repoCount} repositories on GitHub`}
            />
            <StatItem
              icon={<Icon name="graph" className="w-6 h-6" />}
              text="500 views on blogs"
            />
          </div>
        </div>
        
        <blockquote className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground">
          {bio}
        </blockquote>
        
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group hover:bg-primary/5"
        >
          <Link
            href="/socials"
            className="inline-flex items-center gap-3 text-lg"
          >
            <Icon name="external-link" className="w-5 h-5" />
            <span className="font-medium">More ways to connect</span>
          </Link>
        </Button>
      </motion.div>

      {/* Projects Section - Only Pinned Projects */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8">
            <ProjectsPage   />
        </div>
      </div>
    </main>
  );
}