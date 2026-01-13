import { ReactNode } from "react"

interface SectionLayoutProps {
  width: string
  gradient: string
  children: ReactNode
}

/**
 * Section Layout Component
 * Optimized layout structure for horizontal scroll sections
 */
export function SectionLayout({ width, gradient, children }: SectionLayoutProps) {
  return (
    <section
      className="horizontal-section h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden"
      style={{ width }}
    >
      {/* Simplified gradient background (no heavy backdrop-filter) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      />

      {/* Subtle section border */}
      <div
        className="absolute inset-0 border-r border-white/10"
      />

      {/* Content container */}
      <div className="relative z-10 w-full h-full px-8 py-12">
        {children}
      </div>
    </section>
  )
}

