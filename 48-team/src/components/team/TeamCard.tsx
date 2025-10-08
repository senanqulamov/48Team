"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { TeamMemberProfile } from "@/data/teamData"

export type TeamCardProps = {
  member: TeamMemberProfile
  className?: string
  onOpen?: (member: TeamMemberProfile) => void
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function TeamCard({ member, className, onOpen }: TeamCardProps) {
  const open = React.useCallback(() => onOpen?.(member), [member, onOpen])

  const onIconClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation()
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.7 }}
      className={cn(
        "group relative rounded-2xl border border-border bg-card/80 shadow-md backdrop-blur-md",
        "hover:shadow-lg hover:shadow-primary/20 hover:ring-1 hover:ring-primary/30",
        "transition-all duration-300 cursor-pointer",
        className
      )}
      onClick={open}
      role="button"
      aria-label={`Open details for ${member.name}`}
    >
      <div className="p-4">
        {/* Image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src={member.image || "/placeholder-user.jpg"}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Name/Role */}
        <div className="mt-3">
          <div className="text-base md:text-lg font-semibold leading-tight tracking-tight">{member.name}</div>
          <div className="text-sm text-muted-foreground">{member.role}</div>
        </div>

        {/* Socials bottom-right */}
        <TooltipProvider>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            {member.socials?.linkedin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary/10">
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={onIconClick} aria-label={`${member.name} on LinkedIn`}>
                      <LinkedInIcon className="size-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            )}
            {member.socials?.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary/10">
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" onClick={onIconClick} aria-label={`${member.name} on GitHub`}>
                      <GitHubIcon className="size-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            )}
            {member.socials?.email && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary/10">
                    <a href={member.socials.email} onClick={onIconClick} aria-label={`Email ${member.name}`}>
                      <MailIcon className="size-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Email</TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.515 2.865 8.342 6.839 9.694.5.094.682-.219.682-.486 0-.24-.009-.876-.014-1.72-2.782.617-3.369-1.37-3.369-1.37-.455-1.175-1.11-1.488-1.11-1.488-.908-.637.069-.624.069-.624 1.004.072 1.531 1.05 1.531 1.05.892 1.56 2.341 1.11 2.91.849.091-.66.35-1.11.636-1.366-2.221-.256-4.555-1.138-4.555-5.066 0-1.118.387-2.033 1.023-2.75-.103-.257-.444-1.29.097-2.687 0 0 .837-.27 2.742 1.05A9.34 9.34 0 0 1 12 6.84c.848.004 1.703.117 2.5.344 1.903-1.32 2.739-1.05 2.739-1.05.543 1.397.201 2.43.099 2.687.639.717 1.022 1.632 1.022 2.75 0 3.94-2.337 4.807-4.566 5.058.359.315.678.935.678 1.885 0 1.36-.012 2.456-.012 2.788 0 .27.18.585.688.485C19.138 20.592 22 16.765 22 12.253 22 6.588 17.522 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3H5C3.895 3 3 3.895 3 5v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2Zm-9.846 15H6.308V10h2.846v8ZM7.577 8.923a1.654 1.654 0 1 1 0-3.308 1.654 1.654 0 0 1 0 3.308ZM19 18h-2.846v-4.308c0-1.028-.018-2.351-1.432-2.351-1.433 0-1.653 1.12-1.653 2.276V18h-2.846V10h2.731v1.094h.039c.38-.72 1.307-1.482 2.692-1.482 2.88 0 3.415 1.895 3.415 4.359V18Z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.236l7.4 5.55a1 1 0 0 0 1.2 0L20 8.236V18H4Z" />
    </svg>
  )
}

