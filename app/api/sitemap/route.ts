import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const staticRoutes = [
  {
    path: "",
    lastmod: "2024-11-06",
    changefreq: "weekly" as const,
    priority: 1.0,
  },
  {
    path: "/contact",
    lastmod: "2025-11-06",
    changefreq: "monthly" as const,
    priority: 0.8,
  },
];

function generateSitemapXML(routes: typeof staticRoutes): string {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export async function GET() {
  try {
    const xml = generateSitemapXML(staticRoutes);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

// dynamic and revalidate removed for cacheComponents compatibility
