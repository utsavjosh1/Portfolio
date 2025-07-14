import Script from 'next/script';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  email: string;
  location: string;
  description: string;
  sameAs: string[];
}

interface OrganizationStructuredDataProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: string;
  sameAs: string[];
}

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
  wordCount?: number;
  readingTime?: string;
}

export function PersonStructuredData({
  name,
  jobTitle,
  url,
  image,
  email,
  location,
  description,
  sameAs
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "url": url,
    "image": image,
    "email": email,
    "address": {
      "@type": "Place",
      "name": location
    },
    "description": description,
    "sameAs": sameAs,
    "knowsAbout": [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Software Architecture",
      "User Experience Design",
      "Performance Optimization"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote"
      },
      "skills": [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "PostgreSQL"
      ]
    }
  };

  return (
    <Script id="person-structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  founder,
  sameAs
}: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": logo,
    "description": description,
    "founder": {
      "@type": "Person",
      "name": founder
    },
    "sameAs": sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional",
      "email": "hi@joshiutsav.com"
    }
  };

  return (
    <Script id="organization-structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

export function BlogPostStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  wordCount,
  readingTime
}: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://www.joshiutsav.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Utsav Joshi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.joshiutsav.com/logo.png"
      }
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    }),
    ...(wordCount && { "wordCount": wordCount }),
    ...(readingTime && { "timeRequired": readingTime }),
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "name": "Utsav Joshi Blog",
      "url": "https://www.joshiutsav.com/blog"
    }
  };

  return (
    <Script id="blog-post-structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Utsav Joshi Portfolio",
    "description": "Portfolio of Utsav Joshi, a full-stack developer specializing in React, Next.js, and modern web technologies.",
    "url": "https://www.joshiutsav.com",
    "author": {
      "@type": "Person",
      "name": "Utsav Joshi"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.joshiutsav.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script id="website-structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script id="breadcrumb-structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
} 