"use client"

import { useRef, useEffect } from "react"

export default function ProgressiveBlurNoise({ show }: { show: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const blurIntensity = useRef<number>(20)
  const noiseDataRef = useRef<Uint8ClampedArray | null>(null)

  // Pre-generate noise data
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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Regenerate noise on resize
      noiseDataRef.current = generateNoise(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    let lastTime = 0
    const fpsInterval = 1000 / 30 // Target 30fps instead of 60fps

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

      // Only fill if showing
      if (show) {
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Create image data from pre-generated noise
      const imageData = new ImageData(
          new Uint8ClampedArray(noiseDataRef.current),
          canvas.width,
          canvas.height
      )

      // Apply blur filter if show is true
      if (show) {
        ctx.filter = `blur(${blurIntensity.current}px)`
        blurIntensity.current = Math.max(0, blurIntensity.current - 0.2)
      } else {
        ctx.filter = "none"
        blurIntensity.current = 20
      }

      ctx.putImageData(imageData, 0, 0)

      animationFrameId.current = requestAnimationFrame(drawNoise)
    }

    // Start animation
    animationFrameId.current = requestAnimationFrame(drawNoise)

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
          className={`fixed top-0 left-0 w-full h-full z-[1000] pointer-events-none transition-opacity duration-1000 ease-out`}
          style={{
            mixBlendMode: "screen",
            backgroundColor: show ? "#f5deb329" : "transparent",
            transition: "background-color 1.5s ease-in-out",
            zIndex: show ? 100 : -1,
          }}
      />
  )
}