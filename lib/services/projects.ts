/* eslint-disable @typescript-eslint/no-explicit-any */
import { safePrisma, isPrismaAvailable } from '@/lib/prisma'

// Optimized project type for list views
export type OptimizedProject = {
  id: string
  title: string
  description: string
  image: string | null
  slug: string
  featured: boolean
  status: string
  technologies: Array<{
    technology: {
      name: string
    }
  }>
}

// Cache implementation
interface ProjectCacheEntry {
  data: any
  timestamp: number
  ttl: number
}

class ProjectCache {
  private cache: Map<string, ProjectCacheEntry> = new Map()

  set(key: string, data: any, ttlSeconds: number = 180): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000
    })
  }

  get(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }

  clearPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }
}

const projectCache = new ProjectCache()

export class ProjectService {
  // Ultra-optimized: Get all project data in a single query with field selection and caching
  static async getProjectsPageData(): Promise<{
    allProjects: OptimizedProject[]
    featuredProjects: OptimizedProject[]
    completedProjects: OptimizedProject[]
    totalProjects: number
  }> {
    const cacheKey = 'projects-page-data'
    
    // Try cache first
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      console.log('Projects page data served from cache')
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return {
        allProjects: [],
        featuredProjects: [],
        completedProjects: [],
        totalProjects: 0
      }
    }
    
    const prisma = safePrisma()
    console.log('Fetching fresh projects data from database')
    const startTime = Date.now()
    
    try {
      // Single optimized query using raw SQL for better performance
      const allProjects = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image,
          p.slug,
          p.featured,
          p.status,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('technology', JSON_BUILD_OBJECT('name', t.name))
              ORDER BY t.name
            ) FILTER (WHERE t.name IS NOT NULL),
            '[]'::json
          ) as technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt."projectId"
        LEFT JOIN technologies t ON pt."technologyId" = t.id
        WHERE p.published = true
        GROUP BY p.id, p.title, p.description, p.image, p.slug, p.featured, p.status, p."createdAt"
        ORDER BY p."createdAt" DESC
      ` as OptimizedProject[]

      // Process data client-side to avoid additional DB queries
      const featuredProjects = allProjects.filter(project => project.featured)
      const completedProjects = allProjects.filter(project => project.status === 'COMPLETED')
      
      const result = {
        allProjects,
        featuredProjects,
        completedProjects,
        totalProjects: allProjects.length
      }

      // Cache for 3 minutes
      projectCache.set(cacheKey, result, 180)

      const queryTime = Date.now() - startTime
      console.log(`Projects data prepared in ${queryTime}ms`)
      
      return result
    } catch (error) {
      console.error('Failed to fetch projects data:', error)
      return {
        allProjects: [],
        featuredProjects: [],
        completedProjects: [],
        totalProjects: 0
      }
    }
  }

  // Cached version of getAllProjects
  static async getAllProjects(): Promise<OptimizedProject[]> {
    const cacheKey = 'all-projects'
    
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return []
    }

    const prisma = safePrisma()
    
    try {
      const projects = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image,
          p.slug,
          p.featured,
          p.status,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('technology', JSON_BUILD_OBJECT('name', t.name))
              ORDER BY t.name
            ) FILTER (WHERE t.name IS NOT NULL),
            '[]'::json
          ) as technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt."projectId"
        LEFT JOIN technologies t ON pt."technologyId" = t.id
        WHERE p.published = true
        GROUP BY p.id, p.title, p.description, p.image, p.slug, p.featured, p.status, p."createdAt"
        ORDER BY p."createdAt" DESC
      ` as OptimizedProject[]

      projectCache.set(cacheKey, projects, 180)
      return projects
    } catch (error) {
      console.error('Failed to fetch all projects:', error)
      return []
    }
  }

  // Cached version of getFeaturedProjects
  static async getFeaturedProjects(): Promise<OptimizedProject[]> {
    const cacheKey = 'featured-projects'
    
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return []
    }

    const prisma = safePrisma()
    
    try {
      const projects = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image,
          p.slug,
          p.featured,
          p.status,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('technology', JSON_BUILD_OBJECT('name', t.name))
              ORDER BY t.name
            ) FILTER (WHERE t.name IS NOT NULL),
            '[]'::json
          ) as technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt."projectId"
        LEFT JOIN technologies t ON pt."technologyId" = t.id
        WHERE p.published = true AND p.featured = true
        GROUP BY p.id, p.title, p.description, p.image, p.slug, p.featured, p.status, p."createdAt"
        ORDER BY p."createdAt" DESC
      ` as OptimizedProject[]

      projectCache.set(cacheKey, projects, 180)
      return projects
    } catch (error) {
      console.error('Failed to fetch featured projects:', error)
      return []
    }
  }

  // Individual project by slug with caching
  static async getProjectBySlug(slug: string) {
    const cacheKey = `project-${slug}`
    
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return null
    }

    const prisma = safePrisma()
    
    try {
      const project = await prisma.project.findUnique({
        where: { 
          slug,
          published: true
        },
        include: {
          technologies: {
            include: {
              technology: true
            },
            orderBy: {
              technology: {
                name: 'asc'
              }
            }
          }
        }
      })

      if (!project) {
        return null
      }

      projectCache.set(cacheKey, project, 300) // Cache individual projects for 5 minutes
      return project
    } catch (error) {
      console.error(`Failed to fetch project with slug ${slug}:`, error)
      return null
    }
  }

  // Get projects by status with caching
  static async getProjectsByStatus(status: string): Promise<OptimizedProject[]> {
    const cacheKey = `projects-status-${status}`
    
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return []
    }

    const prisma = safePrisma()
    
    try {
      const projects = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image,
          p.slug,
          p.featured,
          p.status,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('technology', JSON_BUILD_OBJECT('name', t.name))
              ORDER BY t.name
            ) FILTER (WHERE t.name IS NOT NULL),
            '[]'::json
          ) as technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt."projectId"
        LEFT JOIN technologies t ON pt."technologyId" = t.id
        WHERE p.published = true AND p.status = ${status}
        GROUP BY p.id, p.title, p.description, p.image, p.slug, p.featured, p.status, p."createdAt"
        ORDER BY p."createdAt" DESC
      ` as OptimizedProject[]

      projectCache.set(cacheKey, projects, 180)
      return projects
    } catch (error) {
      console.error(`Failed to fetch projects by status ${status}:`, error)
      return []
    }
  }

  // Get projects by year with caching
  static async getProjectsByYear(year: string): Promise<OptimizedProject[]> {
    const cacheKey = `projects-year-${year}`
    
    const cachedData = projectCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    if (!isPrismaAvailable()) {
      return []
    }

    const prisma = safePrisma()
    
    try {
      const projects = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image,
          p.slug,
          p.featured,
          p.status,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('technology', JSON_BUILD_OBJECT('name', t.name))
              ORDER BY t.name
            ) FILTER (WHERE t.name IS NOT NULL),
            '[]'::json
          ) as technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt."projectId"
        LEFT JOIN technologies t ON pt."technologyId" = t.id
        WHERE p.published = true AND p.year = ${year}
        GROUP BY p.id, p.title, p.description, p.image, p.slug, p.featured, p.status, p."createdAt"
        ORDER BY p."createdAt" DESC
      ` as OptimizedProject[]

      projectCache.set(cacheKey, projects, 180)
      return projects
    } catch (error) {
      console.error(`Failed to fetch projects by year ${year}:`, error)
      return []
    }
  }

  /**
   * Clear all project caches
   */
  static clearCache(): void {
    projectCache.clear()
    console.log('Project cache cleared')
  }

  /**
   * Clear specific project cache
   */
  static clearProjectCache(slug: string): void {
    projectCache.clearPattern(slug)
    console.log(`Project cache cleared for ${slug}`)
  }
}