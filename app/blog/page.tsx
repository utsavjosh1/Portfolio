import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, BookOpen, Search } from "lucide-react"

import { BlogService } from "@/lib/services/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { NoBlogs } from "@/components/no-blogs"

export const metadata: Metadata = {
  title: "Blog | Utsav Joshi",
  description: "Articles about web development, React, Next.js, and software engineering best practices.",
  keywords: "blog, articles, web development, React, Next.js, JavaScript, TypeScript, software engineering",
  openGraph: {
    title: "Blog - Utsav Joshi",
    description: "Articles about web development, React, Next.js, and software engineering best practices.",
    url: "https://www.joshiutsav.com/blog",
    siteName: "Utsav Joshi Portfolio",
    images: [
      {
        url: "https://www.joshiutsav.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utsav Joshi Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Utsav Joshi",
    description: "Articles about web development, React, Next.js, and software engineering best practices.",
    images: ["https://www.joshiutsav.com/og-image.png"],
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function BlogList({ searchParams }: { searchParams: any }) {
  const search = searchParams?.search || ""
  const category = searchParams?.category || ""
  const tag = searchParams?.tag || ""
  
  try {
         const posts = await BlogService.getAllPosts()

    if (!posts || posts.length === 0) {
      return <NoBlogs />
    }

    // Get unique categories and tags for filtering
    const categories = [...new Set(posts.map(post => post.category).filter(Boolean))]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allTags = posts.reduce((acc: string[], post: any) => {
      if (post.tags && Array.isArray(post.tags)) {
        return [...acc, ...post.tags]
      }
      return acc
    }, [])
    const uniqueTags = [...new Set(allTags)]

    return (
      <div className="space-y-12">
        {/* Search and Filters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                defaultValue={search}
                className="pl-10"
                name="search"
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </div>

          {/* Filter Tags */}
          {(categories.length > 0 || uniqueTags.length > 0) && (
            <div className="space-y-4">
              {categories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/blog">
                      <Badge variant={!category ? "default" : "outline"}>
                        All
                      </Badge>
                    </Link>
                                           {categories.map(cat => (
                         <Link key={cat} href={`/blog?category=${encodeURIComponent(cat || '')}`}>
                           <Badge variant={category === cat ? "default" : "outline"}>
                             {cat}
                           </Badge>
                         </Link>
                       ))}
                  </div>
                </div>
              )}

              {uniqueTags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTags.slice(0, 10).map(tagItem => (
                      <Link key={tagItem} href={`/blog?tag=${encodeURIComponent(tagItem)}`}>
                        <Badge variant={tag === tagItem ? "default" : "outline"} className="text-xs">
                          {tagItem}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-all duration-200 hover:shadow-lg group">
                {post.image && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {Math.ceil((post.content?.length || 0) / 200)} min read
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category && (
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                    )}
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {post.tags?.slice(0, 2).map((tag: any) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return <NoBlogs />
  }
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 sm:py-16">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <BookOpen className="inline-block h-12 w-12 sm:h-16 sm:w-16 mb-4 text-primary" />
            <br />
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on web development, React, and building great user experiences.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }>
        <BlogList searchParams={await searchParams} />
      </Suspense>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Stay Updated
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get notified when I publish new articles about web development and software engineering.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <NewsletterSignup source="blog" />
          </div>
        </div>
      </section>
    </div>
  )
}
