import "server-only";

import { cacheLife } from "next/cache";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore/lite";
import { builtInBlogPosts } from "@/data/blog-posts";
import { getDatabase, isFirebaseConfigured } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  readTime: number;
}

interface FirestoreBlogPost {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const collectionName = "blog_posts";

function estimateReadTime(content: string): number {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function toPost(id: string, data: FirestoreBlogPost): BlogPost | null {
  if (!data.title || !data.slug || !data.content) return null;

  const createdAt = data.createdAt?.toDate() ?? new Date(0);

  return {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt?.trim() || data.content.slice(0, 160),
    content: data.content,
    coverImage: data.coverImage,
    tags: data.tags?.filter(Boolean) ?? [],
    createdAt,
    updatedAt: data.updatedAt?.toDate() ?? createdAt,
    readTime: estimateReadTime(data.content),
  };
}

const localPosts: BlogPost[] = builtInBlogPosts.map((post) => ({
  ...post,
  createdAt: new Date(post.createdAt),
  updatedAt: new Date(post.updatedAt),
  readTime: estimateReadTime(post.content),
}));

function mergePosts(remotePosts: BlogPost[]): BlogPost[] {
  const postsBySlug = new Map(
    remotePosts.map((post) => [post.slug, post] as const),
  );

  // Version-controlled posts are authoritative when a Firestore document uses
  // the same slug, preventing two copies from appearing in lists and the sitemap.
  for (const post of localPosts) postsBySlug.set(post.slug, post);

  return [...postsBySlug.values()].sort(
    (left, right) => right.createdAt.getTime() - left.createdAt.getTime(),
  );
}

function clampPostCount(count: number): number {
  return Math.min(Math.max(Math.trunc(count), 1), 50);
}

export async function getPublishedPosts(count = 50): Promise<BlogPost[]> {
  "use cache";
  cacheLife("hours");

  const postCount = clampPostCount(count);
  if (!isFirebaseConfigured()) return mergePosts([]).slice(0, postCount);

  try {
    const postsQuery = query(
      collection(getDatabase(), collectionName),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(50),
    );
    const snapshot = await getDocs(postsQuery);
    const remotePosts = snapshot.docs
      .map((document) =>
        toPost(document.id, document.data() as FirestoreBlogPost),
      )
      .filter((post): post is BlogPost => post !== null);

    return mergePosts(remotePosts).slice(0, postCount);
  } catch (error) {
    console.error("Unable to load published blog posts", error);
    return mergePosts([]).slice(0, postCount);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("hours");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  const localPost = localPosts.find((post) => post.slug === slug);
  if (localPost) return localPost;
  if (!isFirebaseConfigured()) return null;

  try {
    const postQuery = query(
      collection(getDatabase(), collectionName),
      where("slug", "==", slug),
      where("published", "==", true),
      limit(1),
    );
    const snapshot = await getDocs(postQuery);
    if (snapshot.empty) return null;

    const document = snapshot.docs[0];
    return toPost(document.id, document.data() as FirestoreBlogPost);
  } catch (error) {
    console.error(`Unable to load blog post: ${slug}`, error);
    return null;
  }
}

export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  return getPublishedPosts(count);
}
