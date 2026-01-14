"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Award } from "lucide-react"
import type { Project } from "@/types/project"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectGallery from "@/components/ProjectGallery"

gsap.registerPlugin(ScrollTrigger)

interface ProjectPageClientProps {
  project: Project
  nextProject: Project
}

// Immediate scroll to top - runs BEFORE React mounts
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function ProjectPageClient({ project, nextProject }: ProjectPageClientProps) {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    // AGGRESSIVE scroll to top on mount - multiple approaches
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Force again in next tick
    setTimeout(() => window.scrollTo(0, 0), 0)

    // And in animation frame
    requestAnimationFrame(() => window.scrollTo(0, 0))

    // Set scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // RAF loop
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [project.id])

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        {/* Back Button */}
        <Link
          href="/projects"
          className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary text-sm md:text-base mb-4 uppercase tracking-wider">
              {project.category}
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {project.subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.yearRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.client}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Demo
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
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
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-10 bg-black">
        {/* Description Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {project.longDescription || project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-12">
                <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem & Solution */}
        {project.problem && project.solution && (
          <section className="py-24 px-8 bg-muted/5">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                  Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">
                  Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section className="py-24 px-8">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-display font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Key Features
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="p-6 bg-card/50 border border-primary/20 rounded-xl backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
                  >
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {feature}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery - Enhanced with GSAP & Zoom */}
        {project.images && project.images.length > 1 && (
          <ProjectGallery images={project.images} title={project.title} />
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="py-24 px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-display font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Impact & Metrics
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center p-6 bg-card/50 border border-primary/20 rounded-xl backdrop-blur-sm"
                  >
                    <p className="text-3xl font-bold text-primary mb-2">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Project - Coming Soon */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image of Next Project */}
          <div className="absolute inset-0">
            {nextProject.image && (
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Coming Soon Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-8"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
              Next Project
            </p>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {nextProject.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {nextProject.subtitle}
            </p>

            <Link
              href={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              View Project
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

