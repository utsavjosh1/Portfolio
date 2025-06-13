import { PrismaClient, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create technologies first
  const technologies = [
    { name: 'Next.js', description: 'React framework for production', category: 'Framework' },
    { name: 'React', description: 'JavaScript library for building user interfaces', category: 'Library' },
    { name: 'TypeScript', description: 'Typed superset of JavaScript', category: 'Language' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework', category: 'Styling' },
    { name: 'Stripe', description: 'Payment processing platform', category: 'Service' },
    { name: 'Firebase', description: 'Backend-as-a-Service platform', category: 'Backend' },
    { name: 'D3.js', description: 'Data visualization library', category: 'Library' },
    { name: 'Node.js', description: 'JavaScript runtime environment', category: 'Runtime' },
    { name: 'Python', description: 'Programming language', category: 'Language' },
    { name: 'TensorFlow', description: 'Machine learning framework', category: 'ML/AI' },
    { name: 'MongoDB', description: 'NoSQL database', category: 'Database' },
    { name: 'Google Maps API', description: 'Mapping and location services', category: 'Service' },
    { name: 'React Native', description: 'Mobile app development framework', category: 'Framework' },
    { name: 'GraphQL', description: 'Query language for APIs', category: 'API' },
    { name: 'AWS', description: 'Cloud computing platform', category: 'Cloud' },
  ]

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    })
  }

  // Create projects
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured online store built with Next.js, Stripe, and a headless CMS.',
      content: `# E-commerce Platform: Modern Online Shopping Experience

A comprehensive e-commerce solution built with cutting-edge web technologies, focusing on performance, user experience, and scalability.

## Key Features
- Secure payment processing with Stripe
- Real-time inventory management
- Responsive design for all devices
- SEO optimized with server-side rendering
- Complete admin dashboard

## Technical Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Stripe Payment Elements
- **Deployment**: Vercel

## Results
- 40% improvement in conversion rates
- 25% reduction in cart abandonment
- 99.9% uptime with sub-second load times`,
      image: '/placeholder.svg?height=300&width=600',
      gallery: [
        '/projects/ecommerce/hero.jpg',
        '/projects/ecommerce/dashboard.jpg',
        '/projects/ecommerce/mobile.jpg'
      ],
      tags: ['Next.js', 'Stripe', 'E-commerce', 'TypeScript'],
      status: 'COMPLETED',
      featured: true,
      year: '2023',
      github: 'https://github.com/utsavjosh1/ecommerce-platform',
      demo: 'https://ecommerce-demo.joshiutsav.com',
      slug: 'ecommerce',
      published: true,
      technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'TypeScript']
    },
    {
      title: 'Task Management App',
      description: 'A productivity tool for teams with real-time collaboration features.',
      content: `# Task Management App

A modern productivity application designed for teams to collaborate effectively and manage their workflows seamlessly.

## Features
- Real-time collaboration with live updates
- Project organization with boards and lists
- Time tracking and reporting
- Team communication tools
- Mobile responsive design

## Technology Stack
- **Frontend**: React, TypeScript
- **Backend**: Firebase Firestore
- **Real-time**: Firebase Real-time Database
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

## Impact
- 45% improvement in team productivity
- 30% reduction in project completion time
- 10,000+ active users across 500+ teams`,
      image: '/placeholder.svg?height=300&width=600',
      gallery: [
        '/projects/task-app/dashboard.jpg',
        '/projects/task-app/board-view.jpg'
      ],
      tags: ['React', 'Firebase', 'Collaboration', 'Productivity'],
      status: 'COMPLETED',
      featured: true,
      year: '2023',
      github: 'https://github.com/utsavjosh1/task-management-app',
      demo: 'https://taskapp-demo.joshiutsav.com',
      slug: 'task-app',
      published: true,
      technologies: ['React', 'Firebase', 'TypeScript']
    },
    {
      title: 'Personal Finance Dashboard',
      description: 'Interactive dashboard for tracking expenses and investments with data visualization.',
      content: `# Personal Finance Dashboard

A comprehensive financial tracking application that helps users understand their spending patterns and achieve their financial goals.

## Features
- Expense tracking with automatic categorization
- Investment portfolio management
- Budget planning and monitoring
- Interactive data visualizations
- Financial insights and recommendations

## Technology
- **Frontend**: React, D3.js for visualizations
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **APIs**: Banking APIs for transaction sync
- **Charts**: Custom D3.js visualizations

## Results
- Helped users save average of $2,400 per year
- 85% improvement in financial awareness
- Processing over $10M in tracked transactions`,
      image: '/placeholder.svg?height=300&width=600',
      gallery: [
        '/projects/finance/overview.jpg',
        '/projects/finance/charts.jpg'
      ],
      tags: ['React', 'D3.js', 'Finance', 'Data Visualization'],
      status: 'COMPLETED',
      featured: true,
      year: '2023',
      github: 'https://github.com/utsavjosh1/finance-dashboard',
      demo: 'https://finance-demo.joshiutsav.com',
      slug: 'finance-dashboard',
      published: true,
      technologies: ['React', 'D3.js', 'Node.js']
    }
  ]

  for (const projectData of projects) {
    const { technologies: techNames, ...projectInfo } = projectData
    
    const project = await prisma.project.upsert({
      where: { slug: projectInfo.slug },
      update: {},
      create: projectInfo,
    })

    // Connect technologies
    for (const techName of techNames) {
      const technology = await prisma.technology.findUnique({
        where: { name: techName }
      })
      
      if (technology) {
        await prisma.projectTechnology.upsert({
          where: {
            projectId_technologyId: {
              projectId: project.id,
              technologyId: technology.id
            }
          },
          update: {},
          create: {
            projectId: project.id,
            technologyId: technology.id
          }
        })
      }
    }
  }

  // Create blog posts
  const blogPosts = [
    {
      title: 'Building Accessible Web Applications',
      excerpt: 'Learn how to make your web applications more accessible to all users. This guide covers ARIA attributes, keyboard navigation, focus management, and more.',
      content: `# Building Accessible Web Applications

Web accessibility is not just a nice-to-have feature—it's a fundamental requirement for creating inclusive digital experiences.

## Why Accessibility Matters

According to the World Health Organization, over 1 billion people worldwide experience some form of disability. When we build accessible applications, we're creating better experiences for everyone.

## Key Principles

### 1. Perceivable
Information must be presentable to users in ways they can perceive.

### 2. Operable
User interface components must be operable by all users.

### 3. Understandable
Information and UI operation must be understandable.

### 4. Robust
Content must be robust enough for assistive technologies.

## Implementation Strategies

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Maintain sufficient color contrast
- Provide alternative text for images

## Testing Your Accessibility

Regular testing with both automated tools and real users is essential for maintaining accessibility standards.`,
      slug: 'building-accessible-web-applications',
      featured: true,
      published: true,
      tags: ['Accessibility', 'Web Development', 'UX'],
      category: 'Development',
      readingTime: '8 min read',
      publishedAt: new Date('2023-05-15')
    },
    {
      title: 'The Future of React Server Components',
      excerpt: 'Exploring how React Server Components will change the way we build applications. This article dives into the benefits, challenges, and best practices.',
      content: `# The Future of React Server Components

React Server Components represent a paradigm shift in how we think about building React applications.

## What Are Server Components?

Server Components are a new type of React component that runs on the server rather than the client.

## Benefits

### Improved Performance
Server Components can significantly reduce bundle sizes and improve loading times.

### Better SEO
Since Server Components render on the server, they provide excellent SEO benefits.

### Reduced Client-Side Complexity
By moving logic to the server, we can simplify our client-side code.

## Getting Started

Here's how you can start experimenting with Server Components in your Next.js application...`,
      slug: 'future-of-react-server-components',
      featured: true,
      published: true,
      tags: ['React', 'Server Components', 'Next.js'],
      category: 'React',
      readingTime: '12 min read',
      publishedAt: new Date('2023-04-22')
    },
    {
      title: 'Optimizing Next.js Applications for Performance',
      excerpt: 'A comprehensive guide to improving the performance of your Next.js applications. Learn about image optimization, code splitting, and caching strategies.',
      content: `# Optimizing Next.js Applications for Performance

Performance is crucial for user experience and SEO. This guide explores various techniques to optimize your Next.js applications.

## Core Web Vitals

Understanding and optimizing for Core Web Vitals is essential:

### Largest Contentful Paint (LCP)
- Use Next.js Image component
- Implement proper caching
- Minimize render-blocking resources

### First Input Delay (FID)
- Minimize JavaScript execution time
- Use code splitting effectively
- Optimize third-party scripts

### Cumulative Layout Shift (CLS)
- Include size attributes for images
- Avoid inserting content above existing content
- Use CSS transform animations

## Image Optimization

Next.js provides powerful image optimization out of the box with the Image component.

## Code Splitting

Implement both route-level and component-level code splitting for optimal performance.`,
      slug: 'optimizing-nextjs-applications',
      featured: true,
      published: true,
      tags: ['Next.js', 'Performance', 'Optimization'],
      category: 'Performance',
      readingTime: '15 min read',
      publishedAt: new Date('2023-03-10')
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 