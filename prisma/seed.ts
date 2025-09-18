import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Learnest project...");

  await prisma.project.upsert({
    where: { slug: "learnest" },
    update: {},
    create: {
      id: "cmc0ite9i000avrv038v4ovyw",
      title: "Learnest",
      slug: "learnest",
      status: "IN_PROGRESS",
      featured: true,
      private: true,
      published: true,
      priority: 1,
      viewCount: 0,
      difficulty: "MEDIUM",
      year: "2023",
      github: "https://github.com/utsavjosh1/learnest",
      demo: "https://www.learnest.asia/",
      description:
        "Learnest is a full-featured Learning Management System (LMS) combining a powerful web-based admin panel for institutions and a seamless mobile app for students. It streamlines class scheduling, student management, payment handling, and course delivery — all in one scalable SaaS platform.",
      content: `# Learnest — Unified Learning Experience on Web & Mobile

**Learnest** is an end-to-end Learning Management System (LMS) designed for modern educational institutions. It bridges the gap between school administration and student experience by providing two tightly integrated platforms: a **Next.js-based admin panel** and a **React Native mobile app**.

---

## 🔧 Platform Overview

### 👨‍🏫 Admin Panel (Web)
- Advanced class scheduling with conflict detection
- Centralized student & teacher management
- Automated fee processing and financial insights
- Real-time analytics and academic tracking
- Powerful content and course management tools

### 📱 Student App (Mobile)
- Seamless access to courses, materials, and schedules
- Interactive learning with quizzes, assignments, and grades
- Push notifications for real-time updates
- In-app payments and transaction history
- Social features like forums and messaging

---

## 🚀 Key Features

- **Drag-and-drop scheduling** for efficient planning
- **QR-based attendance tracking**
- **Digital wallet** for students to manage fees
- **Analytics dashboard** for institutional performance
- **Offline access** to essential content
- **Role-based permissions** for secure control

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React Native, Tailwind CSS, TypeScript
- **Backend**: Drizzle ORM, PostgreSQL, Redis, TanStack Query
- **Auth & Security**: NextAuth.js, Argon2, rate-limiting, Zod validation
- **DevOps**: Edge CDN, serverless Redis, multi-tenant architecture

---

## 🎯 Built For

- K-12 Schools and Coaching Centers
- Online Course Creators & EdTech Startups
- Corporate Training Teams
- Universities & Vocational Institutes

---

## 🔒 Compliance & Security

- GDPR & FERPA compliant
- PCI-compliant payment processing
- End-to-end encryption & audit logs
- Role-based access control

---

## 🌍 Why Learnest?

- **Reduce admin workload** by over 60%
- **Increase student engagement** with mobile-first design
- **Unify operations** across departments and devices
- **Launch faster** with modern, scalable architecture

---

Start transforming your institution with Learnest — the all-in-one solution for next-gen education.`,
      image:
        "https://f2idqsaenr3pv3f7.public.blob.vercel-storage.com/learnest-nrftQE6WdiHO3XWZT3aZIWWfSq4nlp.png",
      gallery: [
        "/images/learnest-admin-dashboard.jpg",
        "/images/learnest-mobile-app.jpg",
        "/images/learnest-class-scheduling.jpg",
        "/images/learnest-payment-system.jpg",
        "/images/learnest-student-portal.jpg",
        "/images/learnest-analytics.jpg",
      ],
      tags: [
        "Learning Management System",
        "Educational Technology",
        "SaaS Platform",
        "React Native",
        "Next.js",
        "Mobile App",
        "Admin Panel",
        "Class Scheduling",
        "Payment Processing",
        "Student Management",
        "TypeScript",
        "Drizzle ORM",
        "TanStack Query",
      ],
      metaTitle: "Learnest – Full-Stack LMS for Web and Mobile",
      metaDescription:
        "Learnest is a modern SaaS LMS featuring a powerful admin panel and a student mobile app. Simplify course delivery, payments, and academic tracking.",
      clientName: "Learnest EdTech Pvt. Ltd.",
      duration: "4 months",
      teamSize: 3,
      video: null,
      publishedAt: null,
      createdAt: new Date("2025-06-17T12:50:02.742Z").toISOString(),
      updatedAt: new Date("2025-06-17T12:50:02.742Z").toISOString(),
      technologies: {
        create: [],
      },
    },
  });

  console.log("✅ Learnest project seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
