import { NextRequest, NextResponse } from 'next/server'
import { safePrisma } from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const prisma = safePrisma()
    const body = await request.json()
    const { email, source } = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      if (existingSubscription.active) {
        return NextResponse.json(
          { error: 'Email is already subscribed' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { active: true, source, updatedAt: new Date() }
        })
        return NextResponse.json({ message: 'Subscription reactivated successfully' })
      }
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: {
        email,
        source: source || 'blog',
        active: true,
      }
    })

    return NextResponse.json({ message: 'Successfully subscribed to newsletter' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const prisma = safePrisma()
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
      select: { active: true, createdAt: true }
    })

    return NextResponse.json({
      subscribed: subscription?.active || false,
      subscribedAt: subscription?.createdAt || null
    })
  } catch (error) {
    console.error('Newsletter check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
} 