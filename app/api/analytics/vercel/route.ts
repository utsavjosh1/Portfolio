import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '7d'
    
    // Vercel Analytics API endpoint
    const vercelToken = process.env.VERCEL_ACCESS_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID
    const projectId = process.env.VERCEL_PROJECT_ID
    
    if (!vercelToken || !projectId) {
      throw new Error('Missing Vercel Analytics configuration')
    }

    // Convert timeRange to Vercel API format
    const now = new Date()
    let since: string
    
    switch (timeRange) {
      case '1d':
        since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
        break
      case '7d':
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
        break
      case '30d':
        since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
        break
      case '90d':
        since = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()
        break
      default:
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }

    const until = now.toISOString()
    
    // Build API URL
    const baseUrl = 'https://vercel.com/api/web/insights'
    const params = new URLSearchParams({
      projectId,
      since,
      until,
      ...(teamId && { teamId })
    })

    // Fetch analytics data from Vercel
    const response = await fetch(`${baseUrl}?${params}`, {
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Process Vercel Analytics data
    const processedData = {
      totalVisitors: data.visitors || 0,
      totalPageViews: data.pageviews || 0,
      avgSessionDuration: formatDuration(data.avgDuration || 0),
      bounceRate: `${Math.round((data.bounces / data.visitors) * 100) || 0}%`,
      topPages: data.pages?.slice(0, 5).map((page: any) => ({
        page: page.path,
        views: page.views
      })) || [],
      deviceTypes: processDeviceData(data.devices || []),
      trafficSources: processSourceData(data.referrers || []),
      recentActivity: [] // Vercel doesn't provide real-time activity data
    }

    return NextResponse.json({
      success: true,
      data: processedData,
    })
  } catch (error) {
    console.error('Vercel Analytics API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch Vercel analytics data',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function processDeviceData(devices: any[]): Array<{ type: string; count: number; percentage: number }> {
  const total = devices.reduce((sum, device) => sum + device.count, 0) || 1
  
  return devices.map(device => ({
    type: device.name || 'Unknown',
    count: device.count || 0,
    percentage: Math.round((device.count / total) * 100)
  }))
}

function processSourceData(referrers: any[]): Array<{ source: string; visitors: number; percentage: number }> {
  const total = referrers.reduce((sum, ref) => sum + ref.visitors, 0) || 1
  
  return referrers.slice(0, 5).map(ref => ({
    source: ref.host || 'Direct',
    visitors: ref.visitors || 0,
    percentage: Math.round((ref.visitors / total) * 100)
  }))
} 