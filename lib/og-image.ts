const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "https://www.joshiutsav.com";

export interface OGImageOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  type?: "default" | "project" | "blog" | "experience";
  tags?: string[];
  date?: string;
  readingTime?: string;
}

export function generateOGImageURL(options: OGImageOptions = {}): string {
  const {
    title = "Utsav Joshi",
    subtitle = "Full Stack Developer & Software Engineer",
    description,
    type = "default",
    tags = ["React", "Next.js", "TypeScript"],
    date,
    readingTime,
  } = options;

  const params = new URLSearchParams();

  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  if (description) params.set("description", description);
  if (type) params.set("type", type);
  if (tags.length > 0) params.set("tags", tags.join(","));
  if (date) params.set("date", date);
  if (readingTime) params.set("readingTime", readingTime);

  // Ensure we have a proper URL
  const baseUrl = BASE_URL.startsWith("http")
    ? BASE_URL
    : `https://${BASE_URL}`;
  return `${baseUrl}/api/og?${params.toString()}`;
}

// Predefined OG images for common pages
export const OGImages = {
  home: () =>
    generateOGImageURL({
      title: "Utsav Joshi",
      subtitle: "Full Stack Developer & Software Engineer",
      description:
        "I build modern web applications with React, Next.js, TypeScript, and the whole modern stack. Always learning, always building.",
      type: "default",
      tags: ["React", "Next.js", "TypeScript", "Full-Stack"],
    }),

  projects: () =>
    generateOGImageURL({
      title: "Projects",
      subtitle: "Featured Work & Portfolio",
      description:
        "A collection of projects that showcase my skills and passion for development",
      type: "project",
      tags: ["Portfolio", "Projects", "Web Development", "React"],
    }),

  experience: () =>
    generateOGImageURL({
      title: "Experience",
      subtitle: "Professional Journey",
      description:
        "From junior developer to full-stack engineer - here's how I got here",
      type: "experience",
      tags: ["Career", "Experience", "Software Engineer", "Growth"],
    }),

  blog: () =>
    generateOGImageURL({
      title: "Blog",
      subtitle: "Technical Articles & Insights",
      description:
        "Where I share what I learn, mistakes I make, and solutions I discover",
      type: "blog",
      tags: ["Blog", "Learning", "Web Development", "Tutorials"],
    }),

  contact: () =>
    generateOGImageURL({
      title: "Contact",
      subtitle: "Let's Work Together",
      description:
        "Whether it's a project, job opportunity, or just to chat about tech",
      type: "default",
      tags: ["Contact", "Networking", "Opportunities", "Collaboration"],
    }),

  // Dynamic generators
  project: (title: string, description: string, tags: string[]) =>
    generateOGImageURL({
      title,
      subtitle: "Project Showcase",
      description,
      type: "project",
      tags,
    }),

  blogPost: (
    title: string,
    excerpt: string,
    tags: string[],
    date?: string,
    readingTime?: string
  ) =>
    generateOGImageURL({
      title,
      subtitle: "Blog Post",
      description: excerpt,
      type: "blog",
      tags,
      date,
      readingTime,
    }),
};
