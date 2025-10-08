"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code2,
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

  const techSkills = [
    {
      name: "Backend Development",
      subtitle: "Java, PHP & Databases",
      icon: Server,
      level: 92,
      color: "text-green-400",
      tags: [
        "Java", "Javalin", "Spring Boot", "OOP", "Algorithms", "REST API", "Json",
        "PHP", "Laravel", "OpenCart", "Ajax", "MySQL", "Oracle SQL"
      ]
    },
    {
      name: "Frontend Development",
      subtitle: "Web & UI Technologies",
      icon: Palette,
      level: 88,
      color: "text-pink-400",
      tags: ["JavaScript", "Next.js", "Jquery", "GSAP", "Three.js", "WebGL", "Bootstrap", "CSS", "HTML", "Sass"]
    },
    {
      name: "DevOps & Tools",
      subtitle: "Automation & Version Control",
      icon: GitBranch,
      level: 80,
      color: "text-red-400",
      tags: ["Docker", "Git", "GitLab", "Kali Linux"]
    },
    {
      name: "C, Embedded & Hardware",
      subtitle: "Low-level & IoT",
      icon: Rocket,
      level: 75,
      color: "text-cyan-400",
      tags: ["C", "C++", "Arduino"]
    },
    {
      name: "Design",
      subtitle: "UI/UX & Creative Tools",
      icon: Palette,
      level: 82,
      color: "text-yellow-500",
      tags: ["Figma", "Canva", "Motiff", "Photoshop", "Illustrator", "After Effects"]
    },
  ]

  const softSkills = [
    {
      name: "Therapeutic Counseling",
      subtitle: "Empathy & Support",
      icon: Brain,
      level: 97,
      color: "text-primary",
      tags: ["Active Listening", "Empathy", "Guidance", "Support"]
    },
    {
      name: "Team Leadership",
      subtitle: "Collaboration & Motivation",
      icon: Users,
      level: 90,
      color: "text-accent",
      tags: ["Teamwork", "Mentoring", "Motivation", "Conflict Resolution"]
    },
    {
      name: "Communication",
      subtitle: "Verbal & Written Skills",
      icon: MessageCircle,
      level: 93,
      color: "text-blue-400",
      tags: ["Public Speaking", "Writing", "Negotiation", "Presentation"]
    },
    {
      name: "Problem Solving & Innovation",
      subtitle: "Creativity & Analysis",
      icon: Lightbulb,
      level: 89,
      color: "text-yellow-400",
      tags: ["Critical Thinking", "Creativity", "Analysis", "Innovation", "Design Thinking"]
    },
    {
      name: "Personal Achievements",
      subtitle: "Chess Player, Swimmer, Book Writer",
      icon: Rocket,
      level: 85,
      color: "text-purple-400",
      tags: ["Chess", "Swimming", "Book Writing"]
    },
  ];

  type Skill = {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    level: number;
    color: string;
    tags?: string[];
    subtitle?: string;
  };

  const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
      <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          whileHover={{
            scale: 1.07,
            y: -8,
            boxShadow: "0 8px 32px 0 rgba(80, 120, 255, 0.15)",
            borderColor: "#4f46e5",
            background: "linear-gradient(90deg, rgba(80,120,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
          }}
          className="bg-card/50 border border-primary/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm group transition-all duration-200 ease-in-out hover:border-primary/60 hover:shadow-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className={`p-2 sm:p-3 rounded-lg bg-background/50 ${skill.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
            <skill.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 text-xl sm:text-2xl truncate">{skill.name}</h3>
            {skill.subtitle && (
                <div className="text-sm sm:text-base font-semibold text-muted-foreground mb-2 truncate">{skill.subtitle}</div>
            )}
          </div>
          <span className="text-sm font-medium text-muted-foreground flex-shrink-0">{skill.level}%</span>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>

        {skill.tags && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skill.tags.map(tag => (
                  <span
                      key={tag}
                      className="px-2 py-1 bg-card border border-primary/10 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none"
                  >
              {tag}
            </span>
              ))}
            </div>
        )}
      </motion.div>
  )

  return (
      <section id="skills" className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              A unique combination of technical prowess and human insight, enabling me to build solutions that are both
              innovative and deeply understanding of user needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Technical Skills */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-4 sm:space-y-6"
            >
              <motion.h3
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3"
              >
                <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                Technical Skills
              </motion.h3>
              <div className="space-y-3 sm:space-y-4">
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
                className="space-y-4 sm:space-y-6"
            >
              <motion.h3
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3"
              >
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                Human Skills
              </motion.h3>
              <div className="space-y-3 sm:space-y-4">
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
              className="mt-12 sm:mt-16 text-center"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {[
                "Java", "Javalin", "PHP", "Laravel", "OpenCart", "MySQL", "Oracle SQL", "JavaScript", "Next.js", "OOP", "Algorithms", "WebGL", "Three.js", "C", "C++", "Bootstrap", "CSS", "HTML", "Kali Linux", "Docker", "JSON", "Ajax", "Arduino", "REST API", "jQuery", "Git", "GitLab", "GSAP", "Sass"
              ].map((tech, index) => (
                  <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-card border border-primary/20 rounded-full text-sm sm:text-base font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default whitespace-nowrap"
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