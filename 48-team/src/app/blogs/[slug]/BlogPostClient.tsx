"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, ArrowLeft, Share2, Twitter, Linkedin, Github, Copy, Check } from "lucide-react"
import { formatDate, type BlogPost } from "@/lib/blogs"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
import PageWrapper from "@/components/PageWrapper"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"
import { renderMarkdown } from "@/lib/markdown"
import { cn } from "@/lib/utils"

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
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
      } catch (e) {
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
      case "GitHub":
        shareUrl = `https://github.com/senanqulamov`
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
      className={`border-gray-700 text-gray-300 hover:bg-gray-800 ${color}`}
      aria-label={`Share on ${label}`}
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
    <Link href={`/blogs/${post.slug}`} className="group block" aria-label={`Read ${post.title}`}>
      <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          {formatDate(post.publishedAt)}
          <span aria-hidden>•</span>
          <Clock className="w-4 h-4" />
          {post.readingTime} min read
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
      </article>
    </Link>
  )
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState("")
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const stickySentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // Toggle sticky header when scrolled at least 100px
  useEffect(() => {
    const onScroll = () => {
      setShowStickyHeader(window.scrollY >= 100)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleComplete = () => setIsLoading(false)

  const shareButtons = [
    { icon: Twitter, label: "Twitter", color: "hover:text-emerald-400" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-emerald-600" },
    { icon: Github, label: "GitHub", color: "hover:text-gray-400" },
    { icon: Copy, label: "Copy Link", color: "hover:text-green-400" },
  ] as const

  return (
    <div className="relative text-foreground min-h-screen" id="scroll-container">
      {isLoading && <PageLoader onComplete={handleComplete} />}

      <ProgressiveBlurNoise show={isLoading} />

      {!isLoading && (
        <>
          <Navigation />
          {/* Sticky header appears only after scroll */}
          <AnimatePresence>
             {showStickyHeader && (
               <motion.div
                 key="sticky-header"
                 initial={{ y: -12, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: -12, opacity: 0 }}
                 transition={{ duration: 0.18, ease: "easeOut" }}
                 className="fixed top-24 left-0 right-0 z-[1100]"
                 role="region"
                 aria-label="Blog quick header"
               >
                 <div className="mx-auto max-w-5xl px-4">
                   <div className="flex items-center gap-3 bg-card/50 border border-primary/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                     <Link href="/blogs">
                       <Button
                         variant="outline"
                         size="sm"
                         className="text-gray-300 border border-primary/20 rounded-xl"
                         aria-label="Back to Insights"
                       >
                         <ArrowLeft className="w-4 h-4 mr-2" />
                         <span className="hidden sm:inline">Back to Insights</span>
                         <span className="sm:hidden">Back</span>
                       </Button>
                     </Link>
                     <span
                       className={cn(
                         "flex-1 min-w-0 truncate text-gray-200",
                         "text-lg lg:text-xl font-semibold"
                       )}
                       title={post.title}
                     >
                       {post.title}
                     </span>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
          <PageWrapper>
            <div className="relative min-h-screen bg-black text-white">
              {/* Hero Section */}
              <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                {/* increased top padding to account for fixed header */}
                <div className="max-w-4xl mx-auto">
                  {/* Sticky sentinel: when this leaves viewport, show sticky header */}
                  <div ref={stickySentinelRef} className="h-px w-full" aria-hidden />
                  {/* Inline back button visible before scroll; hidden when sticky header is shown */}
                  {!showStickyHeader && (
                    <div className="mb-4">
                      <Link href="/blogs">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          aria-label="Back to Insights"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Insights
                        </Button>
                      </Link>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                        {post.title}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                      {post.subtitle}
                    </p>

                    {/* Meta Information + Share */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium text-white">{post.author.name}</p>
                          <p className="text-sm text-gray-400">{post.author.bio}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </div>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex flex-wrap gap-3 mb-2 items-center">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share:
                      </span>
                      {shareButtons.map((button) => (
                        <ShareButton
                          key={button.label}
                          url={currentUrl}
                          title={post.title}
                          icon={button.icon}
                          label={button.label}
                          color={button.color}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Cover Image */}
              <section className="px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={1200}
                      height={600}
                      className="w-full h-64 md:h-96 object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                  </motion.div>
                </div>
              </section>

              {/* Article Content */}
              <section className="px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-emerald-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content, { baseLevel: 2 }) }}
                  />
                </div>
              </section>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="px-4 sm:px-6 lg:px-8 pb-16">
                  <div className="max-w-6xl mx-auto">
                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl font-bold mb-8 text-center"
                    >
                      Related Insights
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost, index) => (
                        <motion.div
                          key={relatedPost.slug}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <RelatedPostCard post={relatedPost} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </PageWrapper>

          <ScrollDownIndicator />
          <Footer />
        </>
      )}
    </div>
  )
}
