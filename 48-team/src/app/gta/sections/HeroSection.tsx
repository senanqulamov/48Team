"use client"

import Image from 'next/image'
import ScrollSection from '../components/ScrollSection'

/**
 * Hero Section
 *
 * First section with large reveal animation
 * Features:
 * - Full viewport height
 * - Large translateY movement (120px)
 * - Medium scrub (0.65s lag)
 * - Staggered text animations
 */

export default function HeroSection() {
  return (
    <ScrollSection
      id="hero"
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white relative overflow-hidden"
      animationType="large"
      scrubSpeed="medium"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/demo1/1.jpg"
          alt="Vice City Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div data-animate>
          <h1 className="text-7xl md:text-9xl tracking-tighter mb-6 font-bold">
            Vice City Returns
          </h1>
        </div>
        <div data-animate>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of open-world gaming
          </p>
        </div>
        <div data-animate>
          <div className="mt-12 text-sm text-gray-600 uppercase tracking-wider">
            Scroll to explore
          </div>
        </div>
      </div>
    </ScrollSection>
  )
}

