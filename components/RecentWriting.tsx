"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getLatestPosts, type BlogPost } from "@/lib/blog";

const fallbackPosts = [
  {
    id: "fb1",
    title: "Manufacturing Luck in Design & Engineering",
    slug: "how-to-effectively-freelance",
    createdAt: new Date("2026-06-09T00:00:00.000Z"),
  },
  {
    id: "fb2",
    title: "Taste Can't Be Prompted: The Future of UX",
    slug: "developer-portfolio-website",
    createdAt: new Date("2026-04-17T00:00:00.000Z"),
  },
  {
    id: "fb3",
    title: "Trying to Be Human in the Age of AI",
    slug: "ace-the-javascript-interview",
    createdAt: new Date("2025-12-07T00:00:00.000Z"),
  },
];

function formatBlogDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function RecentWriting() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestPosts(5)
      .then((fetched) => {
        if (fetched && fetched.length > 0) {
          setPosts(fetched);
        } else {
          setPosts(fallbackPosts as any);
        }
      })
      .catch((err) => {
        console.warn("Firestore posts load failed, falling back to static posts.", err);
        setPosts(fallbackPosts as any);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayPosts = loading ? (fallbackPosts as any) : posts;

  return (
    <section className="space-y-6">
      <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-3)] font-semibold">
        Writing
      </h2>
      <div className="space-y-4">
        {displayPosts.map((post: any) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex justify-between items-center py-2.5 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-all duration-200 group gap-6"
          >
            <span className="text-sm font-semibold tracking-tight text-[var(--text)] group-hover:text-accent transition-colors line-clamp-1">
              {post.title}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-3)] whitespace-nowrap">
              {formatBlogDate(post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt))}
            </span>
          </Link>
        ))}
      </div>
      <Link href="/blog" className="text-xs font-mono text-[var(--text-2)] hover:text-accent transition-colors mt-2 inline-block">
        View all →
      </Link>
    </section>
  );
}
