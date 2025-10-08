import * as React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { TeamMemberProfile } from '@/data/teamData'

export interface UseTeamMemberRouteOptions {
  members: TeamMemberProfile[]
  paramName?: string
  wrapAround?: boolean
}

export function useTeamMemberRoute({ members, paramName = 'member', wrapAround = false }: UseTeamMemberRouteOptions) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const slugify = React.useCallback((name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), [])

  const slug = searchParams.get(paramName) || null

  const index = React.useMemo(() => {
    if (!slug) return -1
    return members.findIndex(m => slugify(m.name) === slug)
  }, [slug, members, slugify])

  const selected = index >= 0 ? members[index] : null

  const open = React.useCallback((m: TeamMemberProfile) => {
    const s = slugify(m.name)
    const params = new URLSearchParams(searchParams.toString())
    params.set(paramName, s)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [router, pathname, searchParams, paramName, slugify])

  const close = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [router, pathname, searchParams, paramName])

  const navigate = React.useCallback((dir: 'next' | 'prev') => {
    if (index === -1) return
    let target = dir === 'next' ? index + 1 : index - 1
    if (wrapAround) {
      if (target < 0) target = members.length - 1
      if (target >= members.length) target = 0
    } else {
      if (target < 0 || target >= members.length) return
    }
    const t = members[target]
    if (!t) return
    open(t)
  }, [index, members, wrapAround, open])

  // Remove invalid slug automatically
  React.useEffect(() => {
    if (slug && index === -1) {
      close()
    }
  }, [slug, index, close])

  return {
    slug,
    slugify,
    index,
    selected,
    hasPrev: index > 0 || (wrapAround && members.length > 1),
    hasNext: (index >= 0 && index < members.length - 1) || (wrapAround && members.length > 1),
    open,
    close,
    navigate,
  }
}

