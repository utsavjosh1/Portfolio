import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin-session')
    
    if (!adminSession) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }
    
    // Verify the session token
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin-secret-token'
    if (adminSession.value !== validToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }
    
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
} 