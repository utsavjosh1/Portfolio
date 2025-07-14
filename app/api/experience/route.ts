import { NextResponse } from 'next/server'
import { ExperienceService } from '@/lib/services/experience'

// Cache for 10 minutes with stale-while-revalidate for 2 hours (experience data changes less frequently)
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=7200',
  'CDN-Cache-Control': 'public, s-maxage=600',
  'Vercel-CDN-Cache-Control': 'public, s-maxage=600'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const current = searchParams.get('current')
    const recent = searchParams.get('recent')
    const company = searchParams.get('company')
    const limit = searchParams.get('limit')

    let experiences

    if (current === 'true') {
      experiences = await ExperienceService.getCurrentExperiences()
    } else if (recent === 'true') {
      const limitNum = limit ? parseInt(limit) : 3
      experiences = await ExperienceService.getRecentExperiences(limitNum)
    } else if (company) {
      experiences = await ExperienceService.getExperiencesByCompany(company)
    } else {
      experiences = await ExperienceService.getAllExperiences()
    }

    // Transform the data to include formatted dates
    const transformedExperiences = experiences.map(exp => ({
      ...exp,
      startDate: exp.startDate.toISOString(),
      endDate: exp.endDate?.toISOString() || null,
      period: exp.current 
        ? `${exp.startDate.getFullYear()} - Present`
        : `${exp.startDate.getFullYear()} - ${exp.endDate?.getFullYear() || 'Present'}`
    }))

    return new NextResponse(JSON.stringify(transformedExperiences), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CACHE_HEADERS
      }
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Convert string dates to Date objects
    const experienceData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined
    }

    const experience = await ExperienceService.createExperience(experienceData)
    
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
} 