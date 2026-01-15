"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { X } from "lucide-react"
import Image from "next/image"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
    {
        label: "Home",
        href: "/",
        color: "#f59e0b",
        images: [
            "/images/neosphere/1.png",
            "/images/passmate/1.png",
            "/images/demo1/5.jpg",
        ]
    },
    {
        label: "Projects",
        href: "/projects",
        color: "#3b82f6",
        images: [
          "/images/luckyholidays.az/5.png",
          "/images/balli.az/demo2.png",
          "/images/ctsa.az/3.png",
        ]
    },
    {
        label: "Blogs",
        href: "/blogs",
        color: "#10b981",
        images: [
          "/images/neosphere/1.png",
          "/images/bidbary/1.png",
          "/images/demo1/3.jpg",
        ]
    },
    {
        label: "Team",
        href: "/team",
        color: "#8b5cf6",
        images: [
            "/images/team/javid.jpg",
            "/images/team/sema.png",
            "/images/team/naza.JPG",
        ]
    },
]

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleNavigation = (href: string) => {
    onClose()
    setTimeout(() => {
      router.push(href)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={onClose}
            className="fixed top-8 right-8 z-[110] p-4 text-white hover:text-primary transition-colors duration-300"
          >
            <X className="w-8 h-8" />
          </motion.button>

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Animated Gradient Orb */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background: hoveredIndex !== null ? menuItems[hoveredIndex].color : "#3b82f6",
            }}
            animate={{
              x: hoveredIndex !== null ? [0, 100, 0] : 0,
              y: hoveredIndex !== null ? [0, -50, 0] : 0,
              scale: hoveredIndex !== null ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            initial={{ top: "20%", left: "10%" }}
          />

          {/* Menu Items */}
          <div className="relative z-10 flex items-center justify-between min-h-screen max-w-7xl mx-auto px-8 gap-12">
            {/* Left Side - Menu Links */}
            <nav className="flex-1 max-w-2xl">
              <ul className="space-y-4">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -100, clipPath: "inset(0 100% 0 0)" }}
                      animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
                      exit={{ opacity: 0, x: 100, clipPath: "inset(0 0 0 100%)" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.1,
                        ease: [0.645, 0.045, 0.355, 1],
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <motion.button
                        onClick={() => handleNavigation(item.href)}
                        className="relative w-full text-left group"
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative overflow-hidden">
                          {/* Background effect on hover */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg"
                            style={{
                              background: `linear-gradient(90deg, ${item.color}20 0%, transparent 100%)`,
                            }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Text */}
                          <motion.h2
                            className="text-6xl md:text-8xl font-bold py-4 relative"
                            style={{
                              color: isActive ? item.color : "#ffffff",
                            }}
                            whileHover={{ color: item.color }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Number */}
                            <span className="inline-block w-16 md:w-24 text-2xl md:text-3xl text-white/40 font-mono">
                              0{index + 1}
                            </span>
                            {item.label}

                            {/* Underline animation */}
                            <motion.div
                              className="absolute bottom-2 left-16 md:left-24 right-0 h-1 rounded-full"
                              initial={{ scaleX: 0, backgroundColor: item.color }}
                              animate={{
                                scaleX: isActive ? 1 : 0,
                                backgroundColor: item.color,
                              }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                              style={{ transformOrigin: "left" }}
                            />
                          </motion.h2>
                        </div>

                        {/* Grid hover effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          style={{
                            backgroundImage: `linear-gradient(90deg, ${item.color}40 1px, transparent 1px)`,
                            backgroundSize: "20px 100%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Right Side - Image Grid */}
            <div className="hidden lg:flex flex-1 h-[600px] relative">
              <div className="grid grid-cols-2 gap-4 w-full">
                {hoveredIndex !== null && menuItems[hoveredIndex].images.map((image, idx) => (
                  <motion.div
                    key={`${hoveredIndex}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.1,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className={`relative overflow-hidden rounded-xl ${idx === 0 ? 'col-span-2 h-[280px]' : 'h-[280px]'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={image}
                        alt={`${menuItems[hoveredIndex].label} preview ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 0vw, 25vw"
                      />
                      {/* Overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"
                        style={{
                          background: `linear-gradient(135deg, transparent 0%, ${menuItems[hoveredIndex].color}20 100%)`
                        }}
                      />
                      {/* Border */}
                      <div
                        className="absolute inset-0 border-2 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ borderColor: menuItems[hoveredIndex].color }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

                {/* Placeholder when nothing is hovered */}
                {hoveredIndex === null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                    >
                        <div className="grid grid-cols-2 gap-4 w-full h-full">
                            {["/images/mine/the48_banner.png", "/images/mine/me_2025_loft(2).png", "/images/mine/me_2026.jpg"].map((image, idx) => (
                                <motion.div
                                    key={`placeholder-${idx}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.15,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }}
                                    className={`relative overflow-hidden rounded-xl ${idx === 0 ? 'col-span-2 h-[280px]' : 'h-[280px]'}`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Portfolio preview ${idx + 1}`}
                                            fill
                                            className={`${idx === 0 ? 'object-cover object-center' : 'object-cover'}`}
                                            sizes="(max-width: 1024px) 0vw, 25vw"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
                                        {/* Border */}
                                        <div className="absolute inset-0 border-2 border-white/10 rounded-xl hover:border-primary/50 transition-colors duration-300" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-8 text-white/40 text-sm"
          >
            <p>Senan Qulamov</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute bottom-8 right-8 text-white/40 text-sm"
          >
            <p>© 2026</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

