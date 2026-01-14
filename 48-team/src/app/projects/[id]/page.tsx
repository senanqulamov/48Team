import { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import ProjectPageClient from "./ProjectPageClient"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find(p => p.id.toString() === id)

  if (!project) {
    return {
      title: "Project Not Found | 48Team",
    }
  }

  return {
    title: `${project.title} | 48Team Portfolio`,
    description: project.shortDescription || project.description,
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id.toString() === id)

  if (!project) {
    notFound()
  }

  // Find next project in the list
  const currentIndex = projects.findIndex(p => p.id === project.id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return <ProjectPageClient project={project} nextProject={nextProject} />
}

