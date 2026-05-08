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
    type: "Enterprise SaaS LMS",
    title: "Learnest",
    image: "/learnest.png",
    description:
      "A massive multi-tenant SaaS e-learning infrastructure architected with a Go microservices backend and multiple React/Vite frontends. Supports complete white-labeling, custom domain mapping, and an internal wallet system. Built for global scale with Redis, RabbitMQ, and MinIO object storage.",
    tags: [
      "Go",
      "Next.js",
      "React Native",
      "PostgreSQL",
      "Redis",
      "Microservices",
    ],
    gradient: "from-[#0a2818] to-[#0d4528]",
    githubUrl: "https://github.com/utsavjosh1/learnest",
    liveUrl: "https://learnest.asia/",
  },
  {
    id: "02",
    type: "AI-Powered Intelligence",
    title: "Postly",
    image: "/postly.png",
    description:
      "A high-performance job intelligence platform leveraging AI for semantic matchmaking. Built with a Node.js API and a distributed Python scraping engine, it utilizes vector embeddings and RAG to align seekers with jobs. Features automated resume parsing and a robust task queue powered by BullMQ.",
    tags: ["Node.js", "Python", "PostgreSQL", "Vector Search", "BullMQ", "RAG"],
    gradient: "from-[#1a0a28] to-[#2d0d45]",
    githubUrl: "https://github.com/utsavjosh1/postly",
    liveUrl: "https://postly.learnest.asia/",
  },
  {
    id: "03",
    type: "Gaming Center Platform",
    title: "GamingMania",
    image: "/gamingmania.png",
    description:
      "A premium gaming center management platform designed for a futuristic arcade experience. Built on the bleeding edge with Next.js 15 and Tailwind CSS 4, it leverages Supabase for real-time session tracking and dynamic pricing. Features a sleek 'stealth' themed UI and integrated community tools.",
    tags: [
      "Next.js 15",
      "Supabase",
      "Tailwind CSS 4",
      "React 19",
      "TypeScript",
    ],
    gradient: "from-[#280a0a] to-[#450d0d]",
    githubUrl: "https://github.com/utsavjoshiNB/GamingMania",
    liveUrl: "https://gamingmania.vercel.app/",
  },
  // {
  //   id: "04",
  //   type: "Infrastructure Monitoring",
  //   title: "Sentinel Monitor",
  //   image: "/monitoring.png",
  //   description:
  //     "A centralized monitoring infrastructure using Prometheus, Loki, and Grafana (LGTM stack). Provides real-time metrics collection and log aggregation across multiple VPS instances, with automated alerting and production-ready security configurations.",
  //   tags: ["Prometheus", "Grafana", "Loki", "Docker", "DevOps", "Promtail"],
  //   gradient: "from-[#1a1a1a] to-[#2d2d2d]",
  //   githubUrl: "https://github.com/utsavjosh1/monitoring",
  // },
];
