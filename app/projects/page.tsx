import { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { ProjectService } from "@/lib/query/projects";
import { Project } from "@/types";
import { notFound } from "next/navigation";

// Helper to filter projects by search term
function filterProjects(projects: Project[], searchTerm: string): Project[] {
  if (!searchTerm.trim()) return projects;
  const search = searchTerm.toLowerCase();
  return projects.filter((project) =>
    project.title.toLowerCase().includes(search) ||
    project.description.toLowerCase().includes(search) ||
    project.tags.some((tag) => tag.toLowerCase().includes(search))
  );
}

export default async function ProjectsPage({ searchParams }: { searchParams?: { search?: string } }) {
  // Fetch all projects on the server
  const allProjects = await ProjectService.getAllProjects();
  if (!allProjects) notFound();

  // Get search term from query param
  const searchTerm = searchParams?.search || "";
  const filteredProjects = filterProjects(allProjects, searchTerm);

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
            {/* Search form submits to the same page with search param */}
            <form className="relative max-w-md mx-auto" method="GET">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                name="search"
                defaultValue={searchTerm}
                className="pl-10"
                autoComplete="off"
              />
            </form>
          </div>

          <div className="space-y-8">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${(index % 3) * 0.1}s both`,
                    }}
                  >
                    <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-xl" />}>
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image ?? undefined}
                        tags={project.tags}
                        link={project.demo ?? undefined}
                        githubUrl={
                          !project.private ? project.github ?? undefined : undefined
                        }
                        featured={project.featured}
                        stats={{
                          stars: 0,
                          forks: 0,
                          views: project.viewCount,
                        }}
                        date={new Date(project.createdAt).toLocaleDateString()}
                      />
                    </Suspense>
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
          </div>
        </div>
      </div>
    </div>
  );
}
