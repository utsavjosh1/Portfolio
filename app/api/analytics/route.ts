import { NextRequest, NextResponse } from 'next/server'

// Google Analytics integration (optional - requires npm install @google-analytics/data)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let BetaAnalyticsDataClient: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ga = require('@google-analytics/data')
  BetaAnalyticsDataClient = ga.BetaAnalyticsDataClient
} catch {
  console.log('Google Analytics Data API not installed. Install with: npm install @google-analytics/data')
}

export async function GET(request: NextRequest) {
  try {
    if (!BetaAnalyticsDataClient) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Analytics Data API not installed. Run: npm install @google-analytics/data'
        },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '7d'
    
    const propertyId = process.env.GA4_PROPERTY_ID
    
    if (!propertyId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'GA4_PROPERTY_ID environment variable not set'
        },
        { status: 500 }
      )
    }

    // Initialize the Analytics Data API client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })
    
    // Convert timeRange to date range
    const endDate = 'today'
    let startDate = '7daysAgo'
    
    switch (timeRange) {
      case '1d':
        startDate = 'yesterday'
        break
      case '7d':
        startDate = '7daysAgo'
        break
      case '30d':
        startDate = '30daysAgo'
        break
      case '90d':
        startDate = '90daysAgo'
        break
    }

    // Fetch basic metrics
    const [metricsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    })

    // Fetch top pages
    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    })

    // Fetch device categories
    const [deviceResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
    })

    // Fetch traffic sources
    const [sourceResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    })

    // Process the data with proper typing
    const totalUsers = parseInt(metricsResponse.rows?.[0]?.metricValues?.[0]?.value || '0')
    const totalPageViews = parseInt(metricsResponse.rows?.[0]?.metricValues?.[1]?.value || '0')
    const avgSessionDuration = parseFloat(metricsResponse.rows?.[0]?.metricValues?.[2]?.value || '0')
    const bounceRate = parseFloat(metricsResponse.rows?.[0]?.metricValues?.[3]?.value || '0')

    // Format session duration
    const minutes = Math.floor(avgSessionDuration / 60)
    const seconds = Math.floor(avgSessionDuration % 60)
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`

    // Process top pages with proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topPages = pagesResponse.rows?.map((row: any) => ({
      page: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0')
    })) || []

    // Process device types with proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalDeviceUsers = deviceResponse.rows?.reduce((sum: number, row: any) => 
      sum + parseInt(row.metricValues?.[0]?.value || '0'), 0) || 1

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deviceTypes = deviceResponse.rows?.map((row: any) => {
      const count = parseInt(row.metricValues?.[0]?.value || '0')
      return {
        type: row.dimensionValues?.[0]?.value || 'Unknown',
        count,
        percentage: Math.round((count / totalDeviceUsers) * 100)
      }
    }) || []

    // Process traffic sources with proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalSourceUsers = sourceResponse.rows?.reduce((sum: number, row: any) => 
      sum + parseInt(row.metricValues?.[0]?.value || '0'), 0) || 1

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const trafficSources = sourceResponse.rows?.map((row: any) => {
      const visitors = parseInt(row.metricValues?.[0]?.value || '0')
      return {
        source: row.dimensionValues?.[0]?.value || 'Unknown',
        visitors,
        percentage: Math.round((visitors / totalSourceUsers) * 100)
      }
    }) || []

    const analyticsData = {
      totalVisitors: totalUsers,
      totalPageViews: totalPageViews,
      avgSessionDuration: formattedDuration,
      bounceRate: `${Math.round(bounceRate * 100)}%`,
      topPages,
      deviceTypes,
      trafficSources,
      recentActivity: [] // Real-time data would require a different API call
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch analytics data',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
} 