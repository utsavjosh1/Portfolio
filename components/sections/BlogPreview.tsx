"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getLatestPosts, type BlogPost } from "@/lib/blog";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLatestPosts(3)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Don't render the section at all if error or no posts
  if (error || (!loading && posts.length === 0)) return null;
  if (loading) return null; // Don't show skeleton — just hide until ready

  return (
    <section id="blog" className="py-24 bg-[var(--bg)]">
      <div className="page-container">
        <RevealWrapper>
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-4">
              <SectionLabel label="Blog" />
              <h2 className="text-3xl md:text-4xl font-display text-[var(--text)]">
                Latest{" "}
                <span className="italic text-accent">writings.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-2)] hover:text-accent transition-colors font-body"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <RevealWrapper key={post.id} delay={index * 100}>
              <Link href={`/blog/${post.slug}`}>
                <article className="group bg-surface border border-[var(--border)] rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:border-[var(--accent-dim)] hover:-translate-y-1 hover:shadow-sm">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-display text-[var(--text)] group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--text-2)] font-body font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)] text-[10px] font-mono text-[var(--text-3)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}m
                    </span>
                  </div>
                </article>
              </Link>
            </RevealWrapper>
          ))}
        </div>

        <Link
          href="/blog"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm text-[var(--text-2)] hover:text-accent transition-colors font-body"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
