/**
 * GSAP ScrollTrigger Animation Configuration
 *
 * GTA VI-style animation principles:
 * - Subtle reveals (opacity + translateY)
 * - Scrub delay: 0.5–0.8 (intentional lag behind scroll)
 * - No snapping
 * - No layout shifts
 * - Performance-first (will-change, transform-only)
 */

export const animationConfig = {
  // Scrub values (intentional lag)
  scrub: {
    fast: 0.5, // Minimal lag
    medium: 0.65, // Standard lag
    slow: 0.8, // Noticeable lag
  },

  // Reveal animation defaults
  reveal: {
    opacity: {
      from: 0,
      to: 1,
    },
    translateY: {
      small: 40, // Subtle movement
      medium: 60, // Standard movement
      large: 120, // Prominent movement
    },
    scale: {
      from: 0.98, // Very subtle scale (< 1.03)
      to: 1,
    },
  },

  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%', // Start when element is 80% from top
    end: 'top 20%', // End when element is 20% from top
    toggleActions: 'play none none reverse', // Play on enter, reverse on leave
  },

  // Performance
  performance: {
    willChange: 'transform, opacity', // Hint to browser for optimization
    force3D: true, // Force GPU acceleration
  },
} as const

export type AnimationConfig = typeof animationConfig

