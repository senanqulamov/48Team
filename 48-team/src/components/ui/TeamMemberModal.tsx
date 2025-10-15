"use client"

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import type { TeamMemberProfile } from "@/data/teamData";
import { projects as allProjects } from "@/lib/projects";

interface ModalProps {
    open: boolean;
    onCloseAction: () => void;
    member: TeamMemberProfile | null;
    modalId?: string;
}

const BLUR_DATA_URL =
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/svg%3E";

const Backdrop = ({ onClick }: { onClick: () => void }) => (
    <motion.div
        className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
        aria-hidden="true"
        data-cursor="close"
    />
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        className="text-3xl text-gray-300 hover:text-white transition-colors px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        onClick={onClick}
        aria-label="Close"
        data-cursor="close"
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

    return createPortal(
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[10020] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Backdrop onClick={onClose} />
                <motion.div
                    className="relative z-[10021] w-full h-full flex items-center justify-center"
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-full">
                        <AnimatePresence initial={false} custom={0}>
                            <motion.div
                                key={index}
                                className="absolute inset-0"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
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
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="absolute inset-x-0 top-0 z-[10023] flex justify-end px-4 sm:px-6 md:px-8 lg:px-12 pt-4 pointer-events-none">
                        <button
                            type="button"
                            className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/60 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md transition"
                            onClick={onClose}
                            aria-label="Close"
                            data-cursor="close"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {images.length > 1 && (
                        <>
                            <div className="absolute inset-0 z-[10022] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 pointer-events-none">
                                <button
                                    type="button"
                                    className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/60 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md transition"
                                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                                    aria-label="Prev image"
                                    data-cursor="prev"
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/60 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md transition"
                                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                                    aria-label="Next image"
                                    data-cursor="next"
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
});

const DetailsLeft = React.memo(function DetailsLeft({ member }: { member: TeamMemberProfile | null }) {
    if (!member) return null;

    return (
        <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 md:p-6 shadow-sm">
            <h4 className="text-xl md:text-2xl text-foreground font-semibold mb-3">
                {member.role}
            </h4>

            <div className="flex gap-2 flex-wrap mb-5">
                {member.timezone && (
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground">
                        {member.timezone}
                    </span>
                )}
                <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-primary/10 text-primary">
                    {member.projects?.length || 0} Projects
                </span>
                <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-accent/10 text-accent">
                    {member.skills?.length || 0} Skills
                </span>
            </div>

            {/* Skills Section */}
            <div className="mb-5">
                <h5 className="text-lg font-semibold mb-3 text-foreground">Skills</h5>
                <div className="flex flex-wrap gap-2">
                    {member.skills?.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Social Links */}
            {member.socials && (
                <div className="flex gap-3 mt-5">
                    {member.socials.linkedin && (
                        <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-2 rounded-full bg-primary text-white font-semibold text-base hover:bg-accent transition-all"
                        >
                            LinkedIn
                        </a>
                    )}
                    {member.socials.behance && (
                        <a
                            href={member.socials.behance}
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold text-base border border-accent/20 hover:bg-accent/20 transition-all"
                        >
                            Behance
                        </a>
                    )}
                    {member.socials.dribbble && (
                        <a
                            href={member.socials.dribbble}
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold text-base border border-accent/20 hover:bg-accent/20 transition-all"
                        >
                            Dribbble
                        </a>
                    )}
                    {member.socials.github && (
                        <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-2 rounded-full bg-muted text-primary font-semibold text-base border border-primary/20 hover:bg-primary/10 transition-all"
                        >
                            GitHub
                        </a>
                    )}
                    {member.socials.email && (
                        <a
                            href={member.socials.email}
                            className="px-5 py-2 rounded-full bg-muted text-primary font-semibold text-base border border-primary/20 hover:bg-primary/10 transition-all"
                        >
                            Email
                        </a>
                    )}
                    {member.socials.portfolio && (
                        <a
                            href={member.socials.portfolio}
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold text-base border border-accent/20 hover:bg-accent/20 transition-all"
                        >
                            Portfolio
                        </a>
                    )}
                </div>
            )}
        </div>
    );
});

const AboutRight = React.memo(function AboutRight({ member }: { member: TeamMemberProfile | null }) {
    if (!member) return null;

    return (
        <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 md:p-6 shadow-sm">
            <h5 className="text-lg font-semibold mb-3 text-foreground">About</h5>
            {member.about && member.about.length > 0 ? (
                <ul className="space-y-3">
                    {member.about.map((paragraph, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                            <p className="text-base md:text-lg text-foreground leading-relaxed">
                                {paragraph}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-base md:text-lg text-muted-foreground">No information available.</p>
            )}
        </div>
    );
});

export default function TeamMemberModal({ open, onCloseAction, member, modalId }: ModalProps) {
    // Portal mount guard
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    // Lock background scroll while open
    React.useEffect(() => {
        if (!mounted) return;
        const prev = document.body.style.overflow;
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = prev;
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open, mounted]);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [lightboxIndex, setLightboxIndex] = React.useState(0);

    const gradientColors = React.useMemo(() => {
        if (!member?.name) {
            return {
                hsl1: 'hsl(270, 70%, 60%)',
                hsl2: 'hsl(220, 65%, 65%)',
                hsl3: 'hsl(180, 75%, 55%)',
                radial1: 'hsla(270, 70%, 60%, 0.3)',
                radial2: 'hsla(220, 65%, 65%, 0.25)',
            };
        }

        // Use member name as seed for consistent but unique colors
        const seed = member.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue1 = (seed * 137.508) % 360; // Golden angle for good distribution
        const hue2 = (hue1 + 60 + (seed % 120)) % 360;
        const hue3 = (hue2 + 60 + (seed % 100)) % 360;

        return {
            hsl1: `hsl(${hue1}, 70%, 60%)`,
            hsl2: `hsl(${hue2}, 65%, 65%)`,
            hsl3: `hsl(${hue3}, 75%, 55%)`,
            radial1: `hsla(${hue1}, 70%, 60%, 0.3)`,
            radial2: `hsla(${hue2}, 65%, 65%, 0.25)`,
        };
    }, [member?.name]);

    // Get project images
    const projectImages = React.useMemo<string[]>(() => {
        if (!member?.projects) return [];
        const images: string[] = [];
        member.projects.forEach(proj => {
            const match = proj.projectId
                ? allProjects.find(p => p.id === proj.projectId)
                : allProjects.find(p => p.title.toLowerCase() === proj.title.toLowerCase());
            if (match?.image) {
                images.push(match.image);
            }
        });
        return images;
    }, [member?.projects]);

    const titleId = member ? `team-member-modal-title-${member.name.replace(/\s+/g, '-')}` : undefined;

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[10001] isolate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                    id={modalId}
                    aria-labelledby={titleId}
                >
                    {/* Backdrop above everything */}
                    <Backdrop onClick={onCloseAction} />

                    {/* Bottom sheet container (anchors to bottom) */}
                    <div className="fixed inset-0 z-[10002] flex items-end justify-center pointer-events-none">
                        <motion.div
                            key={member?.name ?? "modal"}
                            className="pointer-events-auto w-full max-w-[100vw] h-[90vh] mx-auto bg-card/80 rounded-t-3xl shadow-2xl relative overflow-hidden text-foreground font-display"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 380, damping: 28 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.18}
                            dragMomentum={false}
                            onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                                if (info.offset.y > 120) onCloseAction();
                            }}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                            style={{
                                willChange: "transform",
                                boxShadow: "0 -8px 32px rgba(0,0,0,0.28)",
                                borderTopLeftRadius: "2rem",
                                borderTopRightRadius: "2rem",
                                maxHeight: "90vh",
                                width: "100vw",
                                backdropFilter: "blur(16px)",
                            }}
                            data-cursor="drag"
                        >
                            {/* Sticky Header with gradient background */}
                            <div
                                className="sticky top-0 z-[10005] flex items-center justify-between px-6 sm:px-10 py-4 md:py-5 backdrop-blur-lg rounded-t-3xl border-b border-primary/10">
                                <div className="flex items-center gap-3">
                                    {/* Member Image */}
                                    {member?.image && (
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                                blurDataURL={BLUR_DATA_URL}
                                                quality={70}
                                            />
                                        </div>
                                    )}
                                    <h3 id={titleId} className="text-2xl md:text-3xl font-bold text-foreground font-display truncate max-w-[60vw]">
                                        {member?.name}
                                    </h3>
                                </div>
                                <CloseButton onClick={onCloseAction} />
                            </div>

                            {/* Scrollable area inside the sheet */}
                            <div className="relative w-full h-[calc(90vh-76px)] overflow-y-auto scroll-smooth">
                                {/* Two-column content */}
                                {member && (
                                    <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                                            <DetailsLeft member={member} />
                                            <AboutRight member={member} />
                                        </div>

                                        {/* Project Showcase Gallery */}
                                        {member.projects && member.projects.length > 0 && (
                                            <div className="bg-background/60 rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-primary/10">
                                                <h4 className="text-2xl font-bold mb-2 text-primary font-display">Projects</h4>
                                                <hr className="border-muted/30 mb-5" />

                                                <motion.div
                                                    className="grid grid-cols-1 gap-4 md:gap-6"
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: {
                                                            opacity: 1,
                                                            transition: { staggerChildren: 0.08, when: "beforeChildren" }
                                                        }
                                                    }}
                                                >
                                                    {member.projects.map((proj, idx) => {
                                                        const match = proj.projectId
                                                            ? allProjects.find(p => p.id === proj.projectId)
                                                            : allProjects.find(p => p.title.toLowerCase() === proj.title.toLowerCase());

                                                        return (
                                                            <motion.div
                                                                key={`${proj.title}-${idx}`}
                                                                className="relative group overflow-hidden rounded-2xl shadow-md border border-primary/20 bg-background"
                                                                variants={{
                                                                    hidden: { opacity: 0, y: 24 },
                                                                    visible: { opacity: 1, y: 0 }
                                                                }}
                                                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                                            >
                                                                <div className="flex flex-col md:flex-row gap-4 p-4">
                                                                    {match?.image && (
                                                                        <button
                                                                            type="button"
                                                                            className="relative w-full md:w-48 aspect-[4/3] md:aspect-auto md:h-32 rounded-xl overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                                                            onClick={() => {
                                                                                if (match.image) {
                                                                                    const imgIndex = projectImages.indexOf(match.image);
                                                                                    if (imgIndex !== -1) {
                                                                                        setLightboxOpen(true);
                                                                                        setLightboxIndex(imgIndex);
                                                                                    }
                                                                                }
                                                                            }}
                                                                            aria-label={`View ${proj.title} image`}
                                                                            data-cursor="zoom"
                                                                        >
                                                                            <Image
                                                                                src={match.image}
                                                                                alt={proj.title}
                                                                                fill
                                                                                sizes="(max-width: 768px) 100vw, 192px"
                                                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                                                placeholder="blur"
                                                                                blurDataURL={BLUR_DATA_URL}
                                                                                quality={62}
                                                                            />
                                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                                                                        </button>
                                                                    )}

                                                                    <div className="flex-1 flex flex-col justify-center">
                                                                        <h5 className="text-lg font-semibold text-foreground mb-2">
                                                                            {proj.title}
                                                                        </h5>
                                                                        {proj.contribution && (
                                                                            <p className="text-sm text-primary/80 mb-2 font-medium">
                                                                                {proj.contribution}
                                                                            </p>
                                                                        )}
                                                                        {(proj.description || match?.description) && (
                                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                                {proj.description || match?.description}
                                                                            </p>
                                                                        )}
                                                                        {match?.technologies && match.technologies.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1 mt-3">
                                                                                {match.technologies.slice(0, 5).map((tech: string) => (
                                                                                    <span key={tech} className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">
                                                                                        {tech}
                                                                                    </span>
                                                                                ))}
                                                                                {match.technologies.length > 5 && (
                                                                                    <span className="text-xs text-muted-foreground">+{match.technologies.length - 5}</span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Fullscreen lightbox above the sheet */}
                            {lightboxOpen && projectImages.length > 0 && (
                                <Lightbox
                                    images={projectImages}
                                    index={lightboxIndex}
                                    setIndex={setLightboxIndex}
                                    onClose={() => setLightboxOpen(false)}
                                    title={member?.name || "Projects"}
                                />
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
