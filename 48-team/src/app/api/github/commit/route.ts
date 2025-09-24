import { NextRequest, NextResponse } from "next/server"

export const revalidate = 300

type CommitFile = {
  filename: string
  status: string
  additions: number
  deletions: number
  changes: number
  raw_url?: string
  blob_url?: string
  patch?: string
}

type CommitResponse = {
  sha: string
  html_url: string
  commit?: {
    author?: { name?: string; date?: string }
    committer?: { name?: string; date?: string }
    message?: string
  }
  stats?: { total?: number; additions?: number; deletions?: number }
  files?: CommitFile[]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const repo = searchParams.get("repo") // owner/name
  const sha = searchParams.get("sha")
  if (!repo || !sha) {
    return NextResponse.json({ error: "Missing repo or sha" }, { status: 400 })
  }

  const url = `https://api.github.com/repos/${repo}/commits/${sha}`
  const headers: HeadersInit = { "user-agent": "48team-portfolio" }
  const token = process.env.GITHUB_TOKEN
  if (token) headers["authorization"] = `Bearer ${token}`

  try {
    const res = await fetch(url, { next: { revalidate }, headers })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json({ error: `GitHub API error: ${res.status}`, details: text }, { status: res.status })
    }
    const data = (await res.json()) as CommitResponse
    const out = {
      sha: data.sha,
      htmlUrl: data.html_url,
      author: {
        name: data.commit?.author?.name,
        date: data.commit?.author?.date,
      },
      committer: {
        name: data.commit?.committer?.name,
        date: data.commit?.committer?.date,
      },
      message: data.commit?.message,
      stats: data.stats,
      files: (data.files || []).map((f) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
        changes: f.changes,
        raw_url: f.raw_url,
        blob_url: f.blob_url,
        patch: f.patch,
      })),
    }
    return NextResponse.json(out, {
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
