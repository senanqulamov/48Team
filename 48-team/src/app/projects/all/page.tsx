import { Metadata } from "next"
import AllProjectsPageClient from "./AllProjectsPageClient"

export const metadata: Metadata = {
  title: "All Projects | 48Team Portfolio",
  description: "Explore our complete portfolio of innovative solutions, from startups to enterprise applications. Discover the projects we've built across various technologies and industries.",
  openGraph: {
    title: "All Projects | 48Team Portfolio",
    description: "Explore our complete portfolio of innovative solutions",
  },
}

export default function AllProjectsPage() {
  return <AllProjectsPageClient />
}

