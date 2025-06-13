// Configuration exports
export { siteConfig } from './site'
export { projectsConfig, type Project } from './projects'
export { blogConfig, type BlogPost } from './blog'
export { 
  projectPageConfig, 
  blogPostPageConfig, 
  pageHelpers,
  type ProjectDetail,
  type BlogPostDetail 
} from './pages'
export {
  projectsDetailConfig,
  blogPostsDetailConfig,
  contentHelpers
} from './content'

// Type exports for external use
export type { Project as ProjectType } from './projects'
export type { BlogPost as BlogPostType } from './blog' 