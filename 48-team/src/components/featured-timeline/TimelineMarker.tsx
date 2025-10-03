"use client"

import React from "react"

export default function TimelineMarker({ year }: { year: string }) {
  return (
    <div className="relative flex items-center" aria-hidden="true">
      <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-primary/90 ring-4 ring-primary/20 shadow-md" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden" />
      <span className="ml-3 text-sm font-semibold text-muted-foreground select-none">
        {year}
      </span>
    </div>
  )
}

