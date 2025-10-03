"use client"

import React from "react"
import { getFeaturedProjects } from "@/data/projects"
import type { Project } from "@/types/project"
import { trackEvent } from "@/lib/analytics"
import TimelineItem from "./TimelineItem"
import TimelineMarker from "./TimelineMarker"
import CaseStudyPanel from "./CaseStudyPanel"

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

  if (!items.length) return null

  return (
    <section aria-labelledby="featured-timeline-title" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="featured-timeline-title" className="text-3xl md:text-5xl font-bold font-display">
            Featured Projects Timeline
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto">
            A curated set of highlights. Click any card to see the full case study.
          </p>
        </div>

        {/* Center vertical line */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden="true" />

          <ol className="space-y-10 md:space-y-16">
            {items.map((p, idx) => {
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
        </div>
      </div>

      <CaseStudyPanel open={open} onCloseAction={onClose} project={selected} from={fromSide} />
    </section>
  )
}
