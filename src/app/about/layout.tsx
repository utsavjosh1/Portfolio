import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utsav Joshi | Developer, Optimist, and Tech Enthusiast",
  description: "Utsav Joshi, a GPU enthusiast who loves computer science, hardware, retro tech, and biking. Explore my portfolio and journey in tech.",
  openGraph: {
    title: "Utsav Joshi | Developer, Optimist, and Tech Enthusiast",
    description: "Very GPU-poor optimist, loves CS, hardware, retro, and bikes.",
    type: "website",
    url: "https://joshiutsav.vercel.app/",  
    images: [
      {
        url: "https://your-portfolio-url.com/og-image.jpg", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Utsav Joshi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi | Developer, Optimist, and Tech Enthusiast",
    description: "GPU-poor optimist, loves CS, hardware, retro tech, and biking.",
    site: "@joshi__utsav", 
    // image: "", // Replace with actual image URL
  },
  robots: "index, follow",
  keywords: [
    "Utsav Joshi", "developer portfolio", "GPU enthusiast", 
    "hardware developer", "retro tech", "biking", 
    "software engineering", "Next.js portfolio", "web developer"
  ],
  alternates: {
    canonical: "https://joshiutsav.vercel.app/",  
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
