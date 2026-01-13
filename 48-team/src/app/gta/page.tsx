import { Metadata } from "next"
import GTAPageClient from "./GTAPageClient"

export const metadata: Metadata = {
  title: "GTA VI Scroll Experience | 48Team",
  description: "Rockstar Games GTA VI inspired smooth scroll implementation",
}

export default function GTAPage() {
  return <GTAPageClient />
}

