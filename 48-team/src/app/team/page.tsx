"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Lenis from "lenis"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Footer from "@/components/Footer"
import MenuButton from "@/components/MenuButton"
import FullScreenMenu from "@/components/FullScreenMenu"
import NewPageLoader from "@/components/NewPageLoader"
import TeamGrid from "@/components/team/TeamGrid"
import { teamData } from "@/data/teamData"

// Immediate scroll to top
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function TeamGridWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <TeamGrid
        title=""
        subtitle=""
        members={teamData}
      />
    </Suspense>
  )
}

export default function TeamPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleComplete = () => setIsLoading(false)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (isLoading) return

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    setTimeout(() => window.scrollTo(0, 0), 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <>
      {/* Menu Button */}
      {!isLoading && <MenuButton onClick={() => setIsMenuOpen(true)} />}

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Page Loader */}
      {isLoading && <NewPageLoader onComplete={handleComplete} />}

      <main className="relative bg-black text-white min-h-screen overflow-hidden">
        {/* Fixed Animated Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundColor: "#000000" }}>
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"
                 style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-500/30 rounded-full blur-[120px] animate-pulse"
                 style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/25 rounded-full blur-[100px] animate-pulse"
                 style={{ animationDuration: '12s', animationDelay: '4s' }} />
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: 'linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)',
                   backgroundSize: '4rem 4rem'
                 }} />
          </div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Back Button */}
            <Link
              href="/"
              className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
              <span>Back</span>
            </Link>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  <p className="text-purple-400 text-xs md:text-sm uppercase tracking-wider">
                    Meet the Team
                  </p>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 via-violet-500 to-purple-400 bg-clip-text text-transparent">
                  The 48 Team
                </h1>
                <p className="text-base md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                  The people behind the work. Our team is made up of 48+ talented individuals from all over the world
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400">{teamData.length}+</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-violet-500">10+</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Countries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400">5+</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Years</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground text-xs md:text-sm"
            >
              <p>Scroll to explore</p>
            </motion.div>
          </section>

          {/* Team Grid */}
          <section className="relative py-12 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <TeamGridWrapper />
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

