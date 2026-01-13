import { ProjectShowcaseTimeline } from "../components"

interface SectionProps {
  width: string
}

/**
 * Section 4 Component - Project Showcase Timeline
 * Features iPhone 17-inspired lazy loading and smooth animations
 */
export function Section4({ width }: SectionProps) {
  return (
    <div
      className="w-full min-h-screen relative"
      style={{ width }}
    >
      {/* Simple black background with opacity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Border */}
      <div className="absolute inset-0 border-r border-white/10" />

      {/* Project Showcase Timeline */}
      <div className="relative z-10 w-full">
        <ProjectShowcaseTimeline />
      </div>
    </div>
  )
}

