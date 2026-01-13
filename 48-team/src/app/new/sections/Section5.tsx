import { SectionLayout } from "../components/SectionLayout"
import { SECTION_CONFIG } from "../config/sections.config"

interface SectionProps {
  width: string
}

/**
 * Section 5 Component
 * Customize content here while maintaining consistent layout
 */
export function Section5({ width }: SectionProps) {
  const { title, subtitle } = SECTION_CONFIG.typography

  return (
    <SectionLayout width={width}>
      <h1 className={`text-${title.size} font-${title.weight} text-${title.color} ${title.shadow}`}>
        Section 5
      </h1>
      <p className={`text-${subtitle.size} text-${subtitle.color}`} style={{ marginTop: subtitle.marginTop }}>
        Width: {width}
      </p>
      {/* Add your custom content here */}
    </SectionLayout>
  )
}

