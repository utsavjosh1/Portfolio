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
    company: "Nextbill",
    period: "2023 — Present",
    description:
      "Spearheading the full-stack development and architectural evolution of a fintech SaaS platform, leading major technical initiatives from legacy migrations to high-performance financial engine development.",
    achievements: [
      "Architected a robust GSTR reporting engine, automating complex tax compliance workflows (GSTR-1, 2A/B, 3B) and financial reconciliation for multi-million record datasets.",
      "Led a large-scale TypeScript migration of the frontend codebase, refactoring hundreds of legacy components to improve type safety and reduce runtime errors by 60%.",
      "Engineered a unified data normalization and validation layer, standardizing field schemas across 30+ modules and ensuring high-integrity data flow.",
      "Pioneered the transition to AWS Lambda-based serverless architecture, optimizing deployment pipelines and infrastructure scalability for high-concurrency environments.",
      "Designed and implemented a scalable subscription management system, supporting dynamic feature toggling and usage-based billing monitoring.",
      "Developed advanced financial features including automated payment processing, real-time ledger management, and integrated E-Invoicing services.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "IIT Madras",
    period: "2022 — 2023",
    description:
      "Developed the backend for a green-tech crowdfunding platform aimed at reducing carbon emissions, utilizing Supabase and PostgreSQL.",
    achievements: [
      "Integrated Supabase for real-time backend services, managing project funding cycles and secure user authentication for a global contributor base.",
      "Built real-time synchronization for platform-wide metrics, ensuring live updates for crowdfunding contributions and carbon impact tracking.",
      "Optimized database schemas for high-concurrency funding events, ensuring platform stability during peak transaction periods.",
      "Implemented secure API layers for financial tracking and project management, adhering to strict data privacy and security standards.",
    ],
  },
];
