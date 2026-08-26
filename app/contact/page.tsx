import type { Metadata } from "next";

import ContactClientPage from "./ContactClientPage";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/config";
import { OGImages } from "@/lib/og-image";

const description = `Contact ${siteConfig.name} about software engineering roles, backend systems, full-stack applications, or project collaborations.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `Contact ${siteConfig.name}`,
    description,
    images: [
      {
        url: OGImages.contact(),
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.name}`,
    description,
    images: [OGImages.contact()],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactClientPage />
      <Footer />
    </>
  );
}
