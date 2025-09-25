import type { Metadata } from "next"
import { siteConfig, absoluteUrl } from "@/lib/seo"
import { blogPosts } from "@/lib/blogs"
import BlogsPageClient from "./BlogsPageClient"

export const metadata: Metadata = {
  title: "Insights",
  description: "Insights & articles by Senan Qulamov on startups, mental health, engineering, and the future of work.",
  alternates: { canonical: absoluteUrl("/blogs") },
  openGraph: {
    title: "Insights | " + siteConfig.siteName,
    description: "Insights & articles by Senan Qulamov on startups, mental health, engineering, and the future of work.",
    url: absoluteUrl("/blogs"),
    type: "website",
  },
  twitter: {
    title: "Insights | " + siteConfig.siteName,
    description: "Insights & articles by Senan Qulamov on startups, mental health, engineering, and the future of work.",
  },
}

function StructuredDataList() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPosts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/blogs/${p.slug}`),
      name: p.title,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
}

export default function BlogsPage() {
  return (
    <>
      <StructuredDataList />
      <BlogsPageClient />
    </>
  )
}
