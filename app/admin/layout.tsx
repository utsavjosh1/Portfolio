import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Utsav Joshi",
  description: "Admin panel for managing portfolio content and submissions",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
