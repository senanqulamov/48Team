"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Calendar, Sparkles, Laptop } from "lucide-react"
import Image from "next/image"
import { projects } from "@/lib/projects"
import type { Project } from "@/types/project"

/**
 * Vertical Project Timeline similar to FeaturedTimeline
 * With alternating left/right cards and center animated line
 */

interface ProjectCardProps {
  project: Project
  side: "left" | "right"
  index: number
}

const ProjectCard = ({ project, side, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const techs = project.techTags || project.technologies || []

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -50 : 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border border-white/20 bg-black/50 backdrop-blur-sm p-5 md:p-6 shadow-lg hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-500 ${
        side === "left" ? "md:mr-0" : "md:ml-0"
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl transition-opacity duration-500 ${
        hovered ? "opacity-100" : "opacity-0"
      }`} />

      {/* Image section */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="relative h-40 md:h-52">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          )}
          <Image
            src={project.image || project.images?.[0] || "/placeholder.jpg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } ${hovered ? "scale-105" : "scale-100"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Shimmer effect */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}

          {/* Status badge */}
          {project.status && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === "Active" || project.status === "Completed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}>
                {project.status}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-cyan-400">
          <Calendar className="w-4 h-4" />
          <span>{project.date || project.yearRange}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {project.client || project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base line-clamp-3">
          {project.shortDescription || project.description}
        </p>

        {/* Tech tags */}
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techs.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 font-medium"
              >
                {tech}
              </span>
            ))}
            {techs.length > 5 && (
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                +{techs.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="text-xs text-gray-400"
                >
                  • {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2 pt-2">
          {project.demoUrl && project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
          {project.links?.github && project.links.github !== "#" && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const TimelineMarker = ({ year }: { year: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-7 h-7 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 border-4 border-background z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      <p className="mt-2 text-sm font-medium text-cyan-400">{year}</p>
    </div>
  )
}

export default function ProjectShowcaseTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  })

  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.25 })
  const topPct = useTransform(springProgress, (v) => `calc(${Math.min(98, Math.max(2, v * 100))}% - 14px)`)
  const dotOpacity = useTransform(springProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const dotScale = useTransform(springProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.9])
  const trailHeight = useTransform(springProgress, (v) => `${Math.min(98, Math.max(0, v * 100))}%`)

  // Get all featured projects
  const featuredProjects = projects
    .filter(p => p.featured)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999))

  return (
    <div className="w-full min-h-screen py-12 md:py-16 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Project Timeline
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          A curated showcase of featured projects with cutting-edge technologies
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="relative">
          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

          {/* Animated trail */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-transparent"
            style={{ top: 0, height: trailHeight, opacity: dotOpacity }}
          />

          {/* Animated laptop dot */}
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center"
            style={{ top: topPct, opacity: dotOpacity, scale: dotScale }}
          >
            <div className="w-7 h-7 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.25)] flex items-center justify-center">
              <Laptop className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Project cards */}
          <div className="space-y-10 md:space-y-16">
            {featuredProjects.map((project, idx) => {
              const side: "left" | "right" = idx % 2 === 0 ? "left" : "right"
              return (
                <div key={project.id} className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center">
                    {side === "left" ? (
                      <>
                        <div className="md:pr-12 order-1">
                          <ProjectCard project={project} side={side} index={idx} />
                        </div>
                        <div className="hidden md:flex items-center justify-center order-2">
                          <TimelineMarker year={project.yearRange || project.date || ""} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:flex items-center justify-center order-1">
                          <TimelineMarker year={project.yearRange || project.date || ""} />
                        </div>
                        <div className="md:pl-12 order-2">
                          <ProjectCard project={project} side={side} index={idx} />
                        </div>
                      </>
                    )}

                    {/* Mobile marker */}
                    <div className="md:hidden mt-4 flex items-center justify-center order-3">
                      <TimelineMarker year={project.yearRange || project.date || ""} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12 md:mt-16"
      >
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
        >
          View All Projects
          <ExternalLink className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  )
}

