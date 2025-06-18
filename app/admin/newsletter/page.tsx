import { NewsletterClientPage } from "./NewsletterClientPage"

interface NewsletterSubscription {
  id: string
  email: string
  active: boolean
  source: string
  createdAt: string
  updatedAt: string
}

async function getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/newsletter/admin`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        return data.data
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error)
    return []
  }
}

export default async function AdminNewsletterPage() {
  const subscriptions = await getNewsletterSubscriptions()

  return <NewsletterClientPage initialSubscriptions={subscriptions} />
} 