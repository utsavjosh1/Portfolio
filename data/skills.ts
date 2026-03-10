export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "Code",
    skills: ["Go", "TypeScript", "Python", "SQL", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: "Layout",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Gin", "Echo", "Express", "REST", "gRPC"],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Prisma"],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Vercel"],
  },
  {
    title: "AI & Tools",
    icon: "BrainCircuit",
    skills: ["OpenAI API", "ChromaDB", "LangChain", "Git", "Linux"],
  },
];
