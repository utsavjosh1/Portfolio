"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  TrendingUp, 
  Calendar,
  MousePointer,
  Smartphone,
  Monitor,
  RefreshCw
} from "lucide-react"
import { AdminNav } from "@/components/admin/admin-nav"

interface AnalyticsData {
  totalVisitors: number
  totalPageViews: number
  avgSessionDuration: string
  bounceRate: string
  topPages: Array<{ page: string; views: number }>
  deviceTypes: Array<{ type: string; count: number; percentage: number }>
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>
  recentActivity: Array<{ 
    timestamp: string
    page: string
    userAgent: string
    location: string
  }>
}

interface AnalyticsClientPageProps {
  initialData: AnalyticsData
}

export function AnalyticsClientPage({ initialData }: AnalyticsClientPageProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(initialData)
  const [timeRange, setTimeRange] = useState<string>('7d')
  const [loading, setLoading] = useState(false)

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics/simple?timeRange=${timeRange}`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAnalyticsData(data.data)
        }
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Smartphone className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="w-full px-4 py-6">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Website traffic and visitor insights
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAnalytics}
              disabled={loading}
              className="text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Total Visitors</p>
                    <p className="text-xl font-bold text-foreground">{analyticsData.totalVisitors.toLocaleString()}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Page Views</p>
                    <p className="text-xl font-bold text-foreground">{analyticsData.totalPageViews.toLocaleString()}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Avg. Session</p>
                    <p className="text-xl font-bold text-foreground">{analyticsData.avgSessionDuration}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Bounce Rate</p>
                    <p className="text-xl font-bold text-foreground">{analyticsData.bounceRate}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Top Pages</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {analyticsData.topPages.map((page, index) => (
                  <div key={page.page} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{page.page}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {page.views.toLocaleString()} views
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Types & Traffic Sources */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Device Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {analyticsData.deviceTypes.map((device) => (
                    <div key={device.type} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          {getDeviceIcon(device.type)}
                        </div>
                        <span className="font-medium text-sm text-foreground">{device.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{device.count}</span>
                        <Badge variant="secondary" className="text-xs">
                          {device.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Traffic Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {analyticsData.trafficSources.map((source) => (
                    <div key={source.source} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <MousePointer className="h-3 w-3 text-primary" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{source.visitors}</span>
                        <Badge variant="secondary" className="text-xs">
                          {source.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium text-sm text-foreground truncate">{activity.page}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {activity.userAgent} • {activity.location}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 