import { Metadata } from "next";

export const heroMetadata: Metadata = {
  title: "Utsav Joshi - Diligent Developer with Dynamism",
  description:
    "Explore the portfolio of Utsav Joshi, a diligent developer known for dynamism and expertise in web development.",
  openGraph: {
    title: "Utsav Joshi - Diligent Developer with Dynamism",
    description:
      "Explore the portfolio of Utsav Joshi, a diligent developer known for dynamism and expertise in web development.",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Utsav Joshi - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsav Joshi - Diligent Developer with Dynamism",
    description:
      "Explore the portfolio of Utsav Joshi, a diligent developer known for dynamism and expertise in web development.",
    images: ["https://example.com/twitter-image.jpg"],
  },
};
