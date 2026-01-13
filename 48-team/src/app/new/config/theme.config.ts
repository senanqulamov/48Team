/**
 * Theme Configuration
 * Global theme settings for backgrounds, colors, and animations
 */

export const THEME_CONFIG = {
  // Background settings
  background: {
    base: {
      gradient: "from-gray-900 via-black to-gray-900",
    },
    orbs: [
      {
        position: "top-0 left-1/4",
        color: "bg-cyan-500",
        size: "w-96 h-96",
        blur: "blur-[128px]",
        animation: "animate-pulse",
        delay: "0s",
      },
      {
        position: "bottom-0 right-1/4",
        color: "bg-purple-500",
        size: "w-96 h-96",
        blur: "blur-[128px]",
        animation: "animate-pulse",
        delay: "1s",
      },
      {
        position: "top-1/2 left-1/2",
        color: "bg-teal-500",
        size: "w-96 h-96",
        blur: "blur-[128px]",
        animation: "animate-pulse",
        delay: "2s",
      },
    ],
    grid: {
      pattern: "bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]",
      size: "bg-[size:4rem_4rem]",
    },
    orbsOpacity: 0.3,
  },

  // Section color schemes - with lower opacity to show animated background
  sectionColors: {
    section1: {
      gradient: "from-black/40 via-cyan-950/30 to-black/40",
    },
    section2: {
      gradient: "from-black/40 via-cyan-900/25 to-black/40",
    },
    section3: {
      gradient: "from-cyan-950/35 via-black/40 to-cyan-950/30",
    },
    section4: {
      gradient: "from-black/40 via-teal-950/30 to-black/40",
    },
    section5: {
      gradient: "from-black/40 via-purple-950/30 to-black/40",
    },
  },

  // Progress indicator
  progressIndicator: {
    position: "fixed top-8 left-8 z-50",
    active: {
      bg: "bg-cyan-400",
      width: "w-12",
    },
    inactive: {
      bg: "bg-gray-600",
      width: "w-8",
    },
    height: "h-1",
    gap: "gap-2",
  },
} as const

