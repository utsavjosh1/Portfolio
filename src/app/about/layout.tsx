import type { Metadata } from "next";



const metadata: Metadata = {
  title: "Me? | Utsav Joshi",
  description: "Very GPU-poor optimist, loves CS, hardware, retro, and bikes",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
