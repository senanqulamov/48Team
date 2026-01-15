"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Lenis from "lenis"
import { Clock, Calendar, ArrowLeft, Share2, Twitter, Linkedin, Copy, Check } from "lucide-react"
import { formatDate, type BlogPost } from "@/lib/blogs"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"
import { renderMarkdown } from "@/lib/markdown"
import { ScrollIndicator } from "@/components/ScrollIndicator"

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

// Immediate scroll to top
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const ShareButton = ({ url, title, icon: Icon, label, color }: {
  url: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (label === "Copy Link") {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // noop
      }
      return
    }

    let shareUrl = ""
    switch (label) {
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={`border-white/20 text-gray-300 hover:bg-white/10 ${color}`}
    >
      {copied && label === "Copy Link" ? (
        <Check className="w-4 h-4 mr-2" />
      ) : (
        <Icon className="w-4 h-4 mr-2" />
      )}
      {copied && label === "Copy Link" ? "Copied!" : label}
    </Button>
  )
}

const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -5 }}
        className="bg-card/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-300"
      >
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          {formatDate(post.publishedAt)}
          <span>•</span>
          <Clock className="w-4 h-4" />
          {post.readingTime} min
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  )
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  const handleComplete = () => setIsLoading(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (isLoading) return

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    setTimeout(() => window.scrollTo(0, 0), 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

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

    // Sticky header on scroll
    const onScroll = () => {
      setShowStickyHeader(window.scrollY >= 200)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener("scroll", onScroll)
    }
  }, [isLoading])

  const shareButtons = [
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Copy, label: "Copy Link", color: "hover:text-emerald-400" },
  ]

  return (
    <>
      {/* Menu Button */}
      {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Page Loader */}
      {isLoading && <NewPageLoader onComplete={handleComplete} />}

      <main className="relative bg-black text-white min-h-screen overflow-hidden">
        {/* Fixed Animated Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundColor: "#000000" }}>
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/30 rounded-full blur-[120px] animate-pulse"
                 style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-500/30 rounded-full blur-[120px] animate-pulse"
                 style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/25 rounded-full blur-[100px] animate-pulse"
                 style={{ animationDuration: '12s', animationDelay: '4s' }} />
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                   backgroundSize: '4rem 4rem'
                 }} />
          </div>
        </div>

        {/* Sticky Header */}
        <AnimatePresence>
          {showStickyHeader && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/10 py-4 px-4 md:px-8"
            >
              <div className="max-w-5xl mx-auto flex items-center gap-4">
                <Link href="/blogs">
                  <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <span className="flex-1 min-w-0 truncate text-white font-semibold">{post.title}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-32">
            {/* Back Button */}
            <Link
              href="/blogs"
              className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span>Back</span>
            </Link>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center justify-center gap-6 text-sm md:text-base text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-emerald-500/30"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold">{post.author.name}</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                  {shareButtons.map((btn) => (
                    <ShareButton
                      key={btn.label}
                      url={currentUrl}
                      title={post.title}
                      icon={btn.icon}
                      label={btn.label}
                      color={btn.color}
                    />
                  ))}
                </div>
                  {/* Scroll Indicator */}
                  <ScrollIndicator className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" />
              </motion.div>
            </div>
          </section>

          {/* Cover Image */}
          {post.coverImage && (
            <section className="relative w-full max-w-5xl mx-auto px-4 md:px-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-500/20"
              >
                <motion.div
                  className="relative w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* Content */}
          <section className="relative max-w-4xl mx-auto px-4 md:px-8 py-16">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-invert prose-emerald max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-emerald-500/20"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-3xl font-display font-bold mb-8 text-emerald-400">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </motion.div>
            </section>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

