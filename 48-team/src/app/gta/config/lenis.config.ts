/**
 * Lenis Smooth Scroll Configuration
 *
 * Rockstar-style restraint:
 * - duration: 1.0–1.1 (quick response, no floatiness)
 * - easing: exponential ease-out (natural deceleration)
 * - smoothWheel: true (desktop smoothing)
 * - smoothTouch: false (preserve native mobile scroll)
 * - No infinite scroll
 * - No scroll hijacking via transforms
 */

export const lenisConfig = {
  // Core scroll behavior
  duration: 1.05, // Slightly restrained, not floaty (1.0–1.1 range)
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out, clamped

  // Platform-specific smoothing
  smoothWheel: true, // Enable smooth scroll on desktop
  smoothTouch: false, // Preserve native touch scroll on mobile

  // Direction control
  direction: 'vertical' as const, // Only vertical scroll

  // Gesture control
  gestureDirection: 'vertical' as const, // Only vertical gestures

  // Scroll bounds
  infinite: false, // Natural scroll bounds

  // Touch multiplier (1 = native speed)
  touchMultiplier: 1,

  // Wheel multiplier (1 = native speed)
  wheelMultiplier: 1,
} as const

export type LenisConfig = typeof lenisConfig

