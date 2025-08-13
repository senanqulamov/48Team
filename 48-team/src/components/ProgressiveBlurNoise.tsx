"use client"

import { useRef, useEffect } from "react"

export default function ProgressiveBlurNoise({ show }: { show: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)

  const blurIntensity = useRef<number>(20)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const drawNoise = () => {
      if (!ctx) return

      // Clear canvas with appropriate background color
      ctx.fillStyle = show ? "gray" : "transparent"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create noise texture
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const val = Math.random() * 255
        imageData.data[i] = val
        imageData.data[i + 1] = val
        imageData.data[i + 2] = val
        imageData.data[i + 3] = 25 // transparency (0-255)
      }

      // Apply blur filter if show is true
      if (show) {
        ctx.filter = `blur(${blurIntensity.current}px)`
        // Gradually reduce blur intensity
        blurIntensity.current = Math.max(0, blurIntensity.current - 0.2)
      } else {
        ctx.filter = "none"
        // Reset blur intensity when show becomes true again
        blurIntensity.current = 20
      }

      ctx.putImageData(imageData, 0, 0)

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(drawNoise)
    }

    // Start animation
    drawNoise()

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
        // opacity: show ? 1 : 0.5,
      }}
    />
  )
}
