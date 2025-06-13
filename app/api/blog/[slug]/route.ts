import { NextResponse } from 'next/server'
import { BlogService } from '@/lib/services/blog'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await BlogService.getPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the expected format
    const transformedPost = {
      ...post,
      link: `/blog/${post.slug}`,
      date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 