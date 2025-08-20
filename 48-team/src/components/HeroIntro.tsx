"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

const HeroIntro = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <div className="relative z-20 h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        {/* Animated greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-lg md:text-xl text-primary font-medium tracking-wide">Hello, I&apos;m</span>
        </motion.div>

        {/* Main name with gradient animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
            Senan - The 48
          </span>
        </motion.h1>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {["Programmer", "Therapist", "Founder"].map((role, index) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="px-4 py-2 bg-card border border-primary/20 rounded-full text-sm md:text-base font-medium text-primary backdrop-blur-sm"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Building innovative solutions at the intersection of{" "}
          <span className="text-primary font-medium">technology</span> and{" "}
          <span className="text-accent font-medium">human connection</span>. Founder of NeoSphere startup, creating the
          future one line of code at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={() => scrollToSection("projects")}
            size="lg"
            className="btn-hover bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium group"
          >
            View Projects
            <ArrowDown className="ml-2 w-4 h-4 icon-hover" />
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            variant="outline"
            size="lg"
          >
            Contact Me
            <Mail className="ml-2 w-4 h-4 icon-hover" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/senanqulamov", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/senan-qulamov/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:qulamovsenan@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="interactive-element p-3 bg-card/50 border border-primary/20 rounded-full text-primary hover:text-accent hover:border-accent/40 backdrop-blur-sm group"
              aria-label={label}
            >
              <Icon className="w-5 h-5 icon-hover" />
            </motion.a>
          ))}
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
        />
      </div>
    </div>
  )
}

export default HeroIntro
