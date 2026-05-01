import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClientPage from "./ContactClientPage";
import { OGImages } from "@/lib/og-image";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Have a project in mind or just want to chat? Get in touch for engineering collaborations.",
  keywords:
    "contact, hire, Go developer, automation, freelance, software engineer",
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description:
      "Have a project in mind? Get in touch for high-performance engineering collaborations.",
    url: `${siteConfig.url}/contact`,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: OGImages.contact(),
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: "Have a project in mind? Get in touch.",
    images: [OGImages.contact()],
  },
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 px-4">
          <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
            <div className="h-12 w-3/4 bg-[var(--bg-3)] rounded-lg" />
            <div className="h-6 w-1/2 bg-[var(--bg-3)] rounded-lg" />
            <div className="h-96 bg-[var(--bg-3)] rounded-xl" />
          </div>
        </div>
      }
    >
      <ContactClientPage />
    </Suspense>
  );
}
