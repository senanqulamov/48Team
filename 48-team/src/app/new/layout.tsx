import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "48 Team - Portfolio",
  description: "Horizontal scroll portfolio experience",
}

export default function NewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

