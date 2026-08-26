import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";

import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/config";
import { getPublishedPosts } from "@/lib/blog";

const description = `Engineering notes by ${siteConfig.name} about backend systems, software architecture, TypeScript, Go, and full-stack development.`;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPublishedPosts(1);

  return {
    title: "Engineering Writing",
    description,
    alternates: { canonical: "/blog" },
    robots: posts.length > 0 ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      url: "/blog",
      title: `Engineering Writing — ${siteConfig.name}`,
      description,
    },
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <main
        id="main-content"
        className="min-h-screen pb-20 pt-28"
      >
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <header className="mb-14 space-y-4">
            <p className="section-label">Blog</p>
            <h1 className="font-display text-4xl text-[var(--text)] md:text-5xl">
              Engineering thoughts &amp;{" "}
              <span className="italic text-accent">writing.</span>
            </h1>
            <p className="max-w-[55ch] text-[var(--text-2)]">
              Notes on backend engineering, software architecture, and lessons
              learned while building production systems.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] py-16 text-center">
              <p className="font-mono text-sm text-[var(--text-2)]">
                No published posts yet. Check back soon.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block py-2 text-sm text-accent hover:underline"
              >
                Explore projects instead
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-xl border border-[var(--border)] bg-surface p-6 transition-colors hover:border-white/15 md:p-8"
                >
                  <h2 className="font-display text-xl text-[var(--text)] md:text-2xl">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[11px] text-[var(--text-2)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3" aria-hidden="true" />
                      <time dateTime={post.createdAt.toISOString()}>
                        {formatDate(post.createdAt)}
                      </time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3" aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                    {post.tags.length > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Tag className="size-3" aria-hidden="true" />
                        {post.tags.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
