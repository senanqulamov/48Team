export type TeamProject = {
  title: string
  description?: string
  projectId?: number
  contribution?: string
}

export type TeamSocials = {
  linkedin?: string
  github?: string
  email?: string
  twitter?: string
  portfolio?: string
}

export type TeamMemberProfile = {
  name: string
  role: string
  image: string
  about: string[]
  skills: string[]
  projects: TeamProject[]
  socials?: TeamSocials
  order?: number
  timezone?: string
}

export const teamData: TeamMemberProfile[] = [
  {
    name: "Sanan Qulamov",
    role: "Full‑Stack Engineer / Founder",
    image: "/images/mine/me4.png",
    about: [
      "Product‑minded engineer focusing on DX & maintainability",
      "Blend of Laravel + React/Next.js + Java experience",
      "Enjoys shaping 0→1 MVPs and hardening them for scale",
    ],
    skills: [
      "Next.js","React","TypeScript","Laravel","PHP","Node.js","MySQL","Tailwind","CI/CD","Systems Design"
    ],
    projects: [
      { title: "Passmate", projectId: 1, contribution: "Architecture & full stack", description: "Password manager MVP" },
      { title: "CustomAdmin", projectId: 5, contribution: "Core data layer", description: "Universal multi‑startup admin" },
      { title: "NeoSphere", projectId: 6, contribution: "Backend & feature delivery" },
      { title: "BidBary", projectId: 7, contribution: "Real‑time bidding flows" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/example",
      github: "https://github.com/example",
      email: "mailto:founder@example.com",
      portfolio: "https://example.com"
    },
    order: 1,
    timezone: "UTC+4"
  },
  {
    name: "Jane Smith",
    role: "Product Designer",
    image: "/images/mine/me2.png",
    about: [
      "Design systems advocate",
      "Accessibility-first approach",
      "Cross-functional collaboration",
    ],
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping", "Design Tokens"],
    projects: [
      { title: "NeoSphere", projectId: 6, contribution: "Information architecture" },
      { title: "BidBary", projectId: 7, contribution: "Auction interaction patterns" },
      { title: "Allrent.io", projectId: 9, contribution: "Conversion oriented redesign" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      email: "mailto:jane@example.com",
    },
    order: 2,
  },
  {
    name: "Ali Rahman",
    role: "Full‑Stack Engineer",
    image: "/images/mine/me3.jpg",
    about: ["API-first thinker", "TDD practitioner", "DevOps and CI/CD"],
    skills: ["Next.js", "Prisma", "PostgreSQL", "AWS", "Docker", "Testing"],
    projects: [
      { title: "Passmate", projectId: 1, contribution: "Encryption & security" },
      { title: "SchoolExam", projectId: 2, contribution: "Exam logic & auto-grading" },
      { title: "JavaLearningApp", projectId: 3, contribution: "Backend API" },
      { title: "Otomall.az", projectId: 12, contribution: "Performance & hardening" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/alirahman",
      github: "https://github.com/alirahman",
      email: "mailto:ali@example.com",
    },
    order: 3,
  },
  {
    name: "Maria Garcia",
    role: "QA Engineer",
    image: "/images/mine/me1.webp",
    about: ["Automation frameworks", "Exploratory testing", "Shift-left QA"],
    skills: ["Playwright", "Cypress", "API Testing", "Monitoring", "Accessibility"],
    projects: [
      { title: "CustomAdmin", projectId: 5, contribution: "E2E regression suite" },
      { title: "BidBary", projectId: 7, contribution: "Load & concurrency tests" },
      { title: "LuckyHolidays.az", projectId: 16, contribution: "Checkout reliability" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/mariagarcia",
      github: "https://github.com/mariagarcia",
      email: "mailto:maria@example.com",
    },
    order: 4,
  },
]
