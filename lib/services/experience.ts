import { safePrisma, isPrismaAvailable } from '@/lib/prisma'
import { Experience, Prisma } from '@prisma/client'

export class ExperienceService {
  // Get all experiences
  static async getAllExperiences(): Promise<Experience[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.experience.findMany({
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' }
      ]
    })
  }

  // Get current experiences
  static async getCurrentExperiences(): Promise<Experience[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.experience.findMany({
      where: {
        current: true
      },
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' }
      ]
    })
  }

  // Get recent experiences
  static async getRecentExperiences(limit: number = 3): Promise<Experience[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.experience.findMany({
      take: limit,
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' }
      ]
    })
  }

  // Get experience by ID
  static async getExperienceById(id: string): Promise<Experience | null> {
    if (!isPrismaAvailable()) {
      return null
    }
    const prisma = safePrisma()
    return await prisma.experience.findUnique({
      where: { id }
    })
  }

  // Create new experience
  static async createExperience(data: Prisma.ExperienceCreateInput): Promise<Experience> {
    const prisma = safePrisma()
    return await prisma.experience.create({
      data
    })
  }

  // Update experience
  static async updateExperience(id: string, data: Prisma.ExperienceUpdateInput): Promise<Experience> {
    const prisma = safePrisma()
    return await prisma.experience.update({
      where: { id },
      data
    })
  }

  // Delete experience
  static async deleteExperience(id: string): Promise<Experience> {
    const prisma = safePrisma()
    return await prisma.experience.delete({
      where: { id }
    })
  }

  // Get experiences by company
  static async getExperiencesByCompany(company: string): Promise<Experience[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.experience.findMany({
      where: {
        company: {
          contains: company,
          mode: 'insensitive'
        }
      },
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' }
      ]
    })
  }
} 