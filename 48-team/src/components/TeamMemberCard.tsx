"use client"

import { motion, Variants } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as React from "react"

export type SocialLinks = {
  github?: string
  linkedin?: string
  twitter?: string
}

export type TeamMember = {
  name: string
  role: string
  description: string
  avatar?: string
  social?: SocialLinks
}

export type TeamMemberCardProps = {
  member: TeamMember
  className?: string
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  const initials = React.useMemo(() => {
    return member.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }, [member.name])

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.6 }}
      className={cn(
        "group rounded-2xl border border-border bg-card/80 shadow-md backdrop-blur-md",
        "hover:shadow-lg hover:shadow-primary/20 hover:ring-1 hover:ring-primary/30",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col items-center p-6 text-center">
        <div className="mb-4">
          <Avatar className="size-20 border border-border shadow-sm">
            {member.avatar ? (
              <AvatarImage src={member.avatar} alt={member.name} />
            ) : (
              <AvatarImage src="/placeholder-user.jpg" alt={member.name} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>

        <p
          className="mt-3 text-sm leading-relaxed text-muted-foreground/90 line-clamp-3"
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {member.description}
        </p>

        <TooltipProvider>
          <div className="mt-5 flex items-center gap-2">
            {member.social?.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    aria-label={`${member.name} GitHub`}
                  >
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            )}
            {member.social?.linkedin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            )}
            {member.social?.twitter && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    aria-label={`${member.name} Twitter`}
                  >
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <TwitterXIcon className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Twitter</TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  )
}

export default TeamMemberCard

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.515 2.865 8.342 6.839 9.694.5.094.682-.219.682-.486 0-.24-.009-.876-.014-1.72-2.782.617-3.369-1.37-3.369-1.37-.455-1.175-1.11-1.488-1.11-1.488-.908-.637.069-.624.069-.624 1.004.072 1.531 1.05 1.531 1.05.892 1.56 2.341 1.11 2.91.849.091-.66.35-1.11.636-1.366-2.221-.256-4.555-1.138-4.555-5.066 0-1.118.387-2.033 1.023-2.75-.103-.257-.444-1.29.097-2.687 0 0 .837-.27 2.742 1.05A9.34 9.34 0 0 1 12 6.84c.848.004 1.703.117 2.5.344 1.903-1.32 2.739-1.05 2.739-1.05.543 1.397.201 2.43.099 2.687.639.717 1.022 1.632 1.022 2.75 0 3.94-2.337 4.807-4.566 5.058.359.315.678.935.678 1.885 0 1.36-.012 2.456-.012 2.788 0 .27.18.585.688.485C19.138 20.592 22 16.765 22 12.253 22 6.588 17.522 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3H5C3.895 3 3 3.895 3 5v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2Zm-9.846 15H6.308V10h2.846v8ZM7.577 8.923a1.654 1.654 0 1 1 0-3.308 1.654 1.654 0 0 1 0 3.308ZM19 18h-2.846v-4.308c0-1.028-.018-2.351-1.432-2.351-1.433 0-1.653 1.12-1.653 2.276V18h-2.846V10h2.731v1.094h.039c.38-.72 1.307-1.482 2.692-1.482 2.88 0 3.415 1.895 3.415 4.359V18Z" />
    </svg>
  )
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21l-6.46 7.381L22 22h-6.828l-4.77-6.23L4.88 22H2.12l6.92-7.912L2 2h6.984l4.297 5.67L18.244 2Zm-2.392 18h2.064L8.24 4H6.06l9.792 16Z" />
    </svg>
  )
}
