// Centralized scroll lock utility used by modals/lightboxes
// Locks both <html> and <body> overflow with reference counting and offers a hard clear.

let lockCount = 0
let prevBodyOverflow = ""
let prevHtmlOverflow = ""
let prevBodyPaddingRight = ""
let prevHtmlPaddingRight = ""

function getScrollbarWidth(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth)
}

export function lockScroll() {
  if (typeof document === "undefined") return
  if (lockCount === 0) {
    prevBodyOverflow = document.body.style.overflow
    prevHtmlOverflow = document.documentElement.style.overflow
    prevBodyPaddingRight = document.body.style.paddingRight || ""
    prevHtmlPaddingRight = document.documentElement.style.paddingRight || ""

    const scrollbar = getScrollbarWidth()
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`
      document.documentElement.style.paddingRight = `${scrollbar}px`
    }

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
  }
  lockCount++
}

export function unlockScroll() {
  if (typeof document === "undefined") return
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = prevBodyOverflow
    document.documentElement.style.overflow = prevHtmlOverflow
    document.body.style.paddingRight = prevBodyPaddingRight
    document.documentElement.style.paddingRight = prevHtmlPaddingRight
  }
}

export function clearScrollLocks() {
  if (typeof document === "undefined") return
  lockCount = 0
  try {
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
    document.body.style.paddingRight = ""
    document.documentElement.style.paddingRight = ""
    document.body.classList.remove("overflow-hidden")
    document.documentElement.classList.remove("overflow-hidden")
  } catch {}
}
