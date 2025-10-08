"use client"

import { motion, Variants } from "framer-motion"
import * as React from "react"
import { TeamMember, TeamMemberCard } from "@/components/TeamMemberCard"
import { cn } from "@/lib/utils"

export type TeamSectionProps = {
  teamMembers: TeamMember[]
  className?: string
  title?: string
  subtitle?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export default function TeamSection({ teamMembers, className, title = "Our Team", subtitle }: TeamSectionProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {teamMembers.map((member) => (
            <li key={member.name} className="list-none">
              <TeamMemberCard member={member} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
