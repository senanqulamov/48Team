"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface NewPageLoaderProps {
    onComplete?: () => void;
    duration?: number;
    destinationPage?: string;
}

export default function NewPageLoader({ onComplete, duration = 1500, destinationPage }: NewPageLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const pathname = usePathname();

    // Determine page name from pathname
    const getPageName = () => {
        if (destinationPage) return destinationPage;
        const path = pathname || "/";
        if (path === "/") return "Home";
        if (path.startsWith("/projects")) return "Projects";
        if (path.startsWith("/blogs")) return "Blogs";
        if (path.startsWith("/team")) return "Team";
        return "Page";
    };

    useEffect(() => {
        const startTime = Date.now();
        let animationFrame: number;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(elapsed / duration, 1);
            setProgress(newProgress);

            if (newProgress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => {
                        setIsComplete(true);
                        onComplete?.();
                    }, 800);
                }, 200);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [onComplete, duration]);

    return (
        <AnimatePresence mode="wait">
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.8,
                            ease: [0.43, 0.13, 0.23, 0.96]
                        }
                    }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden"
                >
                    {/* Restored Animated Grid Background */}
                    <motion.div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        animate={{
                            backgroundPosition: isExiting ? undefined : ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                            backgroundPosition: {
                                duration: 20,
                                repeat: isExiting ? 0 : Infinity,
                                ease: "linear",
                            },
                        }}
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Restored Animated Gradient Orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isExiting ? 0 : 1,
                            scale: isExiting ? 1.8 : [1, 1.2, 1],
                            x: isExiting ? 100 : [0, 50, 0],
                            y: isExiting ? -50 : [0, -30, 0],
                        }}
                        transition={{
                            scale: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            x: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            y: { duration: isExiting ? 0.8 : 4, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            opacity: { duration: isExiting ? 0.8 : 0.3 }
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isExiting ? 0 : 1,
                            scale: isExiting ? 1.8 : [1.2, 1, 1.2],
                            x: isExiting ? -100 : [0, -50, 0],
                            y: isExiting ? 50 : [0, 30, 0],
                        }}
                        transition={{
                            scale: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            x: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            y: { duration: isExiting ? 0.8 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" },
                            opacity: { duration: isExiting ? 0.8 : 0.3 }
                        }}
                    />

                    {/* Main Content */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: isExiting ? 0 : 1,
                            scale: isExiting ? 1.2 : 1,
                            y: isExiting ? -30 : 0
                        }}
                        exit={{ opacity: 0, scale: 1.3, y: -50 }}
                        transition={{
                            duration: isExiting ? 0.8 : 0.5,
                            ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                    >
                        {/* Simple "48" Text - From first version */}
                        <div className="relative mb-8">
                            <motion.div
                                className="text-[280px] font-black leading-none select-none"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                style={{
                                    color: "transparent",
                                    WebkitTextStroke: "2px rgba(255, 255, 255, 0.9)",
                                    textShadow: "0 0 60px rgba(96, 165, 250, 0.6), 0 0 100px rgba(59, 130, 246, 0.4)",
                                    filter: "drop-shadow(0 4px 20px rgba(96, 165, 250, 0.3))",
                                }}
                            >
                                48
                            </motion.div>

                            {/* Simple Glow Effect */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div
                                    className="text-[280px] font-black leading-none select-none opacity-30"
                                    style={{
                                        background: "radial-gradient(circle at center, rgba(96, 165, 250, 0.8) 0%, transparent 70%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        filter: "blur(12px)",
                                    }}
                                >
                                    48
                                </div>
                            </motion.div>
                        </div>

                        {/* Simple Progress Percentage */}
                        <motion.div
                            className="relative mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <p className="text-5xl font-bold font-mono bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                {Math.floor(progress * 100)}%
                            </p>
                        </motion.div>

                        {/* Loading Text */}
                        {/*<motion.div*/}
                        {/*    className="mb-8 text-center"*/}
                        {/*    animate={{*/}
                        {/*        opacity: [0.6, 1, 0.6],*/}
                        {/*    }}*/}
                        {/*    transition={{*/}
                        {/*        duration: 1.5,*/}
                        {/*        repeat: Infinity,*/}
                        {/*        ease: "easeInOut",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <p className="text-lg tracking-wider font-medium text-white/90 mb-1">*/}
                        {/*        LOADING {getPageName().toUpperCase()}*/}
                        {/*    </p>*/}
                        {/*</motion.div>*/}

                        {/* Simple Transfer Indicator */}
                        <motion.div
                            className="flex items-center gap-3 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <span className="text-white/60">Preparing</span>
                            <span className="text-blue-400 font-semibold">{getPageName()}</span>
                            <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.3,
                                }}
                            />
                        </motion.div>

                        {/* Subtle Progress Dots */}
                        <motion.div
                            className="mt-8 flex items-center gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            {[...Array(10)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-white/20"
                                    animate={{
                                        backgroundColor: i < Math.floor(progress * 10) ? "#3b82f6" : "rgba(255, 255, 255, 0.2)",
                                        scale: i < Math.floor(progress * 10) ? [1, 1.3, 1] : 1,
                                    }}
                                    transition={{
                                        backgroundColor: { duration: 0.3 },
                                        scale: {
                                            duration: 0.5,
                                            repeat: i < Math.floor(progress * 10) ? Infinity : 0,
                                            repeatDelay: 0.5,
                                        },
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Corner Decorations from second version */}
                    {[
                        { position: "top-8 left-8", border: "border-t-2 border-l-2", dotPos: "bottom-0 right-0" },
                        { position: "top-8 right-8", border: "border-t-2 border-r-2", dotPos: "bottom-0 left-0" },
                        { position: "bottom-8 left-8", border: "border-b-2 border-l-2", dotPos: "top-0 right-0" },
                        { position: "bottom-8 right-8", border: "border-b-2 border-r-2", dotPos: "top-0 left-0" },
                    ].map((corner, index) => (
                        <motion.div
                            key={index}
                            className={`absolute w-16 h-16 ${corner.position} ${corner.border} border-blue-500/50`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                        >
                            <motion.div
                                className={`absolute w-2 h-2 bg-blue-500 rounded-full ${corner.dotPos} translate-x-0 translate-y-0`}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}