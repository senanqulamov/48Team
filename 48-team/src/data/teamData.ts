export type TeamProject = {
  title: string
  description?: string
  projectId?: number
  contribution?: string
}

export type TeamSocials = {
  linkedin?: string
  behance?: string
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
    role: "Founder / Full‑Stack Engineer",
    image: "/images/mine/me4.png",
    about: [
      "Passionate about building scalable products from concept to production",
      "Strong advocate for clean architecture and developer experience",
      "Experienced in leading cross-functional teams and technical decision-making",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "PHP",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "Tailwind CSS",
      "REST APIs",
      "CI/CD",
      "System Architecture"
    ],
    projects: [
      {
        title: "Passmate",
        projectId: 1,
        contribution: "Led full-stack development and architecture",
        description: "Secure password management platform with end-to-end encryption"
      },
      {
        title: "CustomAdmin",
        projectId: 5,
        contribution: "Designed core data layer and multi-tenancy system",
        description: "Universal admin panel supporting multiple startup projects"
      },
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Backend development and feature implementation"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Real-time bidding system and WebSocket integration"
      },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/sananqulamov",
      github: "https://github.com/sananqulamov",
      email: "mailto:sanan@example.com",
      portfolio: "https://sananqulamov.com"
    },
    order: 1,
    timezone: "UTC+4"
  },
  {
    name: "Emin Baghirov",
    role: "Senior Graphic Designer",
    image: "/images/team/emin.jpg",
    about: [
      "Creating visually compelling designs that enhance user engagement",
      "Expertise in brand identity and visual storytelling",
      "Focus on modern design trends and pixel-perfect execution",
    ],
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "Brand Identity",
      "Typography",
      "Print Design",
      "Digital Illustration",
      "Color Theory",
      "Layout Design"
    ],
    projects: [
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Visual identity and marketing materials"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Brand design and promotional graphics"
      },
      {
        title: "LuckyHolidays.az",
        projectId: 16,
        contribution: "Campaign visuals and social media assets"
      },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/eminbaghirov",
      behance: "https://behance.net/eminbaghirov"
    },
    order: 2,
  },
  {
    name: "Javid Manafov",
    role: "Lead UI/UX Designer",
    image: "/images/team/javid.jpg",
    about: [
      "User-centered design approach with emphasis on research and testing",
      "Skilled in transforming complex requirements into intuitive interfaces",
      "Bridging the gap between user needs and business goals",
    ],
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "Information Architecture",
      "Design Systems",
      "Interaction Design",
      "UI Animation"
    ],
    projects: [
      {
        title: "Passmate",
        projectId: 1,
        contribution: "Complete UI/UX design and user flow optimization"
      },
      {
        title: "SchoolExam",
        projectId: 2,
        contribution: "Interface design and student experience refinement"
      },
      {
        title: "JavaLearningApp",
        projectId: 3,
        contribution: "Learning interface and interactive components"
      },
      {
        title: "Otomall.az",
        projectId: 12,
        contribution: "E-commerce UX and checkout flow redesign"
      },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/javidmanafov",
      behance: "https://behance.net/javidmanafov",
      email: "mailto:javid@example.com",
    },
    order: 3,
  },
  {
    name: "Banu Ibrahimova",
    role: "Product Owner / QA Engineer",
    image: "/images/team/banu.jpeg",
    about: [
      "Ensuring product quality through rigorous testing methodologies",
      "Strong focus on user acceptance and business requirement validation",
      "Experienced in Agile product management and sprint planning",
    ],
    skills: [
      "Manual Testing",
      "Test Case Design",
      "Regression Testing",
      "User Acceptance Testing",
      "Bug Tracking",
      "Product Management",
      "Agile/Scrum",
      "Requirements Analysis",
      "Jira",
      "TestRail"
    ],
    projects: [
      {
        title: "CustomAdmin",
        projectId: 5,
        contribution: "Comprehensive testing and quality assurance"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Product roadmap and feature testing coordination"
      },
      {
        title: "LuckyHolidays.az",
        projectId: 16,
        contribution: "End-to-end testing and product requirement management"
      },
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Quality assurance and user story validation"
      },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/banuibrahimova",
      email: "mailto:banu@example.com",
    },
    order: 4,
  },
  {
    name: "Nazanin",
    role: "Graphic Designer",
    image: "/images/team/naza.JPG",
    about: [
      "Crafting engaging visual content for digital and print media",
      "Strong eye for detail and contemporary design aesthetics",
      "Collaborative approach to bringing creative concepts to life",
    ],
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "Social Media Graphics",
      "Banner Design",
      "Image Editing",
      "Logo Design",
      "Presentation Design",
      "Marketing Collateral"
    ],
    projects: [
      {
        title: "LuckyHolidays.az",
        projectId: 16,
        contribution: "Social media content and promotional designs"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "UI graphics and visual assets"
      },
      {
        title: "Otomall.az",
        projectId: 12,
        contribution: "Product banners and marketing visuals"
      },
    ],
    socials: {
      behance: "https://behance.net/nazanin",
      email: "mailto:nazanin@example.com",
    },
    order: 5,
  },
]