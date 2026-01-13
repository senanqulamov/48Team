import { SectionLayout } from "../components/SectionLayout"
import { HeroIntro } from "../components"
import { THEME_CONFIG } from "../config/theme.config"

interface SectionProps {
  width: string
}

/**
 * Section 1 Component - Hero Introduction
 */
export function Section1({ width }: SectionProps) {
  const gradient = THEME_CONFIG.sectionColors.section1.gradient

  return (
    <SectionLayout width={width} gradient={gradient}>
      <HeroIntro />
    </SectionLayout>
  )
}

