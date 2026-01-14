import { ReactNode } from "react"

interface SectionLayoutProps {
  width: string
  children: ReactNode
}

/**
 * Section Layout Component
 * Optimized layout structure for horizontal scroll sections on desktop
 * Fully responsive vertical scroll on mobile
 */
export function SectionLayout({ width, children }: SectionLayoutProps) {
  return (
    <section
      className="horizontal-section min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden"
      style={width === 'auto' ? {} : { width }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 border-r border-white/10" />

      <div className="relative z-10 h-full w-full px-4 py-8 md:px-8 md:py-12">
        {children}
      </div>
    </section>
  )
}

