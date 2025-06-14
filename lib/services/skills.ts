import { safePrisma, isPrismaAvailable } from '@/lib/prisma'
import { Skill, SkillLevel, Prisma } from '@prisma/client'

export type SkillWithTechnology = Prisma.SkillGetPayload<{
  include: {
    technology: true
  }
}>

export class SkillService {
  // Get all skills
  static async getAllSkills(): Promise<SkillWithTechnology[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.skill.findMany({
      include: {
        technology: true
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    })
  }

  // Get skills by category
  static async getSkillsByCategory(category: string): Promise<SkillWithTechnology[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.skill.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive'
        }
      },
      include: {
        technology: true
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    })
  }

  // Get skills by level
  static async getSkillsByLevel(level: SkillLevel): Promise<SkillWithTechnology[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.skill.findMany({
      where: {
        level
      },
      include: {
        technology: true
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    })
  }

  // Get skills grouped by category
  static async getSkillsGroupedByCategory(): Promise<Record<string, SkillWithTechnology[]>> {
    if (!isPrismaAvailable()) {
      return {}
    }
    const skills = await this.getAllSkills()
    
    return skills.reduce((acc, skill) => {
      const category = skill.category || 'Other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, {} as Record<string, SkillWithTechnology[]>)
  }

  // Get skill by ID
  static async getSkillById(id: string): Promise<SkillWithTechnology | null> {
    if (!isPrismaAvailable()) {
      return null
    }
    const prisma = safePrisma()
    return await prisma.skill.findUnique({
      where: { id },
      include: {
        technology: true
      }
    })
  }

  // Create new skill
  static async createSkill(data: Prisma.SkillCreateInput): Promise<Skill> {
    const prisma = safePrisma()
    return await prisma.skill.create({
      data
    })
  }

  // Update skill
  static async updateSkill(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
    const prisma = safePrisma()
    return await prisma.skill.update({
      where: { id },
      data
    })
  }

  // Delete skill
  static async deleteSkill(id: string): Promise<Skill> {
    const prisma = safePrisma()
    return await prisma.skill.delete({
      where: { id }
    })
  }

  // Get top skills (by level and years of experience)
  static async getTopSkills(limit: number = 10): Promise<SkillWithTechnology[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.skill.findMany({
      where: {
        level: {
          in: ['ADVANCED', 'EXPERT']
        }
      },
      include: {
        technology: true
      },
      orderBy: [
        { level: 'desc' },
        { yearsOfExp: 'desc' },
        { order: 'asc' }
      ],
      take: limit
    })
  }
} 