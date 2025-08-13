"use client"

import { useState } from "react"
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

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative text-foreground min-h-screen" id="scroll-container">
      {isLoading && <PageLoader onComplete={handleComplete} />}

      <AnimatedMeshBackground />
      <ProgressiveBlurNoise show={isLoading} />

      {!isLoading && (
        <>
          <Navigation />
          <PageWrapper>
            <section id="hero" className="relative z-20" data-scroll-section>
              <div data-scroll data-scroll-speed="0.5">
                <HeroIntro />
              </div>
            </section>

            <div data-scroll-section>
              <div data-scroll data-scroll-speed="0.2">
                <AboutSection />
              </div>
            </div>

            <div data-scroll-section>
              <div data-scroll data-scroll-speed="0.3">
                <SkillsSection />
              </div>
            </div>

            <div data-scroll-section>
              <div data-scroll data-scroll-speed="0.1">
                <ProjectsSection />
              </div>
            </div>

            <div data-scroll-section>
              <div data-scroll data-scroll-speed="0.2">
                <ExperienceSection />
              </div>
            </div>

            <div data-scroll-section>
              <div data-scroll data-scroll-speed="0.1">
                <TestimonialsSection />
              </div>
            </div>

            <div data-scroll-section>
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
