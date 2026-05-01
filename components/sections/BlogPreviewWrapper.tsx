"use client";

import dynamic from "next/dynamic";

const BlogPreview = dynamic(
  () => import("@/components/sections/BlogPreview"),
  { ssr: false },
);

export default function BlogPreviewWrapper() {
  return <BlogPreview />;
}
