"use client"

import { SmoothScroll } from './components'
import {
  HeroSection,
  StorySection,
  WorldSection,
  GameplaySection,
  FinaleSection,
} from './sections'
import './styles/gta-scroll.css'

/**
 * GTA VI-Style Page Client Component
 *
 * Architecture:
 * - config/: Lenis, GSAP, and section configuration
 * - components/: SmoothScroll provider, ScrollSection wrapper
 * - sections/: Individual content sections
 *
 * Technical Implementation:
 *
 * 1. Lenis Smooth Scroll
 *    - ONE global instance in SmoothScroll provider
 *    - duration: 1.05 (restrained, not floaty)
 *    - exponential easing (natural deceleration)
 *    - smoothWheel: true, smoothTouch: false
 *    - No transform hijacking
 *
 * 2. GSAP ScrollTrigger Integration
 *    - Synced with Lenis RAF loop (no duplicate RAF)
 *    - ScrollTrigger.scrollerProxy for Lenis coordination
 *    - scrub: 0.5–0.8 (intentional lag behind scroll)
 *    - No snapping, no layout shifts
 *
 * 3. Animation Philosophy
 *    - opacity + translateY only (performance-first)
 *    - subtle scale < 1.03 (optional, not used here)
 *    - will-change: transform, opacity
 *    - Staggered child animations via data-animate
 *
 * 4. Font Strategy
 *    - Space Grotesk (already configured in root layout)
 *    - Static weights only
 *    - No font-size animation
 *    - No variable font interpolation
 *
 * Why This Works (Rockstar-style):
 * - Single RAF loop = 60fps performance
 * - Transform-only animations = no layout thrashing
 * - Restrained easing = professional, not gimmicky
 * - Intentional scrub lag = cinematic feel
 * - Native scroll preserved = accessibility maintained
 *
 * To Customize:
 * 1. Edit config files for global behavior
 * 2. Modify section components for content
 * 3. Adjust animationType prop: 'small' | 'medium' | 'large'
 * 4. Adjust scrubSpeed prop: 'fast' | 'medium' | 'slow'
 */

export default function GTAPageClient() {
  return (
    <SmoothScroll>
      <main className="bg-black text-white overflow-x-hidden">
        {/* Hero Section - Large reveal with slow scrub */}
        <HeroSection />

        {/* Story Section - Medium reveal */}
        <StorySection />

        {/* World Section - Medium reveal with grid stagger */}
        <WorldSection />

        {/* Gameplay Section - Small reveal with fast scrub */}
        <GameplaySection />

        {/* Finale Section - Large reveal with slowest scrub */}
        <FinaleSection />
      </main>
    </SmoothScroll>
  )
}

