"use client"

import { motion } from "framer-motion"
import { Code2, Brain, Server, Palette, GitBranch, Rocket, Users, Lightbulb, MessageCircle } from "lucide-react"
import StackedCardsNew, { StackedCardData } from "./StackedCardsNew"

/**
 * SkillsSection Component
 * Using the new StackedCardsNew component from /testing/page.tsx
 */
export function SkillsSection() {
  // Technical Skills Cards
  const techSkillCards: StackedCardData[] = [
    {
      id: 1,
      icon: Server,
      title: 'Backend Development',
      subtitle: 'Java, PHP & Databases',
      color: 'from-green-400 to-green-500',
      bgColor: 'rgba(34, 197, 94, 0.08)'
    },
    {
      id: 2,
      icon: Palette,
      title: 'Frontend Development',
      subtitle: 'Next.js, React & WebGL',
      color: 'from-pink-400 to-pink-500',
      bgColor: 'rgba(236, 72, 153, 0.08)'
    },
    {
      id: 3,
      icon: GitBranch,
      title: 'DevOps & Tools',
      subtitle: 'Docker, Git & Linux',
      color: 'from-red-400 to-red-500',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    }
  ];

  // Human Skills Cards
  const humanSkillCards: StackedCardData[] = [
    {
      id: 4,
      icon: Brain,
      title: 'Therapeutic Counseling',
      subtitle: 'Empathy & Support - 7+ Years',
      color: 'from-cyan-400 to-cyan-500',
      bgColor: 'rgba(6, 182, 212, 0.08)'
    },
    {
      id: 5,
      icon: Users,
      title: 'Team Leadership',
      subtitle: 'Collaboration & Motivation',
      color: 'from-teal-400 to-teal-500',
      bgColor: 'rgba(20, 184, 166, 0.08)'
    },
    {
      id: 6,
      icon: MessageCircle,
      title: 'Communication',
      subtitle: 'Public Speaking & Writing',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'rgba(59, 130, 246, 0.08)'
    }
  ];

  const allTechnologies = [
    "Java", "Javalin", "PHP", "Laravel", "OpenCart", "MySQL", "Oracle SQL",
    "JavaScript", "Next.js", "OOP", "Algorithms", "WebGL", "Three.js",
    "C", "C++", "Bootstrap", "CSS", "HTML", "Kali Linux", "Docker",
    "JSON", "Ajax", "Arduino", "REST API", "jQuery", "Git", "GitLab", "GSAP", "Sass"
  ];

  return (
    <div className="relative h-full flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-[135vw] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-sm text-cyan-100/70">
            Technical prowess meets human insight
          </p>
        </motion.div>

        {/* Main Content Grid - 3 columns */}
        <div className="flex flex-row items-center justify-center gap-25">

          {/* LEFT: Technical Skills Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Technical Skills</h3>
            </div>
            <StackedCardsNew cards={techSkillCards} showHint={true} />
          </motion.div>

          {/* MIDDLE: Human Skills Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-teal-400" />
              <h3 className="text-lg font-bold text-white">Human Skills</h3>
            </div>
            <StackedCardsNew cards={humanSkillCards} showHint={true} />
          </motion.div>

          {/* RIGHT: Stats & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4 w-full max-w-[40vw]"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Code2, label: "Technical", count: "15+", color: "text-cyan-400" },
                { icon: Brain, label: "Human", count: "10+", color: "text-teal-400" },
                { icon: Rocket, label: "Years", count: "7+", color: "text-blue-400" },
                { icon: Lightbulb, label: "Projects", count: "100+", color: "text-purple-400" },
              ].map(({ icon: Icon, label, count, color }) => (
                <div
                  key={label}
                  className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-3 text-center hover:border-white/20 transition-all"
                >
                  <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                  <div className="text-xl font-bold text-white">{count}</div>
                  <div className="text-xs text-cyan-100/60">{label}</div>
                </div>
              ))}
            </div>

            {/* Technology Stack */}
            <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-4">
              <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
                {allTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-cyan-100/70 hover:bg-white/10 hover:border-cyan-400/30 transition-all whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-4">
              <h4 className="text-white font-semibold text-sm mb-2">Core Strengths</h4>
              <div className="space-y-2">
                {[
                  { icon: Server, label: "Backend Expert", color: "text-green-400" },
                  { icon: Palette, label: "Frontend Pro", color: "text-pink-400" },
                  { icon: Brain, label: "Therapist", color: "text-cyan-400" },
                  { icon: Users, label: "Team Leader", color: "text-teal-400" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <Icon className={`w-3 h-3 ${color}`} />
                    <span className="text-cyan-100/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

