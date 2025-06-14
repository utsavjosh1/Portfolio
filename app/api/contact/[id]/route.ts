import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Validation schema for updating contact status
const updateStatusSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']),
})

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET - Get specific contact submission
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    })

    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: submission,
    })
  } catch (error) {
    console.error('Failed to fetch contact submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submission' },
      { status: 500 }
    )
  }
}

// PATCH - Update contact submission status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Validate the request body
    const validatedData = updateStatusSchema.parse(body)
    
    // Update contact submission status
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status: validatedData.status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Contact submission updated successfully',
      data: submission,
    })
  } catch (error) {
    console.error('Failed to update contact submission:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    )
  }
}

// DELETE - Delete contact submission
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    await prisma.contactSubmission.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete contact submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    )
  }
} 