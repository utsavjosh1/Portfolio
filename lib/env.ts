/**
 * Environment variable validation and utility layer.
 * This ensures the application has a single source of truth for config
 * and provides type-safety for both client and server side.
 */

export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (value === undefined) {
    // We only throw in production if a required variable is missing
    if (process.env.NODE_ENV === "production" && !fallback) {
      console.warn(
        `[Config Warning] Missing required environment variable: ${name}`,
      );
    }
    return "";
  }
  return value;
}

export function getEnvBool(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return value.toLowerCase() === "true";
}

export function getEnvList(name: string, fallback: string[]): string[] {
  const value = process.env[name];
  if (!value) return fallback;
  return value.split(",").map((v) => v.trim());
}

// Pre-validated configuration object
export const env = {
  // Site Identity
  isProduction: process.env.NODE_ENV === "production",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Utsav Joshi",
  siteRole: process.env.NEXT_PUBLIC_SITE_ROLE || "Software Engineer",
  siteLocation: process.env.NEXT_PUBLIC_SITE_LOCATION || "India",
  siteBio:
    process.env.NEXT_PUBLIC_SITE_BIO ||
    "Building systems optimized for speed and efficiency.",
  siteTagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE || "Building things that matter.",
  siteKeywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS
    ? process.env.NEXT_PUBLIC_SITE_KEYWORDS.split(",").map((v) => v.trim())
    : ["Software Engineer", "Full-Stack Developer", "Next.js", "TypeScript"],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Contact & Social
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@joshiutsav.com",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/utsavjosh1",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://www.linkedin.com/in/utsavjosh1/",
  twitterUrl:
    process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/utsavjosh1",
  cvUrl: process.env.NEXT_PUBLIC_CV_URL || "/cv.pdf",

  // Status
  isAvailable: process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK !== "false", // Default to true

  // Knowledge/Skills (SEO)
  knowsAbout: process.env.NEXT_PUBLIC_SITE_KNOWS_ABOUT
    ? process.env.NEXT_PUBLIC_SITE_KNOWS_ABOUT.split(",").map((v) => v.trim())
    : ["Software Engineering", "TypeScript", "React", "Next.js", "Go"],

  // Stats
  stats: [
    {
      value: process.env.NEXT_PUBLIC_STAT_1_VALUE || "3+",
      label: process.env.NEXT_PUBLIC_STAT_1_LABEL || "Years Exp.",
    },
    {
      value: process.env.NEXT_PUBLIC_STAT_2_VALUE || "10+",
      label: process.env.NEXT_PUBLIC_STAT_2_LABEL || "Projects",
    },
    {
      value: process.env.NEXT_PUBLIC_STAT_3_VALUE || "5+",
      label: process.env.NEXT_PUBLIC_STAT_3_LABEL || "OSS Repos",
    },
  ],

  // Development
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(",").map((v) => v.trim())
    : [
        "http://localhost:3000",
        "http://192.168.1.54:3000",
        "localhost:3000",
        "192.168.1.54:3000",
      ],

  // Analytics
  vercelAnalyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || "",
  speedInsightsId: process.env.NEXT_PUBLIC_SPEED_INSIGHTS_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",

  // Secrets (Server Side Only)
  resendApiKey: process.env.RESEND_API_KEY || "",

  // Firebase
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  },
};
