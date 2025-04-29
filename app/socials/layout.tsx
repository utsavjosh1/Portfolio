import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Connect with Utsav Joshi",
  description: "Connect with Utsav Joshi on various social platforms. Find me on GitHub, LinkedIn, Twitter, and more.",
  openGraph: {
    title: "Connect with Utsav Joshi - Software Engineer",
    description: "Follow and connect with Utsav Joshi on social media platforms. Stay updated with my latest projects and technical insights.",
    url: `${SITE_CONFIG.url}/socials`,
    type: "profile",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Connect with Utsav Joshi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect with Utsav Joshi",
    description: "Follow me on social media for updates on my projects and technical insights.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/socials`,
  },
};

export default function SocialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 