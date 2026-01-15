"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import OptimizedImage from "@/components/OptimizedImage"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Sparkles } from "lucide-react"
import { projects } from "@/lib/projects"
import type { Project } from "@/types/project"
import Footer from "@/components/Footer"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"
import {ScrollIndicator} from "@/components/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger)

// Filter projects with complete data (has images and description)
const completeProjects = projects.filter(project => {
  const hasImages = project.images && project.images.length > 0
  const hasDescription = project.shortDescription || project.description || project.longDescription
  return hasImages && hasDescription
})

// Sort projects: featured first (by featuredOrder), then non-featured
const sortedProjects = [...completeProjects].sort((a, b) => {
  // Featured projects come first
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1

  // Both featured: sort by featuredOrder
  if (a.featured && b.featured) {
    const orderA = a.featuredOrder ?? 999
    const orderB = b.featuredOrder ?? 999
    return orderA - orderB
  }

  // Both non-featured: maintain original order
  return 0
})

// Immediate scroll to top - runs BEFORE React mounts
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function AllProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sortedProjects)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Get unique categories from complete projects only
  const categories = ["All", ...Array.from(new Set(completeProjects.map(p => p.category).filter(Boolean)))] as string[]

  useEffect(() => {
    // Don't initialize scroll if still loading
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

    lenis.on("scroll", ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Setup GSAP animations for project cards
    const cards = document.querySelectorAll(".project-card")
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
          y: 100,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
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
  }, [filteredProjects, isLoading])

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(sortedProjects)
    } else {
      // Filter by category and maintain featured sorting
      const filtered = sortedProjects.filter(p => p.category === activeCategory)
      setFilteredProjects(filtered)
    }
  }, [activeCategory])

  return (
    <>
      {/* Page Loader */}
      {isLoading && <NewPageLoader onComplete={handleLoadingComplete} />}

      {/* Menu Button - Only show when not loading */}
      {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="relative bg-black text-white min-h-screen overflow-hidden">
        {/* Fixed Animated Background - Matching /new page */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: "#000000" }}>
          {/* Animated gradient orbs using CSS */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"
               style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/30 rounded-full blur-[120px] animate-pulse"
               style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/25 rounded-full blur-[100px] animate-pulse"
               style={{ animationDuration: '12s', animationDelay: '4s' }} />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
                 backgroundSize: '4rem 4rem'
               }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
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
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <p className="text-primary text-xs md:text-sm uppercase tracking-wider">
                My Work
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              All Projects <span className="text-xs md:text-sm">v2.0.0</span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Explore my complete portfolio of innovative solutions, from startups to enterprise applications
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{completeProjects.length}+</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">{categories.length - 1}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">5+</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Years</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" />
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 py-4 md:py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as string)}
                className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-32 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          {/* Featured Projects Section */}
          {filteredProjects.some(p => p.featured) && (
            <div className="mb-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-14"
              >
                <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground text-xl md:text-2xl font-medium">
                  Highlighted projects showcasing exceptional work and innovation
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 md:gap-12"
              >
                {filteredProjects.filter(p => p.featured).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </div>
          )}

          {/* All Other Projects Section */}
          {filteredProjects.some(p => !p.featured) && (
            <div>
              {filteredProjects.some(p => p.featured) && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-14"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-4">
                    All Projects
                  </h2>
                  <p className="text-muted-foreground text-xl md:text-2xl font-medium">
                    Explore my complete portfolio of work
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-10"
              >
                {filteredProjects.filter(p => !p.featured).map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index + filteredProjects.filter(p => p.featured).length}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-24 md:py-32">
              <p className="text-muted-foreground text-xl md:text-2xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
    </>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

// In the ProjectCard component, update the motion.div wrapper:
function ProjectCard({ project, index }: ProjectCardProps) {
    const router = useRouter()

    const handleCardClick = (e: React.MouseEvent) => {
        // Only navigate if clicking on the card itself, not on links
        if ((e.target as HTMLElement).closest('a')) {
            return
        }
        router.push(`/projects/${project.id}`)
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 80,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="project-card group cursor-pointer"
            style={{
                width: '100%',
                maxWidth: '420px',
                margin: '0 auto'
            }}
            onClick={handleCardClick}
        >
            <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500">
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    >
                        <OptimizedImage
                            src={project.image || "/images/null/null_1.png"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            priority={index < 6}
                        />
                    </motion.div>

                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Featured Badge - Top Right */}
                    {project.featured && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-2 shadow-lg"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Featured
                        </motion.div>
                    )}

                    {/* Category Badge - Top Left */}
                    {project.category && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                            {project.category}
                        </div>
                    )}

                    {/* Quick Action Buttons - Bottom Right on Hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        {project.demoUrl && (
                            <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg z-10"
                            >
                                <ExternalLink className="w-4 h-4 text-black" />
                            </motion.a>
                        )}
                        {project.links?.github && (
                            <motion.a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg z-10"
                            >
                                <Github className="w-4 h-4 text-black" />
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {project.title}
                    </h3>

                    {/* Subtitle */}
                    {project.subtitle && (
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                            {project.subtitle}
                        </p>
                    )}

                    {/* Year Range */}
                    {project.yearRange && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{project.yearRange}</span>
                        </div>
                    )}

                    {/* Tech Stack */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 font-medium transition-colors duration-200"
                                >
                                        {tech}
                                    </span>
                            ))}
                            {project.technologies.length > 4 && (
                                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 font-medium">
                                        +{project.technologies.length - 4}
                                    </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}