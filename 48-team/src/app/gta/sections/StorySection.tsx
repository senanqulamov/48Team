"use client"

import Image from 'next/image'
import ScrollSection from '../components/ScrollSection'

/**
 * Story Section
 *
 * Features dual protagonist narrative
 * Medium animation for balanced reveal
 */

export default function StorySection() {
  return (
    <ScrollSection
      id="story"
      className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white"
      animationType="medium"
      scrubSpeed="medium"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div data-animate>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/demo1/5.jpg"
                  alt="Protagonist 1"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Two Protagonists
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                For the first time in the series, Grand Theft Auto VI features dual protagonists,
                each with their own story, motivations, and gameplay style.
              </p>
            </div>
          </div>
          <div data-animate>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/demo1/6.jpg"
                  alt="Protagonist 2"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                A Story of Loyalty
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Navigate the dangerous world of Vice City through two intertwined narratives.
                Make choices that affect both characters and shape the story&apos;s outcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  )
}

