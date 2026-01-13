"use client"

import ScrollSection from '../components/ScrollSection'

/**
 * Gameplay Section
 *
 * Highlights next-gen gameplay features
 * Small animation for subtle reveal
 */

export default function GameplaySection() {
  return (
    <ScrollSection
      id="gameplay"
      className="min-h-screen flex items-center justify-center bg-[#141414] text-white"
      animationType="small"
      scrubSpeed="fast"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div data-animate className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Next-Gen Gameplay
            </h2>
            <p className="text-xl text-gray-400">
              Revolutionary mechanics and unprecedented detail in every interaction
            </p>
          </div>

          <div className="space-y-12">
            <div data-animate className="border-l-2 border-gray-700 pl-8">
              <h3 className="text-3xl font-bold mb-4">Advanced AI</h3>
              <p className="text-lg text-gray-400">
                State-of-the-art artificial intelligence creates believable characters
                that react realistically to your actions and the world around them.
              </p>
            </div>

            <div data-animate className="border-l-2 border-gray-700 pl-8">
              <h3 className="text-3xl font-bold mb-4">Physics System</h3>
              <p className="text-lg text-gray-400">
                Next-generation physics engine delivers realistic vehicle handling,
                destruction, and environmental interactions never before seen in the series.
              </p>
            </div>

            <div data-animate className="border-l-2 border-gray-700 pl-8">
              <h3 className="text-3xl font-bold mb-4">Customization</h3>
              <p className="text-lg text-gray-400">
                Deep customization options for characters, vehicles, and properties.
                Make Vice City truly your own with unprecedented personalization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  )
}

