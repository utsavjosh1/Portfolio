import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site"

export async function GET() {
  const baseUrl = siteConfig.url

  // Main pages
  const routes = ["", "/projects", "/experience", "/blog", "/contact"]

  // Project pages
  const projectSlugs = [
    "/projects/ecommerce",
    "/projects/task-app",
    "/projects/finance-dashboard",
    "/projects/ai-content-generator",
    "/projects/real-estate",
    "/projects/fitness-tracker",
  ]

  // Blog pages
  const blogSlugs = [
    "/blog/building-accessible-web-applications",
    "/blog/future-of-react-server-components",
    "/blog/optimizing-nextjs-applications",
    "/blog/design-system-with-tailwind",
    "/blog/authentication-best-practices",
    "/blog/state-management-2023",
  ]

  const allRoutes = [...routes, ...projectSlugs, ...blogSlugs]

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
