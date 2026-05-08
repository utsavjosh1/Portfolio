export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "Code",
    skills: ["TypeScript", "Go", "Python", "SQL", "JavaScript"],
  },
  {
    title: "Frontend & Design",
    icon: "Layout",
    skills: ["React 19", "Next.js 16", "Tailwind CSS v4", "MUI", "Radix UI"],
  },
  {
    title: "Backend & Runtime",
    icon: "Server",
    skills: ["Go (Gin)", "Hono", "Node.js", "Bun", "Prisma", "Supabase"],
  },
  {
    title: "AI & Real-time",
    icon: "BrainCircuit",
    skills: ["RAG", "pgvector", "OpenAI API", "LiveKit", "BullMQ", "RabbitMQ"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: ["AWS Lambda", "Docker", "Prometheus", "Grafana", "Vercel"],
  },
  {
    title: "FinTech & Payments",
    icon: "CreditCard",
    skills: ["Stripe", "Cashfree", "Razorpay", "GSTR Engines", "E-Invoicing"],
  },
];
