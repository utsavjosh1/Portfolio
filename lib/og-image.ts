const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "https://www.joshiutsav.com";

export interface OGImageOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  type?: "default" | "project";
  tags?: string[];
}
 
export function generateOGImageURL(options: OGImageOptions = {}): string {
  const {
    title = "Utsav Joshi | Software Engineer Portfolio",
    subtitle = "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
    description = "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
    type = "default",
    tags = ["React", "Next.js", "TypeScript", "Full-Stack"],
  } = options;

  const params = new URLSearchParams();

  if (title) params.set("title", encodeURIComponent(title));
  if (subtitle) params.set("subtitle", encodeURIComponent(subtitle));
  if (description) params.set("description", encodeURIComponent(description)); 
  if (type) params.set("type", type);
  if (tags.length > 0) params.set("tags", tags.map(tag => encodeURIComponent(tag)).join(","));

  // Ensure we have a proper URL
  const baseUrl = BASE_URL.startsWith("http")
    ? BASE_URL
    : `https://${BASE_URL}`;
  
  const url = `${baseUrl}/api/og?${params.toString()}`;
  
  return url;
}

// Predefined OG images for common pages - these are cached
export const OGImages = {
  home: () =>
    generateOGImageURL({
      title: "Utsav Joshi | Software Engineer Portfolio",
      subtitle: "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
      description:
        "Portfolio of Utsav Joshi, a software engineer specializing in AI, automation, and building scalable web systems with React and Next.js.",
      type: "default",
      tags: ["React", "Next.js", "TypeScript", "Full-Stack"],
    }),

  contact: () =>
    generateOGImageURL({
      title: "Contact | Utsav Joshi | Software Engineer Portfolio",
      subtitle: "Get in touch with me for work inquiries, collaborations, or just to say hello. I'll get back to you as soon as possible.",
      description:
        "Get in touch with me for work inquiries, collaborations, or just to say hello. I'll get back to you as soon as possible.",
      type: "default",
      tags: ["Contact", "Inquiries", "Collaborations", "Hello"],
    }),
};
