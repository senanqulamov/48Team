"use client"

import React from "react"
import Image from "next/image"
import type { Project } from "@/types/project"
import { motion } from "framer-motion"

export interface TimelineItemProps {
  project: Project
  side: "left" | "right"
  onOpenAction: (triggerButton: HTMLButtonElement | null) => void
}

export default function TimelineItem({ project, side, onOpenAction }: TimelineItemProps) {
  const btnRef = React.useRef<HTMLButtonElement | null>(null)

  const techs = project.techTags ?? project.technologies ?? []

  return (
    <article
      role="article"
      aria-labelledby={`tl-title-${project.id}`}
      className={`relative rounded-2xl border border-primary/20 bg-card/50 p-5 md:p-6 shadow-sm backdrop-blur-sm ${
        side === "left" ? "md:ml-0" : "md:mr-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative h-40 md:h-52 rounded-xl overflow-hidden">
          <Image
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        </div>
      </div>

      <div className="mt-4">
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
            onClick={() => onOpenAction(btnRef.current)}
            whileTap={{ scale: 0.98 }}
          >
            See full project
          </motion.button>
        </div>
      </div>
    </article>
  )
}
