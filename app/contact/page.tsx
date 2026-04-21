import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClientPage from "./ContactClientPage";
import { OGImages } from "@/lib/og-image";

export const metadata: Metadata = {
  title: "Contact | Utsav Joshi",
  description:
    "Let's build something efficient. Whether it's high-performance systems or automation tools, I'm ready to discuss your next technical challenge.",
  keywords:
    "contact, hire, Go developer, automation, freelance, software engineer",
  openGraph: {
    title: "Contact - Utsav Joshi",
    description:
      "Ready to optimize? Get in touch for high-performance engineering collaborations.",
    url: "https://www.joshiutsav.com/contact",
    siteName: "Utsav Joshi Portfolio",
    images: [
      {
        url: OGImages.contact(),
        width: 1200,
        height: 630,
        alt: "Contact Utsav Joshi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Utsav Joshi",
    description: "Let's build something efficient. Get in touch.",
    images: [OGImages.contact()],
  },
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 px-4">
          <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
            <div className="h-12 w-3/4 bg-muted rounded-lg" />
            <div className="h-6 w-1/2 bg-muted rounded-lg" />
            <div className="h-96 bg-muted rounded-xl" />
          </div>
        </div>
      }
    >
      <ContactClientPage />
    </Suspense>
  );
}
