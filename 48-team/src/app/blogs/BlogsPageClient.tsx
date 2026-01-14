"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import OptimizedImage from "@/components/OptimizedImage"
import Lenis from "lenis"
import { Clock, Calendar, ArrowRight, Search, Sparkles } from "lucide-react"
import { blogPosts, getFeaturedPosts, getAllTags, getPostsByTag, formatDate, type BlogPost } from "@/lib/blogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footer"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"

// Immediate scroll to top - runs BEFORE React mounts
if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

const BlogCard = ({ post, index }: { post: BlogPost; index?: number }) => {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 60,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index ? index * 0.1 : 0,
                ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="blog-card group relative overflow-hidden rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-emerald-500/10"
        >
            <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[4/5]">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <OptimizedImage
              src={post.coverImage || "/images/null/null_1.png"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              priority={index !== undefined && index < 6}
            />
          </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        {post.tags.slice(0, 2).map((tag: string) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40 backdrop-blur-sm"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Hover Overlay with Icon */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, rotate: -90 }}
                            whileHover={{ scale: 1.1, rotate: 0 }}
                            className="p-4 bg-emerald-500/20 backdrop-blur-md rounded-full border-2 border-emerald-400/40"
                        >
                            <ArrowRight className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-300 mb-3">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{post.readingTime} min</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        {post.excerpt && (
                            <p className="text-sm text-gray-300 line-clamp-2 mb-3 group-hover:text-white transition-colors duration-300">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <OptimizedImage
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={28}
                                    height={28}
                                    className="rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors duration-300"
                                />
                                <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors duration-300">{post.author.name}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}

export default function BlogsPageClient() {
    const [isLoading, setIsLoading] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState("")
    const [filteredPosts, setFilteredPosts] = useState(blogPosts)

    const handleComplete = () => setIsLoading(false)

    const featuredPosts = getFeaturedPosts()
    const allTags = getAllTags()

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        // Don't initialize if still loading
        if (isLoading) return

        // AGGRESSIVE scroll to top on mount
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        setTimeout(() => window.scrollTo(0, 0), 0)
        requestAnimationFrame(() => window.scrollTo(0, 0))

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [isLoading])

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
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                    post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
            )
        }

        setFilteredPosts(filtered)
    }

    return (
        <>
            {/* Menu Button - Only show when not loading */}
            {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

            {/* Full Screen Menu */}
            <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Page Loader */}
            {isLoading && <NewPageLoader onComplete={handleComplete} />}

            <main className="relative bg-black text-white min-h-screen overflow-hidden">
                {/* Fixed Animated Background - Matching /projects page */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundColor: "#000000" }}>
                        {/* Animated gradient orbs using CSS */}
                        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/30 rounded-full blur-[120px] animate-pulse"
                             style={{ animationDuration: '8s' }} />
                        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-500/30 rounded-full blur-[120px] animate-pulse"
                             style={{ animationDuration: '10s', animationDelay: '2s' }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/25 rounded-full blur-[100px] animate-pulse"
                             style={{ animationDuration: '12s', animationDelay: '4s' }} />

                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-10"
                             style={{
                                 backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                                 backgroundSize: '4rem 4rem'
                             }} />
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative h-screen flex items-center justify-center overflow-hidden">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                        >
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
                            <span>Back</span>
                        </Link>

                        {/* Hero Content */}
                        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                                    <p className="text-emerald-400 text-xs md:text-sm uppercase tracking-wider">
                                        Insights & Articles
                                    </p>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                                    Blogs
                                </h1>
                                <p className="text-base md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                                    Explore perspectives on productivity, future of work, and building breakthrough technology
                                </p>

                                {/* Stats */}
                                <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12">
                                    <div className="text-center">
                                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400">{blogPosts.length}+</p>
                                        <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Articles</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500">{allTags.length}</p>
                                        <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Topics</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400">5+</p>
                                        <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Years</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground text-xs md:text-sm"
                        >
                            <p>Scroll to explore</p>
                        </motion.div>
                    </section>

                    {/* Search & Filter Section */}
                    <section className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 py-4 md:py-6 px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-400/40"
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
                                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                                    : "border-white/20 text-gray-300 hover:bg-white/10"
                                            }`}
                                        >
                                            {tag}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Blog Posts Grid */}
                    <section className="py-12 md:py-24 px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            {/* Featured Posts */}
                            {!searchQuery && !selectedTag && featuredPosts.length > 0 && (
                                <div className="mb-16">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-3xl font-bold mb-8 text-emerald-400"
                                    >
                                        Featured Articles
                                    </motion.h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        {featuredPosts.map((post, index) => (
                                            <BlogCard key={post.slug} post={post} index={index} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Posts */}
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-3xl font-bold mb-8"
                                >
                                    {searchQuery || selectedTag ? "Search Results" : "All Articles"}
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
                                            className="border-white/20 text-gray-300 hover:bg-white/10"
                                        >
                                            Clear filters
                                        </Button>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                                    >
                                        {filteredPosts.map((post, index) => (
                                            <BlogCard key={post.slug} post={post} index={index} />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <Footer />
            </main>
        </>
    )
}

