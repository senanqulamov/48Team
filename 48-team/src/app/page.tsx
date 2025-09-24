"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import HeroIntro from "@/components/HeroIntro"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import PageWrapper from "@/components/PageWrapper"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
import AnimatedMeshBackground from "@/components/AnimatedMeshBackground"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"
import LatestCommits from "@/components/latestCommits";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleComplete = () => {
    setIsLoading(false)
  }

  // After loader completes, scroll to a hash target if present
  useEffect(() => {
    if (isLoading) return

    const scrollToHash = () => {
      const hash = window.location.hash?.slice(1)
      if (!hash) return
      const el = document.getElementById(hash)
      if (!el) return
      // slight delay to ensure layout has settled
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" })
      }, 50)
    }

    scrollToHash()

    const onHashChange = () => scrollToHash()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [isLoading])

  // useLenisScroll()

  return (
    <div className="relative text-foreground min-h-screen" id="scroll-container">
      {isLoading && <PageLoader onComplete={handleComplete} />}

      <AnimatedMeshBackground />
      <ProgressiveBlurNoise show={isLoading} />

      {!isLoading && (
        <>
          <Navigation />
          <PageWrapper>
            <section id="hero" className="relative z-20">
              <div>
                <HeroIntro />
              </div>
            </section>

            <div>
              <div>
                <AboutSection />
              </div>
            </div>

            <div>
              <div>
                <SkillsSection />
              </div>
            </div>

            <div>
              <div>
                <ProjectsSection />
              </div>
            </div>

            <div>
              <div>
                <LatestCommits />
              </div>
            </div>

            <div>
              <div>
                <ExperienceSection />
              </div>
            </div>

            <div>
              <div>
                <TestimonialsSection />
              </div>
            </div>

            <div>
              <ContactSection />
            </div>
          </PageWrapper>
          <ScrollDownIndicator />
          <Footer />
        </>
      )}
    </div>
  )
}
