"use client"

import { useMemo, useState } from "react"
import { Brain, Server, Rocket, Users, Palette, Globe, Eye } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"
import ProjectBlogModal from "@/components/ui/ProjectBlogModal"
import PageLoader from "@/components/PageLoader";
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise";
import Image from "next/image";

// Project interface definition
interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  blog?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  category?: string;
  status?: string;
  icon?: React.ElementType;
  color?: string;
  date?: string;
  links?: { demo?: string; github?: string };
  features?: string[];
}

// Timeline project data (unchanged)
const projects: Project[] = [
  // My Projects
  {
    id: 1,
    title: "NeoSphere",
    subtitle: "AI-Powered Wellness Platform",
    description:
        "A revolutionary platform combining AI technology with therapeutic principles to provide personalized mental health support and wellness coaching.",
    blog: `<p>A revolutionary platform combining AI technology with therapeutic principles to provide personalized mental health support and wellness coaching. NeoSphere offers AI-powered insights, personalized therapy, progress tracking, and a supportive community. Built with React, Next.js, Python, TensorFlow, and AWS.</p>`,
    image: "/images/demo1/1.jpg",
    images: [
      "/images/demo1/1.jpg",
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/1.jpg",
      "/images/demo1/2.jpg"
    ],
    technologies: ["React", "Next.js", "Python", "TensorFlow", "PostgreSQL", "AWS"],
    category: "My Projects",
    status: "In Development",
    icon: Brain,
    color: "from-primary to-accent",
    date: "2024 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["AI-Powered Insights", "Personalized Therapy", "Progress Tracking", "Community Support"],
  },
  {
    id: 5,
    title: "CodePilot",
    subtitle: "AI Coding Assistant",
    description:
        "A browser-based AI assistant for code generation, review, and refactoring. Integrates with popular IDEs and supports multiple languages.",
    blog: `<p>A browser-based AI assistant for code generation, review, and refactoring. CodePilot integrates with popular IDEs and supports multiple languages. Built with TypeScript, React, Node.js, and OpenAI API.</p>`,
    image: "/images/demo1/2.jpg",
    images: [
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg"
    ],
    technologies: ["TypeScript", "React", "Node.js", "OpenAI API"],
    category: "My Projects",
    status: "Beta",
    icon: Brain,
    color: "from-primary to-accent",
    date: "2023 - 2024",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Code Generation", "Refactoring", "IDE Integration", "Multi-language Support"],
  },
  {
    id: 7,
    title: "EcoTrackr",
    subtitle: "Sustainability Analytics Platform",
    description:
        "A platform for tracking and analyzing sustainability metrics for businesses, with automated reporting and actionable insights.",
    blog: `<p>A platform for tracking and analyzing sustainability metrics for businesses, with automated reporting and actionable insights. EcoTrackr provides custom dashboards, data export, and is built with React, Django, PostgreSQL, and Chart.js.</p>`,
    image: "/images/demo1/1.jpg",
    images: [
      "/images/demo1/1.jpg",
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/1.jpg",
      "/images/demo1/2.jpg"
    ],
    technologies: ["React", "Django", "PostgreSQL", "Chart.js"],
    category: "My Projects",
    status: "Live",
    icon: Globe,
    color: "from-green-400 to-blue-400",
    date: "2023 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Automated Reports", "Sustainability Metrics", "Custom Dashboards", "Data Export"],
  },
  // Startups
  {
    id: 2,
    title: "BidBary",
    subtitle: "Smart Auction Platform",
    description:
        "An intelligent auction platform that uses machine learning to optimize bidding strategies and provide real-time market insights for buyers and sellers.",
    blog: `<p>An intelligent auction platform that uses machine learning to optimize bidding strategies and provide real-time market insights for buyers and sellers. BidBary features smart bidding, market insights, and secure transactions. Built with Vue.js, Node.js, MongoDB, and Docker.</p>`,
    image: "/images/demo1/3.jpg",
    images: [
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg"
    ],
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "Redis", "Docker"],
    category: "Startups",
    status: "Live",
    icon: Rocket,
    color: "from-accent to-primary",
    date: "2022 - 2024",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Smart Bidding", "Market Insights", "Real-Time Updates", "Secure Transactions"],
  },
  {
    id: 6,
    title: "HealthSync",
    subtitle: "Remote Patient Monitoring Startups",
    description:
        "A Startups focused on remote patient monitoring, integrating IoT devices and real-time analytics for healthcare providers.",
    blog: `<p>A Startups focused on remote patient monitoring, integrating IoT devices and real-time analytics for healthcare providers. HealthSync offers IoT integration, real-time analytics, and mobile access for providers. Built with React Native, AWS IoT, GraphQL, and Python.</p>`,
    image: "/images/demo1/4.jpg",
    images: [
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/6.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg"
    ],
    technologies: ["React Native", "AWS IoT", "GraphQL", "Python"],
    category: "Startups",
    status: "Pilot",
    icon: Rocket,
    color: "from-accent to-primary",
    date: "2021 - 2023",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["IoT Integration", "Real-Time Analytics", "Mobile App", "Provider Dashboard"],
  },
  {
    id: 8,
    title: "Evently",
    subtitle: "Event Management SaaS",
    description:
        "A SaaS platform for event organizers to manage registrations, ticketing, and attendee engagement with real-time analytics.",
    blog: `<p>A SaaS platform for event organizers to manage registrations, ticketing, and attendee engagement with real-time analytics. Evently includes features for ticketing, registration, and engagement tools. Built with Vue.js, Node.js, MongoDB, and Stripe API.</p>`,
    image: "/images/demo1/2.jpg",
    images: [
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/2.jpg",
      "/images/demo1/3.jpg"
    ],
    technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe API"],
    category: "Startups",
    status: "Live",
    icon: Rocket,
    color: "from-purple-400 to-pink-400",
    date: "2022 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Ticketing", "Registration", "Analytics", "Engagement Tools"],
  },
  // Client Projects
  {
    id: 3,
    title: "TherapyConnect",
    subtitle: "Client Portal for Therapists",
    description:
        "A secure portal for therapists to manage client sessions, notes, and progress, with integrated video calls and messaging.",
    blog: `<p>A secure portal for therapists to manage client sessions, notes, and progress, with integrated video calls and messaging. TherapyConnect ensures data security and compliance with healthcare regulations. Built with Laravel, PHP, MySQL, and Bootstrap.</p>`,
    image: "/images/demo1/5.jpg",
    images: [
      "/images/demo1/5.jpg",
      "/images/demo1/6.jpg",
      "/images/demo1/7.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/6.jpg"
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-primary to-accent",
    date: "2021 - 2022",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Session Management", "Secure Notes", "Video Calls", "Messaging"],
  },
  {
    id: 4,
    title: "DesignFlow",
    subtitle: "Creative Agency Website",
    description:
        "A modern website for a creative agency, featuring portfolio, blog, and contact forms, built with a custom design system.",
    blog: `<p>A modern website for a creative agency, featuring portfolio, blog, and contact forms, built with a custom design system. DesignFlow showcases creative work and enables client engagement. Built with Figma, React, Next.js, and Sass.</p>`,
    image: "/images/demo1/6.jpg",
    images: [
      "/images/demo1/6.jpg",
      "/images/demo1/7.jpg",
      "/images/demo1/8.jpg",
      "/images/demo1/6.jpg",
      "/images/demo1/7.jpg"
    ],
    technologies: ["Figma", "React", "Next.js", "Sass"],
    category: "Client Projects",
    status: "Completed",
    icon: Palette,
    color: "from-yellow-400 to-pink-400",
    date: "2020 - 2021",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Portfolio", "Blog", "Contact Forms", "Custom Design System"],
  },
  {
    id: 9,
    title: "EduQuest",
    subtitle: "Adaptive Learning Platform",
    description:
        "An adaptive learning platform for schools, featuring personalized lesson plans, progress tracking, and gamified assessments.",
    blog: `<p>An adaptive learning platform for schools, featuring personalized lesson plans, progress tracking, and gamified assessments. EduQuest enhances the learning experience with technology. Built with Angular, Firebase, TypeScript, and SCSS.</p>`,
    image: "/images/demo1/3.jpg",
    images: [
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/3.jpg",
      "/images/demo1/4.jpg"
    ],
    technologies: ["Angular", "Firebase", "TypeScript", "SCSS"],
    category: "Client Projects",
    status: "Completed",
    icon: Users,
    color: "from-blue-400 to-indigo-400",
    date: "2020 - 2022",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Personalized Lessons", "Progress Tracking", "Gamified Assessments", "Teacher Dashboard"],
  },
  {
    id: 10,
    title: "ShopEase",
    subtitle: "E-commerce Automation",
    description:
        "A solution for automating e-commerce operations, including inventory management, order processing, and customer engagement.",
    blog: `<p>A solution for automating e-commerce operations, including inventory management, order processing, and customer engagement. ShopEase streamlines e-commerce workflows and enhances customer interaction. Built with Shopify, React, Node.js, and GraphQL.</p>`,
    image: "/images/demo1/4.jpg",
    images: [
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/6.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg"
    ],
    technologies: ["Shopify", "React", "Node.js", "GraphQL"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-pink-400 to-red-400",
    date: "2019 - 2021",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Inventory Automation", "Order Processing", "Customer Engagement", "Analytics"],
  },
];

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper: Ensure at least 4 cards for slider
  const filteredProjects = useMemo(
      () => projects.filter(p => p.category === activeCategory),
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

  const handleComplete = () => setInitialLoading(false);

  const handleTabChange = (cat: string) => {
    setLoading(true);
    // small delay for blur noise transition
    setTimeout(() => {
      setActiveCategory(cat);
      setLoading(false);
    }, 150);
  };

  return (
      <section className="py-5 px-4 bg-muted/20 relative overflow-hidden">
        {initialLoading && <PageLoader onComplete={handleComplete} />}
        <ProgressiveBlurNoise show={loading} />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-16">
          <span className="text-3xl font-display font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-300% relative">
            S48
          </span>
            <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 rounded-full cursor-pointer font-semibold text-base transition-all duration-200 bg-card hover:bg-primary/10 hover:text-primary"
            >
              &larr; Go Back
            </button>
          </div>

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
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`px-4 py-2 md:px-6 md:py-2 cursor-pointer rounded-full font-semibold text-sm md:text-base transition-all duration-200 border border-primary/20 bg-card hover:bg-primary/10 hover:text-primary ${activeCategory === cat ? "bg-primary/10 text-primary" : "text-foreground"}`}
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
                      <CarouselPrevious className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                      <CarouselNext className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                    </div>

                    {/* Carousel Content */}
                    <CarouselContent className="ml-0 md:-ml-4">
                      {sliderProjects.map((project, idx) => {
                        const techs = project.technologies ?? [];
                        const feats = project.features ?? [];

                        const techsMobile = techs.slice(0, MAX_MOBILE_TAGS);
                        const featsMobile = feats.slice(0, MAX_MOBILE_TAGS);
                        const techsRest = Math.max(techs.length - MAX_MOBILE_TAGS, 0);
                        const featsRest = Math.max(feats.length - MAX_MOBILE_TAGS, 0);

                        return (
                            <CarouselItem
                                key={project.id + "-" + idx}
                                className="relative pl-4 md:pl-4 pr-4 md:pr-0 w-full sm:max-w-[85%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[520px] mx-auto flex-shrink-0"
                            >
                              {/* Project Card Content */}
                              <div
                                  className={`w-full h-[500px] border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between select-none relative overflow-hidden group transition-all duration-500
                          ${hoveredIdx !== null && hoveredIdx !== idx ? "opacity-70" : ""}
                        `}
                                  style={{ userSelect: "none" }}
                                  onMouseEnter={() => setHoveredIdx(idx)}
                                  onMouseLeave={() => setHoveredIdx(null)}
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
                                    blurDataURL="/images/placeholder-blur.png"
                                    quality={70}
                                />

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{ background: "linear-gradient(rgba(20,20,30,0.7), rgba(20,20,30,0.7))" }}
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
                                    {project.icon && <project.icon className="w-8 h-8 text-primary flex-shrink-0" />}
                                    <div className="flex-1">
                                      <h3 className="font-bold text-2xl text-foreground mb-1">{project.title}</h3>
                                      <h4 className="text-lg text-muted-foreground">{project.subtitle}</h4>
                                    </div>
                                  </div>

                                  <p className="text-base text-muted-foreground mb-4 flex-1">{project.description}</p>

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
                                          >
                                            +{techsRest} more
                                          </button>
                                      )}
                                    </div>
                                    {/* Desktop: full list */}
                                    <div className="hidden md:flex flex-wrap gap-2">
                                      {techs.map((tech) => (
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
                                    >
                                      <Eye className="w-4 h-4" />
                                      See Project
                                    </button>
                                  </div>
                                </div>
                              </div>
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
              onClose={() => { setModalOpen(false); setSelectedProject(null); }}
              project={selectedProject}
          />
        </div>
      </section>
  )
}