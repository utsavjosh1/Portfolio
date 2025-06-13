import { Project, BlogPost } from './index'

// Extended interfaces for individual pages
export interface ProjectDetail extends Project {
  content?: string
  gallery?: string[]
  technologies?: {
    name: string
    description: string
    icon?: string
  }[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
    company: string
  }
}

export interface BlogPostDetail extends BlogPost {
  content?: string
  tableOfContents?: {
    title: string
    id: string
    level: number
  }[]
  relatedPosts?: string[] // slugs of related posts
  updatedAt?: string
}

// Page configuration for individual project pages
export const projectPageConfig = {
  // Default metadata that can be overridden per project
  defaultMetadata: {
    titleTemplate: "%s | Projects | Utsav Joshi",
    descriptionTemplate: "Learn about %s - a project by Utsav Joshi",
  },
  
  // Layout configuration
  layout: {
    showBackButton: true,
    showRelatedProjects: true,
    showContactCTA: true,
    maxRelatedProjects: 3,
  },
  
  // Content sections to display
  sections: {
    hero: true,
    overview: true,
    technologies: true,
    gallery: true,
    challenges: true,
    results: true,
    testimonial: true,
  }
}

// Page configuration for individual blog post pages
export const blogPostPageConfig = {
  // Default metadata that can be overridden per post
  defaultMetadata: {
    titleTemplate: "%s | Blog | Utsav Joshi",
    descriptionTemplate: "Read about %s on Utsav Joshi's blog",
  },
  
  // Layout configuration
  layout: {
    showBackButton: true,
    showRelatedPosts: true,
    showShareButtons: true,
    showTableOfContents: true,
    maxRelatedPosts: 3,
  },
  
  // Content sections to display
  sections: {
    hero: true,
    metadata: true,
    tableOfContents: true,
    content: true,
    author: true,
    relatedPosts: true,
    comments: false, // Can be enabled if you add comments
  },
  
  // Social sharing configuration
  sharing: {
    platforms: ['twitter', 'linkedin', 'facebook', 'copy-link'],
    twitterHandle: '@utsavjosh1',
  }
}

// Helper functions for individual pages
export const pageHelpers = {
  // Generate metadata for project pages
  generateProjectMetadata: (project: ProjectDetail) => ({
    title: projectPageConfig.defaultMetadata.titleTemplate.replace('%s', project.title),
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  }),
  
  // Generate metadata for blog post pages
  generateBlogPostMetadata: (post: BlogPostDetail) => ({
    title: blogPostPageConfig.defaultMetadata.titleTemplate.replace('%s', post.title),
    description: post.excerpt,
    authors: [{ name: post.author || 'Utsav Joshi' }],
    publishedTime: post.date,
    modifiedTime: post.updatedAt || post.date,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author || 'Utsav Joshi'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }),
  
  // Get related projects (excluding current)
  getRelatedProjects: (currentProject: Project, allProjects: Project[], limit = 3) => {
    return allProjects
      .filter(p => p.title !== currentProject.title)
      .filter(p => p.tags.some(tag => currentProject.tags.includes(tag)))
      .slice(0, limit)
  },
  
  // Get related blog posts (excluding current)
  getRelatedPosts: (currentPost: BlogPost, allPosts: BlogPost[], limit = 3) => {
    return allPosts
      .filter(p => p.slug !== currentPost.slug && p.published)
      .filter(p => 
        p.tags?.some(tag => currentPost.tags?.includes(tag)) ||
        p.category === currentPost.category
      )
      .slice(0, limit)
  },
} 