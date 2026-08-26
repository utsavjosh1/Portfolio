export interface Project {
  slug: string;
  type: string;
  title: string;
  description: string;
  technologies: string[];
  symbol: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  status?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    slug: "postly",
    type: "AI Job Matchmaker",
    title: "Postly",
    symbol: "🤖",
    description:
      "An AI job-matching platform with a React client, Express API, resume parsing, semantic search, and a multi-source Python scraper. PostgreSQL with pgvector powers matching, while Redis and BullMQ handle caching and background work alongside a Discord bot.",
    technologies: [
      "TypeScript",
      "React",
      "Express",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Redis",
    ],
    sourceUrl: "https://github.com/utsavjosh1/Postly",
  },
  {
    slug: "gamingmania",
    type: "Gaming Center Platform",
    title: "GamingMania",
    symbol: "🎮",
    description:
      "A gaming center website and management experience built with Next.js, React, TypeScript, Tailwind CSS, and Supabase for real-time session information and dynamic pricing.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    liveUrl: "https://gamingmania.vercel.app/",
  },
  {
    slug: "learnest",
    type: "Enterprise SaaS LMS",
    title: "Learnest",
    symbol: "🎓",
    featured: true,
    status: "In active development",
    note: "Designed and built independently. Learnest is an ambitious long-term product—and great systems take time to get right.",
    description:
      "A multi-tenant e-learning platform with a Go microservices backend and React frontends. Its architecture supports white-labeling, custom domains, an internal wallet, distributed queues, caching, and object storage.",
    technologies: ["Go", "React", "PostgreSQL", "Redis", "RabbitMQ", "MinIO"],
  },
];
