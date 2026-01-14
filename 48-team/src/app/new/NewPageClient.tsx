"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Section1, Section2, Section3, Section4, Section5, Section6 } from "./sections"
import { ProgressIndicator, FixedBackground } from "./components"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Don't initialize scroll if still loading
    if (isLoading) return

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

      // HORIZONTAL TRACK 2: Section 5 & 6 (scroll together horizontally)
      const track2 = document.querySelector(".horizontal-track-2")
      const inner2 = track2?.querySelector(".horizontal-inner")
      const panels2 = track2?.querySelectorAll(".panel")

      if (track2 && inner2 && panels2) {
        // Calculate total width: Section 5 (content-based) + Section 6 (100vw)
        const section5Width = (panels2[0] as HTMLElement).offsetWidth
        const section6Width = window.innerWidth // 100vw
        const totalWidth = section5Width + section6Width
        const scrollDistance = totalWidth - window.innerWidth

        gsap.to(inner2, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: track2,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              // Section 5 shows until halfway, then Section 6
              const section = progress < 0.5 ? 4 : 5
              setActiveSection(section)
            },
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
  }, [isLoading])

  return (
    <>
      {/* Page Loader */}
      {isLoading && <NewPageLoader onComplete={handleLoadingComplete} />}

      {/* Menu Button - Only show when not loading */}
      {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main id="lenis-root" className="relative bg-transparent text-white">
        <FixedBackground />

        <div className="relative z-50">
          <ProgressIndicator activeSection={activeSection} />
        </div>

      <div className="relative z-10">
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

        <section className="vertical-section relative">
          <Section4 width="100vw" />
        </section>

        {/* HORIZONTAL TRACK 2: Section 5 & 6 (scroll together horizontally) */}
        <section className="horizontal-track horizontal-track-2 h-screen overflow-hidden">
          <div className="horizontal-inner flex h-full">
            <section className="panel h-full flex-shrink-0" style={{ minWidth: '100vw', width: 'max-content' }}>
              <Section5 width="auto" />
            </section>
            <section className="panel w-screen h-full flex-shrink-0">
              <Section6 width="100vw" />
            </section>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}
