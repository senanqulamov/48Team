"use client"

import { useState } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import Navigation from "@/components/Navigation";
import PageLoader from "@/components/PageLoader";
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise";

// Timeline project data
const projects = [
  // Own Products
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
    category: "Own Product",
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
    category: "Own Product",
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
    category: "Own Product",
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
    category: "Startup",
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
    subtitle: "Remote Patient Monitoring Startup",
    description:
      "A startup focused on remote patient monitoring, integrating IoT devices and real-time analytics for healthcare providers.",
    blog: `<p>A startup focused on remote patient monitoring, integrating IoT devices and real-time analytics for healthcare providers. HealthSync offers IoT integration, real-time analytics, and mobile access for providers. Built with React Native, AWS IoT, GraphQL, and Python.</p>`,
    image: "/images/demo1/4.jpg",
    images: [
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg",
      "/images/demo1/6.jpg",
      "/images/demo1/4.jpg",
      "/images/demo1/5.jpg"
    ],
    technologies: ["React Native", "AWS IoT", "GraphQL", "Python"],
    category: "Startup",
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
    category: "Startup",
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
    category: "Client Project",
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
    category: "Client Project",
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
    category: "Client Project",
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
    category: "Client Project",
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
]

// Define Project type for type safety
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

const categories = ["Own Product", "Startup", "Client Project"]

export default function ProjectsTimelinePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper: Ensure at least 3 cards for infinite slider
  const VISIBLE_SLIDES = 4; // max visible on desktop
  const filteredProjects = projects.filter(p => p.category === activeCategory);
  let sliderProjects = filteredProjects;
  if (filteredProjects.length > 0 && filteredProjects.length < VISIBLE_SLIDES) {
    sliderProjects = [];
    let i = 0;
    while (sliderProjects.length < VISIBLE_SLIDES) {
      sliderProjects.push(filteredProjects[i % filteredProjects.length]);
      i++;
    }
  }

  // Remove useEffect for initialLoading
  // useEffect(() => {
  //   setInitialLoading(false);
  // }, []);

  // Add handleComplete for PageLoader
  const handleComplete = () => setInitialLoading(false);

  // Skeleton switch effect on tab change
  const handleTabChange = (cat: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setLoading(false);
    }, 400);
  };

  return (
    <section className="py-20 px-4 bg-muted/20 relative">
      <Navigation />
      {initialLoading && <PageLoader onComplete={handleComplete} />}
      <ProgressiveBlurNoise show={loading} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Projects Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my journey through own products, startups, and client projects. Each milestone is a story of innovation, collaboration, and impact.
          </p>
        </div>
        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 border border-primary/20 bg-card hover:bg-primary/10 hover:text-primary ${activeCategory === cat ? "bg-primary text-white" : "text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Timeline Axis & Slider Controls */}
        <div className="relative w-full flex flex-col items-center">
          {loading ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(VISIBLE_SLIDES)].map((_, idx) => (
                <Skeleton key={idx} className="h-[420px] w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <Carousel
              className="w-full max-w-7xl mx-auto"
              opts={{
                align: "start",
                slidesToScroll: 1,
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent>
                {sliderProjects.map((project, idx) => (
                  <CarouselItem
                    key={project.id + '-' + idx}
                    className="px-4 w-full md:basis-2/3 lg:basis-1/2 xl:basis-[520px] flex-shrink-0"
                  >
                    {/* Project Card Content */}
                    <div
                      className={`w-full border border-primary/20 rounded-2xl p-8 flex flex-col justify-between select-none relative overflow-hidden group transition-all duration-500
    ${hoveredIdx !== null && hoveredIdx !== idx ? 'shadow-2xl' : ''}
    ${hoveredIdx === idx ? 'shadow-[0_0_40px_10px_rgba(0,0,0,0.15)] brightness-125' : ''}
  `}
                      style={{
                        userSelect: 'none',
                        backgroundImage: `linear-gradient(rgba(20,20,30,0.7), rgba(20,20,30,0.7)), url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        transition: 'background 0.4s, filter 0.4s',
                        filter: hoveredIdx === idx ? 'brightness(1.25)' : hoveredIdx !== null && hoveredIdx !== idx ? 'brightness(0.6)' : 'brightness(0.95)',
                        willChange: 'filter'
                      }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Dark overlay for non-hovered cards */}
                      {hoveredIdx !== null && hoveredIdx !== idx && (
                        <div className="absolute inset-0 bg-black/40 transition-all duration-500 pointer-events-none z-10" />
                      )}
                      {/* Timeline Dot & Date */}
                      <div className="flex flex-col items-center mb-4 relative z-20 select-none" style={{ userSelect: 'none' }}>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg border-4 border-background z-10" />
                        <span className="text-base font-semibold text-primary mt-2 select-none" style={{ userSelect: 'none' }}>{project.date}</span>
                      </div>
                      {/* Project Card */}
                      <div className="mb-4 relative z-20 select-none" style={{ userSelect: 'none' }}>
                        <div className="flex items-center gap-3 mb-2 select-none" style={{ userSelect: 'none' }}>
                          <project.icon className="w-8 h-8 text-primary select-none" style={{ userSelect: 'none' }} />
                          <h3 className="font-bold text-2xl text-foreground select-none" style={{ userSelect: 'none' }}>{project.title}</h3>
                          <button
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-muted text-primary font-semibold text-base border border-primary/20 hover:bg-primary/10 transition-all cursor-pointer select-none"
                            style={{ userSelect: 'none' }}
                            onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                          >
                            <Eye className="w-5 h-5" />
                            See Project
                          </button>
                        </div>
                        <h4 className="text-lg text-muted-foreground mb-2 select-none" style={{ userSelect: 'none' }}>{project.subtitle}</h4>
                        <p className="text-base text-muted-foreground mb-2 select-none" style={{ userSelect: 'none' }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2 select-none" style={{ userSelect: 'none' }}>
                          {project.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold select-none" style={{ userSelect: 'none' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2 select-none" style={{ userSelect: 'none' }}>
                          {project.features.map(f => (
                            <span key={f} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium select-none" style={{ userSelect: 'none' }}>
                              {f}
                            </span>
                          ))}
                        </div>
                        <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground mb-2 select-none" style={{ userSelect: 'none' }}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
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
