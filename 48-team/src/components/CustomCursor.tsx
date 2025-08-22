"use client"

import React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, type Transition } from "framer-motion"

// Define allowed cursor types
export type CursorType =
    | "default"
    | "pointer"
    | "zoom"
    | "close"
    | "prev"
    | "next"
    | "link"
    | "external"
    | "image"
    | "drag"
    | "play"
    | "pause"
    | "text"

// Lightweight custom cursor that follows the mouse smoothly
// and changes style/icon depending on hovered element

const isFinePointer = () => {
  if (typeof window === "undefined") return false
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  // Gate by low-end heuristic flag or prefers-reduced motion
  if (window.__LOW_END__ === true || prefersReduced) return false
  const mq = (q: string) => window.matchMedia && window.matchMedia(q).matches
  const hasFine = mq("(pointer: fine)") || mq("(any-pointer: fine)")
  const hasHover = mq("(hover: hover)") || mq("(any-hover: hover)")
  const ua = navigator.userAgent || ""
  const isMobileUA = /Mobi|Android|iP(ad|hone|od)|Tablet|Touch/i.test(ua)
  const hasTouch =
    (typeof navigator !== "undefined" && (navigator.maxTouchPoints ?? 0) > 0) ||
    "ontouchstart" in window ||
    mq("(pointer: coarse)") ||
    mq("(any-pointer: coarse)") ||
    isMobileUA
  return hasFine && hasHover && !hasTouch
}

const SELECTOR_POINTER = [
  "a",
  "button",
  "[role=button]",
  "input[type=button]",
  "input[type=submit]",
  "[data-cursor]",
  ".cursor-pointer",
].join(",")

function isCursorType(val?: string | null): val is CursorType {
  return (
      val === "default" ||
      val === "pointer" ||
      val === "zoom" ||
      val === "close" ||
      val === "prev" ||
      val === "next" ||
      val === "link" ||
      val === "external" ||
      val === "image" ||
      val === "drag" ||
      val === "play" ||
      val === "pause" ||
      val === "text"
  )
}

function closest<K extends keyof HTMLElementTagNameMap>(el: Element | null, tag: K): HTMLElementTagNameMap[K] | null {
  while (el) {
    if (el instanceof HTMLElement && el.tagName.toLowerCase() === tag) return el as HTMLElementTagNameMap[K]
    el = el.parentElement as Element | null
  }
  return null
}

function hasHoverCue(h: HTMLElement): boolean {
  const cls = h.className?.toString?.() ?? ""
  return cls.includes("hover:") || cls.includes("group-hover:")
}

function findCursorType(target: Element | null): CursorType {
  let el: Element | null = target
  let depth = 0
  // 1) Explicit override via data-cursor
  while (el && depth < 6) {
    const raw = (el as HTMLElement).dataset?.cursor?.toLowerCase() ?? null
    if (isCursorType(raw)) return raw as CursorType
    el = el.parentElement
    depth++
  }

  // 2) Semantic inference
  const a = closest(target, "a")
  if (a) {
    const isExternal = a.getAttribute("target") === "_blank" || (a.getAttribute("rel")?.includes("external") ?? false)
    return isExternal ? "external" : "link"
  }

  const btn = closest(target, "button")
  if (btn || (target as HTMLElement | null)?.getAttribute?.("role") === "button") return "pointer"

  // Images
  let el2: Element | null = target
  depth = 0
  while (el2 && depth < 6) {
    if (el2 instanceof HTMLElement && (el2.tagName.toLowerCase() === "img" || (el2 as HTMLElement).getAttribute("role") === "img")) {
      return "image"
    }
    el2 = el2.parentElement
    depth++
  }

  // Draggable/drag handles
  let el3: Element | null = target
  depth = 0
  while (el3 && depth < 6) {
    const h = el3 as HTMLElement
    if (h.getAttribute("draggable") === "true" || h.classList?.contains("drag-handle") || (h as HTMLElement).dataset?.cursor === "drag") {
      return "drag"
    }
    el3 = el3.parentElement
    depth++
  }

  // Text inputs / contenteditable
  let el4: Element | null = target
  depth = 0
  while (el4 && depth < 4) {
    const h = el4 as HTMLElement
    const tag = h.tagName?.toLowerCase()
    if (
        tag === "textarea" ||
        (tag === "input" && ["text", "search", "password", "email", "url", "tel"].includes((h as HTMLInputElement).type)) ||
        h.getAttribute("contenteditable") === "true"
    ) {
      return "text"
    }
    el4 = el4.parentElement
    depth++
  }

  // Inline onclick or Tailwind hover cues -> treat as clickable
  let el5: Element | null = target
  depth = 0
  while (el5 && depth < 6) {
    const h = el5 as HTMLElement
    const hasOnClickProp = typeof h.onclick === "function"
    const hasOnClickAttr = (h as HTMLElement).hasAttribute?.("onclick") ?? false
    if (hasOnClickProp || hasOnClickAttr || hasHoverCue(h)) {
      return "pointer"
    }
    el5 = el5.parentElement
    depth++
  }

  // Generic clickables
  el = target
  depth = 0
  while (el && depth < 5) {
    if ((el as HTMLElement).matches?.(SELECTOR_POINTER)) return "pointer"
    el = el.parentElement
    depth++
  }
  return "default"
}

export default function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const [cursorType, setCursorType] = React.useState<CursorType>("default")

  // Track pointer with smoothing
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 1400, damping: 80, mass: 0.25 })
  const y = useSpring(rawY, { stiffness: 1400, damping: 80, mass: 0.25 })

  React.useEffect(() => {
    if (!isFinePointer()) return
    setEnabled(true)
    document.body.classList.add("has-custom-cursor")

    const onFirstTouch: EventListener = () => {
      setEnabled(false)
      document.body.classList.remove("has-custom-cursor")
      cleanup()
    }
    const onRecheck = () => {
      const ok = isFinePointer()
      if (ok && !enabled) {
        setEnabled(true)
        document.body.classList.add("has-custom-cursor")
      } else if (!ok && enabled) {
        setEnabled(false)
        document.body.classList.remove("has-custom-cursor")
      }
    }

    window.addEventListener("touchstart", onFirstTouch, { once: true, passive: true })
    window.addEventListener("orientationchange", onRecheck)
    window.addEventListener("resize", onRecheck)

    function cleanup() {
      window.removeEventListener("touchstart", onFirstTouch)
      window.removeEventListener("orientationchange", onRecheck)
      window.removeEventListener("resize", onRecheck)
    }

    return () => {
      cleanup()
      document.body.classList.remove("has-custom-cursor")
    }
  }, [enabled])

  // Sizes per cursor type
  const sizeByType = React.useMemo<Record<CursorType, number>>(
      () => ({
        default: 32,
        pointer: 42,
        link: 44,
        external: 46,
        image: 44,
        zoom: 70,
        drag: 44,
        close: 48,
        prev: 64,
        next: 64,
        play: 44,
        pause: 44,
        text: 0,
      }),
      []
  )

  React.useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }
    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      const nextType = findCursorType(t)
      setCursorType(nextType)
    }

    const onOut = (e: MouseEvent) => {
      if ((e.relatedTarget as Node | null) === null) {
        setCursorType("default")
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseout", onOut)
    window.addEventListener("mouseenter", onEnter)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseout", onOut)
      window.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled, rawX, rawY])

  if (!enabled) return null

  const renderSize = sizeByType[cursorType]
  const showCircle = renderSize > 0
  const iconTransition: Transition = { type: "spring", stiffness: 420, damping: 28, mass: 0.4 }
  const hasIconActive = cursorType !== "default" && cursorType !== "text"

  return (
    <>
      {/* Main follower circle */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[20000] pointer-events-none"
        style={{ x, y }}
        animate={{ opacity: visible && showCircle ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/10 backdrop-blur-sm shadow-[0_0_24px_rgba(0,0,0,0.35)]"
          style={{ width: renderSize, height: renderSize }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white/95">
            <AnimatePresence mode="wait" initial={false}>
              {/* Pointer (click) */}
              {cursorType === "pointer" && (
                  <motion.svg
                      key="pointer"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </motion.svg>
              )}
              {/* Link */}
              {cursorType === "link" && (
                  <motion.svg
                      key="link"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <path d="M14 3h7v7" />
                    <path d="M10 14L21 3" />
                    <path d="M21 14v7h-7" />
                    <path d="M3 10v11h11" />
                  </motion.svg>
              )}
              {/* External */}
              {cursorType === "external" && (
                  <motion.svg
                      key="external"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <path d="M14 3h7v7" />
                    <path d="M10 14L21 3" />
                    <path d="M21 14v7h-7" />
                    <path d="M3 10v11h11" />
                  </motion.svg>
              )}
              {/* Image */}
              {cursorType === "image" && (
                  <motion.svg
                      key="image"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <rect x="3" y="5" width="28" height="14" rx="2" />
                    <circle cx="8" cy="10" r="2" />
                    <path d="M21 19l-7-7-4 4-3-3-4 4" />
                  </motion.svg>
              )}
              {/* Zoom */}
              {cursorType === "zoom" && (
                  <motion.svg
                      key="zoom"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <circle cx="10" cy="10" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M7 10h6M10 7v6" />
                  </motion.svg>
              )}
              {/* Drag */}
              {cursorType === "drag" && (
                  <motion.svg
                      key="drag"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    {/* Fingers */}
                    <path d="M9 5v5" />
                    <path d="M12 4v6" />
                    <path d="M15 5v5" />
                    <path d="M18 7v5" />
                    {/* Thumb curve into palm */}
                    <path d="M7 12c-2 0-3-1-3-2.4S5.2 7.2 7 7.2" />
                    {/* Palm/body */}
                    <path d="M6 12v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6" />
                  </motion.svg>
              )}
              {/* Close */}
              {cursorType === "close" && (
                  <motion.svg
                      key="close"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </motion.svg>
              )}
              {/* Prev/Next */}
              {cursorType === "prev" && (
                  <motion.svg
                      key="prev"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, x: 4, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -4, scale: 0.95 }}
                      transition={iconTransition}
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </motion.svg>
              )}
              {cursorType === "next" && (
                  <motion.svg
                      key="next"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, x: -4, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 4, scale: 0.95 }}
                      transition={iconTransition}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </motion.svg>
              )}
              {/* Play/Pause */}
              {cursorType === "play" && (
                  <motion.svg
                      key="play"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <path d="M8 5v14l11-7z" />
                  </motion.svg>
              )}
              {cursorType === "pause" && (
                  <motion.svg
                      key="pause"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={iconTransition}
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Tiny center dot for precision; hide on text */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[20001] pointer-events-none"
        style={{ x, y }}
        animate={{ opacity: visible && cursorType !== "text" && !hasIconActive ? 0.75 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.25 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white" />
      </motion.div>
    </>
  )
}
