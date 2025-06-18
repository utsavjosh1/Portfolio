import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Twitter } from "lucide-react"

import { BlogService } from "@/lib/services/blog"
import { Button } from "@/components/ui/button"
import { BlogPostPreview } from "@/components/blog-post-preview"
import { ShareButtons } from "@/components/ui/share-buttons"
import { MarkdownContent } from "@/components/ui/markdown-content"
import { NewsletterSignup } from "@/components/newsletter-signup"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await BlogService.getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - Utsav Joshi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}

export async function generateStaticParams() {
  const posts = await BlogService.getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await BlogService.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (other posts in the same category)
  const allPosts = await BlogService.getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .map(p => ({
      title: p.title,
      excerpt: p.excerpt,
      date: p.publishedAt?.toISOString().split('T')[0] || p.createdAt.toISOString().split('T')[0],
      slug: p.slug,
      tags: p.tags,
      category: p.category
    }))

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joshiutsav.com'}/blog/${post.slug}`
  const shareText = `Check out this article: ${post.title}`

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back Button */}
      <div>
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="border-b border-border pb-8">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]}
              </span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{post.readingTime}</span>
              </div>
            )}
            {post.category && (
              <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                {post.category}
              </span>
            )}
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 text-xs font-medium bg-foreground text-background rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Article Content */}
        {post.content && (
          <div className="border border-border rounded-lg p-8 bg-background">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              <MarkdownContent 
                content={post.content} 
                className="text-foreground"
              />
            </article>
          </div>
        )}

        {/* Share Buttons */}
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="font-medium text-foreground">Share this article</h3>
            <ShareButtons
              url={shareUrl}
              title={post.title}
              platforms={['twitter', 'linkedin', 'facebook']}
              twitterHandle="@joshiutsav"
            />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border border-border rounded-lg p-6 bg-background">
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Related Articles</h3>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <BlogPostPreview
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date}
                  slug={relatedPost.slug}
                  className="transition-all duration-200 hover:bg-muted/30 border-border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="pt-8 border-t border-border">
          <NewsletterSignup source={`blog-post-${post.slug}`} />
        </div>
      </div>
    </div>
  )
} 