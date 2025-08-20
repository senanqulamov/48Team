"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import PageWrapper from "@/components/PageWrapper"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
// import AnimatedMeshBackground from "@/components/AnimatedMeshBackground"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"
import Footer from "@/components/Footer"

import ProjectsPage from "@/components/ProjectsTimeLine"

export default function ProjectsRoutePage() {
    const [isLoading, setIsLoading] = useState(true)

    const handleComplete = () => setIsLoading(false)

    return (
        <div className="relative text-foreground min-h-screen" id="scroll-container">
            {isLoading && <PageLoader onComplete={handleComplete} />}

            {/*<AnimatedMeshBackground />*/}
            <ProgressiveBlurNoise show={isLoading} />

            {!isLoading && (
                <>
                    <Navigation />
                    <PageWrapper>
                        <div>
                            <div>
                                <ProjectsPage />
                            </div>
                        </div>
                    </PageWrapper>

                    <ScrollDownIndicator />
                    <Footer />
                </>
            )}
        </div>
    )
}