"use client"

import React from "react"
import type { TechItem } from "@/types/project"
import {
  Flame,
  Braces,
  Database,
  Wind,
  Atom,
  Server,
  Globe,
  Ship,
  CreditCard,
  Zap,
  Leaf,
  Boxes,
} from "lucide-react"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Laravel: Flame,
  PHP: Braces,
  "PHP 8+": Braces,
  MySQL: Database,
  PostgreSQL: Database,
  Tailwind: Wind,
  "Tailwind CSS": Wind,
  React: Atom,
  "Next.js": Atom,
  Node: Server,
  "Node.js": Server,
  WordPress: Globe,
  Docker: Ship,
  Stripe: CreditCard,
  Livewire: Zap,
  Javalin: Leaf,
  Prisma: Boxes,
}

// If you later add logo assets, extend this map { key: { src, alt } }
const PILL_CLASS = "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"

export default function TechIconsRow({ items, title = "Tech & Tools" }: { items?: TechItem[]; title?: string }) {
  if (!items?.length) return null
  return (
    <section aria-labelledby="tech-title" className="rounded-2xl border border-primary/10 bg-background/60 p-5 md:p-6 shadow-sm">
      <h3 id="tech-title" className="text-2xl font-bold mb-2 font-display">{title}</h3>
      <hr className="border-muted/30 mb-4" />
      <ul className="flex flex-wrap gap-2">
        {items.map((t) => {
          const Icon = (t.iconName && ICONS[t.iconName]) || ICONS[t.name]
          return (
            <li key={t.name}>
              <span className={PILL_CLASS} title={t.name} aria-label={t.name}>
                {Icon ? <Icon className="w-3.5 h-3.5" aria-hidden="true" /> : null}
                {t.name}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )}
