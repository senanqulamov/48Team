"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin, Copy, Sparkles, BookOpen, Share2, User, Tag } from "lucide-react"
import { formatDate, type BlogPost } from "@/lib/blogs"
import Footer from "@/components/Footer"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"
import { renderMarkdown } from "@/lib/markdown"
import { ScrollIndicator } from "@/components/ScrollIndicator"

gsap.registerPlugin(ScrollTrigger)

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  nextPost: BlogPost
}

// Immediate scroll to top
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500"
      >
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
        )}

        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-emerald-400 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover gradient effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          animate={{
            background: [
              "linear-gradient(135deg, rgba(16,185,129,0) 0%, rgba(34,197,94,0) 100%)",
              "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(34,197,94,0.05) 100%)",
              "linear-gradient(135deg, rgba(16,185,129,0) 0%, rgba(34,197,94,0) 100%)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.article>
    </Link>
  )
}

export default function BlogPostClient({ post, relatedPosts, nextPost }: BlogPostClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effects for hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200])

  const handleComplete = () => setIsLoading(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // Initialize Lenis smooth scrolling with GSAP
  useEffect(() => {
    if (isLoading) return

    // Aggressive scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    setTimeout(() => window.scrollTo(0, 0), 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // GSAP Animations for reveal sections
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      )
    })

    // Parallax images
    gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((img) => {
      gsap.fromTo(
        img,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      )
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoading, post.slug])

  const shareButtons = [
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Copy, label: "Copy Link", color: "hover:text-emerald-400" },
  ]

  return (
    <>
      {/* Menu Button - Fixed position */}
      {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Page Loader */}
      {isLoading && <NewPageLoader onComplete={handleComplete} />}

      <main ref={containerRef} className="bg-black text-white overflow-hidden">
        {/* CINEMATIC HERO - Full Viewport with Parallax */}
        <section className="relative h-screen overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            style={{ scale: heroScale, y: heroY }}
            className="absolute inset-0 w-full h-full"
          >
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover opacity-30"
                priority
                quality={100}
              />
            )}
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Film grain texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                 style={{
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="6.29" numOctaves="6" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
                 }}
            />
          </motion.div>

          {/* Navigation - Fixed to not collide with MenuButton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-0 left-0 right-0 z-40 p-4 md:p-8"
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Back Button - Left */}
              <Link
                href="/blogs"
                className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/60 hover:border-white/20 transition-all duration-300 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Blogs</span>
                <span className="sm:hidden">Back</span>
              </Link>

              {/* Share Buttons - Right (with space for menu button) */}
              <div className="flex items-center gap-2 mr-12 md:mr-16">
                {shareButtons.map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      if (btn.label === "Copy Link") {
                        await navigator.clipboard.writeText(currentUrl)
                      } else if (btn.label === "Twitter") {
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, "_blank")
                      } else if (btn.label === "LinkedIn") {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "_blank")
                      }
                    }}
                    className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/20 hover:border-white/20 transition-all hidden sm:flex"
                    title={btn.label}
                  >
                    <btn.icon className="w-4 h-4 text-white" />
                  </motion.button>
                ))}

                {/* Mobile Share Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/20 hover:border-white/20 transition-all sm:hidden"
                  title="Share"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Hero Content - Centered */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex items-center justify-center z-10 px-4 pt-20"
          >
            <div className="text-center max-w-6xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category/Tags Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-2 mb-6"
                >
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full"
                    >
                      <Tag className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">{tag}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Title - Cinematic & Bold */}
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.1] px-4"
                >
                  <span className="block bg-gradient-to-b from-white via-emerald-100 to-white/60 bg-clip-text text-transparent drop-shadow-2xl">
                    {post.title}
                  </span>
                </motion.h1>

                {/* Subtitle - Cinema-style */}
                {post.subtitle && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500/50" />
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500/50" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100/90 font-light italic max-w-4xl mx-auto px-4 leading-relaxed">
                        &#34;{post.subtitle}&#34;
                    </p>
                  </motion.div>
                )}

                {/* Excerpt - Supporting text */}
                {post.excerpt && !post.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-lg sm:text-xl md:text-2xl text-white/60 mb-8 font-light max-w-4xl mx-auto px-4 leading-relaxed"
                  >
                    {post.excerpt}
                  </motion.p>
                )}

                {/* Author & Meta - Cinema credits style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-md" />
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={56}
                        height={56}
                        className="relative rounded-full border-2 border-emerald-400/30 ring-2 ring-emerald-500/10"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-wider text-emerald-400/70 mb-0.5">Written by</p>
                      <p className="text-white font-semibold text-base">{post.author.name}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400/70" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400/70" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <ScrollIndicator className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" />
        </section>

        {/* CHAPTER INTRODUCTION - Movie-style opening */}
        <section className="reveal-section relative py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950/50 to-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.03) 0%, transparent 50%)',
            }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full mb-8">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Chapter One</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="block text-white/20 mb-2 text-xl md:text-2xl font-light">The Story Begins</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Unfolding the Narrative
                </span>
              </h2>
            </motion.div>
          </div>
        </section>

        {/* THE STORY SECTION - Enhanced with better typography */}
        <section className="reveal-section relative min-h-screen py-16 md:py-24 px-4 md:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

          {/* Decorative side elements */}
          <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent hidden lg:block" />
          <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent hidden lg:block" />

          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 1.5 }}
            >
              {/* Rich Content with Cinematic Markdown Styling */}
              <article
                className="blog-content text-white/75 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </motion.div>
          </div>
        </section>

        {/* AUTHOR SPOTLIGHT - Cinema credits style */}
        <section className="reveal-section relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full mb-6">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">About the Author</span>
              </div>
            </motion.div>

            {/* Author Card - Premium Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)'
                     }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Author Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-2xl blur-xl" />
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={120}
                      height={120}
                      className="relative rounded-2xl border-2 border-emerald-400/30 ring-4 ring-emerald-500/10"
                    />
                  </motion.div>

                  {/* Author Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                      {post.author.name}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed mb-6">
                      {post.author.bio}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                      <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-emerald-400">{post.readingTime}</p>
                        <p className="text-sm text-white/50">Min Read</p>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-emerald-400">{formatDate(post.publishedAt)}</p>
                        <p className="text-sm text-white/50">Published</p>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-emerald-400">{post.tags.length}</p>
                        <p className="text-sm text-white/50">Topics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tags Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {post.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-default"
                >
                  #{tag}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* NEXT POST - Cinematic Teaser (Full Screen) */}
        <section className="reveal-section relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <div className="absolute inset-0">
            {nextPost.coverImage && (
              <Image
                src={nextPost.coverImage}
                alt={nextPost.title}
                fill
                className="object-cover"
                quality={100}
              />
            )}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Next Chapter</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-b from-white via-emerald-100 to-white/60 bg-clip-text text-transparent">
                {nextPost.title}
              </span>
            </h2>

            {nextPost.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl text-emerald-100/80 mb-8 font-light italic max-w-3xl mx-auto">
                "{nextPost.subtitle}"
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{formatDate(nextPost.publishedAt)}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{nextPost.readingTime} min read</span>
              </div>
            </div>

            <Link
              href={`/blogs/${nextPost.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 group shadow-2xl shadow-emerald-500/30"
            >
              <span>Continue Reading</span>
              <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* RELATED POSTS - Additional Stories (Optional) */}
        {relatedPosts.length > 0 && (
          <section className="reveal-section relative py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black to-zinc-950">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="text-center mb-16 md:mb-20"
              >
                <p className="text-sm uppercase tracking-widest text-emerald-400/70 mb-4">More to Explore</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                  <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Related Stories
                  </span>
                </h2>
                <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                  Dive deeper into similar topics and perspectives
                </p>
              </motion.div>

              {/* Related Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <RelatedPostCard post={relatedPost} />
                  </motion.div>
                ))}
              </div>

              {/* View All CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mt-12"
              >
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <span className="text-emerald-400 font-semibold text-sm">Explore All Articles</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

