import { SectionLayout } from "../components/SectionLayout"
import { AboutSection } from "../components"

interface SectionProps {
  width: string
}

/**
 * Section 2 Component - About Me
 */
export function Section2({ width }: SectionProps) {
  return (
    <SectionLayout width={width}>
      <AboutSection />
    </SectionLayout>
  )
}

