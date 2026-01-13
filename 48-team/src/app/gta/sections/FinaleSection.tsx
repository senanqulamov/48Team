"use client"

import Image from 'next/image'
import ScrollSection from '../components/ScrollSection'

/**
 * Finale Section
 *
 * Final section with call-to-action
 * Large animation for dramatic ending
 */

export default function FinaleSection() {
  return (
    <ScrollSection
      id="finale"
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white relative overflow-hidden"
      animationType="large"
      scrubSpeed="slow"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/demo1/7.jpg"
          alt="Coming Soon Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div data-animate>
          <div className="mb-8 text-sm text-gray-600 uppercase tracking-wider">
            2025
          </div>
        </div>
        <div data-animate>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            Coming Soon
          </h2>
        </div>
        <div data-animate>
          <p className="text-2xl text-gray-400 mb-12">
            The most anticipated game of the decade
          </p>
        </div>
        <div data-animate>
          <button className="px-8 py-4 bg-white text-black text-lg font-bold rounded-none hover:bg-gray-200 transition-colors">
            Pre-Order Now
          </button>
        </div>
      </div>
    </ScrollSection>
  )
}

