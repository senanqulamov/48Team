import NewPageClient from "./NewPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio - Horizontal Scroll Experience",
}

export default function NewPage() {
  return <NewPageClient />
}

