"use client"

import { useEffect, useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ExternalLink, GitCommit, GitBranch, Clock, Copy, Check, FileDiff, LinkIcon } from "lucide-react"

type CommitListItem = {
  id: string
  repo: string
  repoUrl: string
  sha: string
  shortSha: string
  message: string
  htmlUrl: string
  author: { name?: string; login?: string; avatarUrl?: string; htmlUrl?: string }
  date: string
  rel: string
}

type CommitDetails = {
  sha: string
  htmlUrl: string
  author?: { name?: string; date?: string }
  committer?: { name?: string; date?: string }
  message?: string
  stats?: { total?: number; additions?: number; deletions?: number }
  files?: Array<{
    filename: string
    status: string
    additions: number
    deletions: number
    changes: number
    raw_url?: string
    blob_url?: string
    patch?: string
  }>
}

function firstLine(text: string) {
  return (text || "").split("\n")[0]
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleString()
  } catch {
    return date
  }
}

function PatchView({ patch }: { patch?: string }) {
  if (!patch) return null
  const lines = patch.split("\n").slice(0, 300) // guard against huge patches
  return (
    <pre className="text-xs leading-relaxed overflow-x-auto rounded-md bg-accent/30 p-3 border border-primary/10">
      {lines.map((l, i) => {
        const cls = l.startsWith("+")
          ? "text-emerald-400"
          : l.startsWith("-")
          ? "text-red-400"
          : l.startsWith("@@")
          ? "text-primary"
          : "text-muted-foreground"
        return (
          <code key={i} className={`block whitespace-pre ${cls}`}>
            {l}
          </code>
        )
      })}
      {patch.split("\n").length > 300 && (
        <div className="mt-2 text-muted-foreground">Truncated…</div>
      )}
    </pre>
  )
}

function useCommits(user: string, limit: number) {
  const [data, setData] = useState<CommitListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetch(`/api/github/commits?user=${encodeURIComponent(user)}&limit=${limit}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((json) => {
        if (!active) return
        setData(json.items as CommitListItem[])
      })
      .catch((e) => {
        if (!active) return
        setError(typeof e === "string" ? e : e?.message || "Failed to load commits")
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [user, limit])

  return { data, error, loading }
}

function useCommitDetails(repo: string, sha: string | null) {
  const [data, setData] = useState<CommitDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!sha) return
    let active = true
    setLoading(true)
    setError(null)
    setData(null)
    fetch(`/api/github/commit?repo=${encodeURIComponent(repo)}&sha=${encodeURIComponent(sha)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((json) => {
        if (!active) return
        setData(json as CommitDetails)
      })
      .catch((e) => {
        if (!active) return
        setError(typeof e === "string" ? e : e?.message || "Failed to load commit details")
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [repo, sha])

  return { data, error, loading }
}

type LoadedInfo = { count: number; error?: string | null }

export default function LatestCommits({
  user = "senanqulamov",
  limit = 10,
  compact = false,
  onLoadedAction,
}: {
  user?: string
  limit?: number
  compact?: boolean
  onLoadedAction?: (info: LoadedInfo) => void
}) {
  const { data, error, loading } = useCommits(user, limit)

  useEffect(() => {
    if (loading) return
    if (onLoadedAction) {
      onLoadedAction({ count: Array.isArray(data) ? data.length : 0, error })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, error])

  return (
    <section id="latest-commits" className={compact ? "py-4" : "py-8"}>
      <div className="max-w-6xl mx-auto">
        {!compact && (
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold">Latest Updates</h3>
              <p className="text-muted-foreground text-sm">Recent public push events from GitHub</p>
            </div>
            <a
              href={`https://github.com/${user}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm inline-flex items-center gap-2"
            >
              View Profile <ExternalLink className="size-4" />
            </a>
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
              <Card key={i} className="border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && error && (
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Failed to load commits</CardTitle>
              <CardDescription className="break-all">{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        {!loading && !error && (!data || data.length === 0) && (
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>No recent commits</CardTitle>
              <CardDescription>
                Push to any public repo and they will appear here automatically.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {data.map((item) => (
              <CommitCard key={item.id} item={item} />)
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function CommitCard({ item }: { item: CommitListItem }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const title = firstLine(item.message)
  const repoOwnerName = item.repo

  function copySha() {
    navigator.clipboard?.writeText(item.sha).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }

  return (
    <Card className="bg-card/50 border border-primary/20 rounded-2xl backdrop-blur-sm">
      <CardHeader className="flex-row items-center gap-4">
        <a href={item.author.htmlUrl || `https://github.com/${item.author.login || ""}`}
           target="_blank" rel="noreferrer">
          <Avatar>
            <AvatarImage src={item.author.avatarUrl} alt={item.author.name || item.author.login || "author"} />
            <AvatarFallback>{(item.author.login || "?").slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </a>
        <div className="flex-1 min-w-0">
          <CardTitle className="truncate text-base">{title || "Commit"}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs">
            <a href={item.repoUrl} target="_blank" rel="noreferrer" className="inline-flex">
              <Badge variant="outline" className="px-2 py-0.5">{repoOwnerName}</Badge>
            </a>
            <span className="text-muted-foreground">•</span>
            <Clock className="size-3" />
            <span title={formatDate(item.date)}>{item.rel} ago</span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={copySha} aria-label="Copy SHA">
                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied" : `Copy ${item.shortSha}`}</TooltipContent>
          </Tooltip>
          <a href={item.htmlUrl} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" aria-label="Open on GitHub">
              <ExternalLink className="size-4" />
            </Button>
          </a>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {item.message && item.message.includes("\n") && (
          <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">{item.message}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
            <GitCommit className="size-3" /> {item.shortSha}
          </Badge>
          <a href={`https://github.com/${item.repo}/tree/${item.shortSha}`}
             className="text-xs text-muted-foreground inline-flex items-center gap-1"
             target="_blank" rel="noreferrer">
            <GitBranch className="size-3" /> tree
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-primary/40">
                <FileDiff className="size-4" /> Details
              </Button>
            </DialogTrigger>
            {open && <CommitDetailsDialog repo={item.repo} sha={item.sha} />}
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

function CommitDetailsDialog({ repo, sha }: { repo: string; sha: string }) {
  const { data, error, loading } = useCommitDetails(repo, sha)

  const title = useMemo(() => `${repo} • ${sha.slice(0, 7)}`, [repo, sha])

  return (
    <DialogContent className="w-[calc(100vw-1rem)] max-w-full sm:max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-lg p-4 sm:p-6 pb-[env(safe-area-inset-bottom)]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 break-words">
          <FileDiff className="size-5 text-primary" /> {title}
        </DialogTitle>
        <DialogDescription>Full commit details, files, and changes</DialogDescription>
      </DialogHeader>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {!loading && error && (
        <div className="text-destructive text-sm break-all">{error}</div>
      )}

      {!loading && !error && data && (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">{data.author?.name} • {formatDate(data.author?.date || "")}</div>
            <p className="text-sm whitespace-pre-wrap break-words mt-1">{data.message}</p>
            {data.stats && (
              <div className="mt-3 flex items-center gap-2 text-xs">
                <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">+{data.stats.additions} additions</Badge>
                <Badge variant="outline" className="border-red-400/30 text-red-400">-{data.stats.deletions} deletions</Badge>
                <Badge variant="outline" className="border-primary/30 text-primary">{data.stats.total} changes</Badge>
                <a href={data.htmlUrl} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-primary text-xs">
                  <LinkIcon className="size-3" /> GitHub
                </a>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-2">Files</h4>
            <ScrollArea className="max-h-[55vh] sm:max-h-[60vh] pr-2">
              <div className="space-y-4">
                {(data.files || []).map((f) => (
                  <div key={f.filename} className="rounded-lg border border-primary/10 p-3 bg-accent/10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{f.filename}</div>
                        <div className="text-xs text-muted-foreground capitalize">{f.status}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">+{f.additions}</Badge>
                        <Badge variant="outline" className="border-red-400/30 text-red-400">-{f.deletions}</Badge>
                        <Badge variant="outline" className="border-primary/30 text-primary">{f.changes}</Badge>
                      </div>
                    </div>
                    {f.patch && <div className="mt-3"><PatchView patch={f.patch} /></div>}
                  </div>
                ))}
                {(!data.files || data.files.length === 0) && (
                  <div className="text-sm text-muted-foreground">No file list provided for this commit.</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </DialogContent>
  )
}
