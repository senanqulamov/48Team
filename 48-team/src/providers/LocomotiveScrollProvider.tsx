"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface LocomotiveScrollProviderProps {
  children: ReactNode
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let locomotiveScroll: any

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default

      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-revealed",
          scrollbarContainer: false,
          lenisOptions: {
            lerp: 0.1,
            duration: 1.2,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        })

        // Update scroll on window resize
        const handleResize = () => {
          locomotiveScroll.update()
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (locomotiveScroll) locomotiveScroll.destroy()
        }
      }
    }

    initLocomotiveScroll()

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}
