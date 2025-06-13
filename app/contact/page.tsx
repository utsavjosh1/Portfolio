import type { Metadata } from "next"
import ContactClientPage from "./ContactClientPage"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for work inquiries, collaborations, or just to say hello.",
}

export default function ContactPage() {
  return <ContactClientPage />
}
