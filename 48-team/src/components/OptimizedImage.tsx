"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export default function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  objectFit = "cover"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    // Preload image for better caching
    if (!priority && typeof window !== 'undefined') {
      const img = new window.Image()
      img.src = src
      img.onload = () => setIsLoading(false)
      img.onerror = () => {
        setHasError(true)
        setImageSrc("/images/null/null_1.png")
        setIsLoading(false)
      }
    }
  }, [src, priority])

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading Skeleton */}
      {isLoading && !priority && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 ${className}`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Actual Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading && !priority ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className={fill ? 'w-full h-full' : ''}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={className}
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={85}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setImageSrc("/images/null/null_1.png")
            setIsLoading(false)
          }}
          style={{
            objectFit: objectFit,
          }}
        />
      </motion.div>

      {/* Error State Indicator (Optional) */}
      {hasError && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-red-500/20 backdrop-blur-sm rounded text-xs text-red-300 border border-red-500/40">
          Failed to load
        </div>
      )}
    </div>
  )
}

