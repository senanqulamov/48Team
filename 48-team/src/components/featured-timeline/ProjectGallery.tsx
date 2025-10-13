"use client"

import React, { useState } from "react"
import type { ImageItem } from "@/types/project"
import FullscreenGallery from "@/components/ui/fullscreen-gallery"
import { Eye } from "lucide-react"

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
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    if (!images.length) return null

    // Show up to 3 preview images
    const previewImages = images.slice(0, 3)
    const remainingCount = images.length - 3

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index)
        setIsGalleryOpen(true)
    }

    const handleSeeGalleryClick = () => {
        setSelectedImageIndex(0)
        setIsGalleryOpen(true)
    }

    return (
        <>
            <section aria-labelledby="gallery-title" className="bg-background/60 rounded-2xl shadow p-5 md:p-6 border border-primary/10">
                <h3 id="gallery-title" className="text-2xl font-bold mb-4 font-display">{title}</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previewImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative group cursor-pointer overflow-hidden rounded-lg border border-primary/10 aspect-video bg-muted/20"
                            onClick={() => handleImageClick(idx)}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSeeGalleryClick}
                    className="mt-6 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    <Eye className="w-5 h-5" />
                    See Full Gallery
                    {remainingCount > 0 && (
                        <span className="ml-1 text-sm opacity-90">
                            (+{remainingCount} more)
                        </span>
                    )}
                </button>
            </section>

            <FullscreenGallery
                images={images}
                isOpen={isGalleryOpen}
                onCloseAction={() => setIsGalleryOpen(false)}
                initialIndex={selectedImageIndex}
            />
        </>
    )
}
