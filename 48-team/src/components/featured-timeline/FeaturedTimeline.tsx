"use client"

import React from "react"
import { getFeaturedProjects } from "@/data/projects"
import type { Project } from "@/types/project"
import { trackEvent } from "@/lib/analytics"
import TimelineItem from "./TimelineItem"
import TimelineMarker from "./TimelineMarker"
import CaseStudyPanel from "./CaseStudyPanel"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Laptop } from "lucide-react"

function opposite(side: "left" | "right"): "left" | "right" {
  return side === "left" ? "right" : "left"
}

export default function FeaturedTimeline({ projects }: { projects?: Project[] }) {
  const items = React.useMemo(() => {
    const base = projects ?? getFeaturedProjects()
    return base
      .filter((p) => p.featured)
      .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
  }, [projects])

  const [selected, setSelected] = React.useState<Project | null>(null)
  const [open, setOpen] = React.useState(false)
  const [fromSide, setFromSide] = React.useState<"left" | "right">("right")

  // Pagination: show up to 5 initially, then reveal more on demand
  const [showCount, setShowCount] = React.useState(5)
  const visibleItems = items.slice(0, showCount)
  const canShowMore = items.length > showCount
  const showMore = () => setShowCount((c) => Math.min(items.length, c + 5))

  // Deep-linking: ?project=ID or #project-ID
  React.useEffect(() => {
    if (typeof window === "undefined" || open || selected) return
    const url = new URL(window.location.href)
    const qId = url.searchParams.get("project")
    const hash = url.hash?.replace(/^#/, "")
    const hashMatch = hash?.startsWith("project-") ? hash.split("project-")[1] : undefined
    const idRaw = qId ?? hashMatch
    const id = idRaw ? Number(idRaw) : undefined
    if (!id) return
    const idx = items.findIndex((p) => p.id === id)
    if (idx === -1) return
    const proj = items[idx]
    const side: "left" | "right" = idx % 2 === 0 ? "left" : "right"
    setSelected(proj)
    setFromSide(opposite(side))
    setOpen(true)
  }, [items, open, selected])

  const openProject = React.useCallback((p: Project, side: "left" | "right") => {
    setSelected(p)
    setFromSide(opposite(side))
    setOpen(true)
    try {
      trackEvent("project_view_timeline", { projectId: p.id, source: "featured-timeline" })
    } catch {}
  }, [])

  // Restore focus to the trigger button
  const lastTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const onOpenFromButton = (btn: HTMLButtonElement | null, p: Project, side: "left" | "right") => {
    if (btn) lastTriggerRef.current = btn
    openProject(p, side)
  }

  const onClose = () => {
    setOpen(false)
    setSelected(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  // Scroll indicator refs and transforms (must be called on every render)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.9", "end 0.1"] })
  // Smooth using a spring mapped from scroll progress
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.25 })
  const topPct = useTransform(springProgress, (v) => `calc(${Math.min(98, Math.max(2, v * 100))}% - 14px)`)
  const dotOpacity = useTransform(springProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const dotScale = useTransform(springProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.9])
  const trailHeight = useTransform(springProgress, (v) => `${Math.min(98, Math.max(0, v * 100))}%`)

  if (!items.length) return null

  return (
    <section aria-labelledby="featured-timeline-title" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-10 md:mb-14">
          <h2 id="featured-timeline-title" className="text-3xl md:text-5xl font-bold font-display">
            Featured Projects Timeline
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto">
            A curated set of highlights. Click any card to see the full case study.
          </p>
        </div>

        {/* Center vertical line with animated indicator */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" aria-hidden="true" />

          {/* Green trail that grows along the line */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-emerald-500 via-emerald-400 to-transparent"
            style={{ top: 0, height: trailHeight, opacity: dotOpacity }}
            aria-hidden="true"
          />

          {/* Animated green laptop dot */}
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center"
            style={{ top: topPct, opacity: dotOpacity, scale: dotScale }}
            aria-hidden="true"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)] flex items-center justify-center">
              <Laptop className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          <ol className="space-y-10 md:space-y-16">
            {visibleItems.map((p, idx) => {
              const side: "left" | "right" = idx % 2 === 0 ? "left" : "right"
              return (
                <li key={p.id} id={`project-${p.id}`} className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-stretch">
                    {side === "left" ? (
                      <>
                        <div className="md:pr-12 order-1">
                          <TimelineItem
                            project={p}
                            side={side}
                            onOpenAction={(btn) => onOpenFromButton(btn, p, side)}
                          />
                        </div>
                        <div className="hidden md:flex items-center justify-center order-2">
                          <TimelineMarker year={p.yearRange ?? p.date ?? ""} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:flex items-center justify-center order-1">
                          <TimelineMarker year={p.yearRange ?? p.date ?? ""} />
                        </div>
                        <div className="md:pl-12 order-2">
                          <TimelineItem
                            project={p}
                            side={side}
                            onOpenAction={(btn) => onOpenFromButton(btn, p, side)}
                          />
                        </div>
                      </>
                    )}

                    {/* Mobile marker below card */}
                    <div className="md:hidden mt-4 flex items-center justify-center order-3">
                      <TimelineMarker year={p.yearRange ?? p.date ?? ""} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {canShowMore && (
            <div className="mt-10 md:mt-14 flex justify-center">
              <button
                type="button"
                onClick={showMore}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Load more featured projects"
              >
                See more
              </button>
            </div>
          )}
        </div>
      </div>

      <CaseStudyPanel open={open} onCloseAction={onClose} project={selected} from={fromSide} />
    </section>
  )
}
