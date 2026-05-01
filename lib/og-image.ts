import { siteConfig } from "@/data/config";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "https://www.joshiutsav.com";

export interface OGImageOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
}

export function generateOGImageURL(options: OGImageOptions = {}): string {
  const {
    title = "Utsav Joshi | Software Engineer",
    subtitle = "Software Engineer",
    description = "Building systems that scale.",
    tags = ["Backend", "AI", "Automation"],
  } = options;

  const params = new URLSearchParams();

  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  if (description) params.set("description", description);
  if (tags.length > 0) params.set("tags", tags.join(","));

  const validBaseUrl = BASE_URL.startsWith("http")
    ? BASE_URL
    : `https://${BASE_URL}`;

  return `${validBaseUrl}/api/og?${params.toString()}`;
}

export const OGImages = {
  home: () =>
    generateOGImageURL({
      title: siteConfig.name,
      subtitle: siteConfig.role,
      tags: ["Backend", "AI", "Automation"],
    }),

  project: (title: string, description: string, tags: string[]) =>
    generateOGImageURL({
      title,
      description,
      tags,
    }),

  contact: () =>
    generateOGImageURL({
      title: "Get in Touch",
      subtitle: "Let's build something together.",
    }),
};
