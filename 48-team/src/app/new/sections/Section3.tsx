import { SectionLayout } from "../components/SectionLayout"
import { SkillsSection } from "../components"

interface SectionProps {
  width: string
}

/**
 * Section 3 Component - Skills & Expertise
 */
export function Section3({ width }: SectionProps) {
  return (
    <SectionLayout width={width}>
      <SkillsSection />
    </SectionLayout>
  )
}

