import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/lib/blogs"
import BlogPostClient from "./BlogPostClient"

// Generate static params for all blog posts - this runs on the server
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  // Get next post (chronologically)
  const currentIndex = blogPosts.findIndex(p => p.slug === slug)
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : blogPosts[0]

  return <BlogPostClient post={post} relatedPosts={relatedPosts} nextPost={nextPost} />
}
