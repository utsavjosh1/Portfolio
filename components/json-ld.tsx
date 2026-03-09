import { siteConfig } from "@/data/config";

export function JsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/me.jpg`,
    sameAs: [
      siteConfig.githubUrl,
      siteConfig.linkedinUrl,
      siteConfig.twitterUrl,
    ].filter(Boolean),
    jobTitle: siteConfig.role,
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Self-Employed",
    },
    description: siteConfig.bio,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
