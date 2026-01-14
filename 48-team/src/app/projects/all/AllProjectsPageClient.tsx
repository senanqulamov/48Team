"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Sparkles } from "lucide-react"
import { projects } from "@/lib/projects"
import type { Project } from "@/types/project"
import Footer from "@/components/Footer"

gsap.registerPlugin(ScrollTrigger)

// Filter projects with complete data (has images and description)
const completeProjects = projects.filter(project => {
  const hasImages = project.images && project.images.length > 0
  const hasDescription = project.shortDescription || project.description || project.longDescription
  return hasImages && hasDescription
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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(completeProjects)

  // Get unique categories from complete projects only
  const categories = ["All", ...Array.from(new Set(completeProjects.map(p => p.category).filter(Boolean)))] as string[]

  useEffect(() => {
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
  }, [filteredProjects])

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(completeProjects)
    } else {
      setFilteredProjects(completeProjects.filter(p => p.category === activeCategory))
    }
  }, [activeCategory])

  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Fixed Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: "#000000" }}>
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
               style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] animate-pulse"
               style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-pulse"
               style={{ animationDuration: '12s', animationDelay: '4s' }} />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5"
               style={{
                 backgroundImage: 'linear-gradient(to right, rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.3) 1px, transparent 1px)',
                 backgroundSize: '4rem 4rem'
               }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.2),transparent_50%)]" />
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <p className="text-primary text-sm md:text-base uppercase tracking-wider">
                My Work
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              All Projects <span className="text-sm">v2.0.0</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our complete portfolio of innovative solutions, from startups to enterprise applications
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-12 mt-12">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">{completeProjects.length}+</p>
                <p className="text-sm text-muted-foreground mt-2">Projects (public)</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-accent">{categories.length - 1}</p>
                <p className="text-sm text-muted-foreground mt-2">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground mt-2">Years</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground text-sm"
        >
          <p>Scroll to explore</p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as string)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
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
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card group"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 bg-card">
          {/* Project Image */}
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-3">
              {project.demoUrl && (
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              )}
              {project.links?.github && (
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  <Github className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            {/* Category */}
            {project.category && (
              <p className="text-primary text-xs uppercase tracking-wider mb-2">
                {project.category}
              </p>
            )}

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {/* Subtitle */}
            {project.subtitle && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {project.yearRange && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.yearRange}</span>
                </div>
              )}
            </div>

            {/* Tech Tags */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-xs text-white"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-xs text-white">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

