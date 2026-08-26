import { env } from "@/lib/env";

export const siteConfig = {
  name: env.siteName,
  role: env.siteRole,
  location: env.siteLocation,
  email: env.contactEmail,
  bio: env.siteBio,
  url: env.siteUrl,
  githubUrl: env.githubUrl,
  linkedinUrl: env.linkedinUrl,
  twitterUrl: env.twitterUrl,
  knowsAbout: env.knowsAbout,
} as const;

export const siteTitle = `${siteConfig.name} — ${siteConfig.role} | Backend & Full-Stack Developer`;
