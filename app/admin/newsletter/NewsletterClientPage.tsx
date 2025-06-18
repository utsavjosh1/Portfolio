"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Users, Calendar, Eye, Trash2, Download } from "lucide-react"
import { toast } from "sonner"
import { AdminNav } from "@/components/admin/admin-nav"

interface NewsletterSubscription {
  id: string
  email: string
  active: boolean
  source: string
  createdAt: string
  updatedAt: string
}

interface NewsletterClientPageProps {
  initialSubscriptions: NewsletterSubscription[]
}

export function NewsletterClientPage({ initialSubscriptions }: NewsletterClientPageProps) {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>(initialSubscriptions)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedSubscription, setSelectedSubscription] = useState<NewsletterSubscription | null>(null)

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (statusFilter === 'active') return sub.active
    if (statusFilter === 'inactive') return !sub.active
    return true
  })

  const deleteSubscription = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) {
      return
    }

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscriptions.find(s => s.id === id)?.email }),
        credentials: 'include'
      })

      if (response.ok) {
        toast.success('Subscription deleted successfully')
        setSubscriptions(prev => prev.filter(s => s.id !== id))
        if (selectedSubscription?.id === id) {
          setSelectedSubscription(null)
        }
      } else {
        toast.error('Failed to delete subscription')
      }
    } catch (error) {
      console.error('Error deleting subscription:', error)
      toast.error('Failed to delete subscription')
    }
  }

  const exportSubscriptions = () => {
    const activeSubscriptions = subscriptions.filter(sub => sub.active)
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Source,Subscribed Date\n"
      + activeSubscriptions.map(sub => 
          `${sub.email},${sub.source},${new Date(sub.createdAt).toLocaleDateString()}`
        ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "newsletter_subscribers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Subscribers exported successfully')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      {/* Main Container - Optimized for 40% width */}
      <div className="w-full px-4 py-6">
        {/* Header Section - Compact */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Newsletter Subscriptions
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage newsletter subscribers
            </p>
          </div>
          
          {/* Stats and Filter Bar - Compact */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{subscriptions.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {subscriptions.filter(s => s.active).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {subscriptions.filter(s => !s.active).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Inactive</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportSubscriptions}
                  className="text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 h-9 text-xs">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Column for 40% width */}
        <div className="space-y-6">
          {/* Subscriptions List */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Subscribers ({filteredSubscriptions.length})</span>
                </div>
                {selectedSubscription && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSubscription(null)}
                    className="text-xs"
                  >
                    Close Details
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSubscriptions.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No subscriptions found</p>
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {filteredSubscriptions.map((subscription) => (
                    <div
                      key={subscription.id}
                      className={`p-4 cursor-pointer hover:bg-muted/20 transition-all duration-200 ${
                        selectedSubscription?.id === subscription.id 
                          ? 'bg-primary/5 border-l-3 border-l-primary' 
                          : ''
                      }`}
                      onClick={() => setSelectedSubscription(subscription)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mail className="h-3 w-3 text-primary" />
                              </div>
                              <span className="font-medium text-sm text-foreground truncate">{subscription.email}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Source: {subscription.source}
                            </p>
                          </div>
                          <Badge className={`text-xs px-2 py-0.5 flex-shrink-0 ${
                            subscription.active 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {subscription.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(subscription.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Details - Only show when selected */}
          {selectedSubscription && (
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-base font-semibold">Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Subscription Info */}
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Email</label>
                        <p className="text-sm font-semibold text-foreground mt-1 break-all">{selectedSubscription.email}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Source</label>
                        <p className="text-sm text-foreground mt-1">{selectedSubscription.source}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Subscribed</label>
                      <p className="text-xs text-foreground mt-1">{formatDate(selectedSubscription.createdAt)}</p>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${
                      selectedSubscription.active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {selectedSubscription.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">Actions</label>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSubscription(selectedSubscription.id)}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 