"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Code, Brain, Rocket, Heart, Users, Lightbulb } from "lucide-react"

/**
 * AboutSection Component
 * Adapted for /new architecture - About me section with stats and highlights
 */
export function AboutSection() {
  const stats = [
    { number: "7+", label: "Years Coding", icon: Code },
    { number: "7+", label: "Years Therapy", icon: Brain },
    { number: "4", label: "Startups Founded", icon: Rocket },
    { number: "100+", label: "Lives & Projects", icon: Heart },
  ]

  const highlights = [
    { icon: Users, label: "Human-Centered" },
    { icon: Lightbulb, label: "Innovation" },
    { icon: Heart, label: "Empathy" },
  ]

  return (
    <div className="relative h-full flex items-center px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left side - Image and floating elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/mine/me4.png"
                  alt="Senan The 48"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              {/* Floating skill badges */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white/10 border border-cyan-400/30 rounded-full p-2 md:p-3 backdrop-blur-sm"
              >
                <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white/10 border border-teal-400/30 rounded-full p-2 md:p-3 backdrop-blur-sm"
              >
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-6 md:-left-8 bg-white/10 border border-cyan-400/30 rounded-full p-2 md:p-3 backdrop-blur-sm"
              >
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-base md:text-lg text-cyan-100/80 leading-relaxed mb-4 md:mb-6">
                I&apos;m a unique blend of <span className="text-cyan-400 font-medium">technical expertise</span> and{" "}
                <span className="text-teal-400 font-medium">human understanding</span>. As a programmer, I build scalable
                solutions that solve real-world problems. As a therapist, I help people navigate life&apos;s challenges and
                unlock their potential.
              </p>
              <p className="text-base md:text-lg text-cyan-100/80 leading-relaxed mb-4 md:mb-6">
                This intersection of technology and psychology drives my entrepreneurial journey. I founded{" "}
                <span className="text-cyan-400 font-medium">NeoSphere</span> to create innovative platforms that bridge
                the gap between human needs and technological solutions.
              </p>
              <p className="text-base md:text-lg text-cyan-100/80 leading-relaxed">
                When I&apos;m not coding or counseling, you&apos;ll find me exploring new technologies, reading about human
                behavior, or brainstorming the next big idea that could make a difference in people&apos;s lives.
              </p>
            </div>
          </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 md:space-y-8"
            >

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-white/5 border border-cyan-400/20 rounded-xl p-4 md:p-6 text-center backdrop-blur-sm hover:border-cyan-400/40 hover:bg-white/10 transition-all group"
                        >
                            <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.number}</div>
                            <div className="text-xs md:text-sm text-cyan-100/60">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {highlights.map(({ icon: Icon, label }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-cyan-400 hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
                        >
                            <Icon className="w-3 h-3 md:w-4 md:h-4" />
                            {label}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  )
}

