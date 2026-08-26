import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { JsonLd } from "@/components/json-ld";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/config";
import { getPostBySlug } from "@/lib/blog";
import { generateOGImageURL } from "@/lib/og-image";

export const instant = false;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/blog/${post.slug}`;
  const image = generateOGImageURL({
    title: post.title,
    subtitle: `Writing by ${siteConfig.name}`,
    description: post.excerpt,
    tags: post.tags.slice(0, 4),
  });

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [siteConfig.url],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const structuredImage = post.coverImage || `${siteConfig.url}/api/og`;

  return (
    <>
      <main
        id="main-content"
        className="min-h-screen pb-20 pt-28"
      >
        <article className="mx-auto max-w-2xl px-6 md:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-2)] hover:text-accent"
          >
            <ArrowLeft className="size-3" aria-hidden="true" />
            All posts
          </Link>

          <header className="mb-10">
            <h1 className="font-display text-3xl leading-tight text-[var(--text)] md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] text-[var(--text-2)]">
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
            </div>
            {post.tags.length > 0 && (
              <ul
                aria-label="Post topics"
                className="mt-5 flex flex-wrap gap-2"
              >
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-1 rounded-full border border-accent/15 bg-[var(--accent-dim)] px-2.5 py-1 font-mono text-[10px] text-accent"
                  >
                    <Tag className="size-2.5" aria-hidden="true" />
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {post.coverImage && (
            <figure className="mb-10">
              {/* Remote post images are author-controlled and may come from different hosts. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt=""
                width={1200}
                height={675}
                fetchPriority="high"
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
            </figure>
          )}

          <div className="prose-portfolio">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => {
                  const external = Boolean(href && /^https?:\/\//.test(href));
                  return (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {children}
                    </a>
                  );
                },
                img: ({ src, alt }) => (
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={typeof src === "string" ? src : undefined}
                      alt={alt || ""}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                    />
                    {alt && <figcaption>{alt}</figcaption>}
                  </figure>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 border-t border-[var(--border)] pt-8">
            <Link
              href="/blog"
              className="inline-block py-2 font-mono text-sm text-accent hover:underline"
            >
              ← More posts
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${canonicalUrl}#article`,
              headline: post.title,
              description: post.excerpt,
              datePublished: post.createdAt.toISOString(),
              dateModified: post.updatedAt.toISOString(),
              image: structuredImage,
              mainEntityOfPage: canonicalUrl,
              author: { "@id": `${siteConfig.url}/#person` },
              publisher: { "@id": `${siteConfig.url}/#person` },
              keywords: post.tags.join(", "),
              inLanguage: "en",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Writing",
                  item: `${siteConfig.url}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: canonicalUrl,
                },
              ],
            },
          ],
        }}
      />
    </>
  );
}
