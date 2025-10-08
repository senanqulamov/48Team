"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import PageWrapper from "@/components/PageWrapper"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"
import Footer from "@/components/Footer"

import TeamGrid from "@/components/team/TeamGrid"
import { teamData } from "@/data/teamData"

export default function TeamPage() {
  const [isLoading, setIsLoading] = useState(true)
  const handleComplete = () => setIsLoading(false)

  return (
    <div className="relative text-foreground min-h-screen" id="scroll-container">
      {isLoading && <PageLoader onComplete={handleComplete} />}

      <ProgressiveBlurNoise show={isLoading} />

      {!isLoading && (
        <>
          <Navigation />
          <PageWrapper>
            <div className="space-y-16 md:space-y-24">
              <TeamGrid
                title="The -48- Team"
                subtitle="The people behind the work. Our team is made up of 48+ people from all over the world. We're a team of designers, developers, and product managers."
                members={teamData}
              />
            </div>
          </PageWrapper>

          <ScrollDownIndicator />
          <Footer />
        </>
      )}
    </div>
  )
}
