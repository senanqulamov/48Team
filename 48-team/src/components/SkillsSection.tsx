"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Brain,
  Users,
  MessageCircle,
  Lightbulb,
  Rocket,
  GitBranch,
  Server,
  Palette,
} from "lucide-react"

const SkillsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const techSkills = [
    { name: "Frontend Development", icon: Code2, level: 95, color: "text-blue-400" },
    { name: "Backend Development", icon: Server, level: 90, color: "text-green-400" },
    { name: "Database Design", icon: Database, level: 85, color: "text-purple-400" },
    { name: "Mobile Development", icon: Smartphone, level: 80, color: "text-orange-400" },
    { name: "Web Technologies", icon: Globe, level: 92, color: "text-cyan-400" },
    { name: "Version Control", icon: GitBranch, level: 88, color: "text-red-400" },
  ]

  const softSkills = [
    { name: "Therapeutic Counseling", icon: Brain, level: 95, color: "text-primary" },
    { name: "Team Leadership", icon: Users, level: 90, color: "text-accent" },
    { name: "Communication", icon: MessageCircle, level: 95, color: "text-blue-400" },
    { name: "Problem Solving", icon: Lightbulb, level: 92, color: "text-yellow-400" },
    { name: "Innovation", icon: Rocket, level: 88, color: "text-purple-400" },
    { name: "Design Thinking", icon: Palette, level: 85, color: "text-pink-400" },
  ]

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card/50 border border-primary/20 rounded-xl p-6 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-background/50 ${skill.color} group-hover:scale-110 transition-transform`}>
          <skill.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{skill.name}</h3>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{skill.level}%</span>
      </div>
    </motion.div>
  )

  return (
    <section id="skills" className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A unique combination of technical prowess and human insight, enabling me to build solutions that are both
            innovative and deeply understanding of user needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-3"
            >
              <Code2 className="w-8 h-8 text-primary" />
              Technical Skills
            </motion.h3>
            <div className="space-y-4">
              {techSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-3"
            >
              <Brain className="w-8 h-8 text-accent" />
              Human Skills
            </motion.h3>
            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technology stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-8">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Docker",
              "GraphQL",
              "Tailwind CSS",
              "Framer Motion",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-card border border-primary/20 rounded-full text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
