"use client"

import React from "react"
import Image from "next/image"
import type { Project } from "@/types/project"
import { motion, AnimatePresence } from "framer-motion"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

export interface TimelineItemProps {
  project: Project
  side: "left" | "right"
  onOpenAction: (triggerButton: HTMLButtonElement | null) => void
}

export default function TimelineItem({ project, side, onOpenAction }: TimelineItemProps) {
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const techs = project.techTags ?? project.technologies ?? []
  const [hovered, setHovered] = React.useState(false)

  const open = () => onOpenAction(btnRef.current)
  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      open()
    }
  }

  return (
    <article
      role="article"
      aria-labelledby={`tl-title-${project.id}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group/canvas-card relative rounded-2xl border border-primary/20 bg-card/50 p-5 md:p-6 shadow-sm backdrop-blur-sm overflow-hidden transition-colors ${
        side === "left" ? "md:ml-0" : "md:mr-0"
      }`}
    >
      {/* Canvas overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="canvas-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            <CanvasRevealEffect
              animationSpeed={3.0}
              containerClassName="h-full w-full bg-background/40 dark:bg-background/30"
              colors={[[255,115,179],[110,110,255],[56,189,248]]}
              dotSize={3}
              showGradient={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-background/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <motion.button
                  ref={btnRef}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={`See full project ${project.title}`}
                  onClick={open}
                  whileTap={{ scale: 0.97 }}
                >
                  See full project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image section */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative h-40 md:h-52 rounded-xl overflow-hidden">
          <Image
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`object-cover transition-all duration-500 ${hovered ? "scale-105 opacity-0" : "opacity-100"}`}
            priority={false}
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`} />
        </div>
      </div>

      {/* Content (hidden on hover) */}
      <div className={`mt-4 transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <h3 id={`tl-title-${project.id}`} className="text-xl md:text-2xl font-bold">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {project.client || project.subtitle} {project.yearRange ? `• ${project.yearRange}` : project.date ? `• ${project.date}` : ""}
        </p>
        <p className="mt-3 text-foreground/90">
          {project.shortDescription || project.description}
        </p>

        {techs.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
            {techs.slice(0, 6).map((t) => (
              <li key={`${project.id}-${t}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold" title={t}>
                  {t}
                </span>
              </li>
            ))}
            {techs.length > 6 && (
              <li>
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  +{techs.length - 6} more
                </span>
              </li>
            )}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-between">
          {project.status && (
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-muted/40 text-muted-foreground">
              {project.status}
            </span>
          )}
          <motion.button
            ref={btnRef}
            type="button"
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            aria-label={`See full project ${project.title}`}
            aria-haspopup="dialog"
            onClick={open}
            whileTap={{ scale: 0.98 }}
          >
            See full project
          </motion.button>
        </div>
      </div>
    </article>
  )
}
