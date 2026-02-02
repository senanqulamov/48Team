"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { ExternalLink, Terminal, Code2, GitBranch, Sparkles, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/lib/projects"
import type { Project } from "@/types/project"
import { useIsMobile } from "@/hooks/use-mobile"
import { armProjectOpeningLoader } from "@/lib/project-transition"

/**
 * LEGENDARY CODE MATRIX TIMELINE
 * Terminal-style reveals, 3D rotations, particle effects, glitch animations
 * The most unique developer portfolio timeline ever created
 */

// Hexagonal grid background
const HexGrid = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.03])

    return (
        <motion.div
            ref={ref}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity }}
        >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
        </motion.div>
    )
}

// Particle explosion on hover - optimized
const ParticleExplosion = ({ active }: { active: boolean }) => {
    // Reduced from 12 to 6 particles for better performance
    const particles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        angle: (i * 60) * (Math.PI / 180),
    }))

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full will-change-transform"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={active ? {
                        x: Math.cos(p.angle) * 100,
                        y: Math.sin(p.angle) * 100,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    } : {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}
        </div>
    )
}

interface IDEWindowCardProps {
    project: Project
}

const IDEWindowCard = ({ project }: IDEWindowCardProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [imageLoaded, setImageLoaded] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [compiling, setCompiling] = useState(false)

    const techs = project.techTags || project.technologies || []

    // Exact reveal effect from AllProjectsPageClient.tsx
    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Kill any existing triggers tied to this element just in case of re-mounts
        ScrollTrigger.getAll().forEach((t) => {
            const trigger = (t as unknown as { trigger?: unknown }).trigger
            if (trigger === el) t.kill()
        })

        gsap.fromTo(
            el,
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                opacity: 0,
                y: 100,
            },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1,
                },
            }
        )

        // Timeline has images that can shift layout; refresh once.
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            cancelAnimationFrame(raf)
            ScrollTrigger.getAll().forEach((t) => {
                const trigger = (t as unknown as { trigger?: unknown }).trigger
                if (trigger === el) t.kill()
            })
        }
    }, [])

    const handleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) return
        armProjectOpeningLoader({ from: "timeline" })
        setCompiling(true)
        setTimeout(() => {
            router.push(`/projects/${project.id}`)
        }, 800)
    }

    // Syntax color for tech
    const getTechColor = (tech: string) => {
        const colors: { [key: string]: string } = {
            'react': 'text-cyan-400',
            'nextjs': 'text-white',
            'next.js': 'text-white',
            'vue': 'text-emerald-400',
            'typescript': 'text-blue-400',
            'javascript': 'text-yellow-400',
            'python': 'text-blue-500',
            'node': 'text-green-500',
            'php': 'text-purple-400',
        }
        const key = tech.toLowerCase()
        for (const [k, v] of Object.entries(colors)) {
            if (key.includes(k)) return v
        }
        return 'text-gray-400'
    }

    return (
        <motion.div
            ref={ref}
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="relative cursor-pointer"
                onClick={handleClick}
            >
                {/* IDE Window Container */}
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl max-w-3xl mx-auto">
                    {/* Window Title Bar */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 shadow-2xl px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Terminal className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs text-gray-400 font-mono">{project.title}.project</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {project.featured && (
                                <div className="px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-[10px] text-primary font-bold">
                                    FEATURED
                                </div>
                            )}
                            <Code2 className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="bg-[#252526] border-b border-[#3e3e3e] px-2 py-0 flex items-center gap-1 overflow-x-auto">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e] border-r border-[#3e3e3e]">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-xs text-gray-300 font-mono">preview.tsx</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500">
                            <span className="text-xs font-mono">readme.md</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative">
                        {/* Image Preview */}
                        <div className="relative h-[280px] overflow-hidden">
                            {!imageLoaded && (
                                <div className="absolute bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50">
                                    <motion.div
                                        className="h-full w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center gap-2 text-primary">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            <span className="ml-2 text-xs font-mono">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Image
                                src={project.image || project.images?.[0] || "/placeholder.jpg"}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className={`object-cover transition-all duration-700 ${
                                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                                } ${hovered ? "scale-105" : "scale-100"}`}
                                onLoad={() => setImageLoaded(true)}
                                loading="lazy"
                            />

                            {/* Scan line effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ willChange: "transform" }}
                            />

                            {/* Holographic overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 mix-blend-overlay" />

                            {/* Category Badge */}
                            {project.category && (
                                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-primary/30 rounded text-primary text-xs font-mono">
                                    <span className="text-primary/60">{'<'}</span>{project.category}<span className="text-primary/60">{'/>'}</span>
                                </div>
                            )}

                            {/* Status indicator */}
                            {project.status && (
                                <div className="absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-primary/30 rounded">
                                    <div className={`w-2 h-2 rounded-full ${
                                        project.status === "Active" || project.status === "Completed"
                                            ? "bg-green-400 animate-pulse"
                                            : "bg-yellow-400 animate-pulse"
                                    }`} />
                                    <span className="text-xs font-mono text-gray-300">{project.status}</span>
                                </div>
                            )}

                            {/* Quick Actions - Glowing on hover */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-3 right-3 flex gap-2"
                            >
                                {project.demoUrl && (
                                    <motion.a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-lg hover:bg-primary/30 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        <ExternalLink className="w-4 h-4 text-primary" />
                                    </motion.a>
                                )}
                                {project.links?.github && project.links.github !== "#" && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-lg hover:bg-primary/30 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        <GitBranch className="w-4 h-4 text-primary" />
                                    </motion.a>
                                )}
                            </motion.div>

                            {/* Particle explosion on hover */}
                            <ParticleExplosion active={hovered} />
                        </div>

                        {/* Code Editor Content Section */}
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-primary/50 p-4 space-y-3">
                            {/* Line numbers + content */}
                            <div className="flex gap-4 font-mono text-xs">
                                <div className="text-[#858585] select-none space-y-1">
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                    <div>4</div>
                                    <div>5</div>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {/* Date comment */}
                                    <div className="text-[#6a9955]">
                                        {`// ${project.yearRange || project.date}`}
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <span className="text-[#c586c0]">const</span>{' '}
                                        <span className="text-[#4fc1ff]">project</span>{' '}
                                        <span className="text-white">=</span>{' '}
                                        <span className="text-[#ce9178]">&quot;{project.title}&quot;</span>
                                    </div>

                                    {/* Subtitle */}
                                    <div>
                                        <span className="text-[#c586c0]">const</span>{' '}
                                        <span className="text-[#4fc1ff]">description</span>{' '}
                                        <span className="text-white">=</span>{' '}
                                        <span className="text-[#ce9178] line-clamp-1">&quot;{project.subtitle}&quot;</span>
                                    </div>

                                    {/* Client */}
                                    {project.client && (
                                        <div>
                                            <span className="text-[#c586c0]">const</span>{' '}
                                            <span className="text-[#4fc1ff]">client</span>{' '}
                                            <span className="text-white">=</span>{' '}
                                            <span className="text-[#ce9178]">&quot;{project.client}&quot;</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tech Stack - Syntax highlighted */}
                            {techs.length > 0 && (
                                <div className="pt-2 border-t border-[#3e3e3e]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Tech Stack</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {techs.slice(0, 5).map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                                transition={{ delay: 0.1 * i, duration: 0.3 }}
                                                className={`px-2 py-1 bg-[#2d2d30] border border-[#3e3e3e] rounded text-[10px] font-mono ${getTechColor(tech)} hover:border-primary/40 transition-all cursor-default`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                        {techs.length > 5 && (
                                            <span className="px-2 py-1 bg-[#2d2d30] border border-[#3e3e3e] rounded text-[10px] font-mono text-gray-500">
                        +{techs.length - 5}
                      </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <GitBranch className="w-3 h-3" />
                                    <span>main</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Featured Build</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white/70">UTF-8</span>
                                <div className="w-px h-3 bg-white/30" />
                                <span className="text-white/70">TypeScript</span>
                            </div>
                        </div>

                        {/* Compiling overlay */}
                        {compiling && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                            >
                                <div className="text-primary font-mono text-sm mb-4">
                                    $ npm run build:project
                                </div>
                                <div className="w-48 h-2 bg-[#2d2d30] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-accent"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </div>
                                <div className="text-gray-500 text-xs mt-2 font-mono">Compiling...</div>
                            </motion.div>
                        )}
                    </div>

                    {/* Neon glow on hover */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-lg"
                        animate={{
                            boxShadow: hovered
                                ? "0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2), inset 0 0 20px rgba(6,182,212,0.1)"
                                : "none"
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

// Git commit style marker
const CommitMarker = ({ year, index }: { year: string; index: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="relative">
                {/* Pulsing rings */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/40 blur-md"
                />

                {/* Main commit node */}
                <div className="relative w-10 h-10 rounded-full bg-[#1e1e1e] border-2 border-primary shadow-lg shadow-primary/50 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-primary" />
                </div>
            </div>

            {/* Commit info */}
            <div className="px-3 py-1.5 bg-[#1e1e1e] border border-primary/30 rounded backdrop-blur-sm">
                <p className="text-xs font-bold text-primary font-mono">{year}</p>
            </div>

            {/* Commit hash */}
            <div className="text-[10px] font-mono text-gray-600">
                #{String(index + 1).padStart(3, '0')}
            </div>
        </motion.div>
    )
}

export default function LegendaryCodeMatrixTimeline() {
    const isMobile = useIsMobile()
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    })

    const cursorTop = useTransform(springProgress, (v) => `${v * 100}%`)

    const featuredProjects = projects
        .filter(p => p.featured)
        .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999))

    return (
        <section className="w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Hexagonal grid */}
            <HexGrid />

            {/* Terminal Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative z-10"
            >
                {/* Terminal window */}
                <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl max-w-3xl mx-auto">
                    {/* Title bar */}
                    <div className="bg-[#323233] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e3e]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <span className="text-xs text-gray-400 font-mono ml-2">zsh -- featured-projects</span>
                    </div>

                    {/* Terminal content */}
                    <div className="p-6 font-mono text-sm space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">➜</span>
                            <span className="text-cyan-400">~/portfolio</span>
                            <span className="text-gray-400">git:(</span>
                            <span className="text-red-400">main</span>
                            <span className="text-gray-400">)</span>
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="overflow-hidden"
                        >
                            <span className="text-white">$ cat featured-projects.md</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="pt-4 space-y-1"
                        >
                            <div className="text-3xl md:text-5xl font-bold text-primary mb-2">
                                # Featured Projects
                            </div>
                            <div className="text-gray-400">
                                &gt; Legendary builds that push boundaries
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                                <span>└─ {featuredProjects.length}+ repositories found</span>
                                <span>└─ Status: ✓ Production Ready</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Project Timeline */}
            <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
                <div className="relative">
                    {/* Vertical git branch line - desktop only */}
                    {!isMobile && (
                        <>
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                            {/* Animated cursor following scroll */}
                            <motion.div
                                className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4"
                                style={{ top: cursorTop }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full border-2 border-primary rounded-sm"
                                />
                            </motion.div>
                        </>
                    )}

                    {/* IDE Window Cards */}
                    <div className="space-y-16 md:space-y-24">
                        {featuredProjects.map((project, idx) => {
                            const side: "left" | "right" = idx % 2 === 0 ? "left" : "right"

                            return (
                                <div key={project.id} className="relative">
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-12 items-center">
                                        {side === "left" ? (
                                            <>
                                                <div className="flex justify-end">
                                                    <div className="w-full max-w-lg">
                                                        <IDEWindowCard project={project} />
                                                    </div>
                                                </div>
                                                <CommitMarker year={project.yearRange || project.date || ""} index={idx} />
                                                <div />
                                            </>
                                        ) : (
                                            <>
                                                <div />
                                                <CommitMarker year={project.yearRange || project.date || ""} index={idx} />
                                                <div className="flex justify-start">
                                                    <div className="w-full max-w-lg">
                                                        <IDEWindowCard project={project} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden space-y-6">
                                        <div className="w-full max-w-lg mx-auto">
                                            <IDEWindowCard project={project} />
                                        </div>
                                        <div className="flex justify-center">
                                            <CommitMarker year={project.yearRange || project.date || ""} index={idx} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Terminal Footer CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mt-20 md:mt-32 relative z-10"
            >
                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#3e3e3e] shadow-2xl max-w-xl mx-auto">
                    <div className="bg-[#323233] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e3e]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                    </div>
                    <div className="p-6 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-green-400">➜</span>
                            <span className="text-white">$ npm run explore:all-projects</span>
                        </div>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-black rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                        >
                            <Terminal className="w-5 h-5" />
                            <span>View All Projects</span>
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                        <div className="mt-4 text-xs text-gray-500">
                            <span className="text-green-400">✓</span> Build completed in 0.8s
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}