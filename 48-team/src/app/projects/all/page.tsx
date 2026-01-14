import { Metadata } from "next"
import AllProjectsPageClient from "./AllProjectsPageClient"
import { siteConfig, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "All Projects | Complete Portfolio",
  description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications. Discover 20+ projects built with cutting-edge technologies across various industries.",
  keywords: [
    ...siteConfig.keywords,
    "all projects",
    "portfolio showcase",
    "web projects",
    "mobile applications",
    "enterprise solutions",
    "startup projects",
    "React projects",
    "Next.js projects"
  ],
  openGraph: {
    title: "All Projects | The 48 Team Portfolio",
    description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications.",
    url: absoluteUrl("/projects/all"),
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.socialBanner),
        width: 1200,
        height: 630,
        alt: "48 Team Complete Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects | The 48 Team Portfolio",
    description: "Explore our complete portfolio of innovative web & mobile solutions, from startups to enterprise applications.",
    images: [absoluteUrl(siteConfig.socialBanner)],
  },
  alternates: {
    canonical: absoluteUrl("/projects/all"),
  },
}

export default function AllProjectsPage() {
  return <AllProjectsPageClient />
}

