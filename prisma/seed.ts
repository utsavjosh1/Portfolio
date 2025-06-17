import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const technologies = await Promise.all([
    prisma.technology.upsert({
      where: { name: "React" },
      update: {},
      create: {
        name: "React",
        description: "A JavaScript library for building user interfaces",
        icon: "⚛️",
        category: "Frontend Framework",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Next.js" },
      update: {},
      create: {
        name: "Next.js",
        description: "The React Framework for Production",
        icon: "▲",
        category: "Full-Stack Framework",
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
      where: { name: "Node.js" },
      update: {},
      create: {
        name: "Node.js",
        description:
          "JavaScript runtime built on Chrome's V8 JavaScript engine",
        icon: "🟢",
        category: "Backend Runtime",
      },
    }),
    prisma.technology.upsert({
      where: { name: "Prisma" },
      update: {},
      create: {
        name: "Prisma",
        description: "Next-generation ORM for Node.js & TypeScript",
        icon: "🔺",
        category: "Database ORM",
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
  ]);

  console.log("✅ Technologies created");

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: "e-commerce-platform" },
      update: {},
      create: {
        title: "Modern E-Commerce Platform",
        description:
          "A full-featured e-commerce platform built with Next.js, featuring payment integration, inventory management, and admin dashboard.",
        content:
          "# E-Commerce Platform\n\nA comprehensive e-commerce solution...",
        image: "/images/ecommerce-project.jpg",
        gallery: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg"],
        tags: ["Next.js", "React", "TypeScript", "Stripe", "Prisma"],
        status: "COMPLETED",
        featured: true,
        year: "2023",
        github: "https://github.com/utsavjosh1/ecommerce-platform",
        demo: "https://ecommerce-demo.vercel.app",
        slug: "e-commerce-platform",
        published: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: "task-management-app" },
      update: {},
      create: {
        title: "Task Management Application",
        description:
          "A collaborative task management app with real-time updates, team collaboration features, and advanced filtering.",
        content: "# Task Management App\n\nBuilt for modern teams...",
        image: "/images/task-app-project.jpg",
        gallery: ["/images/task-1.jpg", "/images/task-2.jpg"],
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
        status: "COMPLETED",
        featured: true,
        year: "2023",
        github: "https://github.com/utsavjosh1/task-manager",
        demo: "https://task-manager-demo.vercel.app",
        slug: "task-management-app",
        published: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: "portfolio-website" },
      update: {},
      create: {
        title: "Portfolio Website",
        description:
          "A modern, responsive portfolio website built with Next.js, featuring dynamic content management and beautiful animations.",
        content: "# Portfolio Website\n\nShowcasing my work and skills...",
        image: "/images/portfolio-project.jpg",
        gallery: ["/images/portfolio-1.jpg", "/images/portfolio-2.jpg"],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        status: "COMPLETED",
        featured: false,
        year: "2024",
        github: "https://github.com/utsavjosh1/portfolio",
        demo: "https://joshiutsav.com",
        slug: "portfolio-website",
        published: true,
      },
    }),
  ]);

  console.log("✅ Projects created");

  // Link technologies to projects
  await Promise.all([
    // E-commerce platform technologies
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[1].id,
        },
      }, // Next.js
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[1].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[2].id,
        },
      }, // TypeScript
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[2].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[0].id,
          technologyId: technologies[4].id,
        },
      }, // Prisma
      update: {},
      create: { projectId: projects[0].id, technologyId: technologies[4].id },
    }),

    // Task management app technologies
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[1].id,
          technologyId: technologies[0].id,
        },
      }, // React
      update: {},
      create: { projectId: projects[1].id, technologyId: technologies[0].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[1].id,
          technologyId: technologies[3].id,
        },
      }, // Node.js
      update: {},
      create: { projectId: projects[1].id, technologyId: technologies[3].id },
    }),

    // Portfolio technologies
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[2].id,
          technologyId: technologies[1].id,
        },
      }, // Next.js
      update: {},
      create: { projectId: projects[2].id, technologyId: technologies[1].id },
    }),
    prisma.projectTechnology.upsert({
      where: {
        projectId_technologyId: {
          projectId: projects[2].id,
          technologyId: technologies[2].id,
        },
      }, // TypeScript
      update: {},
      create: { projectId: projects[2].id, technologyId: technologies[2].id },
    }),
  ]);

  console.log("✅ Project technologies linked");

  // Create sample experiences
  const experiences = await Promise.all([
    prisma.experience.upsert({
      where: { id: "exp-1" },
      update: {},
      create: {
        id: "exp-1",
        company: "Nextbill",
        position: "Software Engineer",
        description:
          "Led the development of the company's flagship product, improving performance by 40% and implementing new features that increased user engagement. Worked with modern technologies including React, Node.js, and AWS.",
        startDate: new Date("2023-01-01"),
        endDate: null,
        current: true,
        location: "Remote",
        website: "https://nextbill.com",
        order: 1,
      },
    }),
    prisma.experience.upsert({
      where: { id: "exp-2" },
      update: {},
      create: {
        id: "exp-2",
        company: "IIT Madras",
        position: "Backend Developer",
        description:
          "Worked on multiple research projects using React, Node.js, and AWS, delivering solutions on time and within budget. Collaborated with researchers to implement data processing pipelines.",
        startDate: new Date("2022-09-01"),
        endDate: new Date("2022-12-01"),
        current: false,
        location: "Chennai, India",
        website: "https://iitm.ac.in",
        order: 2,
      },
    }),
  ]);

  console.log("✅ Experiences created");

  // Create sample skills
  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { id: "skill-1" },
      update: {},
      create: {
        id: "skill-1",
        name: "React",
        level: "EXPERT",
        category: "Frontend",
        description:
          "Advanced React development with hooks, context, and modern patterns",
        yearsOfExp: 4,
        order: 1,
        technologyId: technologies[0].id,
      },
    }),
    prisma.skill.upsert({
      where: { id: "skill-2" },
      update: {},
      create: {
        id: "skill-2",
        name: "Next.js",
        level: "EXPERT",
        category: "Frontend",
        description:
          "Full-stack development with Next.js, including SSR, SSG, and API routes",
        yearsOfExp: 3,
        order: 2,
        technologyId: technologies[1].id,
      },
    }),
    prisma.skill.upsert({
      where: { id: "skill-3" },
      update: {},
      create: {
        id: "skill-3",
        name: "TypeScript",
        level: "ADVANCED",
        category: "Programming Language",
        description:
          "Strong typing and advanced TypeScript patterns for scalable applications",
        yearsOfExp: 3,
        order: 3,
        technologyId: technologies[2].id,
      },
    }),
    prisma.skill.upsert({
      where: { id: "skill-4" },
      update: {},
      create: {
        id: "skill-4",
        name: "Node.js",
        level: "ADVANCED",
        category: "Backend",
        description:
          "Server-side JavaScript development with Express.js and modern frameworks",
        yearsOfExp: 3,
        order: 4,
        technologyId: technologies[3].id,
      },
    }),
    prisma.skill.upsert({
      where: { id: "skill-5" },
      update: {},
      create: {
        id: "skill-5",
        name: "Database Design",
        level: "INTERMEDIATE",
        category: "Backend",
        description:
          "PostgreSQL, MongoDB, and database optimization techniques",
        yearsOfExp: 2,
        order: 5,
        technologyId: technologies[5].id,
      },
    }),
  ]);

  console.log("✅ Skills created");

  // Create sample testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: "testimonial-1" },
      update: {},
      create: {
        id: "testimonial-1",
        name: "Sarah Johnson",
        role: "Project Manager",
        company: "Tech Innovations",
        content:
          "Utsav delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise helped us launch ahead of schedule. The code quality was outstanding and the performance improvements exceeded our expectations.",
        rating: 5,
        featured: true,
        approved: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-2" },
      update: {},
      create: {
        id: "testimonial-2",
        name: "Michael Chen",
        role: "CTO",
        company: "StartupXYZ",
        content:
          "Working with Utsav was a game-changer for our startup. He built our entire backend infrastructure using modern technologies and best practices. His problem-solving skills and communication made the project smooth and successful.",
        rating: 5,
        featured: true,
        approved: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-3" },
      update: {},
      create: {
        id: "testimonial-3",
        name: "Emily Rodriguez",
        role: "Product Owner",
        company: "Digital Agency",
        content:
          "Utsav transformed our design mockups into a pixel-perfect, responsive web application. His expertise in React and modern CSS techniques resulted in a beautiful and performant user interface that our clients love.",
        rating: 5,
        featured: false,
        approved: true,
      },
    }),
  ]);

  console.log("✅ Testimonials created");

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "modern-react-patterns" },
      update: {},
      create: {
        title: "Modern React Patterns in 2024",
        excerpt:
          "Explore the latest React patterns and best practices for building scalable applications in 2024.",
        content:
          "# Modern React Patterns in 2024\n\nReact continues to evolve, and with it, the patterns we use to build scalable applications...",
        slug: "modern-react-patterns",
        featured: true,
        published: true,
        tags: ["React", "JavaScript", "Best Practices"],
        category: "Web Development",
        readingTime: "8 min read",
        image: "/images/react-patterns-blog.jpg",
        publishedAt: new Date("2024-01-15"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "nextjs-app-router-guide" },
      update: {},
      create: {
        title: "Complete Guide to Next.js App Router",
        excerpt:
          "Learn how to leverage the power of Next.js App Router for better performance and developer experience.",
        content:
          "# Complete Guide to Next.js App Router\n\nThe App Router is a new paradigm in Next.js that brings...",
        slug: "nextjs-app-router-guide",
        featured: true,
        published: true,
        tags: ["Next.js", "React", "Tutorial"],
        category: "Web Development",
        readingTime: "12 min read",
        image: "/images/nextjs-app-router-blog.jpg",
        publishedAt: new Date("2024-01-10"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "typescript-tips-tricks" },
      update: {},
      create: {
        title: "TypeScript Tips and Tricks for Better Code",
        excerpt:
          "Discover advanced TypeScript techniques that will make your code more robust and maintainable.",
        content:
          "# TypeScript Tips and Tricks for Better Code\n\nTypeScript has become essential for modern web development...",
        slug: "typescript-tips-tricks",
        featured: false,
        published: true,
        tags: ["TypeScript", "JavaScript", "Tips"],
        category: "Programming",
        readingTime: "6 min read",
        image: "/images/typescript-tips-blog.jpg",
        publishedAt: new Date("2024-01-05"),
      },
    }),
  ]);

  console.log("✅ Blog posts created");

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
