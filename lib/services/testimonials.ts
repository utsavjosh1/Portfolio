import { safePrisma, isPrismaAvailable } from '@/lib/prisma'
import { Testimonial, Prisma } from '@prisma/client'

export class TestimonialService {
  // Get all testimonials
  static async getAllTestimonials(): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get approved testimonials
  static async getApprovedTestimonials(): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      where: {
        approved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get featured testimonials
  static async getFeaturedTestimonials(): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      where: {
        featured: true,
        approved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get recent testimonials
  static async getRecentTestimonials(limit: number = 5): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      where: {
        approved: true
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get testimonial by ID
  static async getTestimonialById(id: string): Promise<Testimonial | null> {
    if (!isPrismaAvailable()) {
      return null
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findUnique({
      where: { id }
    })
  }

  // Create new testimonial
  static async createTestimonial(data: Prisma.TestimonialCreateInput): Promise<Testimonial> {
    const prisma = safePrisma()
    return await prisma.testimonial.create({
      data
    })
  }

  // Update testimonial
  static async updateTestimonial(id: string, data: Prisma.TestimonialUpdateInput): Promise<Testimonial> {
    const prisma = safePrisma()
    return await prisma.testimonial.update({
      where: { id },
      data
    })
  }

  // Delete testimonial
  static async deleteTestimonial(id: string): Promise<Testimonial> {
    const prisma = safePrisma()
    return await prisma.testimonial.delete({
      where: { id }
    })
  }

  // Approve testimonial
  static async approveTestimonial(id: string): Promise<Testimonial> {
    const prisma = safePrisma()
    return await prisma.testimonial.update({
      where: { id },
      data: {
        approved: true
      }
    })
  }

  // Feature testimonial
  static async featureTestimonial(id: string): Promise<Testimonial> {
    const prisma = safePrisma()
    return await prisma.testimonial.update({
      where: { id },
      data: {
        featured: true,
        approved: true // Auto-approve when featuring
      }
    })
  }

  // Get testimonials by company
  static async getTestimonialsByCompany(company: string): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      where: {
        company: {
          contains: company,
          mode: 'insensitive'
        },
        approved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get testimonials by rating
  static async getTestimonialsByRating(minRating: number = 4): Promise<Testimonial[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.testimonial.findMany({
      where: {
        rating: {
          gte: minRating
        },
        approved: true
      },
      orderBy: [
        { rating: 'desc' },
        { createdAt: 'desc' }
      ]
    })
  }
} 