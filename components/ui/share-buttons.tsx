"use client"

import { useState } from "react"
import Link from "next/link"
import { Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  url: string
  title: string
  platforms: string[]
  twitterHandle?: string
}

export function ShareButtons({ url, title, platforms, twitterHandle }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareText = `Check out this article: ${title}`

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.includes('twitter') && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200 group"
        >
          <Link
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&via=${twitterHandle?.replace('@', '') || ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline">Twitter</span>
          </Link>
        </Button>
      )}
      
      {platforms.includes('linkedin') && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200 group"
        >
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>
        </Button>
      )}
      
      {platforms.includes('facebook') && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-all duration-200 group"
        >
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline">Facebook</span>
          </Link>
        </Button>
      )}
      
      {platforms.includes('copy-link') && (
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 transition-all duration-200 ${
            copied 
              ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800' 
              : 'hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-900/20 dark:hover:border-gray-800'
          }`}
          onClick={handleCopyLink}
        >
          <div className="relative">
            {copied ? (
              <Check className="h-4 w-4 animate-in zoom-in-50 duration-200" />
            ) : (
              <Copy className="h-4 w-4 hover:scale-110 transition-transform duration-200" />
            )}
          </div>
          <span className="hidden sm:inline">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </Button>
      )}
    </div>
  )
} 