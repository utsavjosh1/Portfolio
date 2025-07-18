// app/api/technologies/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      where: {
        active: true, // Only fetch active technologies
      },
      select: {
        id: true,
        name: true,
        category: true,
        color: true,
        icon: true,
        order: true,
        active: true,
      },
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
        { name: 'asc' },
      ],
    })

    const response = NextResponse.json(technologies)
    
    // Cache for 1 hour (3600 seconds)
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    
    return response
  } catch (error) {
    console.error('Error fetching technologies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Enable static generation for this route
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour