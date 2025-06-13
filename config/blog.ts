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
    description: "Articles and thoughts on web development, design, and technology.",
  },
  
  // Blog posts data
  posts: [
    {
      title: "Building Accessible Web Applications",
      excerpt: "Learn how to make your web applications more accessible to all users. This guide covers ARIA attributes, keyboard navigation, focus management, and more to ensure your applications are usable by everyone.",
      date: "May 15, 2023",
      slug: "/blog/building-accessible-web-applications",
      featured: true,
      tags: ["Accessibility", "Web Development", "UX"],
      readingTime: "8 min read",
      published: true,
      category: "Development",
    },
    {
      title: "The Future of React Server Components",
      excerpt: "Exploring how React Server Components will change the way we build applications. This article dives into the benefits, challenges, and best practices for adopting this new paradigm.",
      date: "April 22, 2023",
      slug: "/blog/future-of-react-server-components",
      featured: true,
      tags: ["React", "Server Components", "Next.js"],
      readingTime: "12 min read",
      published: true,
      category: "React",
    },
    {
      title: "Optimizing Next.js Applications for Performance",
      excerpt: "A comprehensive guide to improving the performance of your Next.js applications. Learn about image optimization, code splitting, lazy loading, and other techniques to make your site blazing fast.",
      date: "March 10, 2023",
      slug: "/blog/optimizing-nextjs-applications",
      featured: true,
      tags: ["Next.js", "Performance", "Optimization"],
      readingTime: "15 min read",
      published: true,
      category: "Performance",
    },
    {
      title: "Building a Design System with Tailwind CSS",
      excerpt: "How to create a consistent and maintainable design system using Tailwind CSS. This article covers component design, theme configuration, and strategies for scaling your design system.",
      date: "February 5, 2023",
      slug: "/blog/design-system-with-tailwind",
      featured: false,
      tags: ["Tailwind CSS", "Design System", "CSS"],
      readingTime: "10 min read",
      published: true,
      category: "Design",
    },
    {
      title: "Authentication Best Practices in Next.js",
      excerpt: "Secure your Next.js applications with these authentication best practices. Learn about JWT, OAuth, session management, and how to implement them securely in your applications.",
      date: "January 18, 2023",
      slug: "/blog/authentication-best-practices",
      featured: false,
      tags: ["Authentication", "Security", "Next.js"],
      readingTime: "11 min read",
      published: true,
      category: "Security",
    },
    {
      title: "State Management in 2023: Beyond Redux",
      excerpt: "An overview of modern state management solutions for React applications. Compare Redux, Zustand, Jotai, Recoil, and other libraries to find the best fit for your project.",
      date: "December 12, 2022",
      slug: "/blog/state-management-2023",
      featured: false,
      tags: ["State Management", "React", "Redux"],
      readingTime: "14 min read",
      published: true,
      category: "React",
    },
  ] as BlogPost[],
  
  // Helper functions
  getFeaturedPosts: () => blogConfig.posts.filter(post => post.featured && post.published),
  getPublishedPosts: () => blogConfig.posts.filter(post => post.published),
  getPostsByCategory: (category: string) => blogConfig.posts.filter(post => post.category === category && post.published),
  getPostsByTag: (tag: string) => blogConfig.posts.filter(post => post.tags?.includes(tag) && post.published),
  getRecentPosts: (limit: number = 3) => blogConfig.posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit),
} 