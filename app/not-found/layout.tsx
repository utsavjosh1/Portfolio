import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Utsav Joshi",
  description: "The page you're looking for doesn't exist. Return to the homepage to explore Utsav Joshi's portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 