"use client"

import React from "react"
import { ExternalLink, Code2 } from "lucide-react"

export default function CTAButtons({ demoUrl, githubUrl }: { demoUrl?: string; githubUrl?: string }) {
  if (!demoUrl && !githubUrl) return null
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label="Open live demo in a new tab"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          <span>Live Demo</span>
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="View source code on GitHub in a new tab"
        >
          <Code2 className="w-4 h-4" aria-hidden="true" />
          <span>View Code</span>
        </a>
      )}
    </div>
  )
}
