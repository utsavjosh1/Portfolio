import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Person, WebPage, WithContext } from "schema-dts";
import { SITE_CONFIG } from "@/config/site";
import { getSeoMetadata } from "@/lib/seo";

// Enhanced SEO metadata with targeted keywords and comprehensive description
export const metadata: Metadata = getSeoMetadata({
  title:
    "About Utsav Joshi | Senior Software Engineer & Full Stack Developer | JavaScript Expert",
  description:
    "Discover Utsav Joshi's professional journey as a skilled software engineer with expertise in JavaScript, TypeScript, React, Next.js and backend technologies. Learn about my professional experience, technical skills, software development philosophy, and innovative projects that demonstrate problem-solving abilities and coding excellence.",
  path: "/about",
  keywords: [
    "Utsav Joshi",
    "Senior Software Engineer",
    "Full Stack Developer",
    "JavaScript Expert",
    "TypeScript Developer",
    "React Engineer",
    "Next.js Developer",
    "Node.js Specialist",
    "Backend Developer",
    "Frontend Architect",
    "API Development",
    "Cloud Computing",
    "Software Engineering Portfolio",
    "Hire Developer",
    "Tech Professional",
    "Web Application Engineer",
    "Code Quality Expert",
    "Software Craftsman",
  ],
  openGraph: {
    title:
      "About Utsav Joshi | Senior Software Engineer & Full Stack Developer",
    description:
      "Explore the professional background, technical expertise, and development philosophy of Utsav Joshi - an accomplished software engineer specializing in modern web technologies and scalable architecture.",
    url: `${SITE_CONFIG.url}/about`,
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`,
        width: 1200,
        height: 630,
        alt: "Utsav Joshi - Senior Software Engineer and Full Stack Developer",
      },
    ],
    siteName: SITE_CONFIG.title,
    locale: "en_US",
    // profile: {
    //   firstName: "Utsav",
    //   lastName: "Joshi",
    //   username: "joshiutsav",
    //   gender: "male",
    // },
  },
  twitter: {
    card: "summary_large_image",
    site: "@joshiutsav",
    creator: "@joshiutsav",
    title: "About Utsav Joshi | Software Engineer & Full Stack Developer",
    description:
      "Discover the professional journey and technical expertise of Utsav Joshi, a passionate software engineer focused on creating innovative and scalable web solutions.",
    images: [`${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`],
  },
  // alternates: {
  //   canonical: `${SITE_CONFIG.url}/about`,
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   "max-snippet": -1,
  //   "max-image-preview": "large",
  //   "max-video-preview": -1,
  // },
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  category: "Technology",
});

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: Readonly<AboutLayoutProps>) {
  // Enhanced Person schema with detailed professional information
  const personJsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nextbill",
      description: "Financial Technology Solutions",
    },
    sameAs: SITE_CONFIG.author.socialProfiles,
    description:
      "Utsav Joshi is a seasoned software engineer with extensive experience in full stack development, specializing in JavaScript, TypeScript, React, and Node.js. Passionate about creating scalable web applications with clean, maintainable code and optimized performance.",
    image: `${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University Name",
      url: "https://www.university-website.edu",
    },
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
    skills: [
      "Software Engineering",
      "Web Development",
      "API Design",
      "Database Architecture",
      "Cloud Computing",
      "Technical Leadership",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "JavaScript Developer Community",
      },
    ],
  };

  // Additional WebPage schema to enhance ranking signals
  const webPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Utsav Joshi | Senior Software Engineer",
    description:
      "Comprehensive profile of Utsav Joshi, a senior software engineer specializing in full stack web development.",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
    mainEntity: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${SITE_CONFIG.url}/about`,
        },
      ],
    },
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <JsonLd<Person> item={personJsonLd} />
      <JsonLd item={webPageJsonLd} />
      <main
        id="main-content"
        className="about-page-content py-8"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
        <article
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content={SITE_CONFIG.author.name} />
          {children}
        </article>
      </main>
    </>
  );
}
