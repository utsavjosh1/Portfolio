import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete existing data
    await prisma.project.deleteMany();

    // Create projects
    const projects = [
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
        createdAt: "2024-01-01",
        updatedAt: "2024-04-08",
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
        title: "Shataranj",
        description:
          "A cross-platform Shatranj/Chess engine in Rust, combining speed, safety, and timeless strategy for developers and enthusiasts alike.",
        imageUrl: "/images/projects/shataranj.jpg",
        github: "https://github.com/utsavjosh1/shataranj",
        demo: "",
        technologies: ["Rust", "Chess Engine", "CLI", "Cross-platform"],
        createdAt: "2024-01-01",
        updatedAt: "2024-04-08",
        pinned: false,
        slug: "shataranj",
        content: `
# Shataranj - Rust Chess Engine

## Overview
Shataranj is a powerful chess engine written in Rust, designed for both performance and educational purposes.

## Features
- Advanced move generation
- Sophisticated position evaluation
- Opening book support
- UCI protocol compatibility
- Cross-platform support

## Technical Implementation
Built with Rust for maximum performance and safety, utilizing modern chess programming techniques.
        `,
      },
      {
        title: "Foundme",
        description:
          "A modern social media platform for connecting with friends and sharing moments.",
        imageUrl: "/images/projects/foundme.png",
        github: "https://github.com/utsavjosh1/foundme",
        demo: "https://foundme.vercel.app/",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
        createdAt: "2024-01-01",
        updatedAt: "2024-04-09",
        pinned: false,
        slug: "foundme",
        content: `
# Foundme - Social Connection Platform

## Overview
Foundme is a modern social media platform built for meaningful connections and moment sharing.

## Features
- Real-time messaging system
- Photo sharing capabilities
- Customizable user profiles
- Friend connection system
- Dynamic activity feed

## Technical Stack
Built with Next.js and Firebase for real-time capabilities and scalable infrastructure.
        `,
      },
      {
        title: "Authentication Template",
        description:
          "A comprehensive authentication template that you can use in your project, and in a few steps, you'll have working authentication.",
        imageUrl: "/images/projects/auth.png",
        github: "https://github.com/utsavjosh1/authentication",
        demo: "",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth.js"],
        createdAt: "2024-01-01",
        updatedAt: "2024-04-08",
        pinned: false,
        slug: "authentication",
        content: `
# Authentication Template - Secure User Authentication

## Overview
A comprehensive authentication solution for modern web applications, providing secure and flexible user authentication.

## Features
- Multiple OAuth providers
- Email-based authentication
- Secure password reset flow
- Role-based access control
- Session management

## Implementation
Built with NextAuth.js for robust authentication handling and TypeScript for type safety.
        `,
      },
    ];

    for (const project of projects) {
      await prisma.project.create({
        data: project,
      });
    }

    console.log("Seed data created successfully");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
