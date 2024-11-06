"use client";

import { useEffect, useState, Suspense } from "react";
import HeroSection from "@/components/home/hero-section";
import { ProjectCard } from "@/components/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGithubData, fetchProjectData } from "@/lib/github";
import { GithubData, ProjectData } from "@/types/github";

export default function Home() {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    const loadGithubData = async () => {
      try {
        const data = await fetchGithubData();
        setGithubData(data);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      }
    };

    loadGithubData();
  }, []);

  useEffect(() => {
    const loadProjectData = async () => {
      if (githubData?.pinned[3]?.url) {
        try {
          const data = await fetchProjectData(githubData.pinned[3].url);
          setProjectData(data);
        } catch (error) {
          console.error("Failed to fetch project data:", error);
        }
      }
    };

    loadProjectData();
  }, [githubData]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-background/80 text-foreground antialiased">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
        <FeaturedProjects githubData={githubData} />
      </div>
    </main>
  );
}

function FeaturedProjects({ githubData }: { githubData: GithubData | null }) {
  if (!githubData) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
      {githubData.pinned.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {githubData.pinned.map((repo, index) => (
            <Suspense fallback={<ProjectCardSkeleton />} key={index}>
              <ProjectCard
                title={repo.url.split("/").pop() || ""}
                year={new Date().getFullYear()}
                description="Description goes here."
                imageUrl={githubData.avatar}
                projectUrl={`https://github.com${repo.url}`}
              />
            </Suspense>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No pinned repositories found.</p>
      )}
    </section>
  );
}

function HeroSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[200px] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
