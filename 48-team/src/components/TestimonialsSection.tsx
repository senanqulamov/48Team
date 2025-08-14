"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Solutions",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Senan&apos;s unique combination of technical expertise and emotional intelligence made him an invaluable team member. His ability to understand both user needs and technical constraints resulted in solutions that were both innovative and practical.",
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      role: "Clinical Director",
      company: "Mindful Wellness Center",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Working with Senan has been transformative for our practice. His integration of technology into therapeutic processes has helped us reach more clients and provide better outcomes. His empathy and technical skills are unmatched.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Former Client",
      company: "Therapy Sessions",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Senan helped me through one of the most challenging periods of my life. His approach was both professional and deeply caring. The digital tools he used made therapy more accessible and engaging for me.",
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Co-founder",
      company: "StartupHub",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Senan&apos;s entrepreneurial mindset and technical execution are exceptional. He doesn&apos;t just build products; he creates solutions that genuinely improve people&apos;s lives. His leadership style is both inspiring and effective.",
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Senior Developer",
      company: "TechFlow Solutions",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As a mentor, Senan was incredible. He taught me not just how to code better, but how to think about the human impact of our work. His code reviews were thorough and his feedback always constructive.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Testimonials from colleagues, clients, and collaborators who have experienced the impact of combining
            technical excellence with human understanding.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="w-12 h-12" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed text-center mb-8 relative z-10">
              &quot;{testimonials[currentIndex].text}&quot;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="font-display font-bold text-foreground">{testimonials[currentIndex].name}</h4>
                <p className="text-primary font-medium">{testimonials[currentIndex].role}</p>
                <p className="text-muted-foreground text-sm">{testimonials[currentIndex].company}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline_pag"
              size="sm"
              onClick={prevTestimonial}
              className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline_pag"
              size="sm"
              onClick={nextTestimonial}
              className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default TestimonialsSection
