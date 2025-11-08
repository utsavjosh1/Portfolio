export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

export interface PageView {
  id: string
  path: string
  ipAddress?: string | null
  userAgent?: string | null
  createdAt: Date
}
