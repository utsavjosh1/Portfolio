import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects | Utsav Joshi",
  description: "Explore my portfolio of web development projects showcasing expertise in React, Next.js, Node.js, and modern web technologies. View case studies and live demos.",
  openGraph: {
    title: "Projects | Utsav Joshi - Software Engineer",
    description: "Browse through my collection of web development projects, from full-stack applications to innovative solutions using modern technologies.",
    url: `${SITE_CONFIG.url}/projects`,
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Utsav Joshi's Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Utsav Joshi",
    description: "Explore my web development projects and technical solutions.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 