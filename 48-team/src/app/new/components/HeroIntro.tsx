"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/**
 * HeroIntro Component
 * Optimized for horizontal scroll - Hero introduction section
 */
export function HeroIntro() {
  return (
    <div className="relative h-full flex items-center justify-center px-8">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-xl text-cyan-400 font-medium tracking-wide">Hello, I&apos;m</span>
        </motion.div>

        {/* Main name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Senan - The 48
          </span>
        </motion.h1>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {["Programmer", "Therapist", "Founder"].map((role, index) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="px-6 py-2 bg-white/5 border border-cyan-400/30 rounded-full text-base font-medium text-cyan-100 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-cyan-100/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Building innovative solutions at the intersection of{" "}
          <span className="text-cyan-400 font-medium">technology</span> and{" "}
          <span className="text-teal-400 font-medium">human connection</span>. Founder of NeoSphere startup.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center items-center gap-2 text-cyan-400/60 text-sm"
        >
          <span>Scroll to explore</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  )
}

