import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''

    if (hostname.startsWith('www.')) {
        const url = request.nextUrl.clone()
        url.hostname = hostname.replace('www.', '')
        return NextResponse.redirect(url, 308)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}