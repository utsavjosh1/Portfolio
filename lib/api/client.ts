const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  }

  // Projects
  static async getProjects(params?: {
    featured?: boolean
    status?: string
    year?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params?.featured) searchParams.set('featured', 'true')
    if (params?.status) searchParams.set('status', params.status)
    if (params?.year) searchParams.set('year', params.year)

    const query = searchParams.toString()
    return this.request(`/projects${query ? `?${query}` : ''}`)
  }

  static async getProject(slug: string) {
    return this.request(`/projects/${slug}`)
  }

  // Blog Posts
  static async getBlogPosts(params?: {
    featured?: boolean
    recent?: boolean
    category?: string
    tag?: string
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.featured) searchParams.set('featured', 'true')
    if (params?.recent) searchParams.set('recent', 'true')
    if (params?.category) searchParams.set('category', params.category)
    if (params?.tag) searchParams.set('tag', params.tag)
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/blog${query ? `?${query}` : ''}`)
  }

  static async getBlogPost(slug: string) {
    return this.request(`/blog/${slug}`)
  }

  // Experiences
  static async getExperiences(params?: {
    current?: boolean
    recent?: boolean
    company?: string
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.current) searchParams.set('current', 'true')
    if (params?.recent) searchParams.set('recent', 'true')
    if (params?.company) searchParams.set('company', params.company)
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/experience${query ? `?${query}` : ''}`)
  }

  // Skills
  static async getSkills(params?: {
    category?: string
    level?: string
    grouped?: boolean
    top?: boolean
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.level) searchParams.set('level', params.level)
    if (params?.grouped) searchParams.set('grouped', 'true')
    if (params?.top) searchParams.set('top', 'true')
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/skills${query ? `?${query}` : ''}`)
  }

  // Testimonials
  static async getTestimonials(params?: {
    approved?: boolean
    featured?: boolean
    recent?: boolean
    company?: string
    rating?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.approved) searchParams.set('approved', 'true')
    if (params?.featured) searchParams.set('featured', 'true')
    if (params?.recent) searchParams.set('recent', 'true')
    if (params?.company) searchParams.set('company', params.company)
    if (params?.rating) searchParams.set('rating', params.rating.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/testimonials${query ? `?${query}` : ''}`)
  }

  // Contact Form
  static async submitContact(data: {
    name: string
    email: string
    subject?: string
    message: string
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Newsletter
  static async subscribeNewsletter(email: string) {
    return this.request('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }
} 