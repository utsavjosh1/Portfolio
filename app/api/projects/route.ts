import { NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const year = searchParams.get('year')
    const featured = searchParams.get('featured')

    let projects

    if (featured === 'true') {
      projects = await ProjectService.getFeaturedProjects()
    } else if (status) {
      projects = await ProjectService.getProjectsByStatus(status as any)
    } else if (year) {
      projects = await ProjectService.getProjectsByYear(year)
    } else {
      projects = await ProjectService.getAllProjects()
    }

    // Transform the data to match the expected format
    const transformedProjects = projects.map(project => ({
      ...project,
      tags: project.technologies.map((pt: any) => pt.technology.name),
      link: `/projects/${project.slug}`
    }))

    return NextResponse.json(transformedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 