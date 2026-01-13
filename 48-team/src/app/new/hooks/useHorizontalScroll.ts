import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { LENIS_CONFIG, GSAP_CONFIG } from "../config/scroll.config"
import { SECTION_CONFIG } from "../config/sections.config"

/**
 * Custom hook for horizontal scroll with Lenis
 * Handles scroll initialization, section tracking, and cleanup
 */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    if (!containerRef.current || !horizontalRef.current) return

    const sections = document.querySelectorAll<HTMLElement>(".horizontal-section")
    const horizontal = horizontalRef.current

    // Calculate total width of all sections
    const getTotalWidth = () => {
      return Array.from(sections).reduce((acc, section) => acc + section.offsetWidth, 0)
    }

    // Update container width to enable native horizontal scroll
    const updateContainerWidth = () => {
      const totalWidth = getTotalWidth()
      if (horizontal) {
        horizontal.style.width = `${totalWidth}px`
      }
    }

    updateContainerWidth()

    // Initialize Lenis with configuration
    const lenis = new Lenis({
      ...LENIS_CONFIG,
      wrapper: containerRef.current,
      content: horizontal,
    })

    // Update active section indicator based on scroll position
    const updateActiveSection = () => {
      const scrollLeft = containerRef.current?.scrollLeft || 0
      const totalWidth = getTotalWidth()
      const progress = scrollLeft / (totalWidth - window.innerWidth)
      const totalSections = SECTION_CONFIG.sections.length
      const section = Math.min(Math.floor(progress * totalSections), totalSections - 1)
      setActiveSection(Math.max(0, section))
    }

    lenis.on("scroll", updateActiveSection)

    // Request animation frame callback
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(GSAP_CONFIG.lagSmoothing)

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateContainerWidth()
        updateActiveSection()
      }, GSAP_CONFIG.resizeDebounce)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return { containerRef, horizontalRef, activeSection }
}
