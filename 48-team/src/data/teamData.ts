export type TeamProject = {
  title: string
  description?: string
  projectId?: number
  contribution?: string
}

export type TeamSocials = {
  linkedin?: string
  behance?: string
  dribbble?: string
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
        title: "NeoSphere",
        projectId: 6,
        contribution: "Backend development and feature implementation"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Real-time bidding system and WebSocket integration"
      },
      {
        title: "JVD CLI",
        projectId: 2,
        contribution: "Java Command-Line Interface Toolkit"
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/senan-qulamov/",
      github: "https://github.com/senanqulamov",
      email: "mailto:qulamovsenan@gmail.com"
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
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/slarpec",
      behance: "https://behance.net/slarpec"
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
      {
        title: "CTSA.az",
        projectId: 17,
        contribution: "Enterprise solutions with Laravel backend and React frontend."
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/cavidmanafov18/",
      dribbble: "https://dribbble.com/Javid18",
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
      linkedin: "https://www.linkedin.com/in/banu-ibrahimova-aa8bbb242/",
      email: "mailto:banuibrahimova2002@gmail.com",
    },
    order: 4,
  },
  {
    name: "Nazanin Azimova",
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
      linkedin: "https://www.linkedin.com/in/nazanin-azimova-0b0a872b1/",
      behance: "https://www.behance.net/nazeninazimova"
    },
    order: 5,
  },
  {
    name: "Nihal Mammad",
    role: "Middle App Developer (Flutter)",
    image: "/images/team/nihal.jpeg",
    about: [
      "Creating beautiful and smooth cross-platform mobile experiences with Flutter",
      "Expertise in state management and scalable app architecture",
      "Passionate about pixel-perfect UI and native performance",
    ],
    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "REST APIs",
      "State Management (Bloc, Riverpod)",
      "Material Design",
      "iOS & Android",
      "Git",
      "Push Notifications",
      "Local Storage",
      "App Store Deployment",
      "Google Play Deployment",
      "CI/CD",
      "Animation"
    ],
    projects: [
      {
        title: "NeoSphere App",
        projectId: 6,
        contribution: "Cross-platform mobile application architecture"
      },
      {
        title: "BidBary Mobile",
        projectId: 7,
        contribution: "Real-time bidding features and push notifications"
      },
      {
        title: "JVD CLI mobile",
        projectId: 2,
        contribution: "Java Command-Line Interface Toolkit"
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/mammadnihal/",
      github: "https://github.com/mammadnihal",
    },
    order: 6,
  },
  {
    name: "Sama Safarli",
    role: "Digital Marketing Specialist",
    image: "/images/team/sema.png",
    about: [
      "Performance-driven digital marketing expert with proven expertise in PPC, SEO, and analytics",
      "Data-driven strategist delivering measurable growth across e-commerce, construction, banking, and education",
      "Specialized in campaign optimization and conversion tracking using GA4 and GTM",
    ],
    skills: [
      "Google Ads",
      "Meta Ads",
      "PPC Campaign Management",
      "SEO Strategy",
      "Google Analytics 4 (GA4)",
      "Google Tag Manager (GTM)",
      "Conversion Tracking",
      "A/B Testing",
      "ROI Optimization",
      "Market Research",
      "Competitor Analysis",
      "Social Media Marketing",
      "Performance Marketing",
      "Data Analysis"
    ],
    projects: [
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Visual identity and marketing materials"
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/sama-safarli-digital-marketing/",
      portfolio: "https://samasafarliportfolio.vise.page/",
    },
    order: 7,
  },
  {
    name: "Khayal",
    role: "Senior DevOps Engineer",
    image: "/images/team/manplaceholder1.png",
    about: [
      "Automating infrastructure and streamlining deployment pipelines",
      "Strong focus on system reliability, monitoring, and scalability",
      "Bridging development and operations for faster delivery cycles",
    ],
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Jenkins",
      "GitLab CI",
      "Terraform",
      "Linux Administration",
      "Nginx",
      "Monitoring & Logging",
      "Shell Scripting",
      "Infrastructure as Code"
    ],
    projects: [
      {
        title: "CustomAdmin",
        projectId: 5,
        contribution: "Containerization and automated deployment setup"
      },
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Cloud infrastructure and CI/CD pipeline implementation"
      },
      {
        title: "Otomall.az",
        projectId: 12,
        contribution: "High-availability architecture and performance optimization"
      },
    ],
    socials: {
      // linkedin: "https://linkedin.com/in/khayal",
    },
    order: 8,
  },
  {
    name: "Zeynal Zeynalov",
    role: "Middle Front-End Developer (Next.js)",
    image: "/images/team/manplaceholder1.png",
    about: [
      "Building performant and scalable web applications with Next.js and React",
      "Strong focus on user experience, accessibility, and modern web standards",
      "Experienced in server-side rendering and static site generation",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "CSS/SCSS",
      "REST APIs",
      "GraphQL",
      "Git",
      "Responsive Design",
      "Web Performance",
      "SEO Optimization",
      "Vercel",
      "Server Components"
    ],
    projects: [
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Next.js architecture and core feature development"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Responsive interface and real-time bidding system"
      },
      {
        title: "LuckyHolidays.az",
        projectId: 16,
        contribution: "Campaign visuals and social media assets"
      },
      {
        title: "CTSA.az",
        projectId: 17,
        contribution: "Enterprise solutions with Laravel backend and React frontend."
      },
    ],
    socials: {
      // linkedin: "https://linkedin.com/in/aydan",
      // github: "https://github.com/aydan",
      // email: "mailto:aydan@example.com",
    },
    order: 9,
  },
  {
    name: "Rashad",
    role: "Kotlin Android Developer",
    image: "/images/team/manplaceholder1.png",
    about: [
      "Developing native Android applications with modern Kotlin and Jetpack Compose",
      "Strong knowledge of Android SDK and Material Design principles",
      "Focused on clean architecture and maintainable code",
    ],
    skills: [
      "Kotlin",
      "Android SDK",
      "Jetpack Compose",
      "MVVM Architecture",
      "Coroutines",
      "Room Database",
      "Retrofit",
      "Dagger/Hilt",
      "Git",
      "Material Design 3",
      "Firebase",
      "RESTful APIs",
      "Google Play Services",
      "Unit Testing"
    ],
    projects: [
      {
        title: "Otomall Android",
        projectId: 16,
        contribution: "Native Android app development and optimization"
      },
      {
        title: "NeoSphere Android",
        projectId: 17,
        contribution: "Jetpack Compose UI and offline-first architecture"
      },
      {
        title: "BidBary Android",
        projectId: 18,
        contribution: "Real-time features and Android-specific optimizations"
      },
    ],
    socials: {
      // linkedin: "https://linkedin.com/in/rashad",
      // github: "https://github.com/rashad",
      // email: "mailto:rashad@example.com",
    },
    order: 10,
  },
  {
    name: "Shahla",
    role: "SMM",
    image: "/images/team/woman.png",
    about: [
      "Building brand presence through strategic social media campaigns",
      "Data-driven approach to content planning and audience engagement",
      "Creating compelling narratives that resonate with target audiences",
    ],
    skills: [
      "Social Media Strategy",
      "Content Planning",
      "Instagram Marketing",
      "Facebook Ads",
      "Community Management",
      "Analytics & Reporting",
      "Copywriting",
      "Trend Analysis",
      "Influencer Outreach",
      "Campaign Management",
      "Canva",
      "Hootsuite"
    ],
    projects: [
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Community building and engagement campaigns"
      },
      {
        title: "Otomall.az",
        projectId: 12,
        contribution: "Social media advertising and brand awareness"
      },
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "Launch campaign and ongoing social presence"
      },
    ],
    socials: {
      // linkedin: "https://linkedin.com/in/shahla",
      // email: "mailto:shahla@example.com",
    },
    order: 11,
  },
  {
    name: "Cafar",
    role: "SEO Specialist",
    image: "/images/team/manplaceholder1.png",
    about: [
      "Driving organic traffic growth through technical and on-page optimization",
      "Deep understanding of search algorithms and ranking factors",
      "Proven track record of improving search visibility and conversions",
    ],
    skills: [
      "Technical SEO",
      "Keyword Research",
      "On-Page Optimization",
      "Link Building",
      "Google Analytics",
      "Google Search Console",
      "SEMrush",
      "Ahrefs",
      "Content Strategy",
      "Site Audits",
      "Schema Markup",
      "Local SEO"
    ],
    projects: [
      {
        title: "Otomall.az",
        projectId: 12,
        contribution: "Technical SEO audit and organic growth strategy"
      },
      {
        title: "NeoSphere",
        projectId: 6,
        contribution: "SEO foundation and content optimization"
      },
      {
        title: "BidBary",
        projectId: 7,
        contribution: "Search engine optimization and ranking improvements"
      },
    ],
    socials: {
      // linkedin: "https://linkedin.com/in/cafar",
      // email: "mailto:cafar@example.com",
    },
    order: 12,
  },
]