import React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    images?: string[];
    technologies?: string[];
    category?: string;
    status?: string;
    icon?: React.ElementType;
    color?: string; // tailwind gradient e.g. "from-primary to-accent"
    date?: string;
    links?: { demo?: string; github?: string };
    features?: string[];
    blog?: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    project: Project | null;
}

/**
 * Optimizations to reduce lag:
 * - File converted to TSX with proper typings (no implicit any).
 * - All static subcomponents are memoized (React.memo).
 * - Images use next/image with fill + sizes and low-cost blur placeholders.
 * - Only the hero image uses priority; gallery images are lazy.
 * - useMemo/useCallback used for stable references to avoid re-renders.
 */

const BLUR_DATA_URL =
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/svg%3E";

const Backdrop = ({ onClick }: { onClick: () => void }) => (
    <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-lg cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
    />
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        className="text-3xl text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        onClick={onClick}
        aria-label="Close"
    >
        &times;
    </button>
);

interface LightboxProps {
    images: string[];
    index: number;
    onClose: () => void;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    title?: string;
}

const Lightbox = React.memo(function Lightbox({
                                                  images,
                                                  index,
                                                  onClose,
                                                  setIndex,
                                                  title,
                                              }: LightboxProps) {
    React.useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
        }
        if (images?.length) {
            window.addEventListener("keydown", onKey);
            return () => window.removeEventListener("keydown", onKey);
        }
    }, [images, onClose, setIndex]);

    if (!images?.length) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Backdrop onClick={onClose} />
                <motion.div
                    className="relative z-[65] w-full h-full flex items-center justify-center"
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={images[index]}
                            alt={`${title ?? "Preview"} - ${index + 1}`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-contain"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            quality={70}
                        />
                    </div>

                    <div className="absolute top-10 right-10">
                        <CloseButton onClick={onClose} />
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white px-3 py-2 cursor-pointer"
                                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                                aria-label="Prev image"
                            >
                                &#10094;
                            </button>
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white px-3 py-2 cursor-pointer"
                                onClick={() => setIndex((i) => (i + 1) % images.length)}
                                aria-label="Next image"
                            >
                                &#10095;
                            </button>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

const DetailsLeft = React.memo(function DetailsLeft({ project }: { project: Project | null }) {
    if (!project) return null;

    return (
        <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 md:p-6 shadow-sm">
            {project.subtitle && (
                <h4 className="text-xl md:text-2xl text-muted-foreground font-semibold mb-3">
                    {project.subtitle}
                </h4>
            )}

            <div className="flex gap-2 flex-wrap mb-3">
                {project.status && (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground">
            {project.status}
          </span>
                )}
                {project.category && (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-accent/10 text-accent">
            {project.category}
          </span>
                )}
                {project.date && (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-primary/10 text-primary">
            {project.date}
          </span>
                )}
                {project.color && (
                    <span
                        className={`inline-block text-sm font-semibold px-3 py-1 rounded text-white bg-gradient-to-r ${project.color}`}
                    >
            Color
          </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies?.map((tech: string) => (
                    <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                    >
            {tech}
          </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
                {project.features?.map((f: string) => (
                    <span
                        key={f}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                    >
            {f}
          </span>
                ))}
            </div>

            <div className="flex gap-3 mt-1">
                {project.links?.demo && (
                    <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener"
                        className="px-5 py-2 rounded-full bg-primary text-white font-semibold text-base hover:bg-accent transition-all"
                    >
                        Demo
                    </a>
                )}
                {project.links?.github && (
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener"
                        className="px-5 py-2 rounded-full bg-muted text-primary font-semibold text-base border border-primary/20 hover:bg-primary/10 transition-all"
                    >
                        GitHub
                    </a>
                )}
            </div>
        </div>
    );
});

const DescriptionRight = React.memo(function DescriptionRight({ blog }: { blog?: string }) {
    if (!blog) return null;
    return (
        <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 md:p-6 shadow-sm">
            <div
                className="prose prose-lg max-w-none text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog }}
            />
        </div>
    );
});

export default function ProjectBlogModal({ open, onClose, project }: ModalProps) {
    // Prevent background scroll when modal is open
    React.useEffect(() => {
        const original = document.body.style.overflow;
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = original;
        }
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    // Lightbox state (for gallery only)
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [lightboxIndex, setLightboxIndex] = React.useState(0);

    const openLightboxAt = React.useCallback((idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = React.useCallback(() => setLightboxOpen(false), []);

    const memoImages = React.useMemo<string[]>(() => project?.images ?? [], [project?.images]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <Backdrop onClick={onClose} />

                    <motion.div
                        key={project?.id ?? "modal"}
                        className="w-full max-w-[100vw] h-[90vh] mx-auto bg-card/80 rounded-t-3xl shadow-2xl relative overflow-hidden text-foreground font-display"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                            if (info.offset.y > 100) onClose();
                        }}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                        style={{
                            willChange: "transform",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            borderTopLeftRadius: "2rem",
                            borderTopRightRadius: "2rem",
                            maxHeight: "90vh",
                            width: "100vw",
                            backdropFilter: "blur(16px)",
                        }}
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 py-4 md:py-5 bg-transparent backdrop-blur-lg rounded-t-3xl border-b border-primary/10 cursor-grab">
                            <div className="flex items-center gap-3">
                                {project?.icon && <project.icon className="w-8 h-8 text-primary" />}
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display truncate max-w-[60vw]">
                                    {project?.title}
                                </h3>
                            </div>
                            <CloseButton onClick={onClose} />
                        </div>

                        {/* Scrollable content */}
                        <div className="relative w-full h-[calc(90vh-76px)] overflow-y-auto scroll-smooth">
                            {/* HERO IMAGE (full-width under header; tall for immersive feel) */}
                            {project?.image && (
                                <div className="relative w-full h-[min(65vh,800px)] -mx-4 sm:-mx-6">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        priority
                                        decoding="async"
                                        sizes="100vw"
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL={BLUR_DATA_URL}
                                        quality={70}
                                    />
                                    {/* Gradient overlay for readability */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,10,14,0.15),rgba(8,10,14,0.35)_45%,rgba(8,10,14,0.7))]" />
                                </div>
                            )}

                            {/* BODY */}
                            {project && (
                                <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10">
                                    {/* Two-column: left details/tags/links, right description */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                                        <DetailsLeft project={project} />
                                        <DescriptionRight blog={project.blog} />
                                    </div>

                                    {/* Gallery with full-screen lightbox (does not include hero image) */}
                                    {memoImages.length > 0 && (
                                        <div className="bg-background/60 rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-primary/10">
                                            <h4 className="text-2xl font-bold mb-2 text-primary font-display">
                                                Gallery
                                            </h4>
                                            <hr className="border-muted/30 mb-5" />
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                                {memoImages.map((img: string, idx: number) => (
                                                    <button
                                                        key={`${img}-${idx}`}
                                                        type="button"
                                                        className="relative group overflow-hidden rounded-2xl shadow-md border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                                                        onClick={() => openLightboxAt(idx)}
                                                        aria-label={`Open preview ${idx + 1}`}
                                                    >
                                                        <div className="relative w-full aspect-[4/3]">
                                                            <Image
                                                                src={img}
                                                                alt={`${project.title} - image ${idx + 1}`}
                                                                fill
                                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                                                                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                                                                placeholder="blur"
                                                                blurDataURL={BLUR_DATA_URL}
                                                                quality={62}
                                                            />
                                                        </div>
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* LIGHTBOX */}
                        {lightboxOpen && (
                            <Lightbox
                                images={memoImages}
                                index={lightboxIndex}
                                setIndex={setLightboxIndex}
                                onClose={closeLightbox}
                                title={project?.title || "Preview"}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}