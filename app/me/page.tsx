import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";
import AboutMe from "@/components/about/about-me";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = getSeoMetadata({
  title: "About Utsav Joshi",
  description:
    "Learn about Utsav Joshi, a developer passionate about creating innovative web solutions.",
  path: "/about",
  keywords: ["backend developer", "web development", "portfolio", "about me"],
  openGraph: {
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`,
        width: 1200,
        height: 630,
        alt: "About Utsav Joshi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_CONFIG.url}/images/utsav-joshi-profile.jpg`],
  },
});

export default function AboutPage() {
  return (
    <main>
      <AboutMe />
    </main>
  );
}
