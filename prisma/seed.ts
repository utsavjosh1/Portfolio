import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const technologies = await Promise.all([
    prisma.technology.upsert({
      where: { name: "Next.js" },
      update: {},
      create: {
        name: "Next.js",
        description: "The React Framework for Production with App Router",
        icon: "▲",
        category: "Full-Stack Framework",
      },
    }),
    prisma.technology.upsert({
      where: { name: "React Native" },
      update: {},
      create: {
        name: "React Native",
        description: "Build native mobile apps using React",
        icon: "📱",
        category: "Mobile Framework",
      },
    }),
    prisma.technology.upsert({
      where: { name: "TypeScript" },
      update: {},
      create: {
        name: "TypeScript",
        description: "Typed JavaScript at Any Scale",
        icon: "🔷",
        category: "Programming Language",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Drizzle ORM" },
      update: {},
      create: {
        name: "Drizzle ORM",
        description: "Lightweight TypeScript ORM with excellent type safety",
        icon: "🌧️",
        category: "Database ORM",
      },
    }),
    prisma.technology.upsert({
      where: { name: "TanStack Query" },
      update: {},
      create: {
        name: "TanStack Query",
        description: "Powerful data synchronization for React applications",
        icon: "🔄",
        category: "State Management",
      },
    }),
    prisma.technology.upsert({
      where: { name: "PostgreSQL" },
      update: {},
      create: {
        name: "PostgreSQL",
        description: "Advanced open source relational database",
        icon: "🐘",
        category: "Database",
      },
    }),
    prisma.technology.upsert({
      where: { name: "NextAuth.js" },
      update: {},
      create: {
        name: "NextAuth.js",
        description: "Complete authentication solution for Next.js",
        icon: "🔐",
        category: "Authentication",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Tailwind CSS" },
      update: {},
      create: {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI development",
        icon: "🎨",
        category: "CSS Framework",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Upstash Redis" },
      update: {},
      create: {
        name: "Upstash Redis",
        description: "Serverless Redis for caching and session management",
        icon: "🚀",
        category: "Cache & Storage",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Zod" },
      update: {},
      create: {
        name: "Zod",
        description: "TypeScript-first schema validation with static type inference",
        icon: "✅",
        category: "Validation",
      },
    }),
  ]);

  console.log("✅ Technologies created");

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: "learnest" },
      update: {},
      create: {
        title: "Learnest - Complete Learning Management System for Educational Institutions",
        description:
          "Learnest is a comprehensive SaaS Learning Management System with dual interfaces: a powerful Next.js admin panel for educational institutions and a React Native mobile app for students. Streamline class scheduling, payment processing, student management, and course delivery across web and mobile platforms.",
        content: `# Learnest - Multi-Platform Learning Management System

## Complete Educational Solution with Web Admin & Mobile App

Learnest is a cutting-edge, cloud-based Learning Management System that combines a powerful web-based admin panel for institutions with a dedicated mobile application for students. Built with modern technologies for scalability, security, and exceptional user experience.

### 🏗️ Architecture Overview

**Admin Panel (Next.js Web App)**
- Institution dashboard for administrators and teachers
- Comprehensive class scheduling and management
- Payment processing and financial tracking
- Student enrollment and academic records
- Analytics and reporting tools

**Student Mobile App (React Native)**
- Cross-platform iOS and Android application
- Course access and learning materials
- Assignment submissions and grade viewing
- Class schedules and notifications
- Direct communication with instructors

### 🎯 Key Features

**Admin Panel Features**
- **Smart Class Scheduling**: Drag-and-drop scheduling with conflict detection
- **Payment Management**: Automated billing, fee collection, and financial reporting
- **Student Information System**: Complete student profiles and academic tracking
- **Staff Management**: Teacher profiles, assignments, and performance tracking
- **Analytics Dashboard**: Real-time insights into student performance and institutional metrics
- **Content Management**: Course creation, assignment tools, and resource library

**Mobile App Features**
- **Course Access**: Stream or download course materials offline
- **Interactive Learning**: Quizzes, assignments, and progress tracking
- **Real-time Notifications**: Class updates, assignment reminders, and announcements
- **Digital Wallet**: Fee payments and transaction history
- **Social Learning**: Student forums and peer collaboration tools
- **Attendance Tracking**: QR code-based check-ins and location verification

### 🔧 Technical Stack

**Frontend Technologies**
- Next.js 15 with App Router for optimal performance
- React Native for cross-platform mobile development
- TypeScript for type-safe development
- Tailwind CSS for responsive, modern UI design

**Backend & Database**
- Drizzle ORM for efficient, type-safe database operations
- PostgreSQL for robust data management
- TanStack Query for powerful data synchronization
- NextAuth.js for secure authentication

**Infrastructure & Performance**
- Upstash Redis for caching and session management
- Zod for runtime type validation
- Rate limiting for API security
- Argon2 for password hashing

### 🚀 Benefits for Educational Institutions

**For Administrators**
- Reduce administrative overhead by 60%
- Real-time financial tracking and reporting
- Automated compliance and record-keeping
- Streamlined communication with students and staff

**For Teachers**
- Mobile-friendly class management
- Automated attendance and grading
- Interactive content creation tools
- Performance analytics for each student

**For Students**
- 24/7 access to learning materials
- Offline content availability
- Seamless payment processing
- Direct communication with instructors

### 💡 Perfect For

- K-12 Schools and Educational Institutions
- Coaching and Tutoring Centers
- Professional Training Organizations
- Corporate Learning and Development
- Online Course Creators and Educators
- Vocational and Technical Training Centers

### 📱 Cross-Platform Excellence

- **Web Admin**: Optimized for desktop and tablet management
- **Mobile App**: Native performance on iOS and Android
- **Synchronization**: Real-time data sync across all platforms
- **Offline Support**: Students can access content without internet

### 🔒 Security & Compliance

- End-to-end encryption for sensitive data
- GDPR and FERPA compliance ready
- Role-based access control
- Audit trails for all administrative actions
- Secure payment processing with PCI compliance

### 📈 Scalability & Performance

- Multi-tenant architecture supporting unlimited institutions
- Serverless Redis for instant scaling
- Optimized database queries with Drizzle ORM
- CDN integration for global content delivery

Start transforming your educational institution today with Learnest's comprehensive web and mobile solution!`,
        image: "/placeholder/learnest.png",
        gallery: [
          "/images/learnest-admin-dashboard.jpg",
          "/images/learnest-mobile-app.jpg",
          "/images/learnest-class-scheduling.jpg",
          "/images/learnest-payment-system.jpg",
          "/images/learnest-student-portal.jpg",
          "/images/learnest-analytics.jpg"
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
          "TanStack Query"
        ],
        status: "COMPLETED",
        featured: true,
        year: "2023",
        github: "https://github.com/utsavjosh1/learnest",
        demo: "https://learnest.asia/",
        slug: "learnest",
        published: true,
      },
    }),
  ]);

  console.log("✅ Projects created");

  // Link technologies to projects
  await Promise.all([
    // Learnest technologies
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[0].id, // Next.js
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[0].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[1].id, // React Native
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[1].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[2].id, // TypeScript
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[2].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[3].id, // Drizzle ORM
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[3].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[4].id, // TanStack Query
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[4].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[5].id, // PostgreSQL
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[5].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[6].id, // NextAuth.js
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[6].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[7].id, // Tailwind CSS
        },
      },
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[7].id },
    }),
  ]);

  console.log("✅ Project technologies linked");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });