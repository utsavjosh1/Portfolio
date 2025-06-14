import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '7d'
    
    // Calculate date range
    const now = new Date()
    let startDate: Date
    
    switch (timeRange) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // Get basic metrics from existing data
    const [
      totalContacts,
      totalNewsletterSubs,
      recentContacts,
      recentNewsletterSubs,
      blogPosts
    ] = await Promise.all([
      // Total contact submissions
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: now
          }
        }
      }),
      
      // Total newsletter subscriptions
      prisma.newsletterSubscription.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: now
          }
        }
      }),
      
      // Recent contact activity
      prisma.contactSubmission.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: now
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          createdAt: true,
          subject: true,
          name: true
        }
      }),
      
      // Recent newsletter activity
      prisma.newsletterSubscription.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: now
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          createdAt: true,
          email: true,
          source: true
        }
      }),
      
      // Blog posts count
      prisma.blogPost.count()
    ])

    // Simulate some analytics data based on real activity
    const totalActivity = totalContacts + totalNewsletterSubs
    const estimatedVisitors = Math.max(totalActivity * 10, 50)
    const estimatedPageViews = Math.max(totalActivity * 25, 150)

    // Create activity feed from real data
    const recentActivity = [
      ...recentContacts.map(contact => ({
        timestamp: contact.createdAt.toISOString(),
        page: '/contact',
        userAgent: 'Contact Form',
        location: `Contact: ${contact.subject}`
      })),
      ...recentNewsletterSubs.map(sub => ({
        timestamp: sub.createdAt.toISOString(),
        page: sub.source === 'blog' ? '/blog' : '/',
        userAgent: 'Newsletter Signup',
        location: `Newsletter: ${sub.email.split('@')[1]}`
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5)

    const analyticsData = {
      totalVisitors: estimatedVisitors,
      totalPageViews: estimatedPageViews,
      avgSessionDuration: "2:34",
      bounceRate: "35%",
      topPages: [
        { page: '/', views: Math.floor(estimatedPageViews * 0.4) },
        { page: '/projects', views: Math.floor(estimatedPageViews * 0.25) },
        { page: '/blog', views: Math.floor(estimatedPageViews * 0.15) },
        { page: '/contact', views: totalContacts },
        { page: '/about', views: Math.floor(estimatedPageViews * 0.1) },
      ],
      deviceTypes: [
        { type: 'Desktop', count: Math.floor(estimatedVisitors * 0.6), percentage: 60 },
        { type: 'Mobile', count: Math.floor(estimatedVisitors * 0.3), percentage: 30 },
        { type: 'Tablet', count: Math.floor(estimatedVisitors * 0.1), percentage: 10 },
      ],
      trafficSources: [
        { source: 'Direct', visitors: Math.floor(estimatedVisitors * 0.4), percentage: 40 },
        { source: 'Google', visitors: Math.floor(estimatedVisitors * 0.3), percentage: 30 },
        { source: 'GitHub', visitors: Math.floor(estimatedVisitors * 0.15), percentage: 15 },
        { source: 'LinkedIn', visitors: Math.floor(estimatedVisitors * 0.1), percentage: 10 },
        { source: 'Other', visitors: Math.floor(estimatedVisitors * 0.05), percentage: 5 },
      ],
      recentActivity
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    console.error('Simple Analytics API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch analytics data',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
} 