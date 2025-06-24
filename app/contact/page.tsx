import type { Metadata } from "next"
import { Suspense } from "react"
import ContactClientPage from "./ContactClientPage"
import { OGImages } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Contact | Utsav Joshi",
  description: "Get in touch with me for work inquiries, collaborations, or just to say hello. I'll get back to you as soon as possible.",
  keywords: "contact, hire, collaboration, freelance, web developer, portfolio",
  openGraph: {
    title: "Contact - Utsav Joshi",
    description: "Get in touch with me for work inquiries, collaborations, or just to say hello.",
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
    description: "Get in touch with me for work inquiries, collaborations, or just to say hello.",
    images: [OGImages.contact()],
  },
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Contact</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Get in touch with me for work inquiries, collaborations, or just to say hello.
          </p>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded-lg"></div>
        </div>
      </div>
    }>
      <ContactClientPage />
    </Suspense>
  )
}
