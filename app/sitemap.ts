import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Main pages
  const routes = ["", "/projects", "/experience", "/blog", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Project pages
  const projectSlugs = [
    "/projects/learnest",
    "/projects/task-app",
    "/projects/finance-dashboard",
    "/projects/ai-content-generator",
    "/projects/real-estate",
    "/projects/fitness-tracker",
  ]

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Blog pages
  const blogSlugs = [
    "/blog/building-accessible-web-applications",
    "/blog/future-of-react-server-components",
    "/blog/optimizing-nextjs-applications",
    "/blog/design-system-with-tailwind",
    "/blog/authentication-best-practices",
    "/blog/state-management-2023",
  ]

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}
