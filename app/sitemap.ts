import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;

  // Main pages
  const routes = ["", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
