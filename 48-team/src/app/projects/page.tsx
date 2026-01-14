"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navigation from "@/components/Navigation"
import PageWrapper from "@/components/PageWrapper"
import PageLoader from "@/components/PageLoader"
import ProgressiveBlurNoise from "@/components/ProgressiveBlurNoise"
// import AnimatedMeshBackground from "@/components/AnimatedMeshBackground"
import ScrollDownIndicator from "@/components/ScrollDownIndicator"
import Footer from "@/components/Footer"

import ProjectsPage from "@/components/ProjectsTimeLine"
import FeaturedTimeline from "@/components/featured-timeline/FeaturedTimeline"

export default function ProjectsRoutePage() {
    const [isLoading, setIsLoading] = useState(true)

    const handleComplete = () => setIsLoading(false)

    return (
        <div className="relative text-foreground min-h-screen" id="scroll-container">
            {isLoading && <PageLoader onCompleteAction={handleComplete} />}

            {/*<AnimatedMeshBackground />*/}
            <ProgressiveBlurNoise show={isLoading} />

            {!isLoading && (
                <>
                    <Navigation />
                    <PageWrapper>
                        <div>
                            <div className="space-y-16 md:space-y-24">
                                <FeaturedTimeline />

                                {/* View All Projects CTA */}
                                <div className="flex justify-center py-8">
                                    <Link
                                        href="/projects/all"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                                    >
                                        View All Projects
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

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