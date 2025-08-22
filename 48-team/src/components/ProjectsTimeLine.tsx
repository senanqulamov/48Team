"use client"

import { useMemo, useState } from "react"
import { Server, Rocket, Eye, Award, Book, Lock, Code, Settings } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"
import ProjectBlogModal from "@/components/ui/ProjectBlogModal"
import Image from "next/image";

// Project interface definition
interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  blog?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  category?: string;
  status?: string;
  icon?: React.ElementType;
  color?: string;
  date?: string;
  links?: { demo?: string; github?: string };
  features?: string[];
}

// Timeline project data (unchanged)
const projects: Project[] = [
  // 🚀 My Projects
  {
    id: 1,
    title: "Passmate",
    subtitle: "Secure Password Manager",
    description:
        "A privacy-first password manager with encryption, vaults, and cross-device sync. Designed to enhance digital security with a clean UI and robust encryption.",
    blog: `<p>Passmate is a secure password manager built with Laravel, React, and MySQL, featuring encryption, vault management, and password generation. Designed as a practical cybersecurity-focused project.</p>`,
    image: "/images/passmate/1.jpg",
    images: [
      "/images/passmate/1.jpg",
      "/images/passmate/2.jpg",
      "/images/passmate/3.jpg",
      "/images/passmate/4.jpg",
      "/images/passmate/5.jpg"
    ],
    technologies: ["Laravel", "React", "MySQL", "Tailwind", "Docker"],
    category: "My Projects",
    status: "In Progress",
    icon: Lock,
    color: "from-indigo-400 to-purple-500",
    date: "2024 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Encryption", "Vault Management", "Password Generation", "Cross-device Sync"],
  },
  {
    id: 2,
    title: "SchoolExam",
    subtitle: "Exam & Quiz Platform",
    description:
        "An online platform for creating and managing school exams, quizzes, and results with real-time analytics for teachers and students.",
    blog: `<p>SchoolExam is an exam and quiz system built with Laravel, Inertia.js, and MySQL. It enables teachers to create exams, auto-grade answers, and provides performance reports for students.</p>`,
    image: "/images/schoolexam/1.jpg",
    images: [
      "/images/schoolexam/1.jpg",
      "/images/schoolexam/2.jpg",
      "/images/schoolexam/3.jpg",
      "/images/schoolexam/4.jpg",
      "/images/schoolexam/5.jpg"
    ],
    technologies: ["Laravel", "Inertia.js", "Vue.js", "MySQL"],
    category: "My Projects",
    status: "Completed",
    icon: Book,
    color: "from-blue-400 to-green-400",
    date: "2023",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Exam Creation", "Auto-grading", "Student Reports", "Analytics Dashboard"],
  },
  {
    id: 3,
    title: "JavaLearningApp",
    subtitle: "Interactive Java Study Tool",
    description:
        "A personal project to learn and reinforce Java concepts with practical coding challenges and interactive quizzes.",
    blog: `<p>JavaLearningApp helps users practice Java through exercises and mini-projects. Built with JavaFX, Javalin APIs, and MySQL backend.</p>`,
    image: "/images/javalearningapp/1.jpg",
    images: [
      "/images/javalearningapp/1.jpg",
      "/images/javalearningapp/2.jpg",
      "/images/javalearningapp/3.jpg",
      "/images/javalearningapp/4.jpg",
      "/images/javalearningapp/5.jpg"
    ],
    technologies: ["Java", "Javalin", "JavaFX", "MySQL"],
    category: "My Projects",
    status: "In Progress",
    icon: Code,
    color: "from-yellow-400 to-red-400",
    date: "2024 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Java Quizzes", "Coding Challenges", "API Integration", "Progress Tracking"],
  },
  {
    id: 4,
    title: "MonayBadge",
    subtitle: "Gamified Productivity Tool",
    description:
        "A gamification app that awards users with badges for completing tasks, designed to motivate productivity and consistency.",
    blog: `<p>MonayBadge combines task management with gamification. Users earn badges for consistency and progress. Built with Laravel, React, and Tailwind.</p>`,
    image: "/images/monaybadge/1.jpg",
    images: [
      "/images/monaybadge/1.jpg",
      "/images/monaybadge/2.jpg",
      "/images/monaybadge/3.jpg",
      "/images/monaybadge/4.jpg",
      "/images/monaybadge/5.jpg"
    ],
    technologies: ["Laravel", "React", "MySQL", "Tailwind"],
    category: "My Projects",
    status: "Prototype",
    icon: Award,
    color: "from-pink-400 to-orange-400",
    date: "2023",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Badge Rewards", "Task Tracking", "Leaderboard", "User Profiles"],
  },
  {
    id: 5,
    title: "CustomAdmin",
    subtitle: "Universal Admin Panel",
    description:
        "A customizable admin panel built for managing multiple startups and projects with switchable contexts, user roles, and dynamic CRUD tables.",
    blog: `<p>CustomAdmin is a universal admin panel designed to support multiple startups (NeoSphere, BidBary, BorderMate). Built with Laravel + Next.js, it allows project/data context switching, translation management, and dynamic CRUD.</p>`,
    image: "/images/customadmin/1.jpg",
    images: [
      "/images/customadmin/1.jpg",
      "/images/customadmin/2.jpg",
      "/images/customadmin/3.jpg",
      "/images/customadmin/4.jpg",
      "/images/customadmin/5.jpg"
    ],
    technologies: ["Laravel", "Next.js", "Tailwind", "MySQL"],
    category: "My Projects",
    status: "In Development",
    icon: Settings,
    color: "from-teal-400 to-blue-500",
    date: "2024 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["User Management", "CRUD Tables", "Translation Management", "Settings Panel"],
  },

  // 🚀 Startups
  {
    id: 6,
    title: "NeoSphere",
    subtitle: "Union Hub & Gig Marketplace",
    description:
        "A modern platform for workers’ unions, freelancers, and organizations. Built around Spheres, Core Hubs, Karma Points, jobs, and events.",
    blog: `<p>NeoSphere is a gig/job marketplace and networking hub. It includes job boards, events, karma-based reputation, and sponsored Spheres. Stack: Laravel (backend), React (frontend), MySQL.</p>`,
    image: "/images/neosphere/1.jpg",
    images: [
      "/images/neosphere/1.jpg",
      "/images/neosphere/2.jpg",
      "/images/neosphere/3.jpg",
      "/images/neosphere/4.jpg",
      "/images/neosphere/5.jpg"
    ],
    technologies: ["Laravel", "React", "MySQL"],
    category: "Startups",
    status: "MVP",
    icon: Rocket,
    color: "from-primary to-accent",
    date: "2023 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Job Marketplace", "Events", "Karma System", "Sponsored Spheres"],
  },
  {
    id: 7,
    title: "BidBary",
    subtitle: "Collectors & Auction App",
    description:
        "A collector and auction marketplace with modern dark UI, powered by Laravel, Livewire, and Tailwind, offering real-time bidding and auctions.",
    blog: `<p>BidBary connects collectors and auctioneers. Features include live auctions, collector profiles, bidding history, and a modern UI designed with Motiff.</p>`,
    image: "/images/bidbary/1.jpg",
    images: [
      "/images/bidbary/1.jpg",
      "/images/bidbary/2.jpg",
      "/images/bidbary/3.jpg",
      "/images/bidbary/4.jpg",
      "/images/bidbary/5.jpg"
    ],
    technologies: ["Laravel", "Livewire", "Volt", "Tailwind"],
    category: "Startups",
    status: "In Development",
    icon: Rocket,
    color: "from-purple-400 to-pink-400",
    date: "2024 - Present",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Real-time Bidding", "Collector Profiles", "Auction History", "Modern Dark UI"],
  },
  {
    id: 8,
    title: "BorderMate",
    subtitle: "Travel & Border Crossing Assistant",
    description:
        "An app designed to help travelers manage cross-border journeys with documents, customs info, and real-time border updates.",
    blog: `<p>BorderMate helps travelers with cross-border logistics. Features include document storage, customs information, and live updates about checkpoints.</p>`,
    image: "/images/bordermate/1.jpg",
    images: [
      "/images/bordermate/1.jpg",
      "/images/bordermate/2.jpg",
      "/images/bordermate/3.jpg",
      "/images/bordermate/4.jpg",
      "/images/bordermate/5.jpg"
    ],
    technologies: ["React Native", "Laravel", "MySQL", "REST APIs"],
    category: "Startups",
    status: "Prototype",
    icon: Rocket,
    color: "from-green-400 to-blue-400",
    date: "2024",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Travel Docs", "Customs Info", "Live Border Updates", "Journey Planner"],
  },
  {
    id: 9,
    title: "Allrent.io",
    subtitle: "Online Rental Marketplace",
    description:
        "An online rental startup connecting users with short and long-term rentals. Built from scratch with Laravel and React, featuring payments, maps, and a custom booking system.",
    blog: `<p>Allrent.io is a modern rental platform I built from the ground up, initially as a freelancer and later as the company’s technical lead. It features online payments, review systems, interactive maps, and a custom reservation calendar. Stack: Laravel, React, MySQL.</p>`,
    image: "/images/allrent/1.jpg",
    images: [
      "/images/allrent/1.jpg",
      "/images/allrent/2.jpg",
      "/images/allrent/3.jpg",
      "/images/allrent/4.jpg",
      "/images/allrent/5.jpg"
    ],
    technologies: ["Laravel", "React", "MySQL", "Bootstrap"],
    category: "Startups",
    status: "Completed",
    icon: Rocket,
    color: "from-yellow-400 to-orange-500",
    date: "2022 - 2023",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Online Payments", "Interactive Maps", "Custom Reservation Calendar", "Review System"],
  },

// 🏢 Client Projects
  {
    id: 9,
    title: "Otomall.az",
    subtitle: "FerrumCapital",
    description:
        "Developed and maintained Otomall.az with Laravel and React, ensuring scalability, payments integration, and secure backend systems.",
    blog: `<p>Built Otomall.az as part of FerrumCapital's digital infrastructure. Focused on backend performance, payment systems, and responsive frontend with React.</p>`,
    image: "/images/otomaill/1.jpg",
    images: [
      "/images/otomaill/1.jpg",
      "/images/otomaill/2.jpg",
      "/images/otomaill/3.jpg",
      "/images/otomaill/4.jpg",
      "/images/otomaill/5.jpg"
    ],
    technologies: ["Laravel", "React", "MySQL", "Bootstrap"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-red-400 to-orange-400",
    date: "2021 - 2022",
    links: { demo: "#", github: "#" },
    features: ["Corporate Website", "Payments", "Security Features", "Responsive UI"],
  },
  {
    id: 10,
    title: "Agagroup.az",
    subtitle: "FerrumCapital",
    description:
        "Delivered corporate site and backend services for Agagroup.az with PHP and MySQL.",
    blog: `<p>Agagroup.az was developed to streamline corporate presence for FerrumCapital. Focused on content management, security, and backend efficiency.</p>`,
    image: "/images/agagroup.az/5.png",
    images: [
      "/images/agagroup.az/1.png",
      "/images/agagroup.az/2.png",
      "/images/agagroup.az/3.png",
      "/images/agagroup.az/4.png",
      "/images/agagroup.az/5.png",
      "/images/agagroup.az/6.png"
    ],
    technologies: ["PHP", "WordPress", "MySQL", "Bootstrap"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-red-400 to-orange-400",
    date: "2021 - 2022",
    links: { demo: "https://agagroup.az", github: "#" },
    features: ["Corporate Website", "CMS", "Optimized Backend"],
  },
  {
    id: 11,
    title: "Balli.az",
    subtitle: "FerrumCapital",
    description:
        "Built Balli.az with PHP backend and WordPress, integrating secure payment systems and optimized APIs.",
    blog: `<p>Balli.az was developed as a modern e-commerce solution under FerrumCapital, with core PHP backend and WordPress, secure payments, and reliable order workflows.</p>`,
    image: "/images/balli.az/demo1.png",
    images: [
      "/images/balli.az/demo1.png",
      "/images/balli.az/demo2.png",
      "/images/balli.az/demo3.png",
      "/images/balli.az/demo4.png",
      "/images/balli.az/demo5.png"
    ],
    technologies: ["PHP", "WordPress", "MySQL", "REST APIs", "Stripe"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-red-400 to-orange-400",
    date: "2021 - 2022",
    links: { demo: "https://balli.az", github: "#" },
    features: ["E-commerce", "Payments", "Order Management"],
  },
  {
    id: 14,
    title: "Shiplounge.co",
    subtitle: "Deirvlon Technologies",
    description:
        "End-to-end cargo and logistics platform for SMEs.",
    blog: `<p>Shiplounge.co (KendigetirCargo.com) is a logistics and cargo management system designed for reliability at scale. It streamlines the full shipment lifecycle—rate calculation, booking, pickup, in-transit updates, and delivery confirmation—while giving operators clear tooling to manage tariffs, routes, and invoices.</p>
<p><strong>Architecture</strong>: Laravel + MySQL with optimized indexes and pagination, background jobs/queues for notifications and third‑party integrations, application‑level caching for hot reads, and strict RBAC for admins, operators, and clients. We hardened performance by removing N+1 queries, introducing composite indexes where needed, and keeping critical screens fast under load.</p>
<ul>
  <li>Shipment lifecycle: quote → booking → pickup → in‑transit → delivered</li>
  <li>Rate calculator and tariff/route management</li>
  <li>Live status timeline with optional map view</li>
  <li>Invoicing and basic finance reports</li>
  <li>Role‑based access (admin / operator / client)</li>
  <li>Operations‑optimized UI: filters, bulk actions, quick search</li>
</ul>
<p><strong>Outcome</strong>: faster order handling, fewer ops errors, and clear visibility via dashboards and shipment timelines.</p>`,
    image: "/images/shiplounge.co/7.png",
    images: [
      "/images/shiplounge.co/1.png",
      "/images/shiplounge.co/2.png",
      "/images/shiplounge.co/3.png",
      "/images/shiplounge.co/4.png",
      "/images/shiplounge.co/5.png",
      "/images/shiplounge.co/6.png",
      "/images/shiplounge.co/7.png",
      "/images/shiplounge.co/8.png",
      "/images/shiplounge.co/9.png"
    ],
    technologies: ["Laravel", "MySQL", "Bootstrap"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-indigo-400 to-blue-500",
    date: "2022",
    links: { demo: "https://shiplounge.co", github: "#" },
    features: [
      "Shipment Lifecycle",
      "Rate & Tariffs",
      "Real-time Tracking",
      "Invoicing & Reports",
      "RBAC",
      "Ops-optimized UI",
    ],
  },
  {
    id: 16,
    title: "LuckyHolidays.az",
    subtitle: "GlobalSoft",
    description:
        "Developed LuckyHolidays.az for travel services, focusing on Laravel backend and secure APIs.",
    blog: `<p>LuckyHolidays.az was a project for GlobalSoft, delivering travel booking features, payment flows, and optimized backend APIs.</p>`,
    image: "/images/luckyholidays.az/5.png",
    images: [
      "/images/luckyholidays.az/1.png",
      "/images/luckyholidays.az/2.png",
      "/images/luckyholidays.az/3.png",
      "/images/luckyholidays.az/4.png",
      "/images/luckyholidays.az/5.png",
      "/images/luckyholidays.az/6.png",
      "/images/luckyholidays.az/7.png",
      "/images/luckyholidays.az/8.png",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "React", "Node.js"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-amber-400 to-yellow-500",
    date: "2025",
    links: { demo: "https://luckyholidays.az", github: "#" },
    features: ["Travel Website", "Payment Systems", "APIs", "Ecommerce", "Admin Panel"],
  },
  {
    id: 17,
    title: "CTSA.az",
    subtitle: "GlobalSoft",
    description:
        "Built CTSA.az backend services with Laravel + React, integrating APIs and enterprise-grade security.",
    blog: `<p>CTSA.az was a GlobalSoft project focused on critical infrastructure solutions. Delivered Laravel backend, react frontend, API integrations and secure workflows.</p>`,
    image: "/images/ctsa.az/1.png",
    images: [
      "/images/ctsa.az/1.png",
      "/images/ctsa.az/2.png",
      "/images/ctsa.az/3.png",
      "/images/ctsa.az/4.png",
      "/images/ctsa.az/5.png",
      "/images/ctsa.az/6.png"
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Gitlab CI/CD", "React", "Node.js"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-amber-400 to-yellow-500",
    date: "2025",
    links: { demo: "https://ctsa.az", github: "#" },
    features: ["Ecommerce", "Customizing", "Backend Systems", "Landing Page"],
  },
  {
    id: 18,
    title: "GPSAI.az",
    subtitle: "INCI",
    description:
        "Developed GPSAI.az backend with Laravel and Javalin with my own custom AdminPanel, integrating mapping APIs and real-time data.",
    blog: `<p>GPSAI.az was built under INCI, delivering GPS tracking and AI-enhanced data solutions. Backend APIs with Laravel and Javalin ensured scalability. Builded my own custom AdminPanel for its landing page</p>`,
    image: "/images/gpsai.az/4.png",
    images: [
      "/images/gpsai.az/1.png",
      "/images/gpsai.az/2.png",
      "/images/gpsai.az/3.png",
      "/images/gpsai.az/4.png"
    ],
    technologies: ["Laravel", "Javalin", "PHP 8+", "MySQL/PostgreSQL"],
    category: "Client Projects",
    status: "Completed",
    icon: Server,
    color: "from-green-400 to-teal-400",
    date: "2025",
    links: { demo: "https://gpsai.az", github: "#" },
    features: ["GPS Tracking", "APIs", "Landing Page"],
  },
  {
    id: 19,
    title: "LMS",
    subtitle: "INCI",
    description:
        "Modern LMS (learning management system) for creating and delivering courses.",
    blog: `<p>The LMS at <a href=\"https://lms.maffin.az\" target=\"_blank\" rel=\"noopener\">lms.maffin.az</a> provides a complete learning experience: course authoring, lesson scheduling, enrollment, quizzes, grading, and certification. It’s designed for maintainability and scale, with a clean operations panel for admins and instructors.</p>
<p><strong>Architecture</strong>: Laravel (PHP 8+) + MySQL with RBAC, queue workers for email/notifications, cached catalog queries, and media handling optimized for large course libraries. We hardened performance by eliminating N+1 queries, adding pagination and composite indexes, and guarding critical paths with policies/middleware.</p>
<ul>
  <li>Course/lesson management with modules and content types (video, docs, links)</li>
  <li>Enrollment, cohorts, and prerequisites</li>
  <li>Quizzes and assignments with grading</li>
  <li>Progress tracking and certificates</li>
  <li>Role-based access: admin / instructor / student</li>
  <li>Reports: completion, quiz stats, learner activity</li>
</ul>`,
    image: "/images/lms.maffin.az/2.png",
    images: [
      "/images/lms.maffin.az/1.png",
      "/images/lms.maffin.az/2.png",
      "/images/lms.maffin.az/3.png",
      "/images/lms.maffin.az/4.png",
      "/images/lms.maffin.az/5.png",
      "/images/lms.maffin.az/6.png"
    ],
    technologies: ["Laravel", "PHP 8+", "MySQL", "Tailwind", "Livewire", "Docker"],
    category: "Client Projects",
    status: "Ongoing",
    icon: Server,
    color: "from-green-400 to-teal-400",
    date: "2025 - Present",
    links: { demo: "#", github: "#" },
    features: [
      "Courses & Lessons",
      "Enrollments & Cohorts",
      "Quizzes & Assignments",
      "Progress & Certificates",
      "RBAC",
      "Reports & Analytics",
    ],
  },
  {
    id: 20,
    title: "Ofisait.az",
    subtitle: "INCI",
    description:
        "Developed Ofisait.az backend for office solutions e-commerce site, with Laravel and PostgreSQL.",
    blog: `<p>Ofisait.az was an INCI project focused on office supplies e-commerce. Backend was optimized with Laravel, PostgreSQL, and Docker.</p>`,
    image: "/images/ofisait.az/3.png",
    images: [
      "/images/ofisait.az/1.png",
      "/images/ofisait.az/2.png",
      "/images/ofisait.az/3.png",
      "/images/ofisait.az/4.png",
      "/images/ofisait.az/5.png"
    ],
    technologies: ["Laravel", "PostgreSQL", "Docker"],
    category: "Client Projects",
    status: "Ongoing",
    icon: Server,
    color: "from-green-400 to-teal-400",
    date: "2025 - Present",
    links: { demo: "#", github: "#" },
    features: ["E-commerce", "APIs", "Secure Backend"],
  },
  {
    id: 21,
    title: "Chat2Desk.az",
    subtitle: "INCI",
    description:
        "Integrated Chat2Desk.az with Laravel backend and external APIs for communication workflows.",
    blog: `<p>Chat2Desk.az was built at INCI to provide a unified communication tool. Integrated APIs and backend services with Laravel.</p>`,
    image: "/images/chat2.maffin.az/1.png",
    images: [
      "/images/chat2.maffin.az/1.png",
      "/images/chat2.maffin.az/2.png",
      "/images/chat2.maffin.az/3.png",
      "/images/chat2.maffin.az/4.png",
      "/images/chat2.maffin.az/5.png",
      "/images/chat2.maffin.az/6.png"
    ],
    technologies: ["Laravel", "PHP 8+", "MySQL"],
    category: "Client Projects",
    status: "Ongoing",
    icon: Server,
    color: "from-green-400 to-teal-400",
    date: "2025 - Present",
    links: { demo: "https://chat2.maffin.az", github: "#" },
    features: ["Communication APIs", "Backend Integrations", "Secure Workflows"],
  },
  {
    id: 22,
    title: "HBNgroup.az",
    subtitle: "INCI",
    description:
        "Backend developer for HBNgroup.az, delivering Laravel backend with secure architecture and CI/CD pipelines.",
    blog: `<p>HBNgroup.az was developed as an enterprise platform for INCI. Focused on backend APIs, security, and deployment pipelines.</p>`,
    image: "/images/hbngroup/1.jpg",
    images: [
      "/images/hbngroup/1.jpg",
      "/images/hbngroup/2.jpg",
      "/images/hbngroup/3.jpg",
      "/images/hbngroup/4.jpg",
      "/images/hbngroup/5.jpg"
    ],
    technologies: ["Laravel", "PHP 8+", "PostgreSQL", "Docker", "CI/CD"],
    category: "Client Projects",
    status: "Ongoing",
    icon: Server,
    color: "from-green-400 to-teal-400",
    date: "2025 - Present",
    links: { demo: "#", github: "#" },
    features: ["Enterprise APIs", "CI/CD", "Secure Backend"],
  },
];


const categories = ["Client Projects", "My Projects", "Startups"]

const VISIBLE_SLIDES = 4; // Number of slides visible
const MAX_MOBILE_TAGS = 3; // Mobile tag cap for technologies and features

// Realistic Skeleton Component
const ProjectCardSkeleton = () => (
    <div className="w-full h-[500px] border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between select-none relative overflow-hidden bg-card/50">
      {/* Timeline Dot & Date Skeleton */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse shadow-lg border-4 border-background z-10" />
        <div className="h-4 w-20 bg-gray-300 rounded mt-2 animate-pulse"></div>
      </div>
      {/* Project Card Content Skeleton */}
      <div className="mb-4 flex-1 flex flex-col">
        {/* Icon and Title Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-7 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
        </div>
        {/* Technologies Skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        {/* Features Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
          ))}
        </div>
        {/* Status and Button Skeleton */}
        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-8 w-28 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
);

// Skeleton Carousel Component
const SkeletonCarousel = () => (
    <Carousel
        className="w-full max-w-7xl mx-auto"
        opts={{
          align: "center",
          loop: false,
          dragFree: false,
          slidesToScroll: 1,
          breakpoints: {
            "(min-width: 1000px)": {
              align: "center",
              loop: true,
              dragFree: true,
              slidesToScroll: 1,
            },
          },
        }}
    >
      {/* Navigation Controls Skeleton */}
      <div className="flex justify-center gap-4 mb-6 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:justify-between md:px-2 md:pointer-events-none md:z-20">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      {/* Carousel Content Skeleton */}
      <CarouselContent className="ml-0 md:-ml-4">
        {[...Array(4)].map((_, idx) => (
            <CarouselItem
                key={idx}
                className="pl-4 md:pl-4 pr-4 md:pr-0 w-full sm:max-w-[85%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[520px] mx-auto flex-shrink-0"
            >
              <ProjectCardSkeleton />
            </CarouselItem>
        ))}
      </CarouselContent>
      {/* Dots Indicator Skeleton */}
      <div className="hidden md:flex justify-center gap-2 mt-6">
        {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${idx * 0.1}s` }}></div>
        ))}
      </div>
    </Carousel>
);

export default function ProjectsTimelinePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper: Ensure at least 4 cards for slider
  const filteredProjects = useMemo(
      () => projects.filter(p => p.category === activeCategory),
      [activeCategory]
  );

  const sliderProjects = useMemo(() => {
    if (filteredProjects.length > 0 && filteredProjects.length < VISIBLE_SLIDES) {
      const arr: Project[] = [];
      let i = 0;
      while (arr.length < VISIBLE_SLIDES) {
        arr.push(filteredProjects[i % filteredProjects.length]);
        i++;
      }
      return arr;
    }
    return filteredProjects;
  }, [filteredProjects]);

  const handleTabChange = (cat: string) => {
    setLoading(true);
    // small delay for blur noise transition
    setTimeout(() => {
      setActiveCategory(cat);
      setLoading(false);
    }, 150);
  };

  return (
      <section className="py-30 px-4 bg-muted/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my journey through My Projects, Startups, and Client Projects. Each milestone is a story of innovation, collaboration, and impact.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`px-4 py-2 md:px-6 md:py-2 cursor-pointer rounded-full font-semibold text-sm md:text-base transition-all duration-200 border border-primary/20 bg-card hover:bg-primary/10 hover:text-primary ${activeCategory === cat ? "bg-primary/10 text-primary" : "text-foreground"}`}
                >
                  {cat}
                </button>
            ))}
          </div>

          {/* Timeline Axis & Slider Controls */}
          <div className="relative w-full flex flex-col items-center">
            {loading ? (
                <SkeletonCarousel />
            ) : (
                <div className="w-full relative">
                  <Carousel
                      className="w-full max-w-7xl mx-auto"
                      opts={{
                        // Mobile defaults
                        align: "center",
                        loop: false,
                        dragFree: false,
                        slidesToScroll: 1,
                        // Desktop overrides
                        breakpoints: {
                          "(min-width: 1000px)": {
                            align: "center",
                            loop: true,
                            dragFree: true,
                            slidesToScroll: 1,
                          },
                        },
                      }}
                  >
                    {/* Navigation Controls */}
                    <div className="flex justify-center gap-4 mb-6 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:justify-between md:px-2 md:pointer-events-none md:z-20">
                      <CarouselPrevious data-cursor="prev" className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                      <CarouselNext data-cursor="next" className="relative md:static bg-primary cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition pointer-events-auto" />
                    </div>

                    {/* Carousel Content */}
                    <CarouselContent className="ml-0 md:-ml-4" data-cursor="drag">
                      {sliderProjects.map((project, idx) => {
                        const techs = project.technologies ?? [];
                        const feats = project.features ?? [];

                        const techsMobile = techs.slice(0, MAX_MOBILE_TAGS);
                        const featsMobile = feats.slice(0, MAX_MOBILE_TAGS);
                        const techsRest = Math.max(techs.length - MAX_MOBILE_TAGS, 0);
                        const featsRest = Math.max(feats.length - MAX_MOBILE_TAGS, 0);

                        return (
                            <CarouselItem
                                key={project.id + "-" + idx}
                                className="relative pl-4 md:pl-4 pr-4 md:pr-0 w-full sm:max-w-[85%] md:max-w-[45%] lg:max-w-[35%] xl:max-w-[520px] mx-auto flex-shrink-0"
                                data-cursor="drag"
                            >
                              {/* Project Card Content */}
                              <div
                                  className={`w-full h-[500px] border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between select-none relative overflow-hidden group transition-all duration-500
                          ${hoveredIdx !== null && hoveredIdx !== idx ? "opacity-70" : ""}
                        `}
                                  style={{ userSelect: "none" }}
                                  onMouseEnter={() => setHoveredIdx(idx)}
                                  onMouseLeave={() => setHoveredIdx(null)}
                                  data-cursor="drag"
                              >
                                {/* Background Image */}
                                <Image
                                    src={project.image || "/images/placeholder.jpg"}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 900px) 100vw, 520px"
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
                                    priority={idx === 0}
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder-blur.png"
                                    quality={70}
                                />

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{ background: "linear-gradient(rgb(20 20 30 / 85%), rgb(20 20 30 / 89%))" }}
                                />

                                {/* Dark overlay for non-hovered cards */}
                                {hoveredIdx !== null && hoveredIdx !== idx && (
                                    <div className="absolute inset-0 bg-black/40 transition-all duration-500 pointer-events-none z-20" />
                                )}

                                {/* Timeline Dot & Date */}
                                <div className="flex flex-col items-center mb-4 relative z-30 select-none">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg border-4 border-background z-10" />
                                  <span className="text-base font-semibold text-primary mt-2">{project.date}</span>
                                </div>

                                {/* Project Card */}
                                <div className="mb-4 relative z-30 flex-1 flex flex-col">
                                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-3">
                                    {project.icon && <project.icon className="w-8 h-8 text-primary flex-shrink-0" />}
                                    <div className="flex-1">
                                      <h3 className="font-bold text-2xl text-foreground mb-1">{project.title}</h3>
                                      <h4 className="text-lg text-muted-foreground">{project.subtitle}</h4>
                                    </div>
                                  </div>

                                  <p className="hidden md:block text-base text-muted-foreground mb-4 flex-1">{project.description}</p>

                                  {/* Technologies row */}
                                  <div className="mb-3">
                                    {/* Mobile: limited tags + "+N" opens modal */}
                                    <div className="flex flex-wrap gap-2 md:hidden">
                                      {techsMobile.map((tech) => (
                                          <span
                                              key={`tech-m-${project.id}-${tech}`}
                                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                                          >
                                    {tech}
                                  </span>
                                      ))}
                                      {techsRest > 0 && (
                                          <button
                                              type="button"
                                              onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                              className="px-3 py-1 rounded-full bg-primary/20 text-primary/90 text-sm font-semibold cursor-pointer"
                                              aria-label={`Open project to see ${techsRest} more technologies`}
                                              title={`See ${techsRest} more`}
                                          >
                                            +{techsRest} more
                                          </button>
                                      )}
                                    </div>
                                    {/* Desktop: full list */}
                                    <div className="hidden md:flex flex-wrap gap-2">
                                      {techs.map((tech) => (
                                          <span
                                              key={`tech-d-${project.id}-${tech}`}
                                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                                          >
                                    {tech}
                                  </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Features row */}
                                  <div className="mb-4">
                                    {/* Mobile: limited tags + "+N" opens modal */}
                                    <div className="flex flex-wrap gap-2 md:hidden">
                                      {featsMobile.map((f) => (
                                          <span
                                              key={`feat-m-${project.id}-${f}`}
                                              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                                          >
                                    {f}
                                  </span>
                                      ))}
                                      {featsRest > 0 && (
                                          <button
                                              type="button"
                                              onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                              className="px-3 py-1 rounded-full bg-accent/20 text-accent/90 text-sm font-semibold cursor-pointer"
                                              aria-label={`Open project to see ${featsRest} more features`}
                                              title={`See ${featsRest} more`}
                                          >
                                            +{featsRest} more
                                          </button>
                                      )}
                                    </div>
                                    {/* Desktop: full list */}
                                    <div className="hidden md:flex flex-wrap gap-2">
                                      {feats.map((f) => (
                                          <span
                                              key={`feat-d-${project.id}-${f}`}
                                              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                                          >
                                    {f}
                                  </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center mt-auto">
                              <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground">
                                {project.status}
                              </span>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-primary font-semibold text-sm border border-primary/20 hover:bg-primary/10 transition-all cursor-pointer"
                                        onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                                        data-cursor="pointer"
                                    >
                                      <Eye className="w-4 h-4" />
                                      See Project
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </CarouselItem>
                        );
                      })}
                    </CarouselContent>

                    {/* Dots Indicator - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:block mt-6">
                      <CarouselDots />
                    </div>
                  </Carousel>
                </div>
            )}
          </div>

          {/* Project Blog Modal */}
          <ProjectBlogModal
              open={modalOpen}
              onCloseAction={() => { setModalOpen(false); setSelectedProject(null); }}
              project={selectedProject}
          />
        </div>
      </section>
  )
}

