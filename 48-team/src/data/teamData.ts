export type TeamProject = {
  title: string
  description: string
}

export type TeamSocials = {
  linkedin?: string
  github?: string
  email?: string
  twitter?: string // optional for backwards-compat
}

export type TeamMemberProfile = {
  name: string
  role: string
  image: string
  about: string[]
  skills: string[]
  projects: TeamProject[]
  socials?: TeamSocials
}

export const teamData: TeamMemberProfile[] = [
  {
    name: "John Doe",
    role: "Senior Developer",
    image: "/images/mine/me1.webp",
    about: [
      "10+ years in software development",
      "Expert in scalable systems",
      "Led teams across frontend and backend",
    ],
    skills: ["Next.js", "TypeScript", "Node.js", "Leadership"],
    projects: [
      { title: "Project A", description: "Customer portal with role-based access" },
      { title: "Project B", description: "Realtime analytics dashboard" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      email: "mailto:john@example.com",
    },
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
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    projects: [
      { title: "Design System X", description: "A unified component library" },
      { title: "Mobile App UX", description: "Improved activation by 18%" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      email: "mailto:jane@example.com",
    },
  },
  {
    name: "Ali Rahman",
    role: "Full-Stack Engineer",
    image: "/images/mine/me3.jpg",
    about: ["API-first thinker", "TDD practitioner", "DevOps and CI/CD"],
    skills: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
    projects: [
      { title: "API Gateway", description: "Federated GraphQL for microservices" },
      { title: "Ops Toolkit", description: "Infra as code templates" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/alirahman",
      github: "https://github.com/alirahman",
      email: "mailto:ali@example.com",
    },
  },
  {
    name: "Maria Garcia",
    role: "QA Engineer",
    image: "/images/mine/me4.png",
    about: ["Automation frameworks", "Exploratory testing", "Shift-left QA"],
    skills: ["Playwright", "Cypress", "API Testing", "Monitoring"],
    projects: [
      { title: "E2E Suite", description: "Parallelized test runs and dashboards" },
      { title: "Contract Tests", description: "Consumer-driven contracts" },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/mariagarcia",
      github: "https://github.com/mariagarcia",
      email: "mailto:maria@example.com",
    },
  },
]

