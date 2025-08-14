"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Rocket } from "lucide-react"

const ExperienceSection = () => {
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

  const experiences = [
    {
      id: 1,
      type: "work",
      title: "Founder & CEO",
      company: "NeoSphere",
      location: "Remote",
      period: "2023 - Present",
      description:
        "Leading the development of an AI-powered wellness platform that combines therapeutic principles with cutting-edge technology. Managing a team of 8 developers and therapists.",
      achievements: [
        "Raised $500K in seed funding",
        "Built MVP with 1000+ beta users",
        "Established partnerships with 3 therapy clinics",
      ],
      icon: Rocket,
      color: "text-primary",
    },
    {
      id: 2,
      type: "work",
      title: "Senior Full-Stack Developer",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      period: "2021 - 2023",
      description:
        "Developed scalable web applications for enterprise clients, specializing in React, Node.js, and cloud architecture. Led a team of 5 junior developers.",
      achievements: [
        "Improved application performance by 40%",
        "Mentored 12 junior developers",
        "Architected microservices for 3 major clients",
      ],
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      id: 3,
      type: "work",
      title: "Licensed Therapist",
      company: "Mindful Wellness Center",
      location: "Austin, TX",
      period: "2020 - Present",
      description:
        "Providing individual and group therapy sessions, specializing in anxiety, depression, and career transitions. Developed innovative therapy techniques combining traditional methods with technology.",
      achievements: [
        "Helped 200+ clients achieve their goals",
        "Developed digital therapy tools",
        "Published 3 research papers",
      ],
      icon: Award,
      color: "text-accent",
    },
    {
      id: 4,
      type: "education",
      title: "Master of Science in Psychology",
      company: "University of Texas at Austin",
      location: "Austin, TX",
      period: "2018 - 2020",
      description:
        "Specialized in cognitive behavioral therapy and digital mental health interventions. Thesis on 'AI-Assisted Therapeutic Interventions'.",
      achievements: ["Summa Cum Laude", "Research Assistant", "Psychology Honor Society"],
      icon: GraduationCap,
      color: "text-green-400",
    },
    {
      id: 5,
      type: "education",
      title: "Bachelor of Science in Computer Science",
      company: "Stanford University",
      location: "Stanford, CA",
      period: "2014 - 2018",
      description:
        "Focused on artificial intelligence, machine learning, and human-computer interaction. Active in hackathons and coding competitions.",
      achievements: ["Dean's List (4 years)", "ACM Programming Contest Winner", "CS Teaching Assistant"],
      icon: GraduationCap,
      color: "text-purple-400",
    },
  ]

  type Experience = {
    id: number;
    type: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    icon: React.ElementType;
    color: string;
  };

  const TimelineItem = ({ experience, index }: { experience: Experience; index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex gap-6 pb-12 last:pb-0">
      <div className="relative flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full border-2 border-primary/20 bg-card flex items-center justify-center ${experience.color} group-hover:border-primary/40 transition-colors`}
        >
          <experience.icon className="w-6 h-6" />
        </div>
        {index < experiences.length - 1 && (
          <div className="w-px h-full bg-gradient-to-b from-primary/20 to-transparent mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 group">
        <motion.div
          whileHover={{ x: 5 }}
          className="bg-card/50 border border-primary/20 rounded-xl p-6 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {experience.title}
              </h3>
              <p className="text-accent font-medium mb-2">{experience.company}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                {experience.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">{experience.description}</p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A unique journey combining technical expertise with therapeutic insight, building the foundation for
            innovative solutions that truly understand human needs.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.id} experience={experience} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
