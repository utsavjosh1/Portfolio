/* eslint-disable @typescript-eslint/no-explicit-any */
import { safePrisma, isPrismaAvailable } from "@/lib/prisma";

// Optimized types for homepage data
export type HomepageProject = {
  title: string;
  description: string;
  image: string | null;
  slug: string;
  technologies: string[];
};

export type HomepageBlogPost = {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: Date | null;
  createdAt: Date;
};

export type HomepageExperience = {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  location: string | null;
  website: string | null;
  logo: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type HomepageData = {
  featuredProjects: HomepageProject[];
  recentPosts: HomepageBlogPost[];
  recentExperiences: HomepageExperience[];
};

// Simple in-memory cache with TTL
interface CacheEntry {
  data: HomepageData;
  timestamp: number;
  ttl: number;
}

class SimpleCache {
  private cache: Map<string, CacheEntry> = new Map();

  set(key: string, data: HomepageData, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  get(key: string): HomepageData | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const homepageCache = new SimpleCache();

export class HomepageService {
  /**
   * Ultra-optimized: Get all homepage data with aggressive caching and minimal DB queries
   * Uses proper Prisma queries with optimized includes and selects
   */
  static async getHomepageData(): Promise<HomepageData> {
    const cacheKey = "homepage-data";

    // Try cache first
    const cachedData = homepageCache.get(cacheKey);
    if (cachedData) {
      console.log("Homepage data served from cache");
      return cachedData;
    }

    if (!isPrismaAvailable()) {
      return {
        featuredProjects: [],
        recentPosts: [],
        recentExperiences: [],
      };
    }

    const prisma = safePrisma();

    try {
      console.log("Fetching fresh homepage data from database");
      const startTime = Date.now();

      const [projectsData, postsData, experiencesData] = await Promise.all([
        prisma.project.findMany({
          where: {
            published: true,
            featured: true,
            private: false,
          },
          select: {
            title: true,
            description: true,
            image: true,
            slug: true,
            technologies: {
              select: {
                technology: {
                  select: {
                    name: true,
                  },
                },
              },
              where: {
                technology: {
                  active: true,
                },
              },
              orderBy: {
                technology: {
                  name: "asc",
                },
              },
            },
          },
          orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
          take: 3,
        }),

        prisma.blogPost.findMany({
          where: { published: true },
          select: {
            title: true,
            excerpt: true,
            slug: true,
            publishedAt: true,
            createdAt: true,
          },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),

        prisma.experience.findMany({
          select: {
            id: true,
            company: true,
            position: true,
            description: true,
            startDate: true,
            endDate: true,
            current: true,
            location: true,
            website: true,
            logo: true,
            order: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: [{ order: "asc" }, { startDate: "desc" }],
          take: 3,
        }),
      ]);

      const queryTime = Date.now() - startTime;
      console.log(`Database queries completed in ${queryTime}ms`);

      const featuredProjects: HomepageProject[] = projectsData.map(
        (project) => ({
          title: project.title,
          description: project.description,
          image: project.image,
          slug: project.slug,
          technologies: project.technologies.map((pt) => pt.technology.name),
        })
      );

      const recentPosts: HomepageBlogPost[] = postsData.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
      }));

      const recentExperiences: HomepageExperience[] = experiencesData.map(
        (exp) => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          description: exp.description || "",
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          location: exp.location,
          website: exp.website,
          logo: exp.logo,
          order: exp.order,
          createdAt: exp.createdAt,
          updatedAt: exp.updatedAt,
        })
      );

      const homepageData: HomepageData = {
        featuredProjects,
        recentPosts,
        recentExperiences,
      };

      // Cache for 5 minutes (300 seconds)
      homepageCache.set(cacheKey, homepageData, 300);

      const totalTime = Date.now() - startTime;
      console.log(`Homepage data prepared in ${totalTime}ms`);

      return homepageData;
    } catch (error) {
      console.error("Failed to fetch homepage data:", error);
      // Return empty data on error instead of throwing
      return {
        featuredProjects: [],
        recentPosts: [],
        recentExperiences: [],
      };
    }
  }

  /**
   * Get featured projects with full details
   */
  static async getFeaturedProjects(): Promise<HomepageProject[]> {
    if (!isPrismaAvailable()) return [];

    const prisma = safePrisma();

    try {
      const projects = await prisma.project.findMany({
        where: {
          published: true,
          featured: true,
          private: false,
        },
        select: {
          title: true,
          description: true,
          image: true,
          slug: true,
          technologies: {
            select: {
              technology: {
                select: {
                  name: true,
                },
              },
            },
            where: {
              technology: {
                active: true,
              },
            },
          },
        },
        orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
        take: 6,
      });

      return projects.map((project) => ({
        title: project.title,
        description: project.description,
        image: project.image,
        slug: project.slug,
        technologies: project.technologies.map((pt) => pt.technology.name),
      }));
    } catch (error) {
      console.error("Failed to fetch featured projects:", error);
      return [];
    }
  }

  /**
   * Get recent blog posts
   */
  static async getRecentPosts(): Promise<HomepageBlogPost[]> {
    if (!isPrismaAvailable()) return [];

    const prisma = safePrisma();

    try {
      const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: {
          title: true,
          excerpt: true,
          slug: true,
          publishedAt: true,
          createdAt: true,
        },
        orderBy: { publishedAt: "desc" },
        take: 6,
      });

      return posts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
      }));
    } catch (error) {
      console.error("Failed to fetch recent posts:", error);
      return [];
    }
  }

  /**
   * Get work experience
   */
  static async getExperiences(): Promise<HomepageExperience[]> {
    if (!isPrismaAvailable()) return [];

    const prisma = safePrisma();

    try {
      const experiences = await prisma.experience.findMany({
        orderBy: [{ order: "asc" }, { startDate: "desc" }],
      });

      return experiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        description: exp.description || "",
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        location: exp.location,
        website: exp.website,
        logo: exp.logo,
        order: exp.order,
        createdAt: exp.createdAt,
        updatedAt: exp.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      return [];
    }
  }

  /**
   * Clear homepage cache (useful for admin updates)
   */
  static clearCache(): void {
    homepageCache.clear();
    console.log("Homepage cache cleared");
  }

  /**
   * Preload homepage data in background
   */
  static async preloadData(): Promise<void> {
    try {
      await this.getHomepageData();
      console.log("Homepage data preloaded successfully");
    } catch (error) {
      console.error("Failed to preload homepage data:", error);
    }
  }

  /**
   * Increment project view count
   */
  static async incrementProjectViews(slug: string): Promise<void> {
    if (!isPrismaAvailable()) return;

    const prisma = safePrisma();

    try {
      await prisma.project.update({
        where: { slug },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Failed to increment project views:", error);
    }
  }

  /**
   * Increment blog post view count
   */
  static async incrementPostViews(slug: string): Promise<void> {
    if (!isPrismaAvailable()) return;

    const prisma = safePrisma();

    try {
      await prisma.blogPost.update({
        where: { slug },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Failed to increment post views:", error);
    }
  }
}
