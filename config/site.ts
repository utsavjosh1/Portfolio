export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  github: string;
  demo: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  content: string;
}

export const SITE_CONFIG = {
  title: "Utsav Joshi | Software Engineer Portfolio | joshiutsav.com",
  name: "Utsav Joshi | Professional Software Engineer Portfolio",
  url: "https://www.joshiutsav.com",
  ogImage: "https://www.joshiutsav.com/og-image.jpg",
  keywords: [
    "Utsav Joshi",
    "joshiutsav",
    "utsavjoshi",
    "Utsav Joshi Software Engineer",
    "Utsav Joshi Portfolio",
    "joshiutsav.com",
    "software engineer",
    "full stack developer",
    "JavaScript developer",
    "TypeScript expert",
    "React engineer",
    "Next.js developer",
    "Node.js specialist",
    "web development portfolio",
    "software architecture",
    "frontend developer",
    "backend engineer",
    "API development",
    "cloud computing expert",
    "tech professional",
    "hire software engineer",
    "developer portfolio",
    "code quality expert",
  ],
  description: "Professional portfolio of Utsav Joshi (joshiutsav) - Senior Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js. View projects, technical skills, and professional experience.",
  links: {
    twitter: "https://twitter.com/utsavjosh1",
    github: "https://github.com/utsavjosh1",
    linkedin: "https://www.linkedin.com/in/utsavjosh1/",
    email: "hi@joshiutsav.com",
    me: "/me",
    projects: "/projects",
    contact: "/contact",
  },
  author: {
    name: "Utsav Joshi",
    url: "https://www.joshiutsav.com",
    jobTitle: "Senior Software Engineer",
    bio: "Experienced software engineer specializing in building high-performance web applications with modern JavaScript frameworks and cloud technologies.",
    location: "Delhi, India",
    twitter: "https://twitter.com/utsavjosh1",
    github: "https://github.com/utsavjosh1",
    linkedin: "https://www.linkedin.com/in/utsavjosh1/",
    socialProfiles: [
      "https://www.linkedin.com/in/utsavjosh1/",
      "https://github.com/utsavjosh1",
      "https://twitter.com/utsavjosh1",
      "https://www.joshiutsav.com",
    ],
  },
  // Professional skills categorized for better content organization
  skills: {
    languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SQL", "Python"],
    frontend: [
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",
    ],
    backend: [
      "Node.js",
      "Express",
      "NestJS",
      "GraphQL",
      "REST API",
      "WebSockets",
    ],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    cloud: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify"],
    tools: ["Git", "Docker", "Kubernetes", "CI/CD", "Jest", "Cypress"],
  },
  // Site sections for improved structure
  sections: [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  // Professional services offered - helps with search intent matching
  services: [
    "Full Stack Web Development",
    "Frontend Application Development",
    "API Development & Integration",
    "Software Architecture Design",
    "Performance Optimization",
    "Technical Consultation",
  ],
  // Important for local SEO
  location: {
    city: "New Delhi",
    region: "Delhi",
    country: "India",
    postalCode: "110018",
  },
  // Analytics configuration
  analytics: {
    googleAnalyticsId: "G-YGSVWFZS92",
  },
  // Projects configuration
  projects: [] as Project[],
};
