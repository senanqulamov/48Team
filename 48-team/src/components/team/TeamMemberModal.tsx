"use client"

import * as React from "react"
import Image from "next/image"
import ProjectModal, { useProjectModalClose } from "@/components/featured-timeline/ProjectModal"
import type { TeamMemberProfile } from "@/data/teamData"

function ModalHeaderCloseButton({ fallback }: { fallback: () => void }) {
  const ctx = useProjectModalClose()
  return (
    <button
      type="button"
      className="ml-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground/90 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
      onClick={() => (ctx?.requestClose ? ctx.requestClose() : fallback())}
      aria-label="Close team member details"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  )
}

export default function TeamMemberModal({
  open,
  onCloseAction,
  member,
  from = "right",
}: {
  open: boolean
  onCloseAction: () => void
  member: TeamMemberProfile | null
  from?: "left" | "right"
}) {
  const isOpen = Boolean(open && member)
  const titleId = member ? `team-member-title-${member.name.replace(/\s+/g, "-").toLowerCase()}` : undefined

  return (
    <ProjectModal open={isOpen} onCloseAction={onCloseAction} from={from} labelledBy={titleId}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-8 py-4 bg-background/70 border-b border-primary/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="min-w-0">
            <h2 id={titleId} className="text-2xl md:text-3xl font-bold truncate">{member?.name}</h2>
            <p className="text-sm text-muted-foreground truncate">{member?.role}</p>
          </div>
          <ModalHeaderCloseButton fallback={onCloseAction} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-8 py-6 space-y-6" style={{ touchAction: "pan-y" }}>
          {/* Top: Large profile image */}
          {member?.image && (
            <div className="rounded-2xl border border-primary/10 bg-background/60 p-2 shadow-sm">
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl">
                <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
              </div>
            </div>
          )}

          {/* Right/bottom sections */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* About */}
            <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">About</h3>
              {member?.about?.length ? (
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  {member.about.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-foreground/90">—</p>
              )}
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Skills</h3>
              {member?.skills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-sm bg-muted/60 border border-primary/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-foreground/90">—</p>
              )}
            </div>
          </section>

          {/* Projects */}
          <section className="rounded-2xl border border-primary/10 bg-background/60 p-5 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Projects</h3>
            {member?.projects?.length ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.projects.map((p) => (
                  <li key={p.title} className="rounded-xl bg-muted/40 p-4 border border-primary/10">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{p.description}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground/90">—</p>
            )}
          </section>
        </div>
      </div>
    </ProjectModal>
  )
}
