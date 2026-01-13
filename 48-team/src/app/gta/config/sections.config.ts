/**
 * Sections Configuration
 *
 * Define all sections for the GTA VI-style scroll experience
 */

export const sectionsConfig = [
  {
    id: 'hero',
    title: 'Vice City Returns',
    subtitle: 'Experience the next generation',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
  },
  {
    id: 'story',
    title: 'Two Protagonists',
    subtitle: 'A story of loyalty and survival',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
  },
  {
    id: 'world',
    title: 'Open World',
    subtitle: 'The largest and most immersive map ever created',
    backgroundColor: '#0f0f0f',
    textColor: '#ffffff',
  },
  {
    id: 'gameplay',
    title: 'Next-Gen Gameplay',
    subtitle: 'Revolutionary mechanics and unprecedented detail',
    backgroundColor: '#141414',
    textColor: '#ffffff',
  },
  {
    id: 'finale',
    title: 'Coming Soon',
    subtitle: 'The most anticipated game of the decade',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
  },
] as const

export type Section = typeof sectionsConfig[number]
export type SectionId = Section['id']

