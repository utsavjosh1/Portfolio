export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
}

export interface ContactResponse {
  success: boolean
  message: string
  id?: string
  errors?: any[]
}

export interface ContactListResponse {
  success: boolean
  data: ContactSubmission[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export class ContactService {
  private static baseUrl = '/api/contact'

  // Submit contact form
  static async submitContact(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Failed to submit contact form:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      }
    }
  }

  // Get all contact submissions (admin)
  static async getSubmissions(params?: {
    status?: string
    limit?: number
    offset?: number
  }): Promise<ContactListResponse> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.status) searchParams.set('status', params.status)
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.offset) searchParams.set('offset', params.offset.toString())

      const url = `${this.baseUrl}?${searchParams.toString()}`
      const response = await fetch(url)
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error)
      return {
        success: false,
        data: [],
        pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
      }
    }
  }

  // Get specific contact submission
  static async getSubmission(id: string): Promise<{ success: boolean; data?: ContactSubmission; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Failed to fetch contact submission:', error)
      return {
        success: false,
        message: 'Failed to fetch submission',
      }
    }
  }

  // Update contact submission status
  static async updateSubmissionStatus(
    id: string, 
    status: ContactSubmission['status']
  ): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Failed to update contact submission:', error)
      return {
        success: false,
        message: 'Failed to update submission',
      }
    }
  }

  // Delete contact submission
  static async deleteSubmission(id: string): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Failed to delete contact submission:', error)
      return {
        success: false,
        message: 'Failed to delete submission',
      }
    }
  }
} 