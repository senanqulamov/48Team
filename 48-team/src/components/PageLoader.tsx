"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type PageLoaderProps = {
  loadingComplete?: boolean
  onCompleteAction?: () => void
  duration?: number
}

export default function PageLoader({ loadingComplete = false, onCompleteAction, duration = 2200 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if user is on a mobile-sized screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    if (loadingComplete) {
      setIsComplete(true)
      onCompleteAction?.()
      return
    }

    const startTime = Date.now()
    let animationFrame: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(elapsed / duration, 1)
      setProgress(newProgress)

      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setIsComplete(true)
          onCompleteAction?.()
        }, 300)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [loadingComplete, onCompleteAction, duration])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="relative w-48 h-48">
            {/* Background Circle Outline */}
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" fill="none" stroke="#2d2d2d" strokeWidth="4" />
            </svg>

            {/* Animated Blue Circle Fill */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 100 100"
              style={{ clipPath: `inset(${100 - progress * 100}% 0 0 0)` }}
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeDasharray="295.31"
                strokeDashoffset="0"
              />
            </svg>

            {/* Number Fill Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{ clipPath: `inset(${100 - progress * 100}% 0 0 0)` }}>
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <defs>
                    <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="100" height="20">
                      <motion.path
                        d="M0 10 Q 25 5 50 10 T 100 10"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        animate={{
                          d: [
                            "M0 10 Q 25 5 50 10 T 100 10",
                            "M0 10 Q 25 15 50 10 T 100 10",
                            "M0 10 Q 25 5 50 10 T 100 10",
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </pattern>
                  </defs>

                  <text
                    x="50"
                    y="70"
                    textAnchor="middle"
                    fontSize="80"
                    fontWeight="bold"
                    fill="#3b82f6"
                    stroke="url(#wavePattern)"
                    strokeWidth="1"
                  >
                    48
                  </text>
                </svg>
              </div>
            </div>

            {/* Mobile notice */}
            {isMobile && (
              <p className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-sm text-gray-400 text-center whitespace-nowrap">
                (Better on desktop)
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
