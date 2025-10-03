"use client"

import React from "react"
import type { Project, ImageItem, TechItem, MetricItem } from "@/types/project"
import ProjectGallery from "./ProjectGallery"
import TechIconsRow from "./TechIconsRow"
import CTAButtons from "./CTAButtons"
import ProjectModal from "./ProjectModal"

function coalesceScreenshots(p: Project): ImageItem[] | undefined {
  if (p.screenshots?.length) return p.screenshots
  if (p.gallery?.length) return p.gallery
  if (p.images?.length) return p.images.map((src) => ({ src, alt: p.title }))
  return undefined
}

function coalesceTechStack(p: Project): TechItem[] | undefined {
  if (p.techStack?.length) return p.techStack
  const tags = p.techTags?.length ? p.techTags : p.technologies
  if (!tags?.length) return undefined
  return tags.map((name) => ({ name }))
}

function coalesceLinks(p: Project): { demoUrl?: string; githubUrl?: string } {
  return {
    demoUrl: p.demoUrl ?? p.links?.demo,
    githubUrl: p.githubUrl ?? p.links?.github,
  }
}

export default function CaseStudyPanel({
  open,
  onCloseAction,
  project,
  from,
}: {
  open: boolean
  onCloseAction: () => void
  project: Project | null
  from: "left" | "right"
}) {
  const titleId = project ? `case-study-title-${project.id}` : undefined
  const screenshots = project ? coalesceScreenshots(project) : undefined
  const techStack = project ? coalesceTechStack(project) : undefined
  const links: { demoUrl?: string; githubUrl?: string } | undefined = project ? coalesceLinks(project) : undefined
  const isOpen = Boolean(open && project)

  return (
    <ProjectModal open={isOpen} onCloseAction={onCloseAction} from={from} labelledBy={titleId}>
      {/* Panel Shell: make full-height and internal scroll only */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-8 py-4 bg-background/70 border-b border-primary/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="min-w-0">
            <h2 id={titleId} className="text-2xl md:text-3xl font-bold truncate">{project?.title}</h2>
            <p className="text-sm text-muted-foreground truncate">
              {(project?.client ?? project?.subtitle) || ""}
              {project?.yearRange ? ` • ${project.yearRange}` : project?.date ? ` • ${project.date}` : ""}
            </p>
          </div>
          <button
            type="button"
            className="ml-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground/90 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            onClick={onCloseAction}
            aria-label="Close case study"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-8 py-6 space-y-6" style={{ touchAction: "pan-y" }}>
          {/* Problem / Solution / Impact */}
          {(project?.problem || project?.solution || project?.impact) && (
            <section aria-labelledby="psi-title" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
                <h3 id="psi-title" className="text-xl font-bold mb-2">Problem</h3>
                <p className="text-foreground/90 whitespace-pre-line">{project?.problem ?? "—"}</p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Solution</h3>
                <p className="text-foreground/90 whitespace-pre-line">{project?.solution ?? "—"}</p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Impact</h3>
                <p className="text-foreground/90 whitespace-pre-line">{project?.impact ?? "—"}</p>
              </div>
            </section>
          )}

          {/* Role */}
          {project?.role && (
            <section className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Role</h3>
              <p className="text-foreground/90 whitespace-pre-line">{project.role}</p>
            </section>
          )}

          {/* Metrics */}
          {project?.metrics?.length ? (
            <section className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Key Metrics</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.metrics.map((m: MetricItem) => (
                  <li key={m.label} className="rounded-xl bg-muted/40 p-3 border border-primary/10">
                    <div className="text-sm text-muted-foreground">{m.label}</div>
                    <div className="text-xl font-bold">{m.value}</div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Gallery */}
          {screenshots?.length ? (
            <ProjectGallery items={screenshots} />
          ) : null}

          {/* Tech & Tools */}
          {techStack?.length ? (
            <TechIconsRow items={techStack} />
          ) : null}

          {/* CTAs */}
          <CTAButtons demoUrl={links?.demoUrl} githubUrl={links?.githubUrl} />

          {/* Personal Note */}
          {project?.personalNote && (
            <section className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Personal Note</h3>
              <p className="text-foreground/90 whitespace-pre-line">{project.personalNote}</p>
            </section>
          )}
        </div>
      </div>
    </ProjectModal>
  )
}
