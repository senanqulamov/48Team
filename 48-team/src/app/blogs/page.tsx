"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, ArrowRight, Search } from "lucide-react"
import { blogPosts, getFeaturedPosts, getAllTags, getPostsByTag, formatDate, BlogPost } from "@/lib/blogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import PageWrapper from "@/components/PageWrapper"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"

const BlogCard = ({ post, featured = false }: { post: BlogPost, featured?: boolean }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={featured ? 800 : 400}
            height={featured ? 400 : 250}
            className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
          </div>

          <h3 className={`font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {post.title}
          </h3>

          <p className="text-gray-300 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-300">{post.author.name}</span>
            </div>

            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleComplete = () => setIsLoading(false)

  const featuredPosts = getFeaturedPosts()
  const allTags = getAllTags()

  // Filter posts based on search and tags
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterPosts(query, selectedTag)
  }

  const handleTagFilter = (tag: string) => {
    const newTag = selectedTag === tag ? "" : tag
    setSelectedTag(newTag)
    filterPosts(searchQuery, newTag)
  }

  const filterPosts = (query: string, tag: string) => {
    let filtered = blogPosts

    if (tag) {
      filtered = getPostsByTag(tag)
    }

    if (query) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }

  return (
    <div className="relative text-foreground min-h-screen" id="scroll-container">
      {isLoading && <PageLoader onComplete={handleComplete} />}

      <ProgressiveBlurNoise show={isLoading} />

      {!isLoading && (
        <>
          <Navigation />
          <PageWrapper>
            <div className="relative min-h-screen bg-black text-white">
              {/* Hero Section */}
              <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                        Insights
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                      Explore perspectives on early productivity, future of work,
                      and building breakthrough technology.
                    </p>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center">
                        {allTags.slice(0, 4).map((tag) => (
                          <Button
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleTagFilter(tag)}
                            className={`${
                              selectedTag === tag
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : "border-gray-700 text-gray-300 hover:bg-gray-800"
                            }`}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Featured Posts */}
              {!searchQuery && !selectedTag && featuredPosts.length > 0 && (
                <section className="px-4 sm:px-6 lg:px-8 mb-16">
                  <div className="max-w-6xl mx-auto">
                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl font-bold mb-8"
                    >
                      Featured Articles
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredPosts.map((post, index) => (
                        <BlogCard
                          key={post.slug}
                          post={post}
                          featured={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* All Posts */}
              <section className="px-4 sm:px-6 lg:px-8 pb-16">
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-8"
                  >
                    {searchQuery || selectedTag ? 'Search Results' : 'All Articles'}
                  </motion.h2>

                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-xl text-gray-400 mb-4">No articles found</p>
                      <Button
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedTag("")
                          setFilteredPosts(blogPosts)
                        }}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Clear filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </PageWrapper>

          <ScrollDownIndicator />
          <Footer />
        </>
      )}
    </div>
  )
}
