import { NextResponse } from 'next/server'
import { BlogService } from '@/lib/services/blog'

// Cache for 5 minutes with stale-while-revalidate for 1 hour
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
  'CDN-Cache-Control': 'public, s-maxage=300',
  'Vercel-CDN-Cache-Control': 'public, s-maxage=300'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const featured = searchParams.get('featured')
    const recent = searchParams.get('recent')
    const limit = searchParams.get('limit')

    let posts

    if (featured === 'true') {
      posts = await BlogService.getFeaturedPosts()
    } else if (recent === 'true') {
      const limitNum = limit ? parseInt(limit) : 3
      posts = await BlogService.getRecentPosts(limitNum)
    } else if (category) {
      posts = await BlogService.getPostsByCategory(category)
    } else if (tag) {
      posts = await BlogService.getPostsByTag(tag)
    } else {
      posts = await BlogService.getAllPosts()
    }

    // Transform the data to match the expected format
    const transformedPosts = posts.map(post => ({
      ...post,
      link: `/blog/${post.slug}`,
      date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]
    }))

    return new NextResponse(JSON.stringify(transformedPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CACHE_HEADERS
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
} 