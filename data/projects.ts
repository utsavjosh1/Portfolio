export interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gradient: string;
  emoji?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    type: "AI-Powered Job Intelligence",
    title: "Postly",
    image: "/postly.png",
    description:
      "A high-performance job search and matchmaking platform utilizing vector embeddings (Voyage AI) and RAG for semantic seeker-to-job alignment. Features a distributed async scraping pipeline in Python and BullMQ-driven background processing for real-time resume parsing and AI-driven insights.",
    tags: [
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Vector Search",
      "AI/LLM",
    ],
    gradient: "from-[#1a0a28] to-[#2d0d45]",
    githubUrl: "https://github.com/utsavjosh1/postly",
    liveUrl: "https://postly.learnest.asia/",
  },
  // {
  //   id: "02",
  //   type: "EdTech Platform",
  //   title: "Learnest",
  //   image: "/postly.png",
  //   description:
  //     "A modern Learning Management System focused on intuitive UX and seamless content delivery. Features real-time progress tracking, Stripe-powered payments, and a fully responsive design.",
  //   tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
  //   gradient: "from-[#0a2818] to-[#0d4528]",
  //   githubUrl: "https://github.com/utsavjosh1/learnest",
  //   liveUrl: "https://learnest.asia/",
  // },
];
