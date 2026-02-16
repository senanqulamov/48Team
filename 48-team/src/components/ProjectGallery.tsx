"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FullscreenGallery from "@/components/ui/fullscreen-gallery"

gsap.registerPlugin(ScrollTrigger)

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Skip first image (hero) and use the rest
  const galleryImages = images.slice(1)

  useEffect(() => {
    if (!galleryRef.current) return

    const galleryItems = galleryRef.current.querySelectorAll(".gallery-item")

    // Clip-path reveal animation
    galleryItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
          y: 100,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      )

      // Parallax effect on scroll
      gsap.to(item.querySelector(".gallery-image"), {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setIsGalleryOpen(true)
  }

  const formattedImages = galleryImages.map((src, index) => ({
    src,
    alt: `${title} screenshot ${index + 1}`,
  }))

  return (
    <>
      <section ref={sectionRef} className="py-24 px-8 bg-muted/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-display font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Gallery
          </motion.h2>

          <div ref={galleryRef} className="gallery-grid">
            {/* Masonry-style grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {galleryImages.map((img, index) => {
                // Alternate heights for visual interest
                const isLarge = index % 5 === 0
                const rowSpan = isLarge ? "md:row-span-2" : ""

                return (
                  <motion.div
                    key={index}
                    className={`gallery-item relative overflow-hidden rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group ${rowSpan}`}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="gallery-image relative w-full h-full">
                      <Image
                        src={img}
                        alt={`${title} screenshot ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={80}
                        loading={index < 3 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/sv g%3E"
                      />
                      {/* Overlay on hover */}
                      {/*<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">*/}
                      {/*  <div className="flex flex-col items-center gap-2">*/}
                      {/*    <ZoomIn className="w-12 h-12 text-white" />*/}
                          <p className="text-white text-sm font-medium">Click to expand</p>
                    {/*    </div>*/}
                    {/*  </div>*/}
                    </div>

                    {/* Glass morphism badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1} / {galleryImages.length}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Gallery with Zoom */}
      <FullscreenGallery
        images={formattedImages}
        isOpen={isGalleryOpen}
        onCloseAction={() => setIsGalleryOpen(false)}
        initialIndex={selectedIndex}
      />
    </>
  )
}

