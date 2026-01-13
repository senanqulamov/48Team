"use client"

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animationConfig } from '../config'

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * ScrollSection Component
 *
 * Purpose:
 * - Wraps content with GSAP ScrollTrigger animations
 * - Implements GTA VI-style reveal effects
 *
 * Animation approach:
 * - opacity: 0 → 1 (fade in)
 * - translateY: 60px → 0 (slide up)
 * - scrub: 0.65 (intentional lag behind scroll)
 * - Performance: transform + opacity only (no layout shifts)
 *
 * Why scrub delay:
 * - Creates intentional lag behind scroll
 * - Matches Rockstar's cinematic feel
 * - Prevents jarring instant animations
 *
 * Integration with Lenis:
 * - ScrollTrigger.update() called in Lenis RAF loop
 * - No separate RAF needed
 * - Perfectly synced scroll position
 */

interface ScrollSectionProps {
  children: ReactNode
  id?: string
  className?: string
  animationType?: 'small' | 'medium' | 'large'
  scrubSpeed?: 'fast' | 'medium' | 'slow'
}

export default function ScrollSection({
  children,
  id,
  className = '',
  animationType = 'medium',
  scrubSpeed = 'medium',
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Sync ScrollTrigger with Lenis
    // This is CRITICAL for smooth animation
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && typeof window !== 'undefined' && typeof value === 'number') {
          const lenis = window.lenis
          if (lenis) {
            lenis.scrollTo(value, { immediate: true })
          }
        }
        return window.lenis?.scroll || 0
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    // Update ScrollTrigger on Lenis scroll
    const lenis = window.lenis
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Get animation values from config
    const translateY = animationConfig.reveal.translateY[animationType]
    const scrub = animationConfig.scrub[scrubSpeed]

    // Create GSAP animation with ScrollTrigger
    const ctx = gsap.context(() => {
      // Animate child elements for staggered effect
      const elements = section.querySelectorAll('[data-animate]')

      if (elements.length > 0) {
        // Animate multiple elements with stagger
        gsap.from(elements, {
          opacity: animationConfig.reveal.opacity.from,
          y: translateY,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: animationConfig.scrollTrigger.start,
            end: animationConfig.scrollTrigger.end,
            scrub: scrub, // Intentional lag
            toggleActions: animationConfig.scrollTrigger.toggleActions,
          },
        })
      } else {
        // Animate entire section
        gsap.from(section, {
          opacity: animationConfig.reveal.opacity.from,
          y: translateY,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: animationConfig.scrollTrigger.start,
            end: animationConfig.scrollTrigger.end,
            scrub: scrub, // Intentional lag
            toggleActions: animationConfig.scrollTrigger.toggleActions,
          },
        })
      }
    }, section)

    // Cleanup
    return () => {
      ctx.revert()
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
      }
    }
  }, [animationType, scrubSpeed])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        willChange: animationConfig.performance.willChange,
      }}
    >
      {children}
    </section>
  )
}

