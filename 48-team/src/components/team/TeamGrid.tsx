"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import TeamCard from "@/components/team/TeamCard"
import TeamMemberModal from "@/components/ui/TeamMemberModal"
import { useTeamMemberRoute } from "@/hooks/useTeamMemberRoute"
import type { TeamMemberProfile } from "@/data/teamData"

export type TeamGridProps = {
  members: TeamMemberProfile[]
  title?: string
  subtitle?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export default function TeamGrid({ members, title = "The -48- Team", subtitle }: TeamGridProps) {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null)
  const {
    slug: memberSlug,
    selected,
    open: openMember,
    close: closeMember,
  } = useTeamMemberRoute({ members })

  // Precompute layout ids for cards (stable memo)
  const layoutIds = React.useMemo(() => new Map(members.map(m => [m.name, m.name])), [members])

  const open = Boolean(memberSlug)

  const handleExited = React.useCallback(() => {
    // No extra clearing logic required; hook manages invalid state cleanup.
  }, [])

  return (
    <section aria-labelledby="team-grid-title" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="relative overflow-hidden md:overflow-visible pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10"
            >
              <h1 ref={titleRef} id="featured-timeline-title" className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {title}
                  </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {members.map((m) => {
            const layoutId = layoutIds.get(m.name) || m.name
            return (
              <li key={`${m.name}-${m.role}`} className="list-none">
                <TeamCard member={m} onOpen={openMember} layoutId={layoutId} />
              </li>
            )
          })}
        </motion.ul>
      </div>

      <TeamMemberModal
        open={open}
        onCloseAction={closeMember}
        member={selected}
        modalId={memberSlug || undefined}
      />
    </section>
  )
}
