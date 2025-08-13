"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <button
        onClick={scrollToNext}
        className="flex flex-col items-center text-primary/70 hover:text-primary transition-colors duration-300 group"
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2 opacity-80">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce group-hover:animate-pulse" />
      </button>
    </div>
  )
}

export default ScrollDownIndicator
