import { NextRequest, NextResponse } from 'next/server'
import { safePrisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const prisma = safePrisma()
    
    // In production, you'd want to add authentication here
    // For now, this is just for development/testing
    
    const subscriptions = await prisma.newsletterSubscription.findMany({
      select: {
        id: true,
        email: true,
        active: true,
        source: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const stats = {
      total: subscriptions.length,
      active: subscriptions.filter(sub => sub.active).length,
      inactive: subscriptions.filter(sub => !sub.active).length,
      sources: subscriptions.reduce((acc, sub) => {
        acc[sub.source || 'unknown'] = (acc[sub.source || 'unknown'] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    return NextResponse.json({
      subscriptions,
      stats
    })
  } catch (error) {
    console.error('Newsletter admin error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch newsletter data' },
      { status: 500 }
    )
  }
} 