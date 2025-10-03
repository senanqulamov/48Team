"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

export type ProjectModalProps = {
  open: boolean
  onCloseAction: () => void
  from?: "left" | "right"
  labelledBy?: string
  children: React.ReactNode
}

const ModalCloseContext = React.createContext<{ requestClose: () => void } | null>(null)
export function useProjectModalClose() {
  return React.useContext(ModalCloseContext)
}

export default function ProjectModal({ open, onCloseAction, from = "right", labelledBy, children }: ProjectModalProps) {
  const initialX = from === "left" ? "-100%" : "100%"
  const sideAnchor = from === "left"
    ? "left-0 right-0 md:right-auto md:left-0 md:border-r"
    : "left-0 right-0 md:left-auto md:right-0 md:border-l"

  // Old modal logic: lock on open, unlock on close (no presence-based lifecycle)
  React.useEffect(() => {
    if (!open) return
    lockScroll()
    return () => {
      unlockScroll()
    }
  }, [open])

  const beginClose = React.useCallback(() => {
    onCloseAction()
  }, [onCloseAction])

  // Always provide a Dialog.Title for a11y; fall back to a hidden title when none is provided
  const generatedTitleId = React.useId()
  const contentLabelledBy = labelledBy ?? generatedTitleId

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal forceMount>
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
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="absolute inset-0 z-[999] bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={beginClose}
                  aria-hidden="true"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild forceMount>
                <motion.div
                  className={`absolute inset-y-0 ${sideAnchor} md:w-[72%] lg:w-[66%] bg-card/90 backdrop-blur-xl border border-primary/10 shadow-2xl outline-none z-[1000]`}
                  initial={{ x: initialX }}
                  animate={{ x: 0 }}
                  exit={{ x: initialX }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  aria-labelledby={contentLabelledBy}
                >
                  {/* Always render a hidden title to satisfy Radix a11y requirement */}
                  <Dialog.Title id={generatedTitleId} className="sr-only">
                    Dialog
                  </Dialog.Title>
                  <EscapeToClose onEscape={beginClose} />
                  <ModalCloseContext.Provider value={{ requestClose: beginClose }}>
                    {children}
                  </ModalCloseContext.Provider>
                </motion.div>
              </Dialog.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function EscapeToClose({ onEscape }: { onEscape: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onEscape()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onEscape])
  return null
}
