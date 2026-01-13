import { Section1, Section2, Section3, Section4 } from "../sections"
import { SECTION_CONFIG } from "../config"
import { RefObject } from "react"

interface SectionsContainerProps {
  containerRef: RefObject<HTMLDivElement | null>
}

/**
 * Sections Container Component
 * Renders all sections based on configuration
 */
export function SectionsContainer({ containerRef }: SectionsContainerProps) {
  const { sections, widths } = SECTION_CONFIG

  // Map section components
  const sectionComponents = {
    Section1,
    Section2,
    Section3,
    Section4,
  }

  return (
    <div ref={containerRef} className="horizontal-container h-screen">
      <div className="flex h-full">
        {sections.map((section) => {
          const SectionComponent = sectionComponents[section.component]
          const width = widths[section.width]

          return <SectionComponent key={section.id} width={width} />
        })}
      </div>
    </div>
  )
}

