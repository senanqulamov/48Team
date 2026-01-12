"use client"

import { useEffect, useRef } from "react"

export default function EnhancedGradientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: false })
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        // Multiple gradient orbs with smoother colors
        const orbs = [
            { x: 0.2, y: 0.3, radius: 0.4, color: [6, 182, 212], speed: 0.3, phaseX: 0, phaseY: 0 },
            { x: 0.8, y: 0.6, radius: 0.45, color: [20, 184, 166], speed: 0.25, phaseX: 2, phaseY: 3 },
            { x: 0.5, y: 0.5, radius: 0.35, color: [14, 165, 233], speed: 0.35, phaseX: 4, phaseY: 1 },
            { x: 0.1, y: 0.8, radius: 0.3, color: [34, 211, 238], speed: 0.28, phaseX: 1, phaseY: 5 },
        ]

        let time = 0
        let animationId: number

        const animate = () => {
            time += 0.003

            // Base dark background
            ctx.fillStyle = "#000000"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw each orb with smooth movement
            orbs.forEach((orb) => {
                const centerX = canvas.width * orb.x + Math.sin(time * orb.speed + orb.phaseX) * canvas.width * 0.1
                const centerY = canvas.height * orb.y + Math.cos(time * orb.speed + orb.phaseY) * canvas.height * 0.1
                const radius = Math.min(canvas.width, canvas.height) * orb.radius

                // Pulsing effect
                const pulse = 0.85 + Math.sin(time * 2 + orb.phaseX) * 0.15
                const finalRadius = radius * pulse

                // Create radial gradient with better blending
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, finalRadius
                )

                const [r, g, b] = orb.color
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`)
                gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.25)`)
                gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.1)`)
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

                ctx.fillStyle = gradient
                ctx.fillRect(
                    centerX - finalRadius,
                    centerY - finalRadius,
                    finalRadius * 2,
                    finalRadius * 2
                )
            })

            // Add subtle animated noise texture
            if (Math.random() > 0.7) {
                ctx.fillStyle = `rgba(6, 182, 212, ${Math.random() * 0.03})`
                for (let i = 0; i < 20; i++) {
                    const x = Math.random() * canvas.width
                    const y = Math.random() * canvas.height
                    ctx.fillRect(x, y, 1, 1)
                }
            }

            // Add flowing light streaks
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 + Math.sin(time * 3) * 0.04})`
            ctx.lineWidth = 2
            ctx.beginPath()
            for (let x = 0; x < canvas.width; x += 10) {
                const y = canvas.height * 0.5 + Math.sin(x * 0.01 + time * 2) * canvas.height * 0.15
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{
                backgroundColor: "#000000"
            }}
        />
    )
}