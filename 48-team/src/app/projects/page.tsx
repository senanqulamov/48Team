import AllProjectsPageClient from "./all/AllProjectsPageClient"
import type { Metadata } from "next"
import { siteConfig, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications. See how we build cutting-edge technology.",
  keywords: [
    ...siteConfig.keywords,
    "portfolio",
    "web projects",
    "mobile apps",
    "enterprise applications",
    "startups",
    "software development",
    "full-stack projects"
  ],
  openGraph: {
    title: "Projects Portfolio | The 48 Team",
    description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications.",
    url: absoluteUrl("/projects"),
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.socialBanner),
        width: 1200,
        height: 630,
        alt: "48 Team Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Portfolio | The 48 Team",
    description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications.",
    images: [absoluteUrl(siteConfig.socialBanner)],
  },
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
}

export default function ProjectsPage() {
  return <AllProjectsPageClient />
}