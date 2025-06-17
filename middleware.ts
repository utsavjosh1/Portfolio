import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Skip login page and API routes
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
      return NextResponse.next()
    }
    
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin-session')
    
    // If no session cookie, redirect to admin login
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Verify the session token
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin-secret-token'
    if (adminSession.value !== validToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
  }

  // Get the response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:; frame-src 'self' https:;",
  )
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
