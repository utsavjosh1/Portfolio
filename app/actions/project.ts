import { prisma } from "@/lib/prisma";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { pinned: 'desc' },
        { updatedAt: 'desc' }
      ]
    });
    
    // Serialize the dates to strings
    const serializedProjects = projects.map(project => ({
      ...project,
      createdAt: project.createdAt.toString(),
      updatedAt: project.updatedAt.toString()
    }));
    
    return { projects: serializedProjects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { error: 'Failed to fetch projects' };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    
    if (!project) {
      return { project: null };
    }

    // Serialize the dates to strings
    const serializedProject = {
      ...project,
      createdAt: project.createdAt.toString(),
      updatedAt: project.updatedAt.toString()
    };
    
    return { project: serializedProject };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { error: 'Failed to fetch project' };
  }
} 