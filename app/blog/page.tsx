import type { Metadata } from "next"
import { BlogPostPreview } from "@/components/blog-post-preview"
import { BlogService } from "@/lib/services/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Utsav Joshi",
  description: "Thoughts, tutorials, and insights on web development, design, and the latest technologies shaping our digital world.",
}

export default async function BlogPage() {
  const featuredPosts = await BlogService.getFeaturedPosts()
  const recentPosts = await BlogService.getRecentPosts(3)
  const allPosts = await BlogService.getAllPosts()
  const totalPosts = allPosts.length

  // Get unique categories
  const categories = await BlogService.getAllCategories()

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
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl -z-10" />
        <div className="relative px-8 py-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights on web development, design, and the latest technologies shaping our digital world.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalPosts}</div>
              <div className="text-muted-foreground">Articles</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{featuredPosts.length}</div>
              <div className="text-muted-foreground">Featured</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Featured Posts */}
          {transformedFeaturedPosts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <h2 className="text-2xl font-bold tracking-tight">Featured Articles</h2>
                <Badge variant="secondary" className="ml-2">
                  {transformedFeaturedPosts.length}
                </Badge>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {transformedFeaturedPosts.slice(0, 2).map((post, index) => (
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
                      className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:border-primary/20"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Posts */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold tracking-tight">Recent Articles</h2>
            </div>
            
            <div className="grid gap-6">
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
                    className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group-hover:border-primary/20"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* All Posts */}
          {transformedAllPosts.length > transformedRecentPosts.length && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">All Articles</h2>
                <Button variant="outline" size="sm">
                  View All ({totalPosts})
                </Button>
              </div>
              
              <div className="grid gap-6">
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
                      className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group-hover:border-primary/20"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map(async (category) => {
                const categoryPosts = await BlogService.getPostsByCategory(category)
                const count = categoryPosts.length
                return (
                  <div key={category} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">{category}</span>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-none">
            <CardContent className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified when I publish new articles about web development and design.
                </p>
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
                />
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(await BlogService.getAllTags()).slice(0, 10).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
