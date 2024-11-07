import type { Metadata } from "next";
import { META_DEFAULTS } from "@/config/meta";
import { SITE_CONFIG } from "@/config/site";

interface SeoMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function getSeoMetadata({
  title,
  description,
  path,
  keywords = [],
}: SeoMetadataProps): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.author.name }],
    openGraph: {
      ...META_DEFAULTS.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...META_DEFAULTS.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: META_DEFAULTS.robots,
    category: "Technology",
    verification: META_DEFAULTS.verification,
  };
}
