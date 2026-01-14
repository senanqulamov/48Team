// "use client"
//
// import { useState, useEffect } from "react"
// import ContactSection from "@/components/ContactSection"
// import Footer from "@/components/Footer"
// import PageLoader from "@/components/PageLoader"
//
// export default function HomePageClient() {
//   const [isLoading, setIsLoading] = useState(true)
//
//   const handleComplete = () => setIsLoading(false)
//
//   // After loader completes, scroll to a hash target if present
//   useEffect(() => {
//     if (isLoading) return
//
//     const scrollToHash = () => {
//       const hash = window.location.hash?.slice(1)
//       if (!hash) return
//       const el = document.getElementById(hash)
//       if (!el) return
//       setTimeout(() => {
//         el.scrollIntoView({ behavior: "smooth" })
//       }, 50)
//     }
//
//     scrollToHash()
//
//     const onHashChange = () => scrollToHash()
//     window.addEventListener("hashchange", onHashChange)
//     return () => window.removeEventListener("hashchange", onHashChange)
//   }, [isLoading])
//
//   return (
//     <div className="relative text-foreground min-h-screen" id="scroll-container">
//       {isLoading && <PageLoader onCompleteAction={handleComplete} />}
//
//       <AnimatedMeshBackground />
//       <ProgressiveBlurNoise show={isLoading} />
//
//       {!isLoading && (
//         <>
//           <Navigation />
//           <PageWrapper>
//             <section id="hero" className="relative z-20">
//               <HeroIntro />
//             </section>
//
//             <AboutSection />
//             <SkillsSection />
//             <ProjectsSection />
//             <ExperienceSection />
//             <TestimonialsSection />
//             <ContactSection />
//           </PageWrapper>
//           <ScrollDownIndicator />
//           <Footer />
//         </>
//       )}
//     </div>
//   )
// }
//
