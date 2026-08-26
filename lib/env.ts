function getPublicUrl(value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;
  const absoluteUrl = /^https?:\/\//.test(candidate)
    ? candidate
    : `https://${candidate}`;
  return absoluteUrl.replace(/\/$/, "");
}

const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.utsavjoshi.com";

export const env = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Utsav Joshi",
  siteRole: process.env.NEXT_PUBLIC_SITE_ROLE?.trim() || "Software Engineer",
  siteLocation: process.env.NEXT_PUBLIC_SITE_LOCATION?.trim() || "India",
  siteBio:
    process.env.NEXT_PUBLIC_SITE_BIO?.trim() ||
    "Utsav Joshi is a software engineer in India building scalable backend systems, APIs, and full-stack SaaS applications with Go, TypeScript, React, and Next.js.",
  siteUrl: getPublicUrl(deploymentUrl, "https://www.utsavjoshi.com"),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@utsavjoshi.com",
  githubUrl: getPublicUrl(
    process.env.NEXT_PUBLIC_GITHUB_URL,
    "https://github.com/utsavjosh1",
  ),
  linkedinUrl: getPublicUrl(
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    "https://www.linkedin.com/in/utsavjosh1",
  ),
  twitterUrl: getPublicUrl(
    process.env.NEXT_PUBLIC_TWITTER_URL,
    "https://x.com/utsavjosh1",
  ),
  knowsAbout: process.env.NEXT_PUBLIC_SITE_KNOWS_ABOUT
    ? process.env.NEXT_PUBLIC_SITE_KNOWS_ABOUT.split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : [
        "Backend engineering",
        "Full-stack web development",
        "Go",
        "TypeScript",
        "React",
        "Next.js",
        "PostgreSQL",
        "Distributed systems",
      ],
};
