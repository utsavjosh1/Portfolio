import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

interface SeoMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  authors?: object[];
  openGraph?: Partial<Metadata["openGraph"]>;
  twitter?: Partial<Metadata["twitter"]>;
  noIndex?: boolean;
  noFollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
  section?: string;
  locale?: string;
  type?:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other";
  imageAlt?: string;
}

/**
 * Enhanced SEO metadata generator optimized for search ranking
 * Generates comprehensive metadata for Next.js pages with advanced SEO features
 */
export function getSeoMetadata({
  title,
  description,
  keywords = [],
  path = "",
  openGraph,
  twitter,
  noIndex = false,
  noFollow = false,
  publishedTime,
  modifiedTime,
  category = "Technology",
  tags = [],
  section = "Portfolio",
  locale = "en_US",
  type = "website",
  imageAlt,
}: SeoMetadataProps): Metadata {
  // Construct the full URL with trailing slash optimization
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_CONFIG.url}${cleanPath}`;

  // Enhanced description with improved length for search snippets (150-160 characters ideal)
  const metaDescription = description
    ? description.length <= 160
      ? description
      : `${description.substring(0, 157)}...`
    : SITE_CONFIG.description;

  // SEO-optimized title format (keep under 60 characters for best display)
  const metaTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name;

  // Combine and deduplicate keywords
  const metaKeywords = Array.from(
    new Set([...SITE_CONFIG.keywords, ...keywords])
  );

  // Enhanced default OG image with improved alt text
  const defaultOgImage = {
    url: `${SITE_CONFIG.url}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: imageAlt || `${SITE_CONFIG.name} - ${SITE_CONFIG.author.jobTitle}`,
    type: "image/jpeg",
  };

  // Calculate modified time if not provided
  const calculatedModifiedTime = modifiedTime || new Date().toISOString();

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.name,
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
      notranslate: false,
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      type,
      locale,
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: SITE_CONFIG.name,
      images: openGraph?.images || [defaultOgImage],
      publishedTime,
      modifiedTime: calculatedModifiedTime,
      section,
      tags: [...tags, ...metaKeywords.slice(0, 5)],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      creator: SITE_CONFIG.author.twitter,
      site: SITE_CONFIG.author.twitter?.replace("https://twitter.com/", "@"),
      images: twitter?.images || [defaultOgImage.url],
      ...twitter,
    },
    category,
    applicationName: SITE_CONFIG.name,
    other: {
      "revisit-after": "7 days",
      "apple-mobile-web-app-capable": "yes",
      "format-detection": "telephone=no",
      "apple-mobile-web-app-title": SITE_CONFIG.name,
    },
  };
}

/**
 * Enhanced structured data generator with improved schema markup
 * Supports multiple schema types with proper nesting and relationships
 */
export function generateStructuredData(
  type: string,
  data: Record<string, any>,
  isPrimary: boolean = true
) {
  // Add common required fields if not present
  if (!data.url && isPrimary) {
    data.url = SITE_CONFIG.url;
  }

  if (!data.name && isPrimary) {
    data.name = SITE_CONFIG.name;
  }

  // Add dateModified if applicable schema type
  if (
    ["Article", "BlogPosting", "WebPage", "TechArticle"].includes(type) &&
    !data.dateModified
  ) {
    data.dateModified = new Date().toISOString();
  }

  // Add publisher info for content types
  if (
    ["Article", "BlogPosting", "TechArticle", "NewsArticle"].includes(type) &&
    !data.publisher
  ) {
    data.publisher = {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    };
  }

  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }),
  };
}

/**
 * Generates professional profile schema for the developer
 * Enhances personal branding and expertise signals for search
 */
export function generateDeveloperProfileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/#person`,
    name: SITE_CONFIG.author.name,
    alternateName: "Utsav Joshi",
    givenName: "Utsav",
    familyName: "Joshi",
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`,
    description:
      "Senior Software Engineer and Full Stack Developer with expertise in JavaScript, TypeScript, React, Next.js, and modern web technologies.",
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nextbill",
      description: "Financial Technology Solutions",
    },
    sameAs: SITE_CONFIG.author.socialProfiles,
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "RESTful API Design",
      "GraphQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Web Application Architecture",
      "Performance Optimization",
      "Frontend Development",
      "Backend Engineering",
      "Test-Driven Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University Name",
      url: "https://www.university-website.edu",
    },
    award: [
      {
        "@type": "Award",
        name: "Outstanding Developer Award",
        description:
          "Recognized for excellence in software development and innovation",
      },
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "JavaScript Developer Community",
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationCategory: "15-1252.00",
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        currency: "USD",
        median: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: 125000,
        },
      },
      skills:
        "JavaScript, TypeScript, React, Node.js, AWS, Software Architecture",
    },
  };
}

/**
 * Generates website schema with enhanced search capabilities
 * Improves site structure signals for search engines
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.author.name,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
    datePublished: "2023-01-01T00:00:00+00:00", // Replace with actual site launch date
    dateModified: new Date().toISOString(),
  };
}

/**
 * Generates complete breadcrumb schema for improved navigation signals
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}
