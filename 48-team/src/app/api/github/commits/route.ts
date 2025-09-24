import { NextRequest, NextResponse } from "next/server"

export const revalidate = 300 // seconds

type GitHubEvent = {
  id: string
  type: string
  repo: { name: string }
  actor: { login: string; avatar_url: string }
  payload?: {
    commits?: Array<{
      sha: string
      message: string
      author?: { name?: string }
    }>
  }
  created_at: string
}

type CommitItem = {
  id: string
  repo: string
  repoUrl: string
  sha: string
  shortSha: string
  message: string
  htmlUrl: string
  author: {
    name?: string
    login?: string
    avatarUrl?: string
    htmlUrl?: string
  }
  date: string
  rel: string
}

function relTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const sec = Math.floor(diff / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)
  if (day > 0) return `${day}d`
  if (hr > 0) return `${hr}h`
  if (min > 0) return `${min}m`
  return `${sec}s`
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user = searchParams.get("user") || "senanqulamov"
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 8), 1), 50)

  const eventsUrl = `https://api.github.com/users/${encodeURIComponent(user)}/events/public?per_page=50`
  const headers: HeadersInit = { "user-agent": "48team-portfolio" }
  const token = process.env.GITHUB_TOKEN
  if (token) headers["authorization"] = `Bearer ${token}`

  try {
    const res = await fetch(eventsUrl, { next: { revalidate }, headers })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json({ error: `GitHub API error: ${res.status}`, details: text }, { status: res.status })
    }
    const events = (await res.json()) as GitHubEvent[]

    const items: CommitItem[] = []
    for (const ev of events) {
      if (ev.type !== "PushEvent" || !ev.payload?.commits?.length) continue
      const repoName: string = ev.repo?.name
      const repoUrl = `https://github.com/${repoName}`
      const actor = ev.actor || { login: "", avatar_url: "" }
      const created = ev.created_at
      for (const c of ev.payload.commits || []) {
        items.push({
          id: `${ev.id}-${c.sha}`,
          repo: repoName,
          repoUrl,
          sha: c.sha,
          shortSha: (c.sha || "").slice(0, 7),
          message: c.message,
          htmlUrl: `https://github.com/${repoName}/commit/${c.sha}`,
          author: {
            name: c.author?.name || actor.login,
            login: actor.login,
            avatarUrl: actor.avatar_url,
            htmlUrl: actor.login ? `https://github.com/${actor.login}` : undefined,
          },
          date: created,
          rel: relTime(created),
        })
        if (items.length >= limit) break
      }
      if (items.length >= limit) break
    }

    return new NextResponse(JSON.stringify({ user, items }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=60",
      },
      status: 200,
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
