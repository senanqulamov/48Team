"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles, BookOpen, ArrowRight } from "lucide-react"

interface BlogTransitionProps {
  onComplete?: () => void
  fromTitle?: string
  toTitle?: string
}

export default function BlogTransition({ onComplete, fromTitle, toTitle }: BlogTransitionProps) {
  const [stage, setStage] = useState<"entering" | "transitioning" | "exiting">("entering")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Stage 1: Entering (0-30%)
    const timer1 = setTimeout(() => {
      setStage("transitioning")
      setProgress(30)
    }, 300)

    // Stage 2: Transitioning (30-70%)
    const timer2 = setTimeout(() => {
      setProgress(70)
    }, 800)

    // Stage 3: Exiting (70-100%)
    const timer3 = setTimeout(() => {
      setStage("exiting")
      setProgress(100)
    }, 1400)

    // Complete
    const timer4 = setTimeout(() => {
      onComplete?.()
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <AnimatePresence mode="wait">
      {stage !== "exiting" || progress < 100 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Unique Blog Background - Animated Particles */}
          <div className="absolute inset-0">
            {/* Emerald Grid - Finer and More Dynamic */}
            <motion.div
              className="absolute inset-0 opacity-[0.08]"
              animate={{
                backgroundPosition: stage === "exiting" ? ["0% 0%", "100% 100%"] : ["0% 0%", "100% 100%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 30,
                  repeat: stage === "exiting" ? 0 : Infinity,
                  ease: "linear",
                },
              }}
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.4) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            {/* Floating Particles Effect - using % instead of window for SSR compatibility */}
            {[...Array(12)].map((_, i) => {
              const randomX = Math.random() * 100
              const randomY = Math.random() * 100
              const randomTargetX = Math.random() * 100
              const randomTargetY = Math.random() * 100
              const randomScale = Math.random() * 0.5 + 0.5
              const randomTargetScale = Math.random() + 0.5
              const randomDuration = Math.random() * 3 + 4
              const randomDelay = Math.random() * 2

              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                  }}
                  initial={{
                    scale: randomScale,
                  }}
                  animate={{
                    y: [0, `${randomTargetY - randomY}vh`, 0],
                    x: [0, `${randomTargetX - randomX}vw`, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [randomScale, randomTargetScale, randomScale],
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomDelay,
                  }}
                />
              )
            })}

            {/* Gradient Orbs - Emerald Theme */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
              animate={{
                scale: stage === "exiting" ? 1.5 : [1, 1.15, 1],
                opacity: stage === "exiting" ? 0 : [0.6, 0.8, 0.6],
                x: stage === "exiting" ? -200 : [0, 30, 0],
                y: stage === "exiting" ? -200 : [0, -30, 0],
              }}
              transition={{
                duration: 4,
                repeat: stage === "exiting" ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }}
              animate={{
                scale: stage === "exiting" ? 1.5 : [1, 1.2, 1],
                opacity: stage === "exiting" ? 0 : [0.5, 0.7, 0.5],
                x: stage === "exiting" ? 200 : [0, -40, 0],
                y: stage === "exiting" ? 200 : [0, 40, 0],
              }}
              transition={{
                duration: 5,
                repeat: stage === "exiting" ? 0 : Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: stage === "exiting" ? 1.8 : [1, 1.3, 1],
                opacity: stage === "exiting" ? 0 : [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: stage === "exiting" ? 0 : Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Scanline Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16,185,129,0.03) 2px, rgba(16,185,129,0.03) 4px)',
              }}
              animate={{
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center px-4 max-w-2xl">
              {/* Stage 1: From Title (Fading Out) */}
              <AnimatePresence mode="wait">
                {stage === "entering" && fromTitle && (
                  <motion.div
                    key="from"
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      scale: 0.9,
                      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="mb-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-4"
                    >
                      <BookOpen className="w-12 h-12 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white/80 line-clamp-2">
                      {fromTitle}
                    </h2>
                  </motion.div>
                )}

                {/* Stage 2: Transition Animation */}
                {stage === "transitioning" && (
                  <motion.div
                    key="transition"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      rotateY: 90,
                      transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-400/30"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                    </motion.div>

                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-emerald-400 font-semibold uppercase tracking-widest text-sm"
                    >
                      Loading Next Chapter
                    </motion.p>
                  </motion.div>
                )}

                {/* Stage 3: To Title (Fading In) */}
                {stage === "exiting" && toTitle && (
                  <motion.div
                    key="to"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6 }}
                      className="inline-block mb-4"
                    >
                      <Sparkles className="w-12 h-12 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent line-clamp-2">
                      {toTitle}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Bar */}
              <motion.div className="mt-12 max-w-xs mx-auto">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <motion.p
                  className="text-xs text-emerald-400/70 mt-3 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Corner Accents */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
