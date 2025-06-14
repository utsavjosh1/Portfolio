import { NextRequest, NextResponse } from 'next/server'
import { safePrisma } from '@/lib/prisma'
import { z } from 'zod'

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const prisma = safePrisma()
    const body = await request.json()
    const { email } = unsubscribeSchema.parse(body)

    // Check if subscription exists
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Email not found in subscription list' },
        { status: 404 }
      )
    }

    if (!subscription.active) {
      return NextResponse.json(
        { error: 'Email is already unsubscribed' },
        { status: 400 }
      )
    }

    // Deactivate subscription
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { active: false, updatedAt: new Date() }
    })

    return NextResponse.json({ message: 'Successfully unsubscribed from newsletter' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
} 