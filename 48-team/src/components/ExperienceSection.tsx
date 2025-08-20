"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {Calendar, MapPin, Award, GraduationCap, Briefcase, Rocket, Axis3d} from "lucide-react"

const ExperienceSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const experiences = [
    {
      id: 1,
      type: "work",
      title: "Founder & CEO",
      company: "NeoSphere",
      location: "Remote",
      period: "2020 - Present",
      description:
          "Founder of NeoSphere, a workers' union hub and gig/job marketplace that connects freelancers, job seekers, and organizations. Driving product vision, architecture, and development using Laravel and React, with backend APIs extending into Java (Javalin).",
      achievements: [
        "Designed and structured the platform around Spheres, Core Hubs, and Karma Points",
        "Built MVP with core modules: jobs, events, and user profiles",
        "Defined revenue streams: subscriptions, sponsored Spheres, and transaction fees"
      ],
      icon: Rocket,
      color: "text-primary",
    },
    {
      id: 2,
      type: "work",
      title: "Middle Backend Developer",
      company: "Inci Group of Companies LLC",
      location: "Baku, Azerbaijan",
      period: "May 2025 - Present",
      description:
          "Building scalable backend systems for enterprise projects using Laravel and modern PHP, while also introducing Java + Javalin APIs for microservices and integrations. Collaborating onsite in Baku Economic Zone with cross-functional teams.",
      achievements: [
        "Developed and maintained backend services with Laravel 10/12, PHP 8+, and MySQL/PostgreSQL",
        "Integrated third-party APIs (RESTful, OAuth, Webhooks) and enterprise systems",
        "Implemented microservices with Java (Javalin) for API-first architecture",
        "Optimized queries and application performance for high scalability",
        "Improved CI/CD pipelines with GitHub Actions and Docker"
      ],
      icon: Briefcase,
      color: "text-indigo-400",
    },
    {
      id: 3,
      type: "work",
      title: "Middle Backend Developer",
      company: "GlobalSoft",
      location: "Baku, Azerbaijan",
      period: "Mar 2025 - May 2025",
      description:
          "Backend Developer focusing on Laravel/PHP applications and enterprise web solutions. Contributed to API development, integration, and performance improvements.",
      achievements: [
        "Delivered scalable Laravel/PHP applications",
        "Developed and integrated RESTful APIs for business workflows",
        "Collaborated with frontend teams for seamless feature delivery"
      ],
      icon: Briefcase,
      color: "text-amber-400",
    },
    {
      id: 4,
      type: "service",
      title: "Military Service",
      company: "Army Duty",
      location: "Azerbaijan",
      period: "Jan 2024 - Jan 2025",
      description:
          "Completed mandatory military service. Built discipline, resilience, teamwork, and leadership that positively influence my engineering approach.",
      achievements: [
        "Fulfilled mandatory service requirements",
        "Developed strong teamwork and leadership skills"
      ],
      icon: Award,
      color: "text-rose-400",
    },
    {
      id: 5,
      type: "work",
      title: "Freelance Full-stack Developer",
      company: "Self-employed",
      location: "Remote",
      period: "Aug 2023 - Jan 2024",
      description:
          "6-month freelancing period delivering web apps and APIs. Implemented features end-to-end, from UI to data models and deployments.",
      achievements: [
        "Delivered multiple client projects with Laravel/Next.js",
        "Integrated third-party APIs and optimized performance"
      ],
      icon: Axis3d,
      color: "text-teal-400",
    },
    {
      id: 6,
      type: "work",
      title: "Technical Lead & Full-stack Web Developer",
      company: "ALLRENT",
      location: "Baku, Azerbaijan",
      period: "Nov 2022 - Jul 2023",
      description:
          "Led the full development of Allrent.io from scratch, building an online rental marketplace with advanced features and optimized booking workflows.",
      achievements: [
        "Integrated online payments, review systems, and interactive maps",
        "Developed a custom reservation calendar to streamline bookings",
        "Transitioned from freelancer to permanent technical lead role"
      ],
      icon: Briefcase,
      color: "text-primary",
    },
    {
      id: 7,
      type: "work",
      title: "Team Leader & Full-stack Web Developer",
      company: "DEIRVLON Technologies",
      location: "Baku, Azerbaijan",
      period: "May 2022 - Oct 2022",
      description:
          "Led Laravel and JavaScript development teams, delivering scalable solutions for logistics and enterprise projects.",
      achievements: [
        "Architected and developed a cargo management platform",
        "Directed cross-functional teams to deliver on-time features",
        "Contributed to the development of Monyo.az"
      ],
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      id: 8,
      type: "work",
      title: "Full-stack Web Developer & Cybersecurity Admin",
      company: "FERRUM CAPITAL",
      location: "Baku, Azerbaijan",
      period: "Mar 2021 - May 2022",
      description:
          "Developed Laravel and React-based systems while serving as Cybersecurity Administrator. Introduced secure architecture patterns and began building Java APIs for internal systems.",
      achievements: [
        "Delivered projects including Otomall.az, Agagroup.az, and Balli.az",
        "Implemented authentication/authorization systems with Laravel Sanctum/Passport",
        "Developed internal Java (Javalin) APIs to extend backend functionality",
        "Implemented cybersecurity best practices and monitored system threats"
      ],
      icon: Briefcase,
      color: "text-accent",
    },
    {
      id: 9,
      type: "work",
      title: "Full-stack Web Developer Intern",
      company: "ATL Tech",
      location: "Baku, Azerbaijan",
      period: "Jul 2019 - Oct 2019",
      description:
          "Internship focused on PHP/Laravel, backend development, and prototype building for partner companies.",
      achievements: [
        "Developed features for 'Student Library' project",
        "Built an online course platform (similar to Udemy) as a final project",
        "Strengthened Laravel backend and frontend skills"
      ],
      icon: Award,
      color: "text-green-400",
    },
    {
      id: 10,
      type: "education",
      title: "Master of Computer Science",
      company: "Baku State University (SABAH Groups)",
      location: "Baku, Azerbaijan",
      period: "2021 - 2023",
      description:
          "Focused on Cyber Security and Data Science with a GPA of 88.7. Research and coursework emphasized secure system design and scalable web platforms.",
      achievements: [
        "SABAH groups certification 2023",
        "Graduated with honors",
        "Specialization in Cyber Security & Data Science"
      ],
      icon: GraduationCap,
      color: "text-green-400",
    },
    {
      id: 11,
      type: "education",
      title: "Bachelor of Computer Science",
      company: "Khazar University",
      location: "Baku, Azerbaijan",
      period: "2017 - 2021",
      description:
          "Studied Computer Science with focus on Cyber Security, Web Development, Database Administration, Data Science, and Robotics. Graduated with GPA 89.",
      achievements: [
        "Diploma with honors",
        "2nd place in World Robot Olympiad Azerbaijan 2018",
        "Active in applied projects and research initiatives"
      ],
      icon: GraduationCap,
      color: "text-purple-400",
    },
  ];


  type Experience = {
    id: number;
    type: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    icon: React.ElementType;
    color: string;
  };

  const TimelineItem = ({ experience, index }: { experience: Experience; index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex gap-6 pb-12 last:pb-0">
      <div className="relative flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full border-2 border-primary/20 bg-card flex items-center justify-center ${experience.color} group-hover:border-primary/40 transition-colors`}
        >
          <experience.icon className="w-6 h-6" />
        </div>
        {index < experiences.length - 1 && (
          <div className="w-px h-full bg-gradient-to-b from-primary/20 to-transparent mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 group">
        <motion.div
          whileHover={{ x: 5 }}
          className="bg-card/50 border border-primary/20 rounded-xl p-6 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {experience.title}
              </h3>
              <p className="text-accent font-medium mb-2">{experience.company}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                {experience.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">{experience.description}</p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A unique journey combining technical expertise with therapeutic insight, building the foundation for
            innovative solutions that truly understand human needs.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.id} experience={experience} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
