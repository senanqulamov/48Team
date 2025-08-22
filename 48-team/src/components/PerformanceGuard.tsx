"use client"

import * as React from "react"

type NavigatorWithDeviceMemory = Navigator & { deviceMemory?: number }

function isLowEndHeuristic(): boolean {
  if (typeof window === "undefined") return false
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  const isTouch = "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0
  const lowCPU = (navigator.hardwareConcurrency ?? 8) <= 4
  const lowMem = ((navigator as NavigatorWithDeviceMemory).deviceMemory ?? 8) <= 4
  const highDpr = (window.devicePixelRatio ?? 1) > 2
  return prefersReducedMotion || isTouch || lowCPU || lowMem || highDpr
}

export default function PerformanceGuard() {
  React.useEffect(() => {
    const setFlag = (low: boolean) => {
      if (low) {
        document.body.classList.add("low-end")
        window.__LOW_END__ = true
      } else {
        document.body.classList.remove("low-end")
        window.__LOW_END__ = false
      }
    }

    setFlag(isLowEndHeuristic())

    const onChange = () => setFlag(isLowEndHeuristic())

    window.addEventListener("resize", onChange)
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    mql?.addEventListener?.("change", onChange as EventListener)

    return () => {
      window.removeEventListener("resize", onChange)
      mql?.removeEventListener?.("change", onChange as EventListener)
    }
  }, [])

  return null
}
