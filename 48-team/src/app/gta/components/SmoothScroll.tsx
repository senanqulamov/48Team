"use client"

import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { lenisConfig } from '../config'

/**
 * SmoothScroll Provider Component
 *
 * Purpose:
 * - Creates ONE global Lenis instance
 * - Manages ONE requestAnimationFrame loop
 * - Provides Lenis instance to GSAP ScrollTrigger
 *
 * Why this approach:
 * - Single RAF loop = better performance
 * - No nested scroll containers = no conflicts
 * - ScrollTrigger synced with Lenis = smooth animations
 * - No transform-based scrolling = native behavior preserved
 *
 * Rockstar-style choices:
 * - Restrained duration (1.05s) = responsive, not floaty
 * - Exponential easing = natural deceleration
 * - smoothTouch: false = preserve native mobile feel
 * - No scroll hijacking = user maintains control
 */

// Extend Window interface for Lenis
declare global {
  interface Window {
    lenis?: Lenis
  }
}

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize Lenis with Rockstar-inspired config
    const lenis = new Lenis(lenisConfig)
    lenisRef.current = lenis

    // Export to window for GSAP ScrollTrigger integration
    // This allows ScrollTrigger to sync with Lenis scroll position
    if (typeof window !== 'undefined') {
      window.lenis = lenis
    }

    // Single requestAnimationFrame loop
    // This is the ONLY RAF loop for scroll - no duplication
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Cleanup: Stop RAF and destroy Lenis instance
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
      if (typeof window !== 'undefined') {
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}

