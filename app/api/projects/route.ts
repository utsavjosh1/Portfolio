import { NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'

// Cache for 3 minutes with stale-while-revalidate for 30 minutes
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=1800',
  'CDN-Cache-Control': 'public, s-maxage=180',
  'Vercel-CDN-Cache-Control': 'public, s-maxage=180'
}

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      projects = await ProjectService.getProjectsByStatus(status as any)
    } else if (year) {
      projects = await ProjectService.getProjectsByYear(year)
    } else {
      projects = await ProjectService.getAllProjects()
    }

    // Transform the data to match the expected format
    const transformedProjects = projects.map(project => ({
      ...project,
      tags: Array.isArray(project.technologies) 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? project.technologies.map((pt: any) => pt.technology.name)
        : [],
      link: `/projects/${project.slug}`
    }))

    return new NextResponse(JSON.stringify(transformedProjects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CACHE_HEADERS
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 