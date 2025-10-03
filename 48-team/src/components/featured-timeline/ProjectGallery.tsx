"use client"

import React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { ImageItem } from "@/types/project"
import { createPortal } from "react-dom"

const BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/svg%3E"

function normalize(item: ImageItem): { src: string; alt: string; caption?: string } {
  if (typeof item === "string") return { src: item, alt: "Screenshot" }
  return { src: item.src, alt: item.alt, caption: item.caption }
}

export default function ProjectGallery({
  items,
  title = "Visual Gallery",
}: {
  items?: ImageItem[]
  title?: string
}) {
  const images = (items ?? []).map(normalize)
  const [lightbox, setLightbox] = React.useState<{ open: boolean; index: number }>({ open: false, index: 0 })

  const closeLightbox = React.useCallback(() => setLightbox({ open: false, index: 0 }), [])
  const prev = React.useCallback(() => setLightbox((s) => ({ open: true, index: (s.index - 1 + images.length) % images.length })), [images.length])
  const next = React.useCallback(() => setLightbox((s) => ({ open: true, index: (s.index + 1) % images.length })), [images.length])

  React.useEffect(() => {
    if (!lightbox.open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeLightbox()
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        e.preventDefault()
        prev()
      } else if (e.key === "ArrowRight" && images.length > 1) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox.open, prev, next, closeLightbox, images.length])

  if (!images.length) return null

  return (
    <section aria-labelledby="gallery-title" className="bg-background/60 rounded-2xl shadow p-5 md:p-6 border border-primary/10">
      <h3 id="gallery-title" className="text-2xl font-bold mb-2 font-display">{title}</h3>
      <hr className="border-muted/30 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            type="button"
            className="group relative block overflow-hidden rounded-xl border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-zoom-in"
            onClick={() => setLightbox({ open: true, index: idx })}
            aria-label={`Open screenshot ${idx + 1}`}
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                quality={70}
              />
            </div>
            {img.caption && (
              <div className="absolute bottom-0 inset-x-0 text-xs md:text-sm bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox via portal to avoid stacking issues */}
      <AnimatePresence>
        {lightbox.open && typeof document !== "undefined" && createPortal(
          (
            <motion.div
              className="fixed inset-0 z-[1100] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Image preview"
            >
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={closeLightbox}
                aria-hidden="true"
              />
              <div className="relative z-[1101] w-full h-full flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={lightbox.index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        src={images[lightbox.index].src}
                        alt={images[lightbox.index].alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        quality={80}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Caption */}
                {(images[lightbox.index].caption || images[lightbox.index].alt) && (
                  <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-3xl text-center text-sm md:text-base text-white/95 bg-black/40 px-4 py-3 pointer-events-none">
                    {images[lightbox.index].caption ?? images[lightbox.index].alt}
                  </div>
                )}

                {/* Controls */}
                <div className="absolute inset-x-0 top-0 flex justify-end p-4 pointer-events-auto">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/70 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                    onClick={closeLightbox}
                    aria-label="Close image preview"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/70 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                      onClick={prev}
                      aria-label="Previous image"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/70 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                      onClick={next}
                      aria-label="Next image"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ), document.body)
        }
      </AnimatePresence>
    </section>
  )
}
