"use client"

import { useRef, useEffect } from "react"

export default function ProgressiveBlurNoise({ show }: { show: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const blurIntensity = useRef<number>(20)
  const noiseDataRef = useRef<Uint8ClampedArray | null>(null)
  const dimsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const runningRef = useRef(false)

  // Pre-generate noise data at a given resolution
  const generateNoise = (width: number, height: number) => {
    const size = width * height * 4
    const data = new Uint8ClampedArray(size)
    for (let i = 0; i < size; i += 4) {
      const val = Math.random() * 255
      data[i] = data[i + 1] = data[i + 2] = val
      data[i + 3] = 25 // transparency
    }
    return data
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const lowEnd = (window.__LOW_END__ === true) || prefersReducedMotion

    const scale = lowEnd ? 0.5 : 1 // downscale internal resolution on low-end

    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * scale))
      const h = Math.max(1, Math.floor(window.innerHeight * scale))
      dimsRef.current = { w, h }
      canvas.width = w
      canvas.height = h
      // CSS size stays full screen
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      noiseDataRef.current = generateNoise(w, h)
    }

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    let lastTime = 0
    const targetFps = lowEnd ? 20 : 30
    const fpsInterval = 1000 / targetFps

    const drawNoise = (timestamp: number) => {
      if (!ctx || !noiseDataRef.current) {
        animationFrameId.current = requestAnimationFrame(drawNoise)
        return
      }

      // Throttle frame rate
      const delta = timestamp - lastTime
      if (delta < fpsInterval) {
        animationFrameId.current = requestAnimationFrame(drawNoise)
        return
      }
      lastTime = timestamp - (delta % fpsInterval)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only render when visible
      if (show) {
        // Create image data from pre-generated noise
        const { w, h } = dimsRef.current
        const imageData = new ImageData(new Uint8ClampedArray(noiseDataRef.current), w, h)

        // Apply blur filter
        ctx.filter = `blur(${blurIntensity.current}px)`
        blurIntensity.current = Math.max(0, blurIntensity.current - (lowEnd ? 0.35 : 0.5))
        ctx.putImageData(imageData, 0, 0)

        // Stop animating once blur is done
        if (blurIntensity.current <= 0.1) {
          runningRef.current = false
          if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
          return
        }
      } else {
        // Not showing: ensure cleared and stop loop
        runningRef.current = false
        clear()
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
        return
      }

      animationFrameId.current = requestAnimationFrame(drawNoise)
    }

    // Init
    resize()
    window.addEventListener("resize", resize)

    // Start/stop loop based on `show`
    if (show && !runningRef.current) {
      runningRef.current = true
      blurIntensity.current = 20
      animationFrameId.current = requestAnimationFrame(drawNoise)
    } else if (!show) {
      runningRef.current = false
      clear()
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [show])

  return (
      <canvas
          ref={canvasRef}
          className={`fixed top-0 left-0 w-full h-full z-[1000] pointer-events-none transition-opacity duration-500 ease-out`}
          style={{
            mixBlendMode: "screen",
            backgroundColor: show ? "#f5deb329" : "transparent",
            zIndex: show ? 100 : -1,
          }}
      />
  )
}