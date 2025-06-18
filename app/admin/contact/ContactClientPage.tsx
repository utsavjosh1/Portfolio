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
import { ContactService, type ContactSubmission } from "@/lib/services/contact"
import { Mail, MessageSquare, User, Calendar, Eye, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AdminNav } from "@/components/admin/admin-nav"

interface ContactClientPageProps {
  initialSubmissions: ContactSubmission[]
}

export function ContactClientPage({ initialSubmissions }: ContactClientPageProps) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  const filteredSubmissions = submissions.filter(sub => {
    if (statusFilter === 'all') return true
    return sub.status === statusFilter
  })

  const updateStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      const response = await ContactService.updateSubmissionStatus(id, status)
      
      if (response.success) {
        toast.success('Status updated successfully')
        setSubmissions(prev => prev.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        ))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status })
        }
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return
    }

    try {
      const response = await ContactService.deleteSubmission(id)
      
      if (response.success) {
        toast.success('Submission deleted successfully')
        setSubmissions(prev => prev.filter(sub => sub.id !== id))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null)
        }
      } else {
        toast.error('Failed to delete submission')
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
      toast.error('Failed to delete submission')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'READ': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'REPLIED': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
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
              Contact Submissions
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage contact form submissions
            </p>
          </div>
          
          {/* Stats and Filter Bar - Compact */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{submissions.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {submissions.filter(s => s.status === 'UNREAD').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Unread</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {submissions.filter(s => s.status === 'REPLIED').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Replied</div>
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="UNREAD">Unread</SelectItem>
                  <SelectItem value="READ">Read</SelectItem>
                  <SelectItem value="REPLIED">Replied</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content - Single Column for 40% width */}
        <div className="space-y-6">
          {/* Submissions List */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Submissions ({filteredSubmissions.length})</span>
                </div>
                {selectedSubmission && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSubmission(null)}
                    className="text-xs"
                  >
                    Close Details
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No submissions found</p>
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className={`p-4 cursor-pointer hover:bg-muted/20 transition-all duration-200 ${
                        selectedSubmission?.id === submission.id 
                          ? 'bg-primary/5 border-l-3 border-l-primary' 
                          : ''
                      }`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-3 w-3 text-primary" />
                              </div>
                              <span className="font-medium text-sm text-foreground truncate">{submission.name}</span>
                            </div>
                            <p className="text-sm font-medium text-foreground mb-1 line-clamp-1">
                              {submission.subject}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {submission.message}
                            </p>
                          </div>
                          <Badge className={`text-xs px-2 py-0.5 flex-shrink-0 ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(submission.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-1 min-w-0">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{submission.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission Details - Only show when selected */}
          {selectedSubmission && (
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-base font-semibold">Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Contact Info */}
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Name</label>
                        <p className="text-sm font-semibold text-foreground mt-1">{selectedSubmission.name}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Email</label>
                        <p className="text-sm text-foreground mt-1 break-all">{selectedSubmission.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Subject</label>
                    <p className="text-sm font-semibold text-foreground mt-1">{selectedSubmission.subject}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Message</label>
                    <div className="mt-1 p-3 bg-muted/10 rounded-lg border">
                      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Received</label>
                      <p className="text-xs text-foreground mt-1">{formatDate(selectedSubmission.createdAt)}</p>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">Actions</label>
                    <div className="space-y-2">
                      <Select
                        value={selectedSubmission.status}
                        onValueChange={(status) => updateStatus(selectedSubmission.id, status as ContactSubmission['status'])}
                      >
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNREAD">Mark as Unread</SelectItem>
                          <SelectItem value="READ">Mark as Read</SelectItem>
                          <SelectItem value="REPLIED">Mark as Replied</SelectItem>
                          <SelectItem value="ARCHIVED">Archive</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSubmission(selectedSubmission.id)}
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