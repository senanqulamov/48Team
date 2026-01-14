/**
 * Global configuration for horizontal scroll sections
 * Modify these values to customize section appearance and behavior
 */

export const SECTION_CONFIG = {
  // Section width presets
  widths: {
    xsmall: "50vw",
    small: "100vw",
    medium: "150vw",
    large: "200vw",
    xlarge: "250vw",
  },

  // Section layout mapping
  sections: [
    { id: 1, width: "small", component: "Section1" },
    { id: 2, width: "small", component: "Section2" },
    { id: 3, width: "small", component: "Section3" },
    { id: 4, width: "small", component: "Section4" },
    { id: 5, width: "large", component: "Section5" },
    { id: 6, width: "small", component: "Section6" },
  ] as const,

  // Glass effect settings
  glassEffect: {
    blur: "4px",
    saturate: "150%",
    opacity: 0.1,
  },

  // Border settings
  border: {
    color: "white",
    opacity: 0.1,
    width: "1px",
  },

  // Typography - enhanced for better visibility
  typography: {
    title: {
      size: "8xl",
      weight: "bold",
      color: "white",
      shadow: "drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] drop-shadow-2xl",
    },
    subtitle: {
      size: "2xl",
      color: "cyan-100",
      marginTop: "1rem",
    },
  },
} as const

export type SectionWidth = keyof typeof SECTION_CONFIG.widths
export type SectionId = typeof SECTION_CONFIG.sections[number]["id"]

