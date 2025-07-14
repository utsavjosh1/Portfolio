/* eslint-disable @typescript-eslint/no-explicit-any */
import { safePrisma, isPrismaAvailable } from '@/lib/prisma'
import { BlogPost, Prisma } from '@prisma/client'

// Optimized blog post type with only needed fields
export type OptimizedBlogPost = {
  id: string
  title: string
  excerpt: string
  slug: string
  featured: boolean
  tags: string[]
  category: string | null
  createdAt: Date
  publishedAt: Date | null
}

export class BlogService {
  // Optimized: Get all blog data in a single query with field selection
  static async getBlogPageData(): Promise<{
    allPosts: OptimizedBlogPost[]
    featuredPosts: OptimizedBlogPost[]
    recentPosts: OptimizedBlogPost[]
    totalPosts: number
  }> {
    if (!isPrismaAvailable()) {
      return {
        allPosts: [],
        featuredPosts: [],
        recentPosts: [],
        totalPosts: 0
      }
    }
    
    const prisma = safePrisma()
    
    // Single query with optimized field selection
    const allPosts = await prisma.blogPost.findMany({
      where: {
        published: true
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        featured: true,
        tags: true,
        category: true,
        createdAt: true,
        publishedAt: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    }) as OptimizedBlogPost[]

    // Process data client-side to avoid additional DB queries
    const featuredPosts = allPosts.filter(post => post.featured)
    const recentPosts = allPosts.slice(0, 5)
    
    return {
      allPosts,
      featuredPosts,
      recentPosts,
      totalPosts: allPosts.length
    }
  }

  // Get all published blog posts (legacy method for backward compatibility)
  static async getAllPosts(): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  // Get featured blog posts (legacy method for backward compatibility)
  static async getFeaturedPosts(): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true,
        featured: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  // Get recent blog posts (legacy method for backward compatibility)
  static async getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit
    })
  }

  // Get blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!isPrismaAvailable()) {
      return null
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true
      }
    })
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true,
        category
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  // Get posts by tag
  static async getPostsByTag(tag: string): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true,
        tags: {
          has: tag
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  // Get all categories
  static async getAllCategories(): Promise<string[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        category: {
          not: null
        }
      },
      select: {
        category: true
      },
      distinct: ['category']
    })
    
    return posts.map((post: any) => post.category!).filter(Boolean)
  }

  // Get all tags
  static async getAllTags(): Promise<string[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true
      },
      select: {
        tags: true
      }
    })
    
    const allTags = posts.flatMap((post: any) => post.tags as string[])
    return [...new Set(allTags)] as string[]
  }

  // Create a new blog post
  static async createPost(data: Prisma.BlogPostCreateInput): Promise<BlogPost> {
    const prisma = safePrisma()
    return await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null
      }
    })
  }

  // Update a blog post
  static async updatePost(id: string, data: Prisma.BlogPostUpdateInput): Promise<BlogPost> {
    const prisma = safePrisma()
    const updateData = { ...data }
    
    // Set publishedAt if publishing for the first time
    if (data.published === true) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
        select: { publishedAt: true }
      })
      
      if (!existingPost?.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }
    
    return await prisma.blogPost.update({
      where: { id },
      data: updateData
    })
  }

  // Delete a blog post
  static async deletePost(id: string): Promise<BlogPost> {
    const prisma = safePrisma()
    return await prisma.blogPost.delete({
      where: { id }
    })
  }

  // Search blog posts
  static async searchPosts(query: string): Promise<BlogPost[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.blogPost.findMany({
      where: {
        published: true,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            excerpt: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            content: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }
} 