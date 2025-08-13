"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ExternalLink, Github, ArrowRight, Zap, Brain, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const projects = [
    {
      id: 1,
      title: "NeoSphere",
      subtitle: "AI-Powered Wellness Platform",
      description:
        "A revolutionary platform combining AI technology with therapeutic principles to provide personalized mental health support and wellness coaching.",
      longDescription:
        "NeoSphere represents the future of digital wellness, where artificial intelligence meets human empathy. The platform uses advanced algorithms to analyze user behavior patterns and provide personalized therapeutic interventions.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Next.js", "Python", "TensorFlow", "PostgreSQL", "AWS"],
      category: "Startup",
      status: "In Development",
      icon: Brain,
      color: "from-primary to-accent",
      links: {
        demo: "#",
        github: "#",
      },
      features: ["AI-Powered Insights", "Personalized Therapy", "Progress Tracking", "Community Support"],
    },
    {
      id: 2,
      title: "BidBary",
      subtitle: "Smart Auction Platform",
      description:
        "An intelligent auction platform that uses machine learning to optimize bidding strategies and provide real-time market insights for buyers and sellers.",
      longDescription:
        "BidBary transforms the traditional auction experience with smart algorithms that help users make informed bidding decisions while ensuring fair and transparent transactions.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "Redis", "Docker"],
      category: "Web App",
      status: "Live",
      icon: Zap,
      color: "from-blue-500 to-purple-500",
      links: {
        demo: "#",
        github: "#",
      },
      features: ["Real-time Bidding", "Smart Analytics", "Secure Payments", "Mobile Responsive"],
    },
    {
      id: 3,
      title: "BorderMate",
      subtitle: "Immigration Assistant",
      description:
        "A comprehensive digital assistant for immigration processes, helping users navigate complex paperwork and requirements with AI-guided support.",
      longDescription:
        "BorderMate simplifies immigration by providing step-by-step guidance, document management, and real-time updates on application status, making the process less stressful for applicants.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Express.js", "MySQL", "Firebase", "Stripe", "Twilio"],
      category: "Mobile App",
      status: "Beta",
      icon: Globe,
      color: "from-green-500 to-teal-500",
      links: {
        demo: "#",
        github: "#",
      },
      features: ["Document Scanner", "Progress Tracking", "Expert Chat", "Multi-language Support"],
    },
  ]

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <motion.div
      variants={itemVariants}
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
        <div className="absolute top-4 left-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} backdrop-blur-sm`}>
            <project.icon className="w-6 h-6 text-white" />
          </div>
        </div>

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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions that blend cutting-edge technology with human-centered design, each
            project solving real-world problems and making a meaningful impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Interested in collaborating or learning more about these projects?
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-hover bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium group"
          >
            Let's Work Together
            <ArrowRight className="ml-2 w-5 h-5 icon-hover group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default ProjectsSection
