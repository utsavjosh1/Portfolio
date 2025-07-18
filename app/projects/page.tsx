"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { Search } from "lucide-react";
import { Project } from "@/types";

const ProjectSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video bg-muted rounded-t-lg" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-2/3" />
      <div className="flex gap-2">
        <div className="h-5 bg-muted rounded w-16" />
        <div className="h-5 bg-muted rounded w-16" />
      </div>
    </div>
  </div>
);

const DEBOUNCE_DELAY = 300;
const PAGE_SIZE = 6;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const observerRef = useRef<HTMLDivElement>(null);

  const loadProjects = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/projects?page=${pageNum}`);
      const json = await res.json();
      const newProjects: Project[] = json.data || [];

      if (pageNum === 0) {
        setProjects(newProjects);
      } else {
        setProjects((prev) => [...prev, ...newProjects]);
      }

      if (newProjects.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = projects.filter((project) => {
        const search = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.tags.some((tag) => tag.toLowerCase().includes(search))
        );
      });
      setFilteredProjects(filtered);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [projects, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    loadProjects(page);
  }, [page, loadProjects]);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my complete portfolio of projects, from AI-powered
              applications to automation tools and web platforms.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${
                        (index % 3) * 0.1
                      }s both`,
                    }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image ?? undefined}
                      tags={project.tags}
                      link={project.demo ?? undefined}
                      githubUrl={
                        !project.private
                          ? project.github ?? undefined
                          : undefined
                      }
                      featured={project.featured}
                      stats={{
                        stars: 0,
                        forks: 0,
                        views: project.viewCount,
                      }}
                      date={new Date(project.createdAt).toLocaleDateString()}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectSkeleton key={index} />
                ))}
              </div>
            )}

            <div ref={observerRef} className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
