import { prisma } from '@/lib/prisma'
import { BlogPost, Prisma } from '@prisma/client'

export class BlogService {
  // Get all published blog posts
  static async getAllPosts(): Promise<BlogPost[]> {
    return await prisma.blogPost.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  // Get featured blog posts
  static async getFeaturedPosts(): Promise<BlogPost[]> {
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

  // Get recent blog posts
  static async getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
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
    return await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true
      }
    })
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<BlogPost[]> {
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
    return await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null
      }
    })
  }

  // Update a blog post
  static async updatePost(id: string, data: Prisma.BlogPostUpdateInput): Promise<BlogPost> {
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
    return await prisma.blogPost.delete({
      where: { id }
    })
  }

  // Search blog posts
  static async searchPosts(query: string): Promise<BlogPost[]> {
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