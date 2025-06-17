import { safePrisma, isPrismaAvailable } from '@/lib/prisma'
import { Project, ProjectStatus, Prisma } from '@prisma/client'

export type ProjectWithTechnologies = Prisma.ProjectGetPayload<{
  include: {
    technologies: {
      include: {
        technology: true
      }
    }
  }
}>

export class ProjectService {
  // Get all published projects
  static async getAllProjects(): Promise<ProjectWithTechnologies[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.project.findMany({
      where: {
        published: true
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<ProjectWithTechnologies[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    const result =await prisma.project.findMany({
      where: {
        published: true,
        featured: true
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return result
  }

  // Get project by slug
  static async getProjectBySlug(slug: string): Promise<ProjectWithTechnologies | null> {
    if (!isPrismaAvailable()) {
      return null
    }
    const prisma = safePrisma()
    return await prisma.project.findUnique({
      where: {
        slug,
        published: true
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      }
    })
  }

  // Get projects by status
  static async getProjectsByStatus(status: ProjectStatus): Promise<ProjectWithTechnologies[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.project.findMany({
      where: {
        published: true,
        status
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get projects by year
  static async getProjectsByYear(year: string): Promise<ProjectWithTechnologies[]> {
    if (!isPrismaAvailable()) {
      return []
    }
    const prisma = safePrisma()
    return await prisma.project.findMany({
      where: {
        published: true,
        year
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Create a new project
  static async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    const prisma = safePrisma()
    return await prisma.project.create({
      data
    })
  }

  // Update a project
  static async updateProject(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    const prisma = safePrisma()
    return await prisma.project.update({
      where: { id },
      data
    })
  }

  // Delete a project
  static async deleteProject(id: string): Promise<Project> {
    const prisma = safePrisma()
    return await prisma.project.delete({
      where: { id }
    })
  }

  // Add technology to project
  static async addTechnologyToProject(projectId: string, technologyId: string) {
    const prisma = safePrisma()
    return await prisma.projectTechnology.create({
      data: {
        projectId,
        technologyId
      }
    })
  }

  // Remove technology from project
  static async removeTechnologyFromProject(projectId: string, technologyId: string) {
    const prisma = safePrisma()
    return await prisma.projectTechnology.delete({
      where: {
        projectId_technologyId: {
          projectId,
          technologyId
        }
      }
    })
  }
} 