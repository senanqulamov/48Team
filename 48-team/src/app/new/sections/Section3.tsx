import { SectionLayout } from "../components/SectionLayout"
import { SkillsSection } from "../components"
import { THEME_CONFIG } from "../config/theme.config"

interface SectionProps {
  width: string
}

/**
 * Section 3 Component - Skills & Expertise
 */
export function Section3({ width }: SectionProps) {
  const gradient = THEME_CONFIG.sectionColors.section3.gradient

  return (
    <SectionLayout width={width} gradient={gradient}>
      <SkillsSection />
    </SectionLayout>
  )
}

