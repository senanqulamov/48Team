import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import PerformanceGuard from "@/components/PerformanceGuard"

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
  title: "Senan Qulamov - Programmer, Therapist & Founder",
  description:
    "Portfolio of Senan Qulamov - Programmer, Therapist, and Founder of NeoSphere startup. Build. Connect. Create.",
  keywords: ["programmer", "therapist", "founder", "neosphere", "bidbary", "portfolio", "web development"],
  authors: [{ name: "Senan Qulamov" }],
  creator: "Senan Qulamov",
    generator: 'Senan Qulamov'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-sans antialiased">
        <PerformanceGuard />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
