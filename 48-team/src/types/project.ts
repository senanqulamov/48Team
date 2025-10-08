export type TechTag = string;
export type ImageItem = { src: string; alt: string; caption?: string } | string;

export interface MetricItem {
  label: string;
  value: string;
}

export interface TechItem {
  name: string;
  iconName?: string; // optional string key for an icon mapping
}

export interface Project {
  id: number;
  title: string;
  client?: string;
  yearRange?: string; // e.g., "2024 - Present"
  shortDescription: string;
  longDescription?: string; // rich text or HTML string
  techTags?: TechTag[];
  gallery?: ImageItem[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  featuredOrder?: number;

  // Structured case study fields
  problem?: string;
  solution?: string;
  impact?: string;
  role?: string;
  screenshots?: ImageItem[];
  metrics?: MetricItem[];
  techStack?: TechItem[]; // richer than plain strings; falls back to techTags
  personalNote?: string;

  // compatibility with existing ProjectBlogModal shape
  subtitle?: string;
  description?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  category?: string;
  status?: string;
  color?: string;
  date?: string;
  links?: { demo?: string; github?: string };
  features?: string[];
  blog?: string;
  /** Optional icon component for branding (e.g., lucide icon) */
  icon?: React.ComponentType<{ className?: string }>;
}
