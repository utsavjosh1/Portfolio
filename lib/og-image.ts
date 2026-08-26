import { siteConfig } from "@/data/config";

export interface OGImageOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
}

export function generateOGImageURL(options: OGImageOptions = {}): string {
  const params = new URLSearchParams({
    title: (options.title || siteConfig.name).slice(0, 100),
    subtitle: (options.subtitle || siteConfig.role).slice(0, 80),
    description: (options.description || siteConfig.bio).slice(0, 180),
  });
  const tags = options.tags?.filter(Boolean).slice(0, 5);
  if (tags?.length) params.set("tags", tags.join(",").slice(0, 120));

  return `${siteConfig.url}/api/og?${params.toString()}`;
}

export const OGImages = {
  contact: () =>
    generateOGImageURL({
      title: `Contact ${siteConfig.name}`,
      subtitle: "Software engineering collaborations",
      description: "Let's build reliable, useful software together.",
      tags: ["Backend", "Full-Stack", "SaaS"],
    }),
};
