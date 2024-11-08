import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Person } from "schema-dts";
import { SITE_CONFIG } from "@/config/site";
import { getSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = getSeoMetadata({
  title: "About Utsav Joshi | Developer, GPU Enthusiast, Tech Lover",
  description:
    "Utsav Joshi: A GPU enthusiast passionate about computer science, hardware, retro tech, and biking. Explore my journey and projects in software development and technology.",
  path: "/about",
  keywords: [
    "Utsav Joshi",
    "developer portfolio",
    "GPU enthusiast",
    "hardware developer",
    "retro tech",
    "biking",
    "software engineering",
    "Next.js portfolio",
    "web developer",
    "tech optimist",
  ],
});

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: Readonly<AboutLayoutProps>) {
  return (
    <>
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_CONFIG.author.name,
          url: SITE_CONFIG.url,
          jobTitle: SITE_CONFIG.author.jobTitle,
          sameAs: SITE_CONFIG.author.socialProfiles,
        }}
      />
      <main id="main-content">{children}</main>
    </>
  );
}
