export interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  emoji?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    type: "Data Platform",
    title: "Postly",
    description:
      "Advanced job scraping platform capable of handling millions of records with intelligent parsing and categorization. Features distributed task processing with Celery.",
    tags: ["Python", "Scraping", "Celery", "PostgreSQL"],
    gradient: "from-[#1a0a28] to-[#2d0d45]",
    // emoji: "📊",
    githubUrl: "https://github.com/utsavjosh1/postly",
    liveUrl: "https://postly.learnest.asia/",
  },
  {
    id: "02",
    type: "EdTech Platform",
    title: "Learnest",
    description:
      "A modern Learning Management System focused on intuitive UX and seamless content delivery. Features real-time progress tracking, Stripe-powered payments, and a fully responsive design.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    gradient: "from-[#0a2818] to-[#0d4528]",
    // emoji: "📚",
    githubUrl: "https://github.com/utsavjosh1/learnest",
    liveUrl: "https://learnest.asia/",
  },
];
