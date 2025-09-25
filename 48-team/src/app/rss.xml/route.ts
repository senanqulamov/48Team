import { blogPosts } from '@/lib/blogs'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export async function GET() {
  const items = blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${absoluteUrl(`/blogs/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/blogs/${post.slug}`)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.tags.join(', ')}</category>
    </item>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title><![CDATA[${siteConfig.siteName}]]></title>
      <link>${siteConfig.baseUrl}</link>
      <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
      <description><![CDATA[${siteConfig.description}]]></description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <ttl>60</ttl>
      ${items}
    </channel>
  </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}

