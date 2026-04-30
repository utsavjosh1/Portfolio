"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPostBySlug, type BlogPost } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function renderContent(content: string) {
  // Simple markdown-ish rendering: paragraphs, headers, code blocks, bold, italic, links
  const blocks = content.split("\n\n");

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    // Headers
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-xl font-display text-[var(--text)] mt-8 mb-4"
        >
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl font-display text-[var(--text)] mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    // Code blocks
    if (trimmed.startsWith("```")) {
      const lines = trimmed.split("\n");
      const code = lines.slice(1, -1).join("\n");
      return (
        <pre
          key={i}
          className="bg-[var(--bg-3)] border border-[var(--border)] rounded-xl p-5 overflow-x-auto my-6"
        >
          <code className="font-mono text-sm text-[var(--text-2)] leading-relaxed">
            {code}
          </code>
        </pre>
      );
    }

    // Images: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return (
        <figure key={i} className="my-8">
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="w-full rounded-xl border border-[var(--border)]"
          />
          {imgMatch[1] && (
            <figcaption className="text-center text-xs text-[var(--text-3)] font-mono mt-3">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
    }

    // Regular paragraph with inline formatting
    const formatted = trimmed
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--text)] font-medium">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /`(.+?)`/g,
        '<code class="px-1.5 py-0.5 bg-[var(--bg-3)] rounded text-[13px] font-mono text-accent">$1</code>',
      )
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-accent underline underline-offset-2 hover:no-underline" target="_blank" rel="noopener noreferrer">$1</a>',
      );

    return (
      <p
        key={i}
        className="text-[var(--text-2)] font-body font-light leading-[1.85] text-[15px]"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24">
          <div className="page-container max-w-3xl animate-pulse space-y-6">
            <div className="h-4 w-20 bg-[var(--bg-3)] rounded" />
            <div className="h-12 w-3/4 bg-[var(--bg-3)] rounded-lg" />
            <div className="h-4 w-1/3 bg-[var(--bg-3)] rounded" />
            <div className="h-px bg-[var(--border)] my-8" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-[var(--bg-3)] rounded" />
              <div className="h-4 w-5/6 bg-[var(--bg-3)] rounded" />
              <div className="h-4 w-4/6 bg-[var(--bg-3)] rounded" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-[var(--text-3)] font-mono text-sm">
              Post not found.
            </p>
            <Link
              href="/blog"
              className="text-accent text-sm hover:underline"
            >
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24">
        <article className="page-container max-w-3xl">
          {/* Back */}
          <RevealWrapper>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-3)] hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="h-3 w-3" />
              All posts
            </Link>
          </RevealWrapper>

          {/* Header */}
          <RevealWrapper delay={100}>
            <header className="mb-12">
              <h1 className="text-3xl md:text-5xl font-display text-[var(--text)] leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[var(--text-3)] mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min read
                </span>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded-full bg-[var(--accent-dim)] border border-accent/10 text-accent"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="h-px bg-[var(--border)] mt-8" />
            </header>
          </RevealWrapper>

          {/* Cover image */}
          {post.coverImage && (
            <RevealWrapper delay={150}>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-xl border border-[var(--border)] mb-10"
              />
            </RevealWrapper>
          )}

          {/* Body */}
          <RevealWrapper delay={200}>
            <div className="space-y-5">{renderContent(post.content)}</div>
          </RevealWrapper>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link
              href="/blog"
              className="text-accent text-sm hover:underline font-mono"
            >
              ← More posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
