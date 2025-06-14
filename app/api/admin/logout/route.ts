import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
    
    // Clear the admin session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 0, // Expire immediately
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Logout failed' 
      },
      { status: 500 }
    )
  }
} 