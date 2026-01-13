import { ReactNode } from "react"

interface SectionLayoutProps {
  width: string
  children: ReactNode
}

/**
 * Section Layout Component
 * Optimized layout structure for horizontal scroll sections
 */
export function SectionLayout({ width, children }: SectionLayoutProps) {
  return (
    <section
      className="horizontal-section h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden"
      style={{ width }}
    >
      {/* Simple black background with opacity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle section border */}
      <div className="absolute inset-0 border-r border-white/10" />

      {/* Content container */}
      <div className="relative z-10 w-full h-full px-8 py-12">
        {children}
      </div>
    </section>
  )
}

