'use client'

import { NewsletterSignup } from '@/components/newsletter-signup'

interface NoBlogsProps {
  className?: string
}

export function NoBlogs({ className = '' }: NoBlogsProps) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="border border-border rounded-lg p-8 text-center bg-background">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
              <div className="text-2xl">📝</div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">No Articles Yet</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently working on creating high-quality content about authentication, security, 
              and modern web development. The first articles will be published soon!
            </p>
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="mt-8">
        <NewsletterSignup source="no-blogs" />
      </div>
    </div>
  )
} 