# Configuration System

This directory contains the configuration files for the portfolio website, including projects, blog posts, and page layouts.

## File Structure

- `site.ts` - Site-wide configuration (name, description, links, etc.)
- `projects.ts` - Projects list configuration with metadata
- `blog.ts` - Blog posts list configuration with metadata
- `pages.ts` - Individual page configurations and layouts
- `content.ts` - Detailed content for individual project and blog post pages
- `index.ts` - Central export file for all configurations

## Usage

### Basic List Pages

For the projects and blog list pages, import the configurations:

```typescript
// Projects page
import { projectsConfig } from '@/config/projects'

// Use metadata
export const metadata = {
  title: projectsConfig.metadata.title,
  description: projectsConfig.metadata.description,
}

// Use projects data
{projectsConfig.projects.map((project) => (
  <ProjectCard key={project.title} {...project} />
))}
```

```typescript
// Blog page
import { blogConfig } from '@/config/blog'

// Use helper functions
{blogConfig.getPublishedPosts().map((post) => (
  <BlogPostPreview key={post.slug} {...post} />
))}
```

### Individual Pages

For individual project and blog post pages, use the detailed configurations:

```typescript
// Individual project page
import { contentHelpers, pageHelpers, projectPageConfig } from '@/config'

export async function generateMetadata({ params }) {
  const project = contentHelpers.getProjectDetail(params.slug)
  if (!project) return {}
  
  return pageHelpers.generateProjectMetadata(project)
}

export default function ProjectPage({ params }) {
  const project = contentHelpers.getProjectDetail(params.slug)
  // Render project details...
}
```

### Available Helper Functions

#### Projects
- `projectsConfig.getFeaturedProjects()` - Get featured projects only
- `projectsConfig.getProjectsByStatus(status)` - Filter by status
- `projectsConfig.getProjectsByYear(year)` - Filter by year

#### Blog Posts
- `blogConfig.getFeaturedPosts()` - Get featured posts only
- `blogConfig.getPublishedPosts()` - Get published posts only
- `blogConfig.getPostsByCategory(category)` - Filter by category
- `blogConfig.getPostsByTag(tag)` - Filter by tag
- `blogConfig.getRecentPosts(limit)` - Get recent posts

#### Content
- `contentHelpers.getProjectDetail(slug)` - Get detailed project content
- `contentHelpers.getBlogPostDetail(slug)` - Get detailed blog post content
- `contentHelpers.getAllProjectSlugs()` - Get all project slugs
- `contentHelpers.getAllBlogPostSlugs()` - Get all blog post slugs

#### Page Helpers
- `pageHelpers.generateProjectMetadata(project)` - Generate SEO metadata
- `pageHelpers.generateBlogPostMetadata(post)` - Generate SEO metadata
- `pageHelpers.getRelatedProjects(current, all, limit)` - Get related projects
- `pageHelpers.getRelatedPosts(current, all, limit)` - Get related posts

## Data Types

### Project Interface
```typescript
interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'archived'
  year?: string
  github?: string
  demo?: string
}
```

### Blog Post Interface
```typescript
interface BlogPost {
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
```

### Extended Interfaces for Individual Pages

#### ProjectDetail
Extends `Project` with additional fields:
- `content?: string` - Markdown content
- `gallery?: string[]` - Image gallery
- `technologies?: Array<{name, description, icon}>` - Tech stack details
- `challenges?: string[]` - Project challenges
- `solutions?: string[]` - Solutions implemented
- `results?: string[]` - Project outcomes
- `testimonial?: {quote, author, role, company}` - Client testimonial

#### BlogPostDetail
Extends `BlogPost` with additional fields:
- `content?: string` - Markdown content
- `tableOfContents?: Array<{title, id, level}>` - TOC structure
- `relatedPosts?: string[]` - Related post slugs
- `updatedAt?: string` - Last updated date

## Adding New Content

### Adding a New Project
1. Add the basic project data to `projects.ts` in the `projects` array
2. Add detailed content to `content.ts` in the `projectsDetailConfig` object
3. The project will automatically appear on the projects list page
4. Create the individual project page at `app/projects/[slug]/page.tsx`

### Adding a New Blog Post
1. Add the basic post data to `blog.ts` in the `posts` array
2. Add detailed content to `content.ts` in the `blogPostsDetailConfig` object
3. The post will automatically appear on the blog list page
4. Create the individual blog post page at `app/blog/[slug]/page.tsx`

## Configuration Options

### Project Page Layout
Configure what sections to show on individual project pages in `pages.ts`:
```typescript
sections: {
  hero: true,
  overview: true,
  technologies: true,
  gallery: true,
  challenges: true,
  results: true,
  testimonial: true,
}
```

### Blog Post Page Layout
Configure what sections to show on individual blog post pages in `pages.ts`:
```typescript
sections: {
  hero: true,
  metadata: true,
  tableOfContents: true,
  content: true,
  author: true,
  relatedPosts: true,
  comments: false,
}
```

## Best Practices

1. **Keep list data minimal** - Only include essential fields in the main arrays
2. **Use detailed configs for rich content** - Store full content in the detailed configurations
3. **Use helper functions** - Leverage the provided helper functions for filtering and sorting
4. **Maintain consistency** - Follow the established naming conventions and data structures
5. **Update both configs** - When adding content, update both the basic and detailed configurations 