export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  order: number;
  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  url: string;
  publicId?: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon?: string | null;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company?: string | null;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  imageUrl?: string | null;
  credentialUrl?: string | null;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface DashboardStats {
  projects: number;
  messages: number;
  skills: number;
  certificates: number;
}

export interface Settings {
  hero_title?: string;
  hero_subtitle?: string;
  hero_role?: string;
  hero_bio?: string;
  about_bio?: string;
  about_education?: string;
  about_degree?: string;
  about_goals?: string;
  profile_image?: string;
  contact_email?: string;
  contact_location?: string;
  [key: string]: string | undefined;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
}
