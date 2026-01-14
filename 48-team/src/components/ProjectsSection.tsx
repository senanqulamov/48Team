"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {ExternalLink, Github, ArrowRight, Zap, Brain, Globe, ArrowDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import LatestCommits from "@/components/latestCommits"

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [commitCount, setCommitCount] = useState<number | null>(null)
  const [commitError, setCommitError] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    category: string;
    status: string;
    icon: React.ElementType;
    color: string;
    links: {
      demo: string;
      github: string;
    };
    features: string[];
    date: string;
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "NeoSphere",
      subtitle: "AI-Powered Career & Community Platform",
      description:
          "A next-generation hub uniting workers, freelancers, and communities through AI-powered insights, job opportunities, and supportive networks.",
      longDescription:
          "NeoSphere is the future of work and connection — a platform where artificial intelligence enhances human collaboration. It enables users to find jobs, join communities, host events, and build meaningful networks. With built-in AI analytics, mentorship tools, and progress tracking, NeoSphere creates a trusted digital ecosystem for both professional and personal growth.",
      image: "/images/neosphere/1.png",
      technologies: ["React", "Laravel", "Java", "Javalin", "MySQL", "AWS"],
      category: "Startup",
      status: "In Development",
      icon: Zap,
      color: "from-primary to-accent",
      links: {
        demo: "https://neosphere.vercel.app",
        github: "#",
      },
      features: [
        "AI-Powered Career & Community Insights",
        "Personalized Growth & Mentorship",
        "Work & Collaboration Tracking",
        "Supportive Networks & Communities"
      ],
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "BidBary",
      subtitle: "Smart Auction Platform",
      description:
          "An intelligent auction platform that uses machine learning to optimize bidding strategies and provide real-time market insights for buyers and sellers.",
      longDescription:
          "BidBary transforms the traditional auction experience with smart algorithms that help users make informed bidding decisions while ensuring fair and transparent transactions.",
      image: "/images/bidbary/1.png",
      technologies: ["Next.js", "Javalin API", "Oracle DB", "Socket.io", "Redis", "Docker"],
      category: "Startup",
      status: "In Development",
      icon: Brain,
      color: "from-blue-500 to-purple-500",
      links: {
        demo: "#",
        github: "#",
      },
      features: ["Real-time Bidding", "Smart Analytics", "Secure Payments", "Mobile Responsive"],
      date: "2023-09-15",
    },
    {
      id: 3,
      title: "LMS",
      subtitle: "INCI",
      description:
          "A modern learning management system for creating, delivering, and scaling online courses with robust tools for learners and instructors.",
      longDescription:
          "The INCI LMS provides a complete learning experience with course authoring, lesson scheduling, enrollment management, quizzes, grading, and certification. Designed for maintainability and scalability, it includes a clean operations panel for admins and instructors. The architecture is built on Laravel (PHP 8+) and MySQL, with RBAC, queue workers for email/notifications, cached catalog queries, and optimized media handling for large course libraries. Performance is hardened by eliminating N+1 queries, adding pagination and composite indexes, and securing critical paths with policies and middleware.",
      image: "/images/lms.maffin.az/2.png",
      technologies: ["Laravel", "PHP 8+", "MySQL", "Tailwind", "Livewire", "Docker"],
      category: "Client Projects",
      status: "Live",
      icon: Globe,
      color: "from-green-400 to-teal-400",
      links: {
        demo: "https://lms.maffin.az",
        github: "#",
      },
      features: [
        "Courses & Lessons",
        "Enrollments & Cohorts",
        "Quizzes & Assignments",
        "Progress & Certificates",
        "RBAC",
        "Reports & Analytics"
      ],
      date: "2025 - Present",
    }

  ]

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: "easeInOut",
          }}
          className="group relative bg-card/50 border border-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 will-change-transform hover:border-primary/40 hover:translate-y-[-8px]"
          style={{ willChange: "transform" }}
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 will-change-transform"
              style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
          <span
              className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  project.status === "Live"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : project.status === "Beta"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}
          >
            {project.status}
          </span>
          </div>

          {/* Project Icon */}
          {/*<div className="absolute top-4 left-4">*/}
          {/*  <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} backdrop-blur-sm`}>*/}
          {/*    <project.icon className="w-6 h-6 text-white" />*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* Hover Overlay - Simplified */}
          <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-4">
              <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                  onClick={() => window.open(project.links.demo, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
              <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent transition-colors duration-200"
                  onClick={() => window.open(project.links.github, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">{project.category}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 will-change-transform" />
          </div>

          <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-accent font-medium mb-3">{project.subtitle}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.features.slice(0, 3).map((feature: string) => (
                <span key={feature} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
              {feature}
            </span>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech: string) => (
                <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              {tech}
            </span>
            ))}
            {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              +{project.technologies.length - 4} more
            </span>
            )}
          </div>
        </div>
      </motion.div>
  )

  return (
      <section id="projects" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              A showcase of innovative solutions that blend cutting-edge technology with human-centered design, each
              project solving real-world problems and making a meaningful impact.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Interested in collaborating or learning more?
                </p>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="px-4 py-2 bg-card border border-primary/20 rounded-full cursor-pointer text-sm md:text-base font-medium text-primary backdrop-blur-sm"
                    asChild
                >
                <span className="flex items-center gap-2">
                  Let&apos;s Work Together
                  <ArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
                </span>
                </Button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Want to see all my projects?
                </p>
                <Button
                    size="lg"
                    variant="outline"
                    className="px-4 py-2 bg-card border border-primary/20 rounded-full text-sm md:text-base font-medium text-primary backdrop-blur-sm"
                    asChild
                >
                  <Link href="/projects">
                  <span className="flex items-center gap-2">
                    See All Projects
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Latest Commits Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-card/60 to-background/60 border border-primary/20 rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
              <Accordion type="single" collapsible defaultValue="latest-commits">
                 <AccordionItem value="latest-commits">
                  <AccordionTrigger className="px-4 sm:px-6">
                    <div className="flex w-full items-center gap-3 sm:gap-4">
                      <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary border border-primary/25 shadow-sm">
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 3.549a9 9 0 1 1-8 0"/>
                          <path d="M12 12v9"/>
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base sm:text-lg font-semibold">Latest GitHub activity</span>
                          {/* dynamic badge */}
                          {commitError ? (
                            <span className="text-xs rounded-md border border-red-500/30 text-red-400 bg-red-500/10 px-2 py-0.5">Unavailable</span>
                          ) : commitCount === null ? (
                            <span className="text-xs rounded-md border border-primary/30 text-primary bg-primary/10 px-2 py-0.5 inline-flex items-center gap-1">
                              <span className="size-1.5 rounded-full bg-primary animate-pulse" /> Fetching…
                            </span>
                          ) : commitCount > 0 ? (
                            <span className="text-xs rounded-md border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-2 py-0.5">{commitCount} updates</span>
                          ) : (
                            <span className="text-xs rounded-md border border-muted/40 text-muted-foreground bg-muted/20 px-2 py-0.5">No recent activity</span>
                          )}
                        </div>
                        <span className="block text-xs sm:text-sm text-muted-foreground">Recent public commits and changes</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <a href="https://github.com/senanqulamov" target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Github className="size-4 mr-1.5" /> Profile
                          </Button>
                        </a>
                        <a href="#contact">
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Hire me
                          </Button>
                        </a>
                      </div>
                    </div>
                  </AccordionTrigger>
                   <AccordionContent className="px-0">
                     {/* Embedded feed */}
                    <LatestCommits
                      user="senanqulamov"
                      limit={10}
                      compact
                      onLoadedAction={(info) => {
                        setCommitCount(info.count)
                        setCommitError(info.error || null)
                      }}
                    />
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
             </div>
           </motion.div>

          {/* Background Decorations */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </section>
  )
}

export default ProjectsSection