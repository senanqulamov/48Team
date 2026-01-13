"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Section1, Section2, Section3, Section4, Section5 } from "./sections"
import { ProgressIndicator, FixedBackground } from "./components"
import "./styles/horizontal-scroll.css"

gsap.registerPlugin(ScrollTrigger)

// Immediate scroll to top - runs BEFORE React mounts
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/**
 * New Page Client Component
 * ARCHITECTURE: Proper vertical scroll driving horizontal translation
 */
export default function NewPageClient() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    // AGGRESSIVE scroll to top on mount - multiple approaches
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Force again in next tick
    setTimeout(() => window.scrollTo(0, 0), 0)

    // And in animation frame
    requestAnimationFrame(() => window.scrollTo(0, 0))

    // Set scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Initialize Lenis for smooth vertical scrolling
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.8,
    })

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // RAF loop
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Wait for layout to settle before creating ScrollTriggers
    const setupTimeout = setTimeout(() => {
      // HORIZONTAL TRACK 1: Sections 1, 2, 3
      const track1 = document.querySelector(".horizontal-track-1")
      const inner1 = track1?.querySelector(".horizontal-inner")
      const panels1 = track1?.querySelectorAll(".panel")

      if (track1 && inner1 && panels1) {
        const numPanels1 = panels1.length
        const scrollWidth1 = numPanels1 * window.innerWidth

        gsap.to(inner1, {
          x: -scrollWidth1 + window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: track1,
            start: "top top",
            end: () => `+=${scrollWidth1}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const panelIndex = Math.min(
                Math.floor(progress * numPanels1),
                numPanels1 - 1
              )
              setActiveSection(panelIndex)
            },
          },
        })
      }

      // Track when Section 4 (vertical) is active
      const verticalSection = document.querySelector(".vertical-section")
      if (verticalSection) {
        ScrollTrigger.create({
          trigger: verticalSection,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(3),
          onEnterBack: () => setActiveSection(3),
        })
      }

      // HORIZONTAL TRACK 2: Section 5
      const track2 = document.querySelector(".horizontal-track-2")
      const inner2 = track2?.querySelector(".horizontal-inner")

      if (track2 && inner2) {
        gsap.to(inner2, {
          x: -window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: track2,
            start: "top top",
            end: () => `+=${window.innerWidth}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
            onEnter: () => setActiveSection(4),
            onEnterBack: () => setActiveSection(4),
          },
        })
      }

      ScrollTrigger.refresh()
    }, 100)

    // Cleanup
    return () => {
      clearTimeout(setupTimeout)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return (
    <main id="lenis-root" className="relative bg-transparent text-white">
      {/* Fixed Background - z-0 */}
      <FixedBackground />

      {/* Section Progress Indicator - z-50 */}
      <div className="relative z-50">
        <ProgressIndicator activeSection={activeSection} />
      </div>

      {/* All sections - z-10 to be above background but below indicator */}
      <div className="relative z-10">
        {/* HORIZONTAL TRACK 1: Sections 1, 2, 3 */}
        <section className="horizontal-track horizontal-track-1 h-screen overflow-hidden">
          <div className="horizontal-inner flex h-full">
            <section className="panel w-screen h-full flex-shrink-0">
              <Section1 width="100vw" />
            </section>
            <section className="panel w-screen h-full flex-shrink-0">
              <Section2 width="100vw" />
            </section>
            <section className="panel w-screen h-full flex-shrink-0">
              <Section3 width="100vw" />
            </section>
          </div>
        </section>

        {/* VERTICAL SECTION: Section 4 (native vertical scroll) */}
        <section className="vertical-section relative">
          <Section4 width="100vw" />
        </section>

        {/* HORIZONTAL TRACK 2: Section 5 */}
        <section className="horizontal-track horizontal-track-2 h-screen overflow-hidden">
          <div className="horizontal-inner flex h-full">
            <section className="panel w-screen h-full flex-shrink-0">
              <Section5 width="100vw" />
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
