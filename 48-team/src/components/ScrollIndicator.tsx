"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface ScrollIndicatorProps {
  variant?: "default" | "minimal"
  className?: string
  direction?: "down" | "right"
}

/**
 * ScrollIndicator Component
 * A reusable, animated scroll indicator that guides users to scroll
 */
export function ScrollIndicator({
  variant = "default",
  className = "",
  direction = "down"
}: ScrollIndicatorProps) {

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className={`flex flex-col items-center justify-center gap-3 ${className}`}
      >
        <p className="text-sm md:text-base font-medium text-muted-foreground">
          Scroll to explore
        </p>
        <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {/* Animated mouse icon */}
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="w-7 h-11 md:w-9 md:h-14 border-3 border-white/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5 shadow-lg shadow-cyan-500/20">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-2 md:w-2 md:h-3 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* Text with pulsing effect */}
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-base md:text-lg font-semibold text-white tracking-wide">
          Scroll
            {/*{direction === "down" ? "Down" : "Right"}*/}
        </p>
        <p className="text-xs md:text-sm text-white/70 font-medium">
          to explore more
        </p>
      </motion.div>

      {/* Animated arrow */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        {direction === "down" ? (
          <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
        ) : (
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rotate-[-90deg]"
          >
            <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
          </motion.div>
        )}
      </motion.div>

      {/* Glowing effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -z-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
      />
    </motion.div>
  )
}

