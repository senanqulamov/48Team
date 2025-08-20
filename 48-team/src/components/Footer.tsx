"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/senanqulamov",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/senan-qulamov/",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/senanqulamov",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:qulamovsenan@gmail.com",
    },
  ]

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="relative z-1 bg-background border-t border-primary/20">
      {/* Back to top button */}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-primary">S48</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-foreground font-medium">Senan The 48</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Building innovative solutions at the intersection of technology and human connection. Programmer,
              Therapist, and Founder.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Baku, Azerbaijan</p>
              <a href="mailto:qulamovsenan@gmail.com" className="hover:text-primary transition-colors duration-200 block">
                qulamovsenan@gmail.com
              </a>
              <a href="tel:+994515838095" className="hover:text-primary transition-colors duration-200 block">
                +994 (051) 583-8095
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2025 Senan Qulamov - The 48. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>and lots of coffee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </footer>
  )
}

export default Footer
