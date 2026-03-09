import { projects } from "@/data/projects";
import { siteConfig } from "@/data/config";

export function JsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.githubUrl,
      siteConfig.linkedinUrl,
      siteConfig.twitterUrl,
    ].filter(Boolean),
    jobTitle: siteConfig.role,
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description: siteConfig.bio,
    knowsAbout: siteConfig.knowsAbout,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.url,
  };

  const projectListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveUrl || project.githubUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListJsonLd) }}
      />
    </>
  );
}
