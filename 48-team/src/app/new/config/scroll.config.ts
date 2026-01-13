/**
 * Lenis Scroll Configuration
 * Optimized for smooth horizontal scrolling with better performance
 */

export const LENIS_CONFIG = {
  // Animation duration - reduced for snappier response
  duration: 0.8,

  // Easing function for smooth acceleration/deceleration
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  // Scroll orientation
  orientation: "horizontal" as const,

  // Allow vertical wheel gesture to scroll horizontally
  gestureOrientation: "vertical" as const,

  // Enable smooth wheel scrolling
  smoothWheel: true,

  // Scroll speed multipliers - increased for better responsiveness
  wheelMultiplier: 1.2,
  touchMultiplier: 1.5,

  // Disable infinite scroll
  infinite: false,

  // Touch synchronization - adjusted for smoother touch
  syncTouch: false,
  touchInertiaMultiplier: 20,
} as const

export const GSAP_CONFIG = {
  // Lag smoothing for stable performance
  lagSmoothing: 250,

  // Debounce delay for resize events (ms)
  resizeDebounce: 150,
} as const

