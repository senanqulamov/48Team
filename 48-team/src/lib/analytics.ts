// Simple analytics shim. Replace with your provider (Plausible, PostHog, GA) when ready.
export function trackEvent(event: string, props?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined") {
      console.debug("[analytics]", event, props ?? {})
    }
  } catch {
    // no-op
  }
}
