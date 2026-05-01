"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPublishedPosts, type BlogPost } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(() => {}) // Firebase may not have permissions yet
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24">
        <div className="page-container max-w-4xl">
          <RevealWrapper delay={100}>
            <div className="space-y-4 mb-16">
              <SectionLabel label="Blog" />
              <h1 className="text-4xl md:text-5xl font-display text-[var(--text)]">
                Thoughts & <span className="italic text-accent">writings.</span>
              </h1>
              <p className="text-[var(--text-2)] font-body font-light max-w-[50ch]">
                Notes on engineering, architecture decisions, and things I learn
                along the way.
              </p>
            </div>
          </RevealWrapper>

          {/* Posts */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-surface border border-[var(--border)] rounded-xl p-6 h-40"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <RevealWrapper delay={200}>
              <div className="text-center py-20">
                <p className="text-[var(--text-3)] font-mono text-sm">
                  No posts yet. Check back soon.
                </p>
              </div>
            </RevealWrapper>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <RevealWrapper key={post.id} delay={200 + index * 80}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group bg-surface border border-[var(--border)] rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-[var(--accent-dim)] hover:-translate-y-0.5 hover:shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <h2 className="text-xl md:text-2xl font-display text-[var(--text)] group-hover:text-accent transition-colors leading-tight">
                            {post.title}
                          </h2>
                          <p className="text-sm text-[var(--text-2)] font-body font-light leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[var(--text-3)]">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.createdAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              {post.readTime} min read
                            </span>
                            {post.tags.length > 0 && (
                              <span className="flex items-center gap-1.5">
                                <Tag className="h-3 w-3" />
                                {post.tags.slice(0, 3).join(", ")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </RevealWrapper>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
