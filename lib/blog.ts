import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  readTime: number;
}

interface FirestoreBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION = "blog_posts";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toPost(id: string, data: FirestoreBlogPost): BlogPost {
  return {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    tags: data.tags || [],
    published: data.published,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
    readTime: estimateReadTime(data.content || ""),
  };
}

// --- Public reads ---

export async function getPublishedPosts(count = 50): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(count),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toPost(d.id, d.data() as FirestoreBlogPost));
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("published", "==", true),
    limit(1),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return toPost(d.id, d.data() as FirestoreBlogPost);
}

export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  return getPublishedPosts(count);
}

// --- Admin writes ---

export async function createPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "readTime">,
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "readTime">>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => toPost(d.id, d.data() as FirestoreBlogPost));
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return toPost(docSnap.id, docSnap.data() as FirestoreBlogPost);
}
