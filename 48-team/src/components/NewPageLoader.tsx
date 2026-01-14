"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface NewPageLoaderProps {
  onComplete?: () => void;
  duration?: number;
  destinationPage?: string;
}

export default function NewPageLoader({ onComplete, duration = 2500, destinationPage }: NewPageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const pathname = usePathname()

  // Determine page name from pathname
  const getPageName = () => {
    if (destinationPage) return destinationPage
    const path = pathname || "/"
    if (path === "/") return "Home"
    if (path.startsWith("/projects")) return "Projects"
    if (path.startsWith("/blogs")) return "Blogs"
    if (path.startsWith("/team")) return "Team"
    return "Page"
  }

  useEffect(() => {
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
          setIsExiting(true)
          setTimeout(() => {
            setIsComplete(true)
            onComplete?.()
          }, 800)
        }, 200)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [onComplete, duration])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96]
            }
          }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Grid Background - Animates continuously, never fades out */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{
              backgroundPosition: isExiting ? undefined : ["0% 0%", "100% 100%"],
            }}
            transition={{
              backgroundPosition: {
                duration: 20,
                repeat: isExiting ? 0 : Infinity,
                ease: "linear",
              },
            }}
            style={{
              backgroundImage:
                "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Animated Gradient Orbs - These fade out smoothly */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.8 : [1, 1.2, 1],
              x: isExiting ? 100 : [0, 50, 0],
              y: isExiting ? -50 : [0, -30, 0],
            }}
            transition={{
              scale: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              x: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              y: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              opacity: { duration: isExiting ? 0.8 : 0.3 }
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.8 : [1.2, 1, 1.2],
              x: isExiting ? -100 : [0, -50, 0],
              y: isExiting ? 50 : [0, 30, 0],
            }}
            transition={{
              scale: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              x: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              y: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
              opacity: { duration: isExiting ? 0.8 : 0.3 }
            }}
          />

          {/* Main Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.2 : 1,
              y: isExiting ? -30 : 0
            }}
            exit={{ opacity: 0, scale: 1.3, y: -50 }}
            transition={{
              duration: isExiting ? 0.8 : 0.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {/* Professional 48 Text with Smooth Fill Animation */}
            <div className="relative w-[600px] h-[320px]">
              <style jsx>{`
                @keyframes wave {
                  0% {
                    transform: translateX(0) translateZ(0) scaleY(1);
                  }
                  50% {
                    transform: translateX(-25%) translateZ(0) scaleY(0.95);
                  }
                  100% {
                    transform: translateX(-50%) translateZ(0) scaleY(1);
                  }
                }
                
                .wave {
                  animation: wave 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
                }
                
                .wave:nth-of-type(2) {
                  animation-delay: -1s;
                  animation-duration: 5s;
                  opacity: 0.7;
                }
              `}</style>

              {/* Background "48" (Subtle dark) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="text-[280px] font-black leading-none select-none"
                  style={{
                    color: "#0f0f0f",
                    textShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    WebkitTextStroke: "2px #1a1a1a",
                  }}
                >
                  48
                </div>
              </div>

              {/* Liquid Fill with Smooth Transition */}
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out"
                style={{
                  clipPath: `inset(${100 - progress * 100}% 0 0 0)`,
                }}
              >
                {/* Liquid Background with Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, #60a5fa 0%, #3b82f6 40%, #2563eb 80%, #1e40af 100%)",
                  }}
                />

                {/* Wave Layer 1 */}
                <div
                  className="wave absolute w-[200%] h-[150px] bottom-0 left-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.9) 100%)",
                    borderRadius: "45% 55% 50% 50% / 100% 100% 0% 0%",
                    top: `calc(${100 - progress * 100}% - 75px)`,
                  }}
                />

                {/* Wave Layer 2 */}
                <div
                  className="wave absolute w-[200%] h-[150px] bottom-0 left-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.7) 100%)",
                    borderRadius: "40% 60% 55% 45% / 100% 100% 0% 0%",
                    top: `calc(${100 - progress * 100}% - 60px)`,
                  }}
                />

                {/* Filled "48" Text with Gradient */}
                <div
                  className="text-[280px] font-black leading-none select-none relative z-10"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #e0f2fe 50%, #bae6fd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 40px rgba(96, 165, 250, 0.8), 0 0 80px rgba(59, 130, 246, 0.6)",
                    filter: "drop-shadow(0 4px 20px rgba(96, 165, 250, 0.4))",
                    WebkitTextStroke: "2px rgba(96, 165, 250, 0.3)",
                  }}
                >
                  48
                </div>

                {/* Shimmer Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  }}
                />

                {/* Bubble Effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/30"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      left: `${Math.random() * 100}%`,
                      bottom: 0,
                    }}
                    animate={{
                      y: [0, -300],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1.2, 0.8],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Particle effects */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full"
                style={{
                  width: `${progress * 100}%`,
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Percentage Text */}
            <motion.p
              className="mt-4 text-2xl font-bold text-white/80 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {Math.floor(progress * 100)}%
            </motion.p>

            {/* Loading Text */}
            <motion.p
              className="mt-2 text-sm text-white/50 tracking-widest uppercase"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading {getPageName()}
            </motion.p>

            {/* Transfer indicator */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-xs text-white/40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Transferring to
              </motion.span>
              <motion.span
                className="font-bold text-primary"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                {getPageName()}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-blue-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-blue-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-blue-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-blue-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

