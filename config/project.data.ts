import { Project } from "./site";

export const projects: Project[] = [
  {
    id: 1,
    title: "Learnesst",
    slug: "learnest",
    description:
      "Learnesst is a SaaS application for individuals or organizations looking to launch their own LMS platform with ease and flexibility.",
    imageUrl: "/learnest.png",
    github: "https://github.com/utsavjosh1/learnest",
    demo: "https://learnesst.vercel.app/",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-04-08",
    pinned: true,
  },
  {
    id: 2,
    title: "Shataranj",
    slug: "shataranj",
    description:
      "A cross-platform Shatranj/Chess engine in Rust, combining speed, safety, and timeless strategy for developers and enthusiasts alike.",
    imageUrl: "/images/projects/shataranj.jpg",
    github: "https://github.com/utsavjosh1/shataranj/",
    demo: "",
    technologies: ["Rust", "Chess Engine", "CLI", "Cross-platform"],
    createdAt: "2024-01-01",
    updatedAt: "2024-04-08",
    pinned: false,
  },
  {
    id: 3,
    title: "Foundme",
    slug: "foundme",
    description:
      "A modern social media platform for connecting with friends and sharing moments.",
    imageUrl: "/images/projects/foundme.png",
    github: "https://github.com/utsavjosh1/foundme",
    demo: "https://foundme.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    createdAt: "2024-01-01",
    updatedAt: "2024-04-09",
    pinned: false,
  },
  {
    id: 4,
    title: "Authentication Template",
    slug: "authentication",
    description:
      "A comprehensive authentication template that you can use in your project, and in a few steps, you'll have working authentication.",
    imageUrl: "/images/projects/auth.png",
    github: "https://github.com/utsavjosh1/authentication",
    demo: "",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth.js"],
    createdAt: "2024-01-01",
    updatedAt: "2024-04-08",
    pinned: false,
  },
];
