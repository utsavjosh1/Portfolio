import type { Metadata } from "next"
import { BlogPostPreview } from "@/components/blog-post-preview"
import { BlogService } from "@/lib/services/blog"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { NoBlogs } from "@/components/no-blogs"
import { OGImages } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Blog | Utsav Joshi",
  description: "Thoughts, tutorials, and insights on web development, design, and the latest technologies shaping our digital world.",
  keywords: "blog, web development, programming, tutorials, React, Next.js, TypeScript",
  openGraph: {
    title: "Blog - Utsav Joshi",
    description: "Technical articles, tutorials, and insights about web development, programming, and technology.",
    url: "https://www.joshiutsav.com/blog",
    siteName: "Utsav Joshi Portfolio",
    images: [
      {
        url: OGImages.blog(),
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
    description: "Thoughts, tutorials, and insights on web development, design, and the latest technologies shaping our digital world.",
    images: [OGImages.blog()],
  },
}

export default async function BlogPage() {
  // Fetch real blog posts from database
  const allPosts = await BlogService.getAllPosts()
  const featuredPosts = await BlogService.getFeaturedPosts()
  const recentPosts = await BlogService.getRecentPosts(5)
  const totalPosts = allPosts.length

  // Check if there are no published posts
  const hasNoPosts = totalPosts === 0

  // Transform posts to match BlogPostPreview interface
  const transformedFeaturedPosts = featuredPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0],
    slug: post.slug,
    tags: post.tags,
    category: post.category
  }))

  const transformedRecentPosts = recentPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0],
    slug: post.slug,
    tags: post.tags,
    category: post.category
  }))

  const transformedAllPosts = allPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0],
    slug: post.slug,
    tags: post.tags,
    category: post.category
  }))

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 rounded-2xl -z-10" />
        <div className="relative px-6 py-16 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights on authentication, security, and modern web development practices.
            </p>
          </div>
          
          {/* Stats */}
          {!hasNoPosts && (
            <div className="flex items-center justify-center gap-8 text-sm border-t border-b border-border py-6">
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{totalPosts}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Articles</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{featuredPosts.length}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Featured</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasNoPosts ? (
        <NoBlogs />
      ) : (
        <div className="space-y-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Featured Posts */}
            {transformedFeaturedPosts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Featured Articles</h2>
                <span className="px-2 py-1 text-xs font-medium bg-foreground text-background rounded">
                  {transformedFeaturedPosts.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {transformedFeaturedPosts.slice(0, 3).map((post, index) => (
                  <div
                    key={post.slug}
                    className="group animate-in fade-in-50 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BlogPostPreview
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      slug={post.slug}
                      className="transition-all duration-200 hover:bg-muted/30 border-border"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Posts */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Articles</h2>
            </div>
            
            <div className="space-y-4">
              {transformedRecentPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className="group animate-in fade-in-50 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlogPostPreview
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    slug={post.slug}
                    className="transition-all duration-200 hover:bg-muted/30 border-border"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* All Posts */}
          {transformedAllPosts.length > transformedRecentPosts.length && (
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-xl font-bold tracking-tight text-foreground">All Articles</h2>
                <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                  {totalPosts} total
                </span>
              </div>
              
              <div className="space-y-4">
                {transformedAllPosts.slice(transformedRecentPosts.length).map((post, index) => (
                  <div
                    key={post.slug}
                    className="group animate-in fade-in-50 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <BlogPostPreview
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      slug={post.slug}
                      className="transition-all duration-200 hover:bg-muted/30 border-border"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <section className="pt-8 border-t border-border">
            <NewsletterSignup source="blog" />
          </section>
        </div>
      </div>
      )}
    </div>
  )
}
