import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Twitter } from "lucide-react"

import { BlogService } from "@/lib/services/blog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPostPreview } from "@/components/blog-post-preview"
import { ShareButtons } from "@/components/ui/share-buttons"
import { MarkdownContent } from "@/components/ui/markdown-content"

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

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://joshiutsav.com'}/blog/${post.slug}`
  const shareText = `Check out this article: ${post.title}`

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative p-8 md:p-12 space-y-8">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">
                  {post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0]}
                </span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{post.readingTime}</span>
                </div>
              )}
              {post.category && (
                <div className="px-3 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <span className="font-medium">{post.category}</span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="px-3 py-1 bg-white/70 dark:bg-black/30 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Article Content */}
        {post.content && (
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
            <CardContent className="p-8">
              <article>
                <MarkdownContent 
                  content={post.content} 
                  className="text-foreground"
                />
              </article>
            </CardContent>
          </Card>
        )}

        {/* Share Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-medium">Share this article</h3>
              <ShareButtons
                url={shareUrl}
                title={post.title}
                platforms={['twitter', 'linkedin', 'facebook']}
                twitterHandle="@joshiutsav"
              />
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostPreview
                    key={relatedPost.slug}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    date={relatedPost.date}
                    slug={relatedPost.slug}
                    className="h-full"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Newsletter CTA */}
        <Card className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-none">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Enjoyed this article?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Subscribe to my newsletter to get notified when I publish new articles about web development and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 