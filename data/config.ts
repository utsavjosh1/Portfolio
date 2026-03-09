import { env } from "@/lib/env";

export const siteConfig = {
  name: env.siteName,
  role: env.siteRole,
  location: env.siteLocation,
  email: env.contactEmail,
  bio: env.siteBio,
  tagline: env.siteTagline,
  url: env.siteUrl,
  githubUrl: env.githubUrl,
  linkedinUrl: env.linkedinUrl,
  twitterUrl: env.twitterUrl,
  cvUrl: env.cvUrl,
  available: env.isAvailable,
  stats: env.stats,
  keywords: env.siteKeywords,
  knowsAbout: env.knowsAbout,
};
