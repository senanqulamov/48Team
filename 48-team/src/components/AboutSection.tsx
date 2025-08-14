"use client"

import { motion } from "framer-motion"
import { useInView, easeOut } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Brain, Code, Rocket, Heart, Users, Lightbulb } from "lucide-react"

const AboutSection = () => {
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
        ease: easeOut, // Use the imported easing function
      },
    },
  }

  const stats = [
    { number: "7+", label: "Years Coding", icon: Code },
    { number: "7+", label: "Years Therapy", icon: Brain },
    { number: "4", label: "Startups Founded", icon: Rocket },
    { number: "100+", label: "Lives & Projects", icon: Heart },
  ]

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Image and floating elements */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                className="hover-card relative w-80 h-80 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/*<Image src="/placeholder.svg?height=320&width=320" alt="Senan The 48" fill className="object-cover" />*/}
                <Image src="/images/mine/me4.png" alt="Senan The 48" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </motion.div>

              {/* Floating skill badges */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-card border border-primary/20 rounded-full p-3 backdrop-blur-sm"
              >
                <Code className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute -bottom-4 -left-4 bg-card border border-accent/20 rounded-full p-3 backdrop-blur-sm"
              >
                <Brain className="w-6 h-6 text-accent" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/2 -left-8 bg-card border border-primary/20 rounded-full p-3 backdrop-blur-sm"
              >
                <Rocket className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                About Me
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-6">
                I&apos;m a unique blend of <span className="text-primary font-medium">technical expertise</span> and{" "}
                <span className="text-accent font-medium">human understanding</span>. As a programmer, I build scalable
                solutions that solve real-world problems. As a therapist, I help people navigate life&apos;s challenges and
                unlock their potential.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-6">
                This intersection of technology and psychology drives my entrepreneurial journey. I founded{" "}
                <span className="text-primary font-medium">NeoSphere</span> to create innovative platforms that bridge
                the gap between human needs and technological solutions.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
                When I&apos;m not coding or counseling, you&apos;ll find me exploring new technologies, reading about human
                behavior, or brainstorming the next big idea that could make a difference in people&apos;s lives.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="hover-card bg-card/50 border border-primary/20 rounded-xl p-6 text-center backdrop-blur-sm group hover:border-primary/40"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 icon-hover" />
                  <div className="text-2xl font-display font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {[
                { icon: Users, label: "Human-Centered" },
                { icon: Lightbulb, label: "Innovation" },
                { icon: Heart, label: "Empathy" },
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  className="interactive-element flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
