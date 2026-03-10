export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Freelance",
    period: "2023 — Present",
    description:
      "Building AI-driven solutions, scalable automation tools, and high-performance backend systems for clients across industries.",
    achievements: [
      "Architected and deployed real-time monitoring systems using Go and InfluxDB",
      "Built end-to-end data pipelines processing millions of records daily",
      "Developed modern LMS platforms with Next.js, Prisma, and Stripe integration",
      "Implemented AI-powered features using OpenAI API and vector databases",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Open Source",
    period: "2022 — Present",
    description:
      "Contributing to open-source projects and building developer tools focused on performance and developer experience.",
    achievements: [
      "Maintained multiple open-source repositories with active community engagement",
      "Built CLI tools and automation scripts in Go and Python",
      "Contributed to React and Next.js ecosystem libraries",
    ],
  },
];
