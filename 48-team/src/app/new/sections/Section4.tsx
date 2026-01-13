import { SECTION_CONFIG } from "../config/sections.config"
import { THEME_CONFIG } from "../config/theme.config"

interface SectionProps {
  width: string
}

/**
 * Section 4 Component - Vertical Scroll Section
 * This section scrolls vertically within the page flow
 */
export function Section4({ width }: SectionProps) {
  const { title, subtitle } = SECTION_CONFIG.typography
  const gradient = THEME_CONFIG.sectionColors.section4.gradient

  return (
    <div
      className="w-full h-full relative"
      style={{ width }}
    >
      {/* Simple black background with opacity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Border */}
      <div className="absolute inset-0 border-r border-white/10" />

      {/* Content - this will scroll naturally within the 300vh parent */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 py-16">
        <h1 className={`text-${title.size} font-${title.weight} text-${title.color} ${title.shadow} mb-4`}>
          Section 4
        </h1>
        <p className={`text-${subtitle.size} text-${subtitle.color} text-center`} style={{ marginTop: subtitle.marginTop }}>
          Vertical Scroll Section
        </p>
        <p className="text-xl text-teal-100/80 text-center max-w-2xl mt-8">
          This section scrolls vertically. Keep scrolling down to continue.
        </p>
      </div>
    </div>
  )
}

