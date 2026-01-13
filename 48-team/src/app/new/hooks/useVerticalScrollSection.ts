import { useEffect, useRef } from "react"
import gsap from "gsap"

/**
 * Custom hook for vertical scroll hijacking in Section 4
 * LOCKS horizontal scroll when Section 4 is centered
 * Forces user to complete vertical scroll before allowing horizontal continuation
 */
export function useVerticalScrollSection() {
  const isLockedOnSection4 = useRef(false)
  const currentScrollTop = useRef(0)
  const targetScrollTop = useRef(0)
  const animationFrameId = useRef<number | null>(null)
  const verticalScrollComplete = useRef(false)

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const horizontalContainer = document.querySelector(".horizontal-container")?.parentElement as HTMLElement
      const section4Content = document.getElementById("section-4-content")

      if (!horizontalContainer || !section4Content) {
        console.warn("Vertical scroll: containers not found")
        return
      }

      // Smooth scroll animation using RAF for Lenis-like feel
      const smoothScroll = () => {
        const ease = 0.08 // Lenis-like smoothness
        currentScrollTop.current += (targetScrollTop.current - currentScrollTop.current) * ease

        section4Content.scrollTop = currentScrollTop.current

        if (Math.abs(targetScrollTop.current - currentScrollTop.current) > 0.5) {
          animationFrameId.current = requestAnimationFrame(smoothScroll)
        } else {
          animationFrameId.current = null
        }
      }

      const handleWheel = (e: WheelEvent) => {
        const sections = document.querySelectorAll<HTMLElement>(".horizontal-section")
        const section4 = Array.from(sections)[3] // Section 4 is index 3

        if (!section4) return

        const containerScrollLeft = horizontalContainer.scrollLeft
        const section4Left = section4.offsetLeft
        const viewportWidth = window.innerWidth

        // Calculate how centered Section 4 is
        const distanceFromCenter = Math.abs(containerScrollLeft - section4Left)
        const isCentered = distanceFromCenter < viewportWidth * 0.1 // Within 10% of center
        const isApproachingCenter = distanceFromCenter < viewportWidth * 0.3

        // Determine scroll direction (left vs right)
        const isScrollingRight = e.deltaY > 0
        const isScrollingLeft = e.deltaY < 0

        // Check if coming from Section 5 (scrolling left/back)
        const isComingFromSection5 = containerScrollLeft > section4Left + viewportWidth * 0.3

        // LOCK LOGIC: Lock when centered, but only if coming from Section 3 (not Section 5)
        if (isCentered && !verticalScrollComplete.current && !isComingFromSection5) {
          // Lock Section 4 in place if not already locked
          if (!isLockedOnSection4.current) {
            isLockedOnSection4.current = true

            // Smooth snap to perfect center
            gsap.to(horizontalContainer, {
              scrollLeft: section4Left,
              duration: 0.6,
              ease: "power2.out"
            })

            // Sync scroll refs
            currentScrollTop.current = section4Content.scrollTop
            targetScrollTop.current = section4Content.scrollTop
          }
        }

        // Handle scrolling when Section 4 is locked
        if (isLockedOnSection4.current) {
          const maxScroll = section4Content.scrollHeight - section4Content.clientHeight

          // ALWAYS prevent default when locked - force vertical scroll only
          e.preventDefault()
          e.stopPropagation()

          // Scrolling down
          if (isScrollingRight) {
            if (targetScrollTop.current < maxScroll - 5) {
              // Still scrolling vertically down
              targetScrollTop.current = Math.min(maxScroll, targetScrollTop.current + e.deltaY)

              if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(smoothScroll)
              }
            } else {
              // Reached bottom - mark complete and unlock
              verticalScrollComplete.current = true
              isLockedOnSection4.current = false

              // Smoothly continue horizontal scroll to Section 5
              const section5Left = sections[4]?.offsetLeft || section4Left + viewportWidth
              gsap.to(horizontalContainer, {
                scrollLeft: section5Left,
                duration: 1.2,
                ease: "power2.inOut"
              })
            }
          }
          // Scrolling up
          else if (isScrollingLeft) {
            if (targetScrollTop.current > 5) {
              // Still scrolling vertically up
              targetScrollTop.current = Math.max(0, targetScrollTop.current + e.deltaY)

              if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(smoothScroll)
              }
            } else {
              // Reached top - unlock and allow going back to Section 3
              verticalScrollComplete.current = false
              isLockedOnSection4.current = false

              // Smoothly scroll back to Section 3
              const section3Left = sections[2]?.offsetLeft || 0
              gsap.to(horizontalContainer, {
                scrollLeft: section3Left,
                duration: 1.2,
                ease: "power2.inOut"
              })
            }
          }
        }
        // Not locked - handle approach from Section 3 (scrolling right)
        else if (isApproachingCenter && isScrollingRight && !verticalScrollComplete.current && !isComingFromSection5) {
          // User is scrolling toward Section 4 from Section 3
          e.preventDefault()
          e.stopPropagation()

          // Smoothly guide to Section 4 center
          gsap.to(horizontalContainer, {
            scrollLeft: section4Left,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              isLockedOnSection4.current = true
            }
          })
        }
        // Coming from Section 5, scrolling left/back - allow passing through
        else if (isComingFromSection5 && isScrollingLeft) {
          // Let user scroll past Section 4 to Section 3 without locking
          // Don't prevent default, allow natural horizontal scroll

          // Reset Section 4 state when passing through from right to left
          if (verticalScrollComplete.current) {
            verticalScrollComplete.current = false
            gsap.to(section4Content, {
              scrollTop: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                currentScrollTop.current = 0
                targetScrollTop.current = 0
              }
            })
          }
        }
        // Moving away from Section 4 after completing vertical scroll (going to Section 5)
        else if (verticalScrollComplete.current && containerScrollLeft > section4Left + viewportWidth * 0.5) {
          // Moved past Section 4 to Section 5, keep complete flag until user goes back
          // Don't reset yet - we need this flag to allow passing through when returning
        }
        // Coming back from far left (Section 1 or 2)
        else if (containerScrollLeft < section4Left - viewportWidth * 0.5) {
          // Reset everything when far from Section 4
          if (isLockedOnSection4.current || verticalScrollComplete.current) {
            isLockedOnSection4.current = false
            verticalScrollComplete.current = false

            gsap.to(section4Content, {
              scrollTop: 0,
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                currentScrollTop.current = 0
                targetScrollTop.current = 0
              }
            })
          }
        }
      }

      // Add wheel event listener with capture to intercept early
      window.addEventListener("wheel", handleWheel, { passive: false, capture: true })

      return () => {
        window.removeEventListener("wheel", handleWheel, { capture: true } as AddEventListenerOptions)
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { isLocked: isLockedOnSection4.current }
}

