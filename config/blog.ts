export interface BlogPost {
  title: string
  excerpt: string
  date: string
  slug: string
  featured?: boolean
  tags?: string[]
  author?: string
  readingTime?: string
  published?: boolean
  category?: string
}

export const blogConfig = {
  // Page metadata
  metadata: {
    title: "Blog",
    description: "Articles and thoughts on authentication, security, and modern web development practices.",
  },
} 