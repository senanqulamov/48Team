"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Award } from "lucide-react"
import type { Project } from "@/types/project"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectGallery from "@/components/ProjectGallery"
import {ScrollIndicator} from "@/components/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger)

interface ProjectPageClientProps {
    project: Project
    nextProject: Project
}

// Immediate scroll to top
if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

export default function ProjectPageClient({ project, nextProject }: ProjectPageClientProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()

    // Hero parallax effects
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -1000])

    // Tech icon mapper - maps technology names to their icons/emojis
    const getTechIcon = (tech: string) => {
        const techLower = tech.toLowerCase()

        // Popular tech mappings - you can expand this
        const iconMap: { [key: string]: string } = {
            'react': '⚛️',
            'nextjs': '▲',
            'next.js': '▲',
            'vue': '🟢',
            'angular': '🅰️',
            'typescript': 'TS',
            'javascript': 'JS',
            'python': '🐍',
            'java': '☕',
            'php': '🐘',
            'node': '🟩',
            'nodejs': '🟩',
            'node.js': '🟩',
            'express': '⚡',
            'mongodb': '🍃',
            'postgresql': '🐘',
            'mysql': '🐬',
            'redis': '🔴',
            'docker': '🐳',
            'kubernetes': '☸️',
            'aws': '☁️',
            'firebase': '🔥',
            'graphql': '◈',
            'rest': '🔌',
            'api': '🔌',
            'tailwind': '🌊',
            'css': '🎨',
            'html': '📄',
            'git': '📚',
            'github': '🐙',
            'gitlab': '🦊',
            'figma': '🎨',
            'wordpress': '📰',
            'laravel': '🔺',
            'django': '🎸',
            'flutter': '🦋',
            'swift': '🍎',
            'kotlin': '🤖',
            'android': '🤖',
            'ios': '🍎',
            'opencart': '🛒',
        }

        // Check for exact matches or partial matches
        for (const [key, icon] of Object.entries(iconMap)) {
            if (techLower.includes(key)) {
                return icon
            }
        }

        // Default: return first letter
        return tech.charAt(0).toUpperCase()
    }

    useEffect(() => {
        // Aggressive scroll to top
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        setTimeout(() => window.scrollTo(0, 0), 0)
        requestAnimationFrame(() => window.scrollTo(0, 0))

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        lenis.on("scroll", ScrollTrigger.update)

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(rafCallback)
        gsap.ticker.lagSmoothing(0)

        // GSAP Animations
        gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            )
        })

        // Parallax images
        gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((img) => {
            gsap.fromTo(
                img,
                { y: -50 },
                {
                    y: 50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            )
        })

        return () => {
            lenis.destroy()
            gsap.ticker.remove(rafCallback)
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [project.id])

    return (
        <main ref={containerRef} className="bg-black text-white overflow-hidden">
            {/* CINEMATIC HERO - Full Viewport with Parallax */}
            <section className="relative h-screen overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ scale: heroScale, y: heroY }}
                    className="absolute inset-0 w-full h-full opacity-50"
                >
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                    )}
                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </motion.div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8 flex items-center justify-between"
                >
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:bg-black/80 transition-all duration-300 text-sm md:text-base"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>Back</span>
                    </Link>

                    <div className="flex items-center gap-2 md:gap-3">
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 md:p-3 bg-white/90 backdrop-blur-md border border-white/20 rounded-full hover:bg-white transition-all shadow-lg"
                                title="View Demo"
                            >
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-black" />
                            </a>
                        )}
                        {project.links?.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 md:p-3 bg-white/90 backdrop-blur-md border border-white/20 rounded-full hover:bg-white transition-all shadow-lg"
                                title="View on GitHub"
                            >
                                <Github className="w-4 h-4 md:w-5 md:h-5 text-black" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Hero Content - Centered */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 flex items-center justify-center z-10 px-4"
                >
                    <div className="text-center max-w-6xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-4 md:mb-6">
                                <Tag className="w-3 h-3" />
                                <span className="text-xs uppercase tracking-widest">{project.category}</span>
                            </div>

                            {/* Title - Large & Cinematic */}
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-6 leading-none px-4">
                <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {project.title}
                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 mb-6 md:mb-8 font-light max-w-3xl mx-auto px-4">
                                {project.subtitle}
                            </p>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/50 px-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    <span>{project.yearRange}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <div className="flex items-center gap-2">
                                    <span>{project.client}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <ScrollIndicator className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" />
            </section>

            {/* STORY SECTION - Full Width Text Block */}
            <section className="reveal-section relative min-h-screen flex items-center py-16 md:py-32 px-4 md:px-8">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
                <div className="relative z-10 max-w-5xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-200px" }}
                        transition={{ duration: 1.5 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 md:mb-12 leading-tight">
                            <span className="block text-white/30">The Story</span>
                            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Behind the Project
              </span>
                        </h2>
                        <p className="text-xl sm:text-2xl md:text-3xl text-white/60 leading-relaxed font-light mb-6 md:mb-8">
                            {project.longDescription || project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEM & SOLUTION - Split Screen Effect */}
            {project.problem && project.solution && (
                <section className="reveal-section relative grid md:grid-cols-2 min-h-[80vh] md:min-h-screen">
                    {/* Problem - Dark Side */}
                    <div className="relative flex items-center justify-center p-8 md:p-12 lg:p-16 bg-zinc-950">
                        <div className="max-w-xl w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 text-red-400">
                                    The Challenge
                                </h3>
                                <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                                    {project.problem}
                                </p>
                            </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent)]" />
                    </div>

                    {/* Solution - Light Side */}
                    <div className="relative flex items-center justify-center p-8 md:p-12 lg:p-16 bg-black">
                        <div className="max-w-xl w-full">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    The Solution
                                </h3>
                                <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                                    {project.solution}
                                </p>
                            </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent)]" />
                    </div>
                </section>
            )}

            {/* FEATURES - Enhanced Cards */}
            {project.features && project.features.length > 0 && (
                <section className="reveal-section relative py-32 px-8 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-7xl font-black mb-20 text-center"
                        >
                            <span className="block text-white/30 mb-4">Powerful</span>
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Features
              </span>
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                                    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.15,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="group relative"
                                >
                                    <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20">
                                        {/* Animated gradient background on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 group-hover:opacity-100"
                                            initial={false}
                                            animate={{
                                                background: [
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(6,182,212,0) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(34,211,238,0.1) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(6,182,212,0) 100%)",
                                                ]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />

                                        {/* Corner accent */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.2 }}
                                                transition={{ duration: 0.6 }}
                                                className="inline-block"
                                            >
                                                <Award className="w-12 h-12 text-primary mb-6" />
                                            </motion.div>
                                            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                                {feature}
                                            </h4>
                                            {/* Decorative line */}
                                            <motion.div
                                                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* TECH STACK - With Proper Icons & Fixed Typography */}
            {project.technologies && project.technologies.length > 0 && (
                <section className="reveal-section relative py-16 md:py-32 px-4 md:px-8 bg-black overflow-hidden">
                    {/* Animated grid background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.3) 1px, transparent 1px)',
                            backgroundSize: '80px 80px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="text-center mb-12 md:mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Technology Stack
                </span>
                            </h2>
                            <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto px-4">
                                Built with cutting-edge tools and frameworks
                            </p>
                        </motion.div>

                        {/* Premium tech cards grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {project.technologies.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="group relative"
                                >
                                    <div className="relative h-full p-4 md:p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-2xl group-hover:shadow-primary/20">
                                        {/* Animated gradient overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 group-hover:opacity-100"
                                            initial={false}
                                            animate={{
                                                background: [
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(34,211,238,0) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(34,211,238,0.2) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(34,211,238,0) 100%)",
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        {/* Corner shine effect */}
                                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[100px] md:min-h-[120px]">
                                            {/* Tech icon/logo */}
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all"
                                            >
                        <span className="text-2xl md:text-3xl font-black">
                          {getTechIcon(tech)}
                        </span>
                                            </motion.div>

                                            <h4 className="text-sm md:text-base font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 px-2">
                                                {tech}
                                            </h4>

                                            {/* Animated underline */}
                                            <motion.div
                                                className="mt-2 md:mt-3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full w-full"
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-12 md:mt-16 text-center"
                        >
                            <p className="text-xs md:text-sm text-white/30 uppercase tracking-widest">
                                Powered by {project.technologies.length}+ Technologies
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* GALLERY - Original Component Restored */}
            {project.images && project.images.length > 1 && (
                <ProjectGallery images={project.images} title={project.title} />
            )}

            {/* METRICS - Enhanced Impact Display */}
            {project.metrics && project.metrics.length > 0 && (
                <section className="reveal-section relative py-20 md:py-40 px-4 md:px-8 bg-black overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl -translate-y-1/2 animate-pulse" style={{ animationDuration: '12s' }} />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl translate-y-1/2 animate-pulse" style={{ animationDuration: '14s', animationDelay: '3s' }} />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="text-center mb-20 md:mb-32"
                        >
                            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-tight">
                                <span className="block text-white/30 mb-3 text-3xl md:text-5xl font-light tracking-tight">MEASURABLE</span>
                                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Impact & Results
                    </span>
                            </h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="text-base md:text-lg text-white/50 max-w-3xl mx-auto px-4 font-light tracking-wide"
                            >
                                Real-world outcomes that demonstrate tangible value and transformation
                            </motion.p>
                        </motion.div>

                        {/* Metrics Grid - Responsive 1-4 columns */}
                        <div className={`grid gap-8 md:gap-10 ${project.metrics.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' : project.metrics.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                            {project.metrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.9,
                                        delay: index * 0.12,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="group relative"
                                >
                                    {/* Card Container */}
                                    <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-white/8 via-white/4 to-transparent backdrop-blur-xl border border-white/15 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/20">

                                        {/* Animated gradient on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 group-hover:opacity-15"
                                            initial={false}
                                            animate={{
                                                background: [
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(34,211,238,0) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.15) 100%)",
                                                    "linear-gradient(135deg, rgba(6,182,212,0) 0%, rgba(34,211,238,0) 100%)",
                                                ]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />

                                        {/* Top border accent - animated in */}
                                        <motion.div
                                            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
                                            style={{ transformOrigin: 'left' }}
                                        />

                                        {/* Corner glow effect */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            {/* Icon - Larger and more prominent */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.7, delay: index * 0.12 + 0.15, type: "spring", stiffness: 100 }}
                                                whileHover={{ rotate: 360, scale: 1.15 }}
                                                className="w-14 h-14 md:w-16 md:h-16 mb-8 rounded-2xl bg-gradient-to-br from-primary/25 to-accent/25 border border-primary/40 flex items-center justify-center group-hover:border-primary/70 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all"
                                            >
                                                <Award className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-accent transition-colors" />
                                            </motion.div>

                                            {/* Metric Value - Premium Typography */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.7, delay: index * 0.12 + 0.3 }}
                                                className="mb-4"
                                            >
                                                <p className="text-5xl md:text-6xl font-black leading-tight bg-gradient-to-br from-white via-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
                                                    {metric.value}
                                                </p>
                                            </motion.div>

                                            {/* Metric Label - Refined Typography */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: index * 0.12 + 0.4 }}
                                            >
                                                <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white/60 group-hover:text-primary/80 transition-colors mb-3">
                                                    {metric.label}
                                                </p>
                                            </motion.div>

                                            {/* Optional description */}
                                            {/*{metric.description && (*/}
                                            {/*    <motion.p*/}
                                            {/*        initial={{ opacity: 0 }}*/}
                                            {/*        whileInView={{ opacity: 1 }}*/}
                                            {/*        viewport={{ once: true }}*/}
                                            {/*        transition={{ duration: 0.6, delay: index * 0.12 + 0.45 }}*/}
                                            {/*        className="text-xs md:text-sm text-white/45 group-hover:text-white/55 transition-colors leading-relaxed"*/}
                                            {/*    >*/}
                                            {/*        {metric.description}*/}
                                            {/*    </motion.p>*/}
                                            {/*)}*/}

                                            {/* Decorative accent line at bottom */}
                                            <motion.div
                                                className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: index * 0.12 + 0.5 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Optional: Bottom accent line connecting metrics */}
                        {project.metrics.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                                className="mt-16 md:mt-24 h-[1px] bg-gradient-to-r from-transparent via-primary/30 via-50% to-transparent"
                            />
                        )}
                    </div>
                </section>
            )}

            {/* NEXT PROJECT - Cinematic Teaser */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with Parallax */}
                <div className="parallax-image absolute inset-0">
                    {nextProject.image && (
                        <Image
                            src={nextProject.image}
                            alt={nextProject.title}
                            fill
                            className="object-cover"
                            quality={100}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-8"
                >
                    <p className="text-sm uppercase tracking-widest text-white/50 mb-6">
                        Next Project
                    </p>
                    <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {nextProject.title}
            </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
                        {nextProject.subtitle}
                    </p>

                    <Link
                        href={`/projects/${nextProject.id}`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-all duration-300 group"
                    >
                        <span>Explore Project</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </main>
    )
}