import { siteConfig } from "@/config/site";

export function generateDeveloperProfileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nextbill",
    },
    description: siteConfig.description,
    image: `${siteConfig.url}/profile.jpg`,
    email: siteConfig.email,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indira Gandhi National Open University (IGNOU)",
    },
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "UI/UX Design",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "REST APIs",
      "AWS",
      "Cloud Computing",
      "OCR",
      "AI/ML",
      "React-native",
    ],
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image || `${siteConfig.url}/og-image.jpg`,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${article.slug}`,
    },
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  image: string;
  slug: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    image: project.image,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    keywords: project.technologies.join(", "),
    url: `${siteConfig.url}/projects/${project.slug}`,
  };
}
