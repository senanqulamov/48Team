"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { Eye } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"
import ProjectBlogModal from "@/components/ui/ProjectBlogModal"
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/types/project"
import { projects as allProjects } from "@/lib/projects"

// Inline blur placeholder to avoid missing file fetches
const BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2321252f'/%3E%3C/svg%3E";

const categories = ["Client Projects", "My Projects", "Startups"]

const VISIBLE_SLIDES = 4; // Number of slides visible
const MAX_MOBILE_TAGS = 3; // Mobile tag cap for technologies and features

// Realistic Skeleton Component
const ProjectCardSkeleton = () => (
    <div className="w-full h-[500px] border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between select-none relative overflow-hidden bg-card/50">
      {/* Timeline Dot & Date Skeleton */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse shadow-lg border-4 border-background z-10" />
        <div className="h-4 w-20 bg-gray-300 rounded mt-2 animate-pulse"></div>
      </div>
      {/* Project Card Content Skeleton */}
      <div className="mb-4 flex-1 flex flex-col">
        {/* Icon and Title Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-7 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
        </div>
        {/* Technologies Skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        {/* Features Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
          ))}
        </div>
        {/* Status and Button Skeleton */}
        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-8 w-28 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
);

// Skeleton Carousel Component
const SkeletonCarousel = () => (
    <Carousel
        className="w-full max-w-7xl mx-auto"
        opts={{
          align: "center",
          loop: false,
          dragFree: false,
          slidesToScroll: 1,
          breakpoints: {
            "(min-width: 1000px)": {
              align: "center",
              loop: true,
              dragFree: true,
              slidesToScroll: 1,
            },
          },
        }}
    >
      {/* Navigation Controls Skeleton */}
      <div className="flex justify-center gap-4 mb-6 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:justify-between md:px-2 md:pointer-events-none md:z-20">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      {/* Carousel Content Skeleton */}
      <CarouselContent className="ml-0 md:-ml-4">
        {[...Array(4)].map((_, idx) => (
            <CarouselItem
                key={idx}
                className="pl-4 md:pl-4 pr-4 md:pr-0 w-full sm:max-w-[85%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[520px] mx-auto flex-shrink-0"
            >
              <ProjectCardSkeleton />
            </CarouselItem>
        ))}
      </CarouselContent>
      {/* Dots Indicator Skeleton */}
      <div className="hidden md:flex justify-center gap-2 mt-6">
        {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${idx * 0.1}s` }}></div>
        ))}
      </div>
    </Carousel>
);

export default function ProjectsTimelinePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const targetHashRef = useRef<number | null>(null);

  // Deep-link hash support (#p-ID)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash.startsWith('#p-')) {
      const id = parseInt(hash.slice(3), 10);
      if (Number.isFinite(id)) {
        targetHashRef.current = id;
        const proj = allProjects.find(p => p.id === id);
        if (proj && proj.category && proj.category !== activeCategory) {
          setLoading(true);
          setTimeout(() => { // mimic tab change delay
            setActiveCategory(proj.category as string);
            setLoading(false);
          }, 50);
        } else {
          // Scroll after initial render
          setTimeout(() => {
            const el = document.getElementById(`p-${id}`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          }, 450);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After loading or category change, attempt scroll if target pending
  useEffect(() => {
    if (loading) return;
    if (targetHashRef.current) {
      const el = document.getElementById(`p-${targetHashRef.current}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          targetHashRef.current = null;
        }, 200);
      }
    }
  }, [loading, activeCategory]);

  // Helper: Ensure at least 4 cards for slider
  const filteredProjects = useMemo(
      () => allProjects.filter(p => p.category === activeCategory),
      [activeCategory]
  );

  const sliderProjects = useMemo(() => {
    if (filteredProjects.length > 0 && filteredProjects.length < VISIBLE_SLIDES) {
      const arr: Project[] = [];
      let i = 0;
      while (arr.length < VISIBLE_SLIDES) {
        arr.push(filteredProjects[i % filteredProjects.length]);
        i++;
      }
      return arr;
    }
    return filteredProjects;
  }, [filteredProjects]);

  const handleTabChange = (cat: string) => {
    setLoading(true);
    // small delay for blur noise transition
    setTimeout(() => {
      setActiveCategory(cat);
      setLoading(false);
    }, 150);
  };

  return (
      <section className="py-30 px-4 bg-muted/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* SR-only live region for category updates */}
          <p className="sr-only" aria-live="polite">
            Showing {filteredProjects.length} projects in {activeCategory}
          </p>

          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my journey through My Projects, Startups, and Client Projects. Each milestone is a story of innovation, collaboration, and impact.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap" role="group" aria-label="Project categories">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`px-4 py-2 md:px-6 md:py-2 cursor-pointer rounded-full font-semibold text-sm md:text-base transition-all duration-200 border border-primary/20 bg-card hover:bg-primary/10 hover:text-primary ${activeCategory === cat ? "bg-primary/10 text-primary" : "text-foreground"}`}
                    aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
            ))}
          </div>

          {/* Timeline Axis & Slider Controls */}
          <div className="relative w-full flex flex-col items-center">
            {loading ? (
                <SkeletonCarousel />
            ) : (
                <div className="w-full relative">
                  <Carousel
                      className="w-full max-w-7xl mx-auto"
                      opts={{
                        // Mobile defaults
                        align: "center",
                        loop: false,
                        dragFree: false,
                        slidesToScroll: 1,
                        // Desktop overrides
                        breakpoints: {
                          "(min-width: 1000px)": {
                            align: "center",
                            loop: true,
                            dragFree: true,
                            slidesToScroll: 1,
                          },
                        },
                      }}
                  >
                    {/* Navigation Controls */}
                    <div className="flex justify-center gap-4 mb-6 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:justify-between md:px-2 md:pointer-events-none md:z-20">
                      <CarouselPrevious data-cursor="prev" className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                      <CarouselNext data-cursor="next" className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                    </div>

                    {/* Carousel Content */}
                    <CarouselContent className="ml-0 md:-ml-4" data-cursor="drag">
                      {sliderProjects.map((project, idx) => {
                        const techTags = project.technologies ?? project.techTags ?? (project.techStack ? project.techStack.map(t => t.name) : [])
                        const feats = project.features ?? [];

                        const techsMobile = techTags.slice(0, MAX_MOBILE_TAGS);
                        const featsMobile = feats.slice(0, MAX_MOBILE_TAGS);
                        const techsRest = Math.max(techTags.length - MAX_MOBILE_TAGS, 0);
                        const featsRest = Math.max(feats.length - MAX_MOBILE_TAGS, 0);

                        const modalId = `project-modal-${project.id}`;

                        return (
                            <CarouselItem
                                key={project.id + "-" + idx}
                                className="relative pl-4 md:pl-4 pr-4 md:pr-0 w-full sm:max-w-[85%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[520px] mx-auto flex-shrink-0"
                                data-cursor="drag"
                                id={`p-${project.id}`}
                            >
                              {/* Project Card Content */}
                              <motion.div
                                  className={`w-full h-[500px] border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between select-none relative overflow-hidden group transition-all duration-500
                          ${hoveredIdx !== null && hoveredIdx !== idx ? "opacity-70" : ""}
                        `}
                                  style={{ userSelect: "none" }}
                                  onMouseEnter={() => setHoveredIdx(idx)}
                                  onMouseLeave={() => setHoveredIdx(null)}
                                  data-cursor="drag"
                                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                                  viewport={{ once: true, amount: 0.2 }}
                                  whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              >
                                {/* Background Image */}
                                <Image
                                    src={project.image || "/images/placeholder.jpg"}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 900px) 100vw, 520px"
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
                                    priority={idx === 0}
                                    placeholder="blur"
                                    blurDataURL={BLUR_DATA_URL}
                                    quality={70}
                                />

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{ background: "linear-gradient(rgb(20 20 30 / 85%), rgb(20 20 30 / 89%))" }}
                                />

                                {/* Dark overlay for non-hovered cards */}
                                {hoveredIdx !== null && hoveredIdx !== idx && (
                                    <div className="absolute inset-0 bg-black/40 transition-all duration-500 pointer-events-none z-20" />
                                )}

                                {/* Timeline Dot & Date */}
                                <div className="flex flex-col items-center mb-4 relative z-30 select-none">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg border-4 border-background z-10" />
                                  <span className="text-base font-semibold text-primary mt-2">{project.date}</span>
                                </div>

                                {/* Project Card */}
                                <div className="mb-4 relative z-30 flex-1 flex flex-col">
                                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-3">
                                    {/* No icon field in shared data; render title/subtitle only */}
                                    <div className="flex-1">
                                      <h3 className="font-bold text-2xl text-foreground mb-1">{project.title}</h3>
                                      <h4 className="text-lg text-muted-foreground">{project.subtitle}</h4>
                                    </div>
                                  </div>

                                  <p className="hidden md:block text-base text-muted-foreground mb-4 flex-1">{project.description}</p>

                                  {/* Technologies row */}
                                  <div className="mb-3">
                                    {/* Mobile: limited tags + "+N" opens modal */}
                                    <div className="flex flex-wrap gap-2 md:hidden">
                                      {techsMobile.map((tech) => (
                                          <span
                                              key={`tech-m-${project.id}-${tech}`}
                                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                                          >
                                    {tech}
                                  </span>
                                      ))}
                                      {techsRest > 0 && (
                                          <button
                                              type="button"
                                              onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                              className="px-3 py-1 rounded-full bg-primary/20 text-primary/90 text-sm font-semibold cursor-pointer"
                                              aria-label={`Open project to see ${techsRest} more technologies`}
                                              title={`See ${techsRest} more`}
                                              aria-haspopup="dialog"
                                              aria-controls={modalId}
                                              aria-expanded={modalOpen && selectedProject?.id === project.id}
                                          >
                                            +{techsRest} more
                                          </button>
                                      )}
                                    </div>
                                    {/* Desktop: full list */}
                                    <div className="hidden md:flex flex-wrap gap-2">
                                      {techTags.map((tech) => (
                                          <span
                                              key={`tech-d-${project.id}-${tech}`}
                                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                                          >
                                    {tech}
                                  </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Features row */}
                                  <div className="mb-4">
                                    {/* Mobile: limited tags + "+N" opens modal */}
                                    <div className="flex flex-wrap gap-2 md:hidden">
                                      {featsMobile.map((f) => (
                                          <span
                                              key={`feat-m-${project.id}-${f}`}
                                              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                                          >
                                    {f}
                                  </span>
                                      ))}
                                      {featsRest > 0 && (
                                          <button
                                              type="button"
                                              onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                              className="px-3 py-1 rounded-full bg-accent/20 text-accent/90 text-sm font-semibold cursor-pointer"
                                              aria-label={`Open project to see ${featsRest} more features`}
                                              title={`See ${featsRest} more`}
                                              aria-haspopup="dialog"
                                              aria-controls={modalId}
                                              aria-expanded={modalOpen && selectedProject?.id === project.id}
                                          >
                                            +{featsRest} more
                                          </button>
                                      )}
                                    </div>
                                    {/* Desktop: full list */}
                                    <div className="hidden md:flex flex-wrap gap-2">
                                      {feats.map((f) => (
                                          <span
                                              key={`feat-d-${project.id}-${f}`}
                                              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                                          >
                                    {f}
                                  </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center mt-auto">
                              <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground">
                                {project.status}
                              </span>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-primary font-semibold text-sm border border-primary/20 hover:bg-primary/10 transition-all cursor-pointer"
                                        onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                        data-cursor="pointer"
                                        aria-label={`See details for ${project.title}`}
                                        aria-haspopup="dialog"
                                        aria-controls={modalId}
                                        aria-expanded={modalOpen && selectedProject?.id === project.id}
                                    >
                                      <Eye className="w-4 h-4" />
                                      See Project
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            </CarouselItem>
                        );
                      })}
                    </CarouselContent>

                    {/* Dots Indicator - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:block mt-6">
                      <CarouselDots />
                    </div>
                  </Carousel>
                </div>
            )}
          </div>

          {/* Project Blog Modal */}
          <ProjectBlogModal
              open={modalOpen}
              onCloseAction={() => { setModalOpen(false); setSelectedProject(null); }}
              project={selectedProject}
              modalId={selectedProject ? `project-modal-${selectedProject.id}` : undefined}
          />
        </div>
      </section>
  )
}
