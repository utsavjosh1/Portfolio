import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";
import AboutMe from "@/components/about/about-me";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = getSeoMetadata({
  title: "About Utsav Joshi | Software Engineer & Full Stack Developer | joshiutsav.com",
  description: "Learn about Utsav Joshi (joshiutsav) - Senior Software Engineer and Full Stack Developer. Discover my professional journey, technical expertise in JavaScript, TypeScript, React, Next.js, and backend technologies. View my portfolio, projects, and professional experience.",
  path: "/about",
  keywords: [
    "Utsav Joshi",
    "joshiutsav",
    "utsavjoshi",
    "Utsav Joshi Software Engineer",
    "Utsav Joshi Portfolio",
    "joshiutsav.com",
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
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`,
        width: 1200,
        height: 630,
        alt: "Utsav Joshi - Software Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Utsav Joshi | Software Engineer & Full Stack Developer",
    description: "Professional profile of Utsav Joshi (joshiutsav) - Senior Software Engineer and Full Stack Developer. Learn about my technical expertise and professional experience.",
    images: [`${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`],
  },
});

export default function AboutPage() {
  return (
    <main itemScope itemType="https://schema.org/ProfilePage">
      <AboutMe />
    </main>
  );
}
