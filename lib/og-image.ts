const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://joshiutsav.com'

export interface OGImageOptions {
  title?: string
  subtitle?: string
  description?: string
  type?: 'default' | 'project' | 'blog' | 'experience'
  tags?: string[]
  date?: string
  readingTime?: string
}

export function generateOGImageURL(options: OGImageOptions = {}): string {
  const {
    title = 'Utsav Joshi',
    subtitle = 'Full Stack Developer & Software Engineer',
    description,
    type = 'default',
    tags = ['React', 'Next.js', 'TypeScript'],
    date,
    readingTime
  } = options

  const params = new URLSearchParams()
  
  if (title) params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)
  if (description) params.set('description', description)
  if (type) params.set('type', type)
  if (tags.length > 0) params.set('tags', tags.join(','))
  if (date) params.set('date', date)
  if (readingTime) params.set('readingTime', readingTime)

  return `${BASE_URL}/api/og?${params.toString()}`
}

// Predefined OG images for common pages
export const OGImages = {
  home: () => generateOGImageURL({
    title: 'Utsav Joshi',
    subtitle: 'Full Stack Developer & Software Engineer',
    description: 'Building modern web applications with React, Next.js, and TypeScript',
    type: 'default',
    tags: ['React', 'Next.js', 'TypeScript', 'Full-Stack']
  }),

  projects: () => generateOGImageURL({
    title: 'Projects',
    subtitle: 'Featured Work & Portfolio',
    description: 'Explore my latest projects and technical achievements',
    type: 'project',
    tags: ['Portfolio', 'Projects', 'Web Development', 'React']
  }),

  experience: () => generateOGImageURL({
    title: 'Experience',
    subtitle: 'Professional Journey',
    description: 'My career path and professional achievements',
    type: 'experience',
    tags: ['Career', 'Experience', 'Software Engineer', 'Full-Stack']
  }),

  blog: () => generateOGImageURL({
    title: 'Blog',
    subtitle: 'Technical Articles & Insights',
    description: 'Thoughts on web development, programming, and technology',
    type: 'blog',
    tags: ['Blog', 'Articles', 'Web Development', 'Programming']
  }),

  contact: () => generateOGImageURL({
    title: 'Contact',
    subtitle: 'Let\'s Work Together',
    description: 'Get in touch for collaborations and opportunities',
    type: 'default',
    tags: ['Contact', 'Collaboration', 'Hire', 'Freelance']
  }),

  // Dynamic generators
  project: (title: string, description: string, tags: string[]) => 
    generateOGImageURL({
      title,
      subtitle: 'Project Showcase',
      description,
      type: 'project',
      tags
    }),

  blogPost: (title: string, excerpt: string, tags: string[], date?: string, readingTime?: string) =>
    generateOGImageURL({
      title,
      subtitle: 'Blog Post',
      description: excerpt,
      type: 'blog',
      tags,
      date,
      readingTime
    })
} 