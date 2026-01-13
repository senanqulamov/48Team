"use client"

import Image from 'next/image'
import ScrollSection from '../components/ScrollSection'

/**
 * World Section
 *
 * Showcases the open-world environment
 * Features grid layout with staggered animations
 */

export default function WorldSection() {
  return (
    <ScrollSection
      id="world"
      className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white"
      animationType="medium"
      scrubSpeed="medium"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div data-animate className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Open World
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The largest and most immersive map ever created in the Grand Theft Auto series
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div data-animate className="space-y-4">
              <div className="aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/demo1/2.jpg"
                  alt="Dynamic Weather"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">Dynamic Weather</h3>
              <p className="text-gray-400">
                Experience real-time weather systems that affect gameplay and atmosphere
              </p>
            </div>

            <div data-animate className="space-y-4">
              <div className="aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/demo1/3.jpg"
                  alt="Living City"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">Living City</h3>
              <p className="text-gray-400">
                NPCs with daily routines and realistic AI behavior patterns
              </p>
            </div>

            <div data-animate className="space-y-4">
              <div className="aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/demo1/4.jpg"
                  alt="Seamless Travel"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">Seamless Travel</h3>
              <p className="text-gray-400">
                No loading screens between areas, from downtown to the Everglades
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  )
}

