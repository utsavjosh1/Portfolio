export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED"
  | "ON_HOLD";
export type ProjectDifficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type ContactStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED" | "SPAM";
export type ExperienceType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "FREELANCE"
  | "INTERNSHIP"
  | "VOLUNTEER";
export type NewsletterFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY";

export interface Project {
  id: string;
  title: string;
  description: string;
  content?: string | null;
  video?: string | null;
  image?: string | null;
  gallery: string[];
  tags: string[];
  status: ProjectStatus;
  featured: boolean;
  private: boolean;
  year?: string | null;
  github?: string | null;
  demo?: string | null;
  slug: string;
  published: boolean;
  priority: number;
  viewCount: number;
  difficulty: ProjectDifficulty;
  duration?: string | null;
  teamSize?: number | null;
  clientName?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  technologies: ProjectTechnology[];
}

export interface Technology {
  id: string;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  category?: string;
  color?: string;
  website?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  projects: ProjectTechnology[];
  skills: Skill[];
}

export interface ProjectTechnology {
  id: string;
  projectId: string;
  technologyId: string;
  isPrimary: boolean;
  project: Project;
  technology: Technology;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  category?: string;
  readingTime?: string;
  image?: string;
  viewCount: number;
  likeCount: number;
  metaTitle?: string;
  metaDescription?: string;
  authorName?: string;
  authorEmail?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  postId: string;
  name: string;
  email: string;
  website?: string;
  content: string;
  approved: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  post: BlogPost;
  parent?: BlogComment;
  replies: BlogComment[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  website?: string;
  logo?: string;
  order: number;
  employmentType: ExperienceType;
  achievements: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category?: string;
  description?: string;
  yearsOfExp?: number;
  order: number;
  endorsed: boolean;
  createdAt: string;
  updatedAt: string;
  technologyId?: string;
  technology?: Technology;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  ipAddress?: string;
  userAgent?: string;
  honeypot?: string;
  spamScore?: number;
  createdAt: string;
  updatedAt: string;
  repliedAt?: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  active: boolean;
  source?: string;
  ipAddress?: string;
  confirmed: boolean;
  frequency: NewsletterFrequency;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
}

export interface PageView {
  id: string;
  path: string;
  userAgent?: string;
  ipAddress?: string;
  referer?: string;
  country?: string;
  city?: string;
  createdAt: string;
}

export interface AdminSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}
