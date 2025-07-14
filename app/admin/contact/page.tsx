import { type ContactSubmission } from "@/lib/services/contact";
import { ContactClientPage } from "./ContactClientPage";

async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/contact?limit=100`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    }
    return [];
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }
}

export default async function AdminContactPage() {
  const submissions = await getContactSubmissions();

  return <ContactClientPage initialSubmissions={submissions} />;
}
