import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Retrieve all newsletter subscriptions (admin only)
export async function GET(request: NextRequest) {
  try {
    const subscriptions = await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        active: true,
        source: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: subscriptions,
    })
  } catch (error) {
    console.error('Failed to fetch newsletter subscriptions:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch subscriptions' 
      },
      { status: 500 }
    )
  }
} 