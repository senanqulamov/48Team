"use client"

import { useEffect } from "react"
import type { RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// GSAP plugin registration is idempotent.
gsap.registerPlugin(ScrollTrigger)

export interface GsapRevealOnScrollOptions {
  /** ScrollTrigger start position. */
  start?: string
  /** ScrollTrigger end position. */
  end?: string
  /** ScrollTrigger scrub value. */
  scrub?: boolean | number
  /** Initial translateY for reveal. */
  yFrom?: number
  /** Initial opacity. */
  opacityFrom?: number
  /** Reduce motion: if true, no animation is attached. */
  disabled?: boolean
}

/**
 * Applies the same reveal used on `AllProjectsPageClient` cards:
 * clipPath + opacity + translateY with ScrollTrigger scrub.
 */
export function useGsapRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  {
    start = "top 85%",
    end = "top 50%",
    scrub = 1,
    yFrom = 100,
    opacityFrom = 0,
    disabled = false,
  }: GsapRevealOnScrollOptions = {}
) {
  useEffect(() => {
    if (disabled) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: opacityFrom,
          y: yFrom,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [ref, start, end, scrub, yFrom, opacityFrom, disabled])
}
