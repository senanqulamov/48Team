import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blogs'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const posts = blogPosts.map(p => ({
    url: absoluteUrl(`/blogs/${p.slug}`),
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/blogs'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...posts,
  ]
}

