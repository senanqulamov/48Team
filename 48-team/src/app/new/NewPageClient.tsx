"use client"

import { FixedBackground, ProgressIndicator, SectionsContainer } from "./components"
import { useHorizontalScroll } from "./hooks"
import "./styles/horizontal-scroll.css"

/**
 * New Page Client Component
 * Main entry point for horizontal scroll page
 *
 * Architecture:
 * - config/: Global configuration for sections, scroll, and theme
 * - components/: Reusable UI components
 * - sections/: Individual section components
 * - hooks/: Custom React hooks
 * - styles/: CSS files
 *
 * To customize:
 * 1. Modify config files for global settings
 * 2. Edit section components for content
 * 3. Adjust styles in horizontal-scroll.css
 */
export default function NewPageClient() {
  const { containerRef, horizontalRef, activeSection } = useHorizontalScroll()

  return (
    <div ref={containerRef} className="relative h-screen overflow-x-auto overflow-y-hidden">
      <FixedBackground />
      <ProgressIndicator activeSection={activeSection} />
      <SectionsContainer containerRef={horizontalRef} />
    </div>
  )
}
