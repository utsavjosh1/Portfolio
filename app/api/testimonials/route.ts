import { NextResponse } from 'next/server'
import { TestimonialService } from '@/lib/services/testimonials'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get('approved')
    const featured = searchParams.get('featured')
    const recent = searchParams.get('recent')
    const company = searchParams.get('company')
    const rating = searchParams.get('rating')
    const limit = searchParams.get('limit')

    let testimonials

    if (featured === 'true') {
      testimonials = await TestimonialService.getFeaturedTestimonials()
    } else if (recent === 'true') {
      const limitNum = limit ? parseInt(limit) : 5
      testimonials = await TestimonialService.getRecentTestimonials(limitNum)
    } else if (approved === 'true') {
      testimonials = await TestimonialService.getApprovedTestimonials()
    } else if (company) {
      testimonials = await TestimonialService.getTestimonialsByCompany(company)
    } else if (rating) {
      const minRating = parseInt(rating)
      testimonials = await TestimonialService.getTestimonialsByRating(minRating)
    } else {
      testimonials = await TestimonialService.getAllTestimonials()
    }

    // Transform the data to include formatted dates
    const transformedTestimonials = testimonials.map(testimonial => ({
      ...testimonial,
      createdAt: testimonial.createdAt.toISOString(),
      updatedAt: testimonial.updatedAt.toISOString()
    }))

    return NextResponse.json(transformedTestimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const testimonial = await TestimonialService.createTestimonial(data)
    
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
} 