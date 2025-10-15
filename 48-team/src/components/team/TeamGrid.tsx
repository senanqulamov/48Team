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

  return (
    <section aria-labelledby="team-grid-title" className="py-12 md:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16 relative z-10"
            >
              <h1 ref={titleRef} id="featured-timeline-title" className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {title}
                  </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full pb-12"
        >
          {members.map((m) => {
            const layoutId = layoutIds.get(m.name) || m.name
            return (
              <li key={`${m.name}-${m.role}`} className="list-none w-full">
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
