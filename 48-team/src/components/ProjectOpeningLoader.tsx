"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Stage = "command" | "building" | "pixelate" | "reveal"

const COMMAND_TEXT = "$ npm run build:project"

function useTypewriter(text: string, enabled: boolean, speedMs = 24) {
  const [out, setOut] = useState("")

  useEffect(() => {
    if (!enabled) return
    let i = 0
    setOut("")
    const id = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speedMs)
    return () => window.clearInterval(id)
  }, [text, enabled, speedMs])

  const done = enabled && out.length === text.length
  return { out, done }
}

export default function ProjectOpeningLoader({
  visible,
  onDoneAction,
}: {
  visible: boolean
  onDoneAction?: () => void
}) {
  const [stage, setStage] = useState<Stage>("command")
  const [progress, setProgress] = useState(0)

  const { out: typedCommand, done: commandDone } = useTypewriter(
    COMMAND_TEXT,
    visible && stage === "command"
  )

  // Reset when (re)opened
  useEffect(() => {
    if (!visible) return
    setStage("command")
    setProgress(0)
  }, [visible])

  // Stage machine
  useEffect(() => {
    if (!visible) return

    if (stage === "command" && commandDone) {
      const t = window.setTimeout(() => setStage("building"), 250)
      return () => window.clearTimeout(t)
    }

    if (stage === "building") {
      const start = Date.now()
      const duration = 1200
      const tick = () => {
        const p = Math.min(1, (Date.now() - start) / duration)
        setProgress(Math.round(p * 100))
        if (p < 1) {
          window.requestAnimationFrame(tick)
        } else {
          window.setTimeout(() => setStage("pixelate"), 180)
        }
      }
      window.requestAnimationFrame(tick)
    }

    if (stage === "pixelate") {
      const t = window.setTimeout(() => setStage("reveal"), 520)
      return () => window.clearTimeout(t)
    }

    return
  }, [visible, stage, commandDone])

  // Hard safety: if we ever reach reveal, auto-complete shortly after.
  useEffect(() => {
    if (!visible) return
    if (stage !== "reveal") return
    const t = window.setTimeout(() => onDoneAction?.(), 700)
    return () => window.clearTimeout(t)
  }, [visible, stage, onDoneAction])

  const logs = useMemo(() => {
    return [
      "info  - Linting and checking validity of types…",
      "info  - Collecting page data…",
      "info  - Generating static pages…",
      "info  - Finalizing page optimization…",
      "warn  - Using cached build artifacts",
      "success - Build completed.",
    ]
  }, [])

  const pixelGridOpacity = stage === "pixelate" ? 1 : stage === "reveal" ? 0 : 0

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
        >
          {/* Terminal */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            {/* Pixelate the CONTENT itself */}
            <motion.div
              className="w-full max-w-2xl"
              animate={
                stage === "pixelate"
                  ? {
                      filter: "blur(8px) contrast(1.2) saturate(0.9)",
                      transform: "scale(1.015)",
                    }
                  : stage === "reveal"
                    ? {
                        filter: "blur(0px) contrast(1) saturate(1)",
                        transform: "scale(1)",
                      }
                    : {
                        filter: "blur(0px)",
                        transform: "scale(1)",
                      }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "filter, transform" }
              }
            >
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 text-xs font-mono text-gray-400">zsh — build</div>
                </div>

                <div className="p-5 font-mono text-xs md:text-sm text-white/90 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-cyan-400">~/portfolio</span>
                    <span className="text-white/70">{typedCommand}</span>
                    {stage === "command" && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-white/70"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Logs */}
                  {(stage === "building" || stage === "pixelate" || stage === "reveal") && (
                    <div className="space-y-1 text-white/70">
                      {logs.map((l, i) => (
                        <motion.div
                          key={l}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          {l}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Progress */}
                  {(stage === "building" || stage === "pixelate") && (
                    <div className="pt-3 space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "easeOut", duration: 0.2 }}
                        />
                      </div>
                      <div className="text-[11px] text-white/50">Compiling… {progress}%</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pixel grid overlay (only used for the pixelate moment) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: pixelGridOpacity,
              backgroundSize:
                stage === "pixelate" ? "18px 18px" : stage === "reveal" ? "60px 60px" : "60px 60px",
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
