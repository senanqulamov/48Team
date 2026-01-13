import { THEME_CONFIG } from "../config/theme.config"
import { SECTION_CONFIG } from "../config/sections.config"

interface ProgressIndicatorProps {
  activeSection: number
}

/**
 * Progress Indicator Component
 * Shows current section position in horizontal scroll
 */
export function ProgressIndicator({ activeSection }: ProgressIndicatorProps) {
  const { position, active, inactive, height, gap } = THEME_CONFIG.progressIndicator
  const totalSections = SECTION_CONFIG.sections.length

  return (
    <div className={`${position} flex ${gap}`}>
      {Array.from({ length: totalSections }).map((_, index) => (
        <div
          key={index}
          className={`${height} rounded-full transition-all duration-300 ${
            activeSection === index
              ? `${active.bg} ${active.width}`
              : `${inactive.bg} ${inactive.width}`
          }`}
        />
      ))}
    </div>
  )
}

