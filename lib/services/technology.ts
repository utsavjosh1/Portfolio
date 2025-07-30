import { safePrisma } from "@/lib/prisma";
import { createCache } from "@/lib/cache";

// Create a cache instance for technologies
const cache = createCache<any>({ defaultTtlSeconds: 3600 }); // 1 hour default TTL
const prisma = safePrisma();

export interface Technology {
  id: string;
  name: string;
  category: string | null;
  color: string | null;
}

export class TechnologyService {
  private static readonly CACHE_KEY = "technologies:all";
  private static readonly CACHE_TTL = 3600000; // 1 hour

  static async getTechnologies(): Promise<Technology[]> {
    // Try cache first
    const cachedData = cache.get(this.CACHE_KEY) as Technology[] | null;
    if (cachedData) {
      console.log("✅ Serving technologies from cache");
      return cachedData;
    }

    try {
      console.log("🔄 Fetching technologies from database");

      const technologies = await prisma.technology.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          color: true,
          order: true,
          active: true,
          icon: true
        },
        orderBy: {
          name: "asc",
        },
      });

      // Cache the results
      cache.set(this.CACHE_KEY, technologies, this.CACHE_TTL / 1000); // Convert to seconds

      console.log(`📊 Cached ${technologies.length} technologies`);
      return technologies;
    } catch (error) {
      console.error("❌ Database error:", error);

      // Try to serve stale data as fallback - for now just return empty array
      // Note: GenericCache doesn't have getStale method, could be added if needed
      console.log("⚠️ No fallback data available");
      return [];
    }
  }

  static async getTechnologiesByCategory(
    category: string
  ): Promise<Technology[]> {
    const cacheKey = `technologies:category:${category}`;

    const cachedData = cache.get(cacheKey) as Technology[] | null;
    if (cachedData) {
      return cachedData;
    }

    const technologies = await prisma.technology.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        color: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    cache.set(cacheKey, technologies, this.CACHE_TTL / 1000); // Convert to seconds
    return technologies;
  }

  static invalidateCache(): void {
    cache.delete(this.CACHE_KEY);
    console.log("🗑️ Technology cache invalidated");
  }

  static async refreshCache(): Promise<Technology[]> {
    this.invalidateCache();
    return await this.getTechnologies();
  }
}
