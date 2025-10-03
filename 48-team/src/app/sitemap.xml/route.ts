import type { NextRequest } from "next/server"
import { blogPosts } from "@/lib/blogs"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export async function GET(_req: NextRequest) {
  const now = new Date().toISOString()
  const baseEntries = [
    {
      loc: absoluteUrl("/"),
      lastmod: now,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: absoluteUrl("/blogs"),
      lastmod: now,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      loc: absoluteUrl("/projects"),
      lastmod: now,
      changefreq: "weekly",
      priority: "0.9",
    },
  ]

  const postEntries = blogPosts.map((p) => ({
    loc: absoluteUrl(`/blogs/${p.slug}`),
    lastmod: new Date(p.publishedAt).toISOString(),
    changefreq: "yearly",
    priority: "0.6",
  }))

  const entries = [...baseEntries, ...postEntries]
    .map(
      (e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}

