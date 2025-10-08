"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
// Enhance dropdown icons
import {
  Sparkles,
  UserRound,
  BadgeCheck,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMeOpen, setIsMeOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Throttled scroll progress via rAF
  const tickingRef = useRef(false)
  const docHeightRef = useRef(1)

  useEffect(() => {
    const computeDocHeight = () => {
      docHeightRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }
    computeDocHeight()
    window.addEventListener("resize", computeDocHeight)

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = docHeightRef.current
          const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
          setIsScrolled(scrollTop > 50)
          setScrollProgress(scrollPercent)
          tickingRef.current = false
        })
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", computeDocHeight)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const onHome = (pathname ?? "/") === "/"

  const smoothScrollOnHome = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // reflect hash in URL without reloading
      const newHash = `#${sectionId}`
      if (window.location.hash !== newHash) {
        history.pushState(null, "", newHash)
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (onHome) {
      smoothScrollOnHome(sectionId)
      setIsMobileMenuOpen(false)
    } else {
      // navigate to home with hash; main page will handle the scroll after it mounts
      router.push(`/#${sectionId}`)
      setIsMobileMenuOpen(false)
    }
  }

  const goTo = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  // Items under "Me" dropdown -> map to home sections
  const meItems: { id: string; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "hero", label: "Headline", Icon: Sparkles },
    { id: "about", label: "About", Icon: UserRound },
    { id: "skills", label: "Skills", Icon: BadgeCheck },
    { id: "projects", label: "Projects", Icon: FolderKanban },
    { id: "experience", label: "Experience", Icon: Briefcase },
    { id: "testimonials", label: "Testimonials", Icon: MessageSquareQuote },
    { id: "contact", label: "Contact", Icon: Mail },
  ]

  // Replace the "Get In Touch" button with "Go Back" button if user is in the projects route
  const isProjectsRoute = (pathname ?? "").includes("projects")

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-background/20">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.1 }}
          style={{
            scaleX: scrollProgress,
            transformOrigin: "left"
          }}
        />
      </div>

      <nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5"
            : "bg-transparent"
        }`}
        data-scroll
        data-scroll-sticky
        data-scroll-target="#scroll-container"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => scrollToSection("hero")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <span className="text-3xl font-display font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-300% relative">
                  S48
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {/* Me dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium inline-flex items-center gap-1"
                      whileHover={{ y: -2 }}
                    >
                      Me <ChevronDown className="w-4 h-4" />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-lg opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={10} className="w-[28rem] p-3 border border-border/60 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl">
                    <div className="grid grid-cols-2 gap-2">
                      {meItems.map(({ id, label, Icon }) => (
                          <DropdownMenuItem key={id} asChild className="p-0 bg-transparent focus:bg-transparent focus:text-foreground">
                            <button
                                onClick={() => scrollToSection(id)}
                                className="group w-full flex items-center gap-3 rounded-xl border border-border/60 p-3 text-left transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md text-foreground hover:text-primary"
                            >
                              <span className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-background/60 text-primary w-10 h-10 shadow-sm group-hover:border-primary/30 group-hover:text-primary">
                                <Icon className="w-5 h-5" />
                              </span>
                              <span className="text-sm font-semibold tracking-tight leading-tight group-hover:text-primary">
                                {label}
                              </span>
                            </button>
                          </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>

                </DropdownMenu>

                {/* Top-level items */}
                <motion.button
                  onClick={() => goTo("/team")}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                >
                  My Team
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                  <motion.div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                </motion.button>

                <motion.button
                  onClick={() => goTo("/projects")}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                >
                  Projects
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                  <motion.div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                </motion.button>

                <motion.button
                  onClick={() => goTo("/blogs")}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                >
                  Blogs
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                  <motion.div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                >
                  Contact
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                  <motion.div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                </motion.button>
              </div>
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              {isProjectsRoute ? (
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-2 rounded-full cursor-pointer font-semibold text-base transition-all duration-200 bg-card hover:bg-primary/10 hover:text-primary"
                >
                  &larr; Go Back
                </button>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-0"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 text-foreground hover:text-primary transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-[72px] left-4 right-4 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-40 md:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 20 }}
            >
              <div className="p-6 space-y-3">
                {/* Me collapsible */}
                <Collapsible open={isMeOpen} onOpenChange={setIsMeOpen}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-semibold">
                      <span>Me</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMeOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-1 space-y-1">
                      {meItems.map((it, index) => (
                        <motion.button
                          key={it.id}
                          onClick={() => scrollToSection(it.id)}
                          className="block w-full text-left px-10 py-2.5 text-foreground/90 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.02 * index }}
                        >
                          {it.label}
                        </motion.button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Top-level items */}
                <motion.button
                  onClick={() => goTo('/team')}
                  className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  My Team
                </motion.button>
                <motion.button
                  onClick={() => goTo('/projects')}
                  className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Projects
                </motion.button>
                <motion.button
                  onClick={() => goTo('/blogs')}
                  className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Blogs
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Contact
                </motion.button>

                <motion.div
                  className="pt-3 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-xl"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
