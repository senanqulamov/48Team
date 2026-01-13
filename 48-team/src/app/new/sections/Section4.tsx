import { SectionLayout } from "../components/SectionLayout"
import { SECTION_CONFIG } from "../config/sections.config"
import { THEME_CONFIG } from "../config/theme.config"

interface SectionProps {
  width: string
}

/**
 * Section 4 Component
 * Customize content here while maintaining consistent layout
 */
export function Section4({ width }: SectionProps) {
  const { title, subtitle } = SECTION_CONFIG.typography
  const gradient = THEME_CONFIG.sectionColors.section4.gradient

  return (
    <SectionLayout width={width} gradient={gradient}>
      <h1 className={`text-${title.size} font-${title.weight} text-${title.color} ${title.shadow}`}>
        Section 4
      </h1>
      <p className={`text-${subtitle.size} text-${subtitle.color}`} style={{ marginTop: subtitle.marginTop }}>
        Width: {width}
      </p>
      {/* Add your custom content here */}
    </SectionLayout>
  )
}

