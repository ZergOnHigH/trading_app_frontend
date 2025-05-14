import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/autoryzacja', request.url))
  }

  return NextResponse.next()
}

// Opcjonalnie: określ, gdzie middleware ma działać
export const config = {
  matcher: ['/', '/dashboard', '/profile'], // dopasuj do ścieżek, które chcesz chronić
}