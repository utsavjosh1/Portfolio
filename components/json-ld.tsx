import { siteConfig } from "@/config/site";

export function JsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/me.jpg`, // Assuming me.jpg is at root or update path
    sameAs: [
      siteConfig.links?.github,
      siteConfig.links?.linkedin,
      siteConfig.links?.twitter,
    ].filter(Boolean),
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Self-Employed",
    },
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
