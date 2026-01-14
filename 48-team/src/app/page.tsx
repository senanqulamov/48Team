import NewPageClient from "./new/NewPageClient"
import type { Metadata } from "next"
import { siteConfig, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "The 48 Team | Senan Qulamov",
  description: "Innovative web development and design team. Explore our portfolio of cutting-edge projects, from AI-powered platforms to immersive web experiences. Led by Senan Qulamov.",
  keywords: [
    ...siteConfig.keywords,
    "portfolio",
    "web development",
    "software engineer",
    "full stack developer",
    "react developer",
    "nextjs developer",
    "UI/UX design",
    "interactive portfolio",
    "creative development",
    "GSAP animations",
    "horizontal scroll",
    "immersive web design"
  ],
  openGraph: {
    title: "The 48 Team | Senan Qulamov",
    description: "Innovative web development and design team. Explore our portfolio of cutting-edge projects, from AI-powered platforms to immersive web experiences.",
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.socialBanner),
        width: 1200,
        height: 630,
        alt: "48 Team - Senan Qulamov Portfolio & Development Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 48 Team | Senan Qulamov",
    description: "Innovative web development and design team. Explore our portfolio of cutting-edge projects, from AI-powered platforms to immersive web experiences.",
    images: [absoluteUrl(siteConfig.socialBanner)],
    creator: "@senanqulamov",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
}

export default function MainPage() {
  return <NewPageClient />
}



