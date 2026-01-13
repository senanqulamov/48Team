import { SectionLayout } from "../components/SectionLayout"
import { HeroIntro } from "../components"

interface SectionProps {
  width: string
}

/**
 * Section 1 Component - Hero Introduction
 */
export function Section1({ width }: SectionProps) {
  return (
    <SectionLayout width={width}>
      <HeroIntro />
    </SectionLayout>
  )
}

