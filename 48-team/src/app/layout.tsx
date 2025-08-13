import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Senan The 48 - Programmer, Therapist & Founder",
  description:
    "Portfolio of Senan The 48 - Programmer, Therapist, and Founder of NeoSphere startup. Build. Connect. Create.",
  keywords: ["programmer", "therapist", "founder", "neosphere", "portfolio", "web development"],
  authors: [{ name: "Senan The 48" }],
  creator: "Senan The 48",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
