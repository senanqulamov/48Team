"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
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
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isWheelThrottled, setIsWheelThrottled] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const originalOverflowRef = useRef<string>("");

  useEffect(() => {
    setIsMounted(true);
    // Store original overflow value on mount
    originalOverflowRef.current = document.body.style.overflow;

    // Cleanup on unmount - ensure scroll is restored
    return () => {
      document.body.style.overflow = originalOverflowRef.current || "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setImageLoading(true);
  }, [currentIndex]);

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < images.length) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = images[index].src;
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
      }
    };

    // Preload next and previous images
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    const cleanupNext = preloadImage(nextIndex);
    const cleanupPrev = preloadImage(prevIndex);

    return () => {
      cleanupNext?.();
      cleanupPrev?.();
    };
  }, [currentIndex, isOpen, isMounted, images]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => {
        const newZoom = Math.max(1, Math.min(prev + delta, 4));
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    } else if (zoom === 1 && !isWheelThrottled) {
      // When not zoomed and no ctrl key, use scroll to navigate slides
      e.preventDefault();
      if (Math.abs(e.deltaY) > 30) {
        setIsWheelThrottled(true);
        setTimeout(() => setIsWheelThrottled(false), 600);

        if (e.deltaY > 0) {
          // Scroll down = next image
          handleNext();
        } else {
          // Scroll up = previous image
          handlePrevious();
        }
      }
    }
  }, [zoom, isWheelThrottled, handleNext, handlePrevious]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // When modal closes, explicitly restore scrolling
      document.body.style.overflow = originalOverflowRef.current || "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
      if (e.key === "ArrowLeft" && zoom === 1) handlePrevious();
      if (e.key === "ArrowRight" && zoom === 1) handleNext();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-" || e.key === "_") handleZoomOut();
    };

    // Store current scroll position for mobile
    const scrollY = window.scrollY;

    // Prevent background scrolling (works on all devices including iOS)
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Add wheel event listener for zoom
    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Restore scrolling properly
      const scrollYToRestore = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.overflow = originalOverflowRef.current || "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      if (scrollYToRestore > 0) {
        window.scrollTo(0, scrollYToRestore);
      }

      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOpen, onCloseAction, handlePrevious, handleNext, handleZoomIn, handleZoomOut, handleWheel, zoom]);

  if (!isMounted || !isOpen) return null;

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-md"
        >
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
            {/* Counter with modern design */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-sm font-medium">
                <span className="text-white/60">Image</span>{" "}
                <span className="text-white font-semibold">{currentIndex + 1}</span>
                <span className="text-white/40"> / </span>
                <span className="text-white/60">{images.length}</span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white text-xs font-medium min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 4}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
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

          {/* Navigation Buttons - Only show when not zoomed */}
          {images.length > 1 && zoom === 1 && (
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

          {/* Image Container with zoom and pan */}
          <div
            ref={imageContainerRef}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pt-20 pb-32"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
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
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transition: isDragging ? "none" : "transform 0.2s ease-out",
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Loading spinner */}
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt || `Image ${currentIndex + 1}`}
                      fill
                      className="object-contain rounded-lg"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                      priority={currentIndex === initialIndex}
                      loading={currentIndex === initialIndex ? "eager" : "lazy"}
                      draggable={false}
                      onLoadingComplete={() => setImageLoading(false)}
                    />
                  </div>
                </div>
                {currentImage.caption && zoom === 1 && (
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

          {/* Modern Thumbnail Breadcrumbs - Only show when not zoomed */}
          {images.length > 1 && zoom === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[85vw] md:max-w-[70vw] overflow-hidden"
            >
              <div className="flex gap-1.5 md:gap-2 p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto scrollbar-hide">
                {images.length <= 10 ? (
                  // Show all thumbnails if 10 or fewer - smaller sizes
                  images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all ${
                        idx === currentIndex
                          ? "w-12 h-12 md:w-14 md:h-14 ring-2 ring-white shadow-lg"
                          : "w-10 h-10 md:w-12 md:h-12 opacity-50 hover:opacity-80"
                      }`}
                      whileHover={{ scale: idx === currentIndex ? 1.05 : 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || `Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                        quality={60}
                        loading="lazy"
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
                          ? "w-6 h-2.5 bg-white"
                          : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
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

          {/* Zoom instruction hint */}
          {zoom === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-xs md:text-sm pointer-events-none text-center"
            >
              <p className="mb-1">Scroll or use arrow keys to navigate • Ctrl/Cmd + Scroll to zoom</p>
              <p className="hidden md:block">Click and drag when zoomed</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}


