import NewPageClient from "./NewPageClient"
import type { Metadata } from "next"
import { siteConfig, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Horizontal Experience | Interactive Portfolio",
  description: "Experience an innovative horizontal scrolling portfolio showcase featuring projects, skills, and insights. Immersive web design by Senan Qulamov.",
  keywords: [
    ...siteConfig.keywords,
    "horizontal scroll",
    "interactive portfolio",
    "web experience",
    "GSAP animations",
    "creative design",
    "scroll experience"
  ],
  openGraph: {
    title: "Horizontal Experience | The 48 Team",
    description: "Experience an innovative horizontal scrolling portfolio showcase featuring projects, skills, and insights.",
    url: absoluteUrl("/new"),
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.socialBanner),
        width: 1200,
        height: 630,
        alt: "48 Team Horizontal Portfolio Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizontal Experience | The 48 Team",
    description: "Experience an innovative horizontal scrolling portfolio showcase featuring projects, skills, and insights.",
    images: [absoluteUrl(siteConfig.socialBanner)],
  },
  alternates: {
    canonical: absoluteUrl("/new"),
  },
}

export default function NewPage() {
  return <NewPageClient />
}

