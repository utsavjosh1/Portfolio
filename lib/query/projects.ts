import { safePrisma } from "@/lib/prisma";
import { apiCache } from "@/lib/cache";
import type { Project } from "@/types";

const TTL = {
  SHORT: 180,
  MEDIUM: 300,
};

function buildProjectCacheKey(...segments: (string | undefined)[]) {
  return ["project", ...segments.filter(Boolean)].join(":");
}

// Helper function to transform raw Prisma data to Project type
function transformProject(project: any): Project {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    publishedAt: project.publishedAt?.toISOString() ?? null,
    content: project.content ?? null,
    video: project.video ?? null,
    image: project.image ?? null,
    year: project.year ?? null,
    github: project.github ?? null,
    demo: project.demo ?? null,
    duration: project.duration ?? null,
    teamSize: project.teamSize ?? null,
    clientName: project.clientName ?? null,
    metaTitle: project.metaTitle ?? null,
    metaDescription: project.metaDescription ?? null,
    technologies: [...project.technologies].sort((a, b) =>
      a.technology.name.localeCompare(b.technology.name)
    ),
  };
}

async function queryProjects(
  filter: Record<string, any> = {}
): Promise<Project[]> {
  const prisma = safePrisma();

  const projects = await prisma.project.findMany({
    where: { published: true, ...filter },
    orderBy: { createdAt: "desc" },
    include: {
      technologies: {
        include: { technology: true },
      },
    },
  });

  return projects.map(transformProject);
}

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    const key = buildProjectCacheKey("filter", "all");
    return apiCache.getOrSet(key, () => queryProjects(), TTL.SHORT);
  }

  static async getFeaturedProjects(): Promise<Project[]> {
    const key = buildProjectCacheKey("filter", "featured");
    return apiCache.getOrSet(
      key,
      () => queryProjects({ featured: true }),
      TTL.SHORT
    );
  }

  static async getProjectsByStatus(
    status: Project["status"]
  ): Promise<Project[]> {
    const key = buildProjectCacheKey("filter", "status", status);
    return apiCache.getOrSet(key, () => queryProjects({ status }), TTL.SHORT);
  }

  static async getProjectsByYear(year: string): Promise<Project[]> {
    const key = buildProjectCacheKey("filter", "year", year);
    return apiCache.getOrSet(key, () => queryProjects({ year }), TTL.SHORT);
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const key = buildProjectCacheKey("slug", slug);
    return apiCache.getOrSet(
      key,
      async () => {
        const prisma = safePrisma();
        const project = await prisma.project.findFirst({
          where: { slug, published: true },
          include: {
            technologies: {
              include: { technology: true },
            },
          },
        });

        return project ? transformProject(project) : null;
      },
      TTL.MEDIUM
    );
  }

  static async getProjectsPageData(): Promise<{
    allProjects: Project[];
    featuredProjects: Project[];
    completedProjects: Project[];
    totalProjects: number;
  }> {
    const key = buildProjectCacheKey("page", "data");
    return apiCache.getOrSet(
      key,
      async () => {
        const allProjects = await queryProjects();
        const featuredProjects = allProjects.filter((p) => p.featured);
        const completedProjects = allProjects.filter(
          (p) => p.status === "COMPLETED"
        );

        return {
          allProjects,
          featuredProjects,
          completedProjects,
          totalProjects: allProjects.length,
        };
      },
      TTL.SHORT
    );
  }

  static clearCache(): void {
    apiCache.clear();
    console.log("[ProjectService] Cleared all cache.");
  }

  static clearProjectCache(matcher: string): void {
    const stats = apiCache.getStats();
    const matchedKeys = stats.keys.filter((k) => k.includes(matcher));
    for (const key of matchedKeys) {
      apiCache.delete(key);
    }
    console.log(`[ProjectService] Cleared cache entries matching "${matcher}"`);
  }
}
