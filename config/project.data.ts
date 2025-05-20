import { Project } from "./site";

export const projects: Project[] = [
  {
    title: "Learnesst",
    description:
      "Learnesst is a SaaS application for individuals or organizations looking to launch their own LMS platform with ease and flexibility.",
    imageUrl:
      "https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/learnest.png",
    github: "https://github.com/utsavjosh1/learnest",
    demo: "https://learnesst.vercel.app/",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      "User authentication and authorization",
      "Course creation and management",
      "Interactive lessons and quizzes",
      "Progress tracking",
      "Analytics dashboard",
    ],
    pinned: true,
    slug: "learnesst",
    content: `
# Learnesst - Modern LMS Platform

## Overview
Learnesst is a modern Learning Management System (LMS) built with Next.js and TypeScript. It provides a comprehensive solution for creating and managing online courses.

## Key Features
- User authentication and authorization
- Course creation and management
- Interactive lessons and quizzes
- Progress tracking
- Analytics dashboard

## Technical Details
Built with Next.js, TypeScript, and Prisma, Learnesst offers a robust and scalable solution for online education.
    `,
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
