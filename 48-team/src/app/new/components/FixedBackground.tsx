"use client"

import { useEffect, useRef } from "react"

/**
 * Fixed Background Component
 * Optimized animated background with CSS-based gradients (better performance)
 */
export function FixedBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Optional: Add any JS-based optimizations here if needed
    return () => {
      // Cleanup
    }
  }, [])

  useEffect(() => {
    // Optional: Add any JS-based optimizations here if needed
    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Animated gradient orbs using CSS */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/30 rounded-full blur-[120px] animate-pulse"
           style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/25 rounded-full blur-[100px] animate-pulse"
           style={{ animationDuration: '12s', animationDelay: '4s' }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
             backgroundSize: '4rem 4rem'
           }} />
    </div>
  )
}

