"use client"

const FLAG_KEY = "__project_opening_loader__"
const GLOBAL_KEY = "__PROJECT_OPENING_LOADER_META__"

export type ProjectTransitionMeta = {
  /** epoch ms when the intent was set */
  at: number
  /** optional source label */
  from?: string
}

function now() {
  return Date.now()
}

/**
 * Arm the project-opening loader for the next navigation.
 * Stored in sessionStorage so it survives route transitions.
 */
export function armProjectOpeningLoader(meta: Omit<ProjectTransitionMeta, "at"> = {}) {
  if (typeof window === "undefined") return
  const payload: ProjectTransitionMeta = { at: now(), ...meta }

  // Fallback that survives even if sessionStorage is blocked.
  ;(window as unknown as Record<string, unknown>)[GLOBAL_KEY] = payload

  try {
    window.sessionStorage.setItem(FLAG_KEY, JSON.stringify(payload))
  } catch {
    // ignore
  }
}

/** Peek without consuming (prefers sessionStorage, falls back to global var). */
export function peekProjectOpeningLoader(maxAgeMs = 10_000): ProjectTransitionMeta | null {
  if (typeof window === "undefined") return null

  const isFresh = (m: ProjectTransitionMeta | null) => {
    if (!m?.at) return false
    return now() - m.at <= maxAgeMs
  }

  try {
    const raw = window.sessionStorage.getItem(FLAG_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ProjectTransitionMeta
      return isFresh(parsed) ? parsed : null
    }
  } catch {
    // ignore
  }

  const global = (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as ProjectTransitionMeta | undefined
  if (global && isFresh(global)) return global

  return null
}

export function clearProjectOpeningLoader() {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.removeItem(FLAG_KEY)
  } catch {
    // ignore
  }
  try {
    delete (window as unknown as Record<string, unknown>)[GLOBAL_KEY]
  } catch {
    // ignore
  }
}

/** Check and consume the flag (one-time). */
export function consumeProjectOpeningLoader(maxAgeMs = 10_000): ProjectTransitionMeta | null {
  const meta = peekProjectOpeningLoader(maxAgeMs)
  if (!meta) return null
  clearProjectOpeningLoader()
  return meta
}
