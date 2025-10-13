"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface FullscreenGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onCloseAction: () => void;
  initialIndex?: number;
}

const BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/svg%3E";

export default function FullscreenGallery({
  images,
  isOpen,
  onCloseAction,
  initialIndex = 0,
}: FullscreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCloseAction, handlePrevious, handleNext]);

  if (!isOpen) return null;

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-md"
        >
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
            {/* Counter with modern design */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-sm font-medium"
            >
              <span className="text-white/60">Image</span>{" "}
              <span className="text-white font-semibold">{currentIndex + 1}</span>
              <span className="text-white/40"> / </span>
              <span className="text-white/60">{images.length}</span>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onCloseAction}
              className="p-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={handlePrevious}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={handleNext}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </motion.button>
            </>
          )}

          {/* Image Container with improved sliding */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pt-20 pb-32">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt || `Image ${currentIndex + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    quality={90}
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </div>
                {currentImage.caption && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-white/80 text-center text-sm md:text-base max-w-2xl px-4"
                  >
                    {currentImage.caption}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Modern Thumbnail Breadcrumbs */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] overflow-hidden"
            >
              <div className="flex gap-2 p-2 md:p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto scrollbar-hide">
                {images.length <= 10 ? (
                  // Show all thumbnails if 10 or fewer
                  images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                        idx === currentIndex
                          ? "w-20 h-20 md:w-24 md:h-24 ring-2 ring-white shadow-lg scale-105"
                          : "w-14 h-14 md:w-16 md:h-16 opacity-50 hover:opacity-80 hover:scale-105"
                      }`}
                      whileHover={{ scale: idx === currentIndex ? 1.05 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || `Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                        unoptimized
                      />
                    </motion.button>
                  ))
                ) : (
                  // Show dot indicators for many images
                  images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`flex-shrink-0 rounded-full transition-all ${
                        idx === currentIndex
                          ? "w-8 h-3 bg-white"
                          : "w-3 h-3 bg-white/30 hover:bg-white/50"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Swipe instruction hint (mobile) */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-xs md:text-sm pointer-events-none md:hidden"
            >
              Swipe or use arrows to navigate
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
