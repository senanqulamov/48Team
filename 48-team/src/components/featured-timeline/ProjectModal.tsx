"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"

export type ProjectModalProps = {
  open: boolean
  onCloseAction: () => void
  from?: "left" | "right"
  labelledBy?: string
  children: React.ReactNode
}

/**
 * Accessible, animated side-panel modal for project case studies.
 * - Uses Radix Dialog for focus trap, ESC, and overlay click close
 * - Framer Motion for panel slide-in/out
 * - Locks background scroll while open
 * - z-index: overlay z-[999], panel z-[1000]
 */
export default function ProjectModal({ open, onCloseAction, from = "right", labelledBy, children }: ProjectModalProps) {
  // Additional body scroll locking to ensure background does not scroll in all browsers
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const initialX = from === "left" ? "-100%" : "100%"
  const sideAnchor = from === "left"
    ? "left-0 right-0 md:right-auto md:left-0 md:border-r"
    : "left-0 right-0 md:left-auto md:right-0 md:border-l"

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onCloseAction() }}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
            >
              <Dialog.Overlay asChild>
                <motion.div
                  className="absolute inset-0 z-[999] bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  className={`absolute inset-y-0 ${sideAnchor} md:w-[72%] lg:w-[66%] bg-card/90 backdrop-blur-xl border border-primary/10 shadow-2xl outline-none z-[1000]`}
                  initial={{ x: initialX }}
                  animate={{ x: 0 }}
                  exit={{ x: initialX }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  aria-labelledby={labelledBy}
                >
                  {children}
                </motion.div>
              </Dialog.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
