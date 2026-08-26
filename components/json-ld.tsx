import { siteConfig } from "@/data/config";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdValue }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function EntityJsonLd() {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": personId,
            name: siteConfig.name,
            url: siteConfig.url,
            image: `${siteConfig.url}/utsav-joshi-avatar.webp`,
            jobTitle: siteConfig.role,
            description: siteConfig.bio,
            homeLocation: {
              "@type": "Country",
              name: siteConfig.location,
            },
            knowsAbout: siteConfig.knowsAbout,
            sameAs: [
              siteConfig.githubUrl,
              siteConfig.linkedinUrl,
              siteConfig.twitterUrl,
            ],
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: `${siteConfig.name} Portfolio`,
            url: siteConfig.url,
            description: siteConfig.bio,
            inLanguage: "en",
            publisher: { "@id": personId },
          },
        ],
      }}
    />
  );
}
