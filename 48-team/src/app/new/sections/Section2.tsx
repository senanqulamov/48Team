import { SectionLayout } from "../components/SectionLayout"
import { AboutSection } from "../components"
import { THEME_CONFIG } from "../config/theme.config"

interface SectionProps {
  width: string
}

/**
 * Section 2 Component - About Me
 */
export function Section2({ width }: SectionProps) {
  const gradient = THEME_CONFIG.sectionColors.section2.gradient

  return (
    <SectionLayout width={width} gradient={gradient}>
      <AboutSection />
    </SectionLayout>
  )
}

