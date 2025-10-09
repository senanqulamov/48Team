"use client"

import * as React from "react"
import { Spotlight } from "@/components/ui/spotlight-new"
import { cn } from "@/lib/utils"

/**
 * HeroCinematicSpotlight
 * Example hero section that integrates the cinematic Spotlight component.
 * - Dark, subtle gradient background to showcase additive light blending
 * - Mouse-following on desktop, gentle orbit around the title on mobile
 * - The spotlight is layered underneath the text but above the background
 */
export function HeroCinematicSpotlight({ className }: { className?: string }) {
  // This ref anchors the spotlight's mobile orbit around the main title
  const titleRef = React.useRef<HTMLHeadingElement | null>(null)

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        // Full-viewport hero baseline; adjust as needed per page
        "min-h-[80vh] md:min-h-screen",
        // Background that pairs well with a lighten-blend spotlight
        "bg-[radial-gradient(1200px_700px_at_20%_-10%,#0a0a0a,transparent_60%),linear-gradient(to_bottom_right,#000,#0b0b11)]",
        "text-white",
        className,
      )}
    >
      {/* Spotlight lives absolutely inside the hero section. */}
      <Spotlight className="inset-0" />

      {/* Content container should be positioned above the spotlight */}
      <div className="relative z-30 px-6 md:px-10 lg:px-20 py-28 md:py-36">
        <div className="max-w-5xl">
          {/* Title acts as a spotlight focus on mobile */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
            data-spotlight-target
          >
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-300 bg-clip-text text-transparent">
              Senan – The 48
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl">
            Cinematic lighting for the web. A smooth, diffused spotlight that subtly reveals your content — optimized for performance and designed for dark interfaces.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium text-black bg-white/90 hover:bg-white transition-colors"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Decorative subtle grid/noise could be added here if desired */}
      </div>

      {/* Optional vignette for extra cinematic feel */}
      <div className="pointer-events-none absolute inset-0 z-20 [background:radial-gradient(1200px_600px_at_50%_30%,transparent,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.65))]" />

      {/* Hidden anchor targets for demo links */}
      <div id="work" className="hidden" aria-hidden />
      <div id="contact" className="hidden" aria-hidden />
    </section>
  )
}

export default HeroCinematicSpotlight
