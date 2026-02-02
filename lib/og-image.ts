import { siteConfig } from "@/config/site";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "https://www.joshiutsav.com";

export interface OGImageOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  type?: "default" | "project" | "blog"; // Added blog type
  style?: "terminal" | "bento" | "abstract"; // Added style options
  tags?: string[];
  date?: string;
  readingTime?: string;
}

export function generateOGImageURL(options: OGImageOptions = {}): string {
  const {
    title = "Utsav Joshi | Software Engineer Portfolio",
    subtitle = "Software Engineer",
    description = "Building high-performance systems.",
    type = "default",
    style = "bento", // Default style
    tags = ["React", "Next.js", "System Design"],
    date,
    readingTime,
  } = options;

  const params = new URLSearchParams();

  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  if (description) params.set("description", description);
  if (type) params.set("type", type);
  if (style) params.set("style", style);
  if (tags.length > 0) params.set("tags", tags.join(","));
  if (date) params.set("date", date);
  if (readingTime) params.set("readingTime", readingTime);

  // Ensure proper URL construction
  const validBaseUrl = BASE_URL.startsWith("http")
    ? BASE_URL
    : `https://${BASE_URL}`;

  return `${validBaseUrl}/api/og?${params.toString()}`;
}

export const OGImages = {
  home: () =>
    generateOGImageURL({
      title: "Utsav Joshi",
      subtitle: "Software Engineer",
      type: "default",
      style: "bento",
      tags: ["Full Stack", "Systems", "AI"],
    }),

  project: (title: string, description: string, tags: string[]) =>
    generateOGImageURL({
      title,
      description,
      tags,
      type: "project",
      style: "terminal", // Projects get terminal style
    }),

  post: (title: string, date: string, readingTime: string, tags: string[]) =>
    generateOGImageURL({
      title,
      date,
      readingTime,
      tags,
      type: "blog",
      style: "abstract", // Blog posts get abstract style
    }),

  contact: () =>
    generateOGImageURL({
      title: "Get in Touch",
      subtitle: "Let's build something extraordinary.",
      type: "default",
      style: "abstract",
    }),
};
